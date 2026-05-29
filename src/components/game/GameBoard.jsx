/**
 * GameBoard — the main game UI.
 * Props: { playerName, onQuit }
 */
import { useState, useEffect, useCallback, useRef } from 'react'
import TileDisplay from './TileDisplay.jsx'
import {
  createInitialState,
  dealTiles,
  selectCharlestonTile,
  confirmCharlestonPass,
  drawTile,
  discardTile,
  claimDiscard,
  passOnClaim,
  checkWinCondition,
  sortHand,
} from '../../game/engine.js'
import {
  pickTargetHand,
  selectCharlestonTiles,
  pickDiscardTile,
  shouldClaimDiscard,
} from '../../game/aiLogic.js'
import { findMatchingHand } from '../../game/hands.js'

const AI_NAMES = ['Amy', 'Betty', 'Carol']

// ─── Small sub-components ─────────────────────────────────────────────────────

function PlayerLabel({ player, isCurrent, isHuman }) {
  const seatEmoji = { east: '🌅', south: '🌸', west: '🌆', north: '🌙' }
  return (
    <div className={`flex items-center gap-1.5 ${isCurrent ? 'animate-pulse' : ''}`}>
      <span>{seatEmoji[player.seat] || '🀄'}</span>
      <span className={`font-semibold text-sm ${isHuman ? 'text-amber-200' : 'text-emerald-200'}`}>
        {player.name}
      </span>
      {isCurrent && <span className="text-yellow-300 text-xs">●</span>}
      {!isHuman && <span className="text-xs text-emerald-500 bg-emerald-800 px-1 rounded">AI</span>}
    </div>
  )
}

function ExposedGroup({ group, size = 'sm' }) {
  return (
    <div className="flex gap-0.5">
      {group.tiles.map((tile, i) => (
        <TileDisplay key={tile.id + i} tile={tile} size={size} />
      ))}
    </div>
  )
}

// ─── Main GameBoard ───────────────────────────────────────────────────────────

export default function GameBoard({ playerName, onQuit }) {
  const [gameState, setGameState] = useState(() => {
    const names = [playerName, ...AI_NAMES]
    const initial = createInitialState(names)
    return dealTiles(initial)
  })
  const [selectedTileId, setSelectedTileId] = useState(null)
  const aiTimerRef = useRef(null)
  const processingRef = useRef(false)

  const gs = gameState
  const human = gs.players[0]
  const isHumanTurn = gs.currentPlayer === 0 && gs.phase === 'playing'
  const humanTotalTiles = human.hand.length + human.exposed.flatMap(g => g.tiles).length
  const humanNeedsDiscard = isHumanTurn && !isClaimOpen && humanTotalTiles >= 14
  const humanNeedsDraw = isHumanTurn && !isClaimOpen && humanTotalTiles === 13
  const isClaimOpen = gs.claimWindow.open
  const isCharleston = gs.phase === 'charleston'

  // ─── AI turn logic ──────────────────────────────────────────────────────────

  const scheduleAI = useCallback((delay = 800) => {
    if (aiTimerRef.current) clearTimeout(aiTimerRef.current)
    aiTimerRef.current = setTimeout(() => {
      if (processingRef.current) return
      processingRef.current = true

      setGameState(prev => {
        const next = runAIStep(prev)
        processingRef.current = false
        return next
      })
    }, delay)
  }, [])

  useEffect(() => {
    if (gs.phase === 'gameover') return

    // Charleston: AI needs to select and confirm
    if (gs.phase === 'charleston') {
      const allAIConfirmed = gs.players.every((p, i) => {
        if (p.isHuman) return true // human must click manually
        return gs.charleston.selections[i].length === 3
      })
      if (!allAIConfirmed) {
        scheduleAI(600)
      }
      return
    }

    // Claim window: check AI claiming
    if (isClaimOpen) {
      const discarderId = gs.lastDiscardBy
      const hasUnpassedAI = gs.players.some((p, i) =>
        !p.isHuman && i !== discarderId && !p.passed
      )
      if (hasUnpassedAI) {
        scheduleAI(600)
      }
      return
    }

    // AI turn to draw/discard
    if (gs.phase === 'playing' && !isHumanTurn) {
      scheduleAI(800)
    }
  }, [gs, isHumanTurn, isClaimOpen, scheduleAI])

  useEffect(() => {
    return () => { if (aiTimerRef.current) clearTimeout(aiTimerRef.current) }
  }, [])

  // ─── AI step runner ─────────────────────────────────────────────────────────

  function runAIStep(state) {
    if (state.phase === 'gameover') return state

    // Charleston AI
    if (state.phase === 'charleston') {
      let s = state
      let changed = false
      for (let i = 1; i <= 3; i++) {
        const p = s.players[i]
        if (s.charleston.selections[i].length < 3) {
          const targetId = p.targetHandId || pickTargetHand(p.hand)
          const tileIds = selectCharlestonTiles(p.hand, targetId)
          // Set target hand id
          const newPlayers = s.players.map((pl, idx) =>
            idx === i ? { ...pl, targetHandId: targetId } : pl
          )
          s = { ...s, players: newPlayers }
          for (const tid of tileIds) {
            s = selectCharlestonTile(s, i, tid)
          }
          changed = true
        }
      }
      // If all 4 players have selected 3, confirm
      const allSelected = s.players.every((_, i) => s.charleston.selections[i].length === 3)
      if (allSelected && s.charleston.selections[0].length === 3) {
        s = confirmCharlestonPass(s)
        // Update AI target hands after receiving new tiles
        const newPlayers2 = s.players.map((p, i) => {
          if (p.isHuman) return p
          return { ...p, targetHandId: pickTargetHand(p.hand) }
        })
        s = { ...s, players: newPlayers2 }
      }
      return s
    }

    // Claim window: AI decide
    if (state.claimWindow.open) {
      const discarderId = state.lastDiscardBy
      let s = state

      // Find first AI that hasn't passed yet
      for (let i = 1; i <= 3; i++) {
        if (i === discarderId) continue
        const p = s.players[i]
        if (p.passed) continue
        if (p.isHuman) continue

        const targetId = p.targetHandId || pickTargetHand(p.hand)
        const claimType = shouldClaimDiscard(p.hand, p.exposed, s.claimWindow.discard, targetId)

        if (claimType) {
          s = claimDiscard(s, i, claimType)
          return s
        } else {
          s = passOnClaim(s, i)
          return s
        }
      }
      return s
    }

    // AI turn: draw or discard
    if (state.phase === 'playing') {
      const pid = state.currentPlayer
      const player = state.players[pid]
      if (player.isHuman) return state

      const totalTiles = player.hand.length + player.exposed.flatMap(g => g.tiles).length

      // Need to draw
      if (totalTiles === 13) {
        let s = drawTile(state)
        const p2 = s.players[pid]
        // Check win after draw
        if (checkWinCondition(s, pid)) {
          // Declare mahjong by discarding nothing — self-draw win
          const allTiles = [...p2.hand, ...p2.exposed.flatMap(g => g.tiles)]
          const matchedHand = findMatchingHand(allTiles)
          return {
            ...s,
            phase: 'gameover',
            winner: pid,
            winningHandName: matchedHand ? matchedHand.name : 'Mahjong',
            log: [...s.log.slice(-7), `🀄 ${p2.name} wins with ${matchedHand ? matchedHand.name : 'Mahjong'}!`],
          }
        }
        return s
      }

      // Need to discard
      if (totalTiles >= 14) {
        const targetId = player.targetHandId || pickTargetHand(player.hand)
        const tileId = pickDiscardTile(player.hand, targetId)
        return discardTile(state, pid, tileId)
      }
    }

    return state
  }

  // ─── Human actions ──────────────────────────────────────────────────────────

  function handleTileClick(tileId) {
    if (isCharleston) {
      setGameState(prev => selectCharlestonTile(prev, 0, tileId))
      return
    }
    if (humanNeedsDiscard) {
      setSelectedTileId(prev => prev === tileId ? null : tileId)
    }
  }

  function handleDiscard() {
    if (!selectedTileId) return
    setGameState(prev => {
      const next = discardTile(prev, 0, selectedTileId)
      return next
    })
    setSelectedTileId(null)
  }

  function handleDraw() {
    setGameState(prev => {
      let next = drawTile(prev)
      // Check win after self-draw
      const p = next.players[0]
      if (checkWinCondition(next, 0)) {
        const allTiles = [...p.hand, ...p.exposed.flatMap(g => g.tiles)]
        const matchedHand = findMatchingHand(allTiles)
        return {
          ...next,
          phase: 'gameover',
          winner: 0,
          winningHandName: matchedHand ? matchedHand.name : 'Mahjong',
          log: [...next.log.slice(-7), `🀄 ${p.name} wins with ${matchedHand ? matchedHand.name : 'Mahjong'}!`],
        }
      }
      return next
    })
  }

  function handleClaim(type) {
    setGameState(prev => claimDiscard(prev, 0, type))
    setSelectedTileId(null)
  }

  function handlePass() {
    setGameState(prev => passOnClaim(prev, 0))
  }

  function handleCharlestonConfirm() {
    if (gs.charleston.selections[0].length !== 3) return
    // Check all AI have selected 3
    setGameState(prev => {
      let s = prev
      // Force AI selections if needed
      for (let i = 1; i <= 3; i++) {
        if (s.charleston.selections[i].length < 3) {
          const p = s.players[i]
          const targetId = p.targetHandId || pickTargetHand(p.hand)
          const tileIds = selectCharlestonTiles(p.hand, targetId)
          const newPlayers = s.players.map((pl, idx) =>
            idx === i ? { ...pl, targetHandId: targetId } : pl
          )
          s = { ...s, players: newPlayers }
          for (const tid of tileIds) {
            s = selectCharlestonTile(s, i, tid)
          }
        }
      }
      s = confirmCharlestonPass(s)
      // Update AI target hands
      const newPlayers2 = s.players.map((p) => {
        if (p.isHuman) return p
        return { ...p, targetHandId: pickTargetHand(p.hand) }
      })
      return { ...s, players: newPlayers2 }
    })
  }

  function handlePlayAgain() {
    const names = [playerName, ...AI_NAMES]
    const initial = createInitialState(names)
    const dealt = dealTiles(initial)
    setGameState(dealt)
    setSelectedTileId(null)
  }

  // ─── Claim validity checks ──────────────────────────────────────────────────
  const discard = gs.claimWindow.discard
  const canHumanPung = discard && (() => {
    const real = human.hand.filter(t => t.suit === discard.suit && t.value === discard.value && t.suit !== 'joker').length
    const jokers = human.hand.filter(t => t.suit === 'joker' || t.value === 'J').length
    return real + jokers >= 2
  })()
  const canHumanKong = discard && (() => {
    const real = human.hand.filter(t => t.suit === discard.suit && t.value === discard.value && t.suit !== 'joker').length
    const jokers = human.hand.filter(t => t.suit === 'joker' || t.value === 'J').length
    return real + jokers >= 3
  })()
  const canHumanMahjong = discard && (() => {
    const allT = [...human.hand, discard, ...human.exposed.flatMap(g => g.tiles)]
    if (allT.length !== 14) return false
    return !!findMatchingHand(allT)
  })()

  const charlDir = ['right →', 'across ↔', 'left ←'][gs.charleston.round] || ''
  const charlDirLabel = ['Pass RIGHT →', 'Pass ACROSS ↔', 'Pass LEFT ←'][gs.charleston.round] || ''
  const humanSelCount = gs.charleston.selections[0]?.length || 0

  // ─── Render ─────────────────────────────────────────────────────────────────
  const recentDiscards = gs.discardPile.slice(-12)

  // Layout: Top = North (player 2), Left = West (player 3), Right = East (player 1)
  // Bottom = South = Human (player 0)
  const northPlayer = gs.players[2]  // Betty
  const eastPlayer = gs.players[1]   // Amy
  const westPlayer = gs.players[3]   // Carol

  return (
    <div className="relative flex flex-col bg-emerald-950 rounded-2xl overflow-hidden shadow-2xl" style={{ minHeight: '600px' }}>

      {/* ── Log / Status bar ── */}
      <div className="bg-emerald-900 border-b border-emerald-700 px-4 py-2 flex items-center justify-between">
        <div className="text-emerald-300 text-xs font-mono truncate max-w-xs md:max-w-lg">
          {gs.log[gs.log.length - 1] || ''}
        </div>
        <div className="flex items-center gap-3 text-xs text-emerald-400">
          <span>🧱 Wall: {gs.wall.length}</span>
          <span>♻ Turn: {gs.turnNumber}</span>
          <button
            onClick={onQuit}
            className="text-emerald-500 hover:text-rose-400 transition-colors text-xs border border-emerald-700 px-2 py-0.5 rounded"
          >
            Quit
          </button>
        </div>
      </div>

      {/* ── Main table area ── */}
      <div className="flex flex-1">

        {/* ── West player (Carol) ── */}
        <div className="flex flex-col items-center justify-center w-20 bg-emerald-900 border-r border-emerald-700 px-2 py-4 gap-2">
          <PlayerLabel player={westPlayer} isCurrent={gs.currentPlayer === 3} isHuman={false} />
          <div className="flex flex-col gap-0.5">
            {westPlayer.hand.map((_, i) => (
              <TileDisplay key={i} tile={_} faceDown size="sm" />
            ))}
          </div>
          {westPlayer.exposed.length > 0 && (
            <div className="flex flex-col gap-1 mt-1">
              {westPlayer.exposed.map((g, i) => (
                <ExposedGroup key={i} group={g} size="sm" />
              ))}
            </div>
          )}
        </div>

        {/* ── Center column ── */}
        <div className="flex-1 flex flex-col">

          {/* ── North player (Betty) ── */}
          <div className="bg-emerald-900 border-b border-emerald-700 p-3">
            <PlayerLabel player={northPlayer} isCurrent={gs.currentPlayer === 2} isHuman={false} />
            <div className="flex gap-1 mt-2 flex-wrap">
              {northPlayer.hand.map((t, i) => (
                <TileDisplay key={t.id + i} tile={t} faceDown size="sm" />
              ))}
            </div>
            {northPlayer.exposed.length > 0 && (
              <div className="flex gap-2 mt-1 flex-wrap">
                {northPlayer.exposed.map((g, i) => (
                  <ExposedGroup key={i} group={g} size="sm" />
                ))}
              </div>
            )}
          </div>

          {/* ── Game table center ── */}
          <div className="flex-1 bg-emerald-800 p-4 flex flex-col items-center justify-center gap-4"
               style={{ backgroundImage: 'radial-gradient(ellipse at center, #065f46 0%, #064e3b 100%)' }}>

            {/* Discard pile grid */}
            <div>
              <div className="text-emerald-400 text-xs text-center mb-2">Discards</div>
              <div className="grid grid-cols-6 gap-1">
                {recentDiscards.map((t, i) => (
                  <TileDisplay key={t.id + i} tile={t} size="sm" />
                ))}
                {recentDiscards.length === 0 && (
                  <div className="col-span-6 text-emerald-600 text-xs text-center py-2">No discards yet</div>
                )}
              </div>
            </div>

            {/* Wall count */}
            <div className="text-emerald-300 text-sm font-mono">
              🧱 Wall: {gs.wall.length} tiles remaining
            </div>

            {/* Phase indicator */}
            {isCharleston && !gs.charleston.done && (
              <div className="bg-amber-700 text-amber-100 px-4 py-2 rounded-xl text-sm font-semibold text-center">
                🔄 Charleston — {charlDirLabel}
              </div>
            )}

            {/* Claim window */}
            {isClaimOpen && gs.lastDiscardBy !== 0 && (
              <div className="bg-rose-800 text-rose-100 px-4 py-2 rounded-xl text-sm font-semibold text-center">
                ⏳ Claim window open — {discard?.name}
              </div>
            )}
          </div>

          {/* ── Action buttons area ── */}
          <div className="bg-emerald-900 border-t border-emerald-700 p-3">
            {/* Charleston actions */}
            {isCharleston && !gs.charleston.done && (
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-emerald-300 text-xs">Select {3 - humanSelCount} more to pass {charlDir}</span>
                <button
                  disabled={humanSelCount !== 3}
                  onClick={handleCharlestonConfirm}
                  className="bg-amber-600 text-white text-sm font-bold px-4 py-2 rounded-xl disabled:opacity-40 hover:bg-amber-700 transition-colors"
                >
                  Pass Tiles ({humanSelCount}/3)
                </button>
              </div>
            )}

            {/* Claim window actions (human is not the discarder) */}
            {isClaimOpen && gs.lastDiscardBy !== 0 && (
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-emerald-300 text-xs">Claim {discard?.name}?</span>
                <button
                  disabled={!canHumanMahjong}
                  onClick={() => handleClaim('mahjong')}
                  className="bg-gold-500 text-white text-sm font-bold px-3 py-1.5 rounded-xl disabled:opacity-40 hover:bg-gold-600 transition-colors"
                >
                  Mahjong! 🀄
                </button>
                <button
                  disabled={!canHumanKong}
                  onClick={() => handleClaim('kong')}
                  className="bg-rose-600 text-white text-sm font-bold px-3 py-1.5 rounded-xl disabled:opacity-40 hover:bg-rose-700 transition-colors"
                >
                  Kong (4)
                </button>
                <button
                  disabled={!canHumanPung}
                  onClick={() => handleClaim('pung')}
                  className="bg-rose-500 text-white text-sm font-bold px-3 py-1.5 rounded-xl disabled:opacity-40 hover:bg-rose-600 transition-colors"
                >
                  Pung (3)
                </button>
                <button
                  onClick={handlePass}
                  className="bg-emerald-700 text-emerald-200 text-sm font-bold px-3 py-1.5 rounded-xl hover:bg-emerald-600 transition-colors"
                >
                  Pass
                </button>
              </div>
            )}

            {/* Human's turn: draw */}
            {humanNeedsDraw && (
              <div className="flex items-center gap-3">
                <span className="text-emerald-300 text-xs">Your turn — draw a tile</span>
                <button
                  onClick={handleDraw}
                  className="bg-emerald-600 text-white text-sm font-bold px-4 py-2 rounded-xl hover:bg-emerald-500 transition-colors"
                >
                  Draw Tile 🎴
                </button>
              </div>
            )}

            {/* Human's turn: discard */}
            {humanNeedsDiscard && (
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-emerald-300 text-xs">Select a tile to discard</span>
                <button
                  disabled={!selectedTileId}
                  onClick={handleDiscard}
                  className="bg-rose-600 text-white text-sm font-bold px-4 py-2 rounded-xl disabled:opacity-40 hover:bg-rose-700 transition-colors"
                >
                  Discard Selected
                </button>
              </div>
            )}

            {/* Human already claimed — must discard hint */}
            {humanNeedsDiscard && human.exposed.length > 0 && (
              <div className="text-amber-300 text-xs ml-2 mt-1">After claiming, you must discard!</div>
            )}

            {/* Waiting for AI */}
            {!isHumanTurn && !isClaimOpen && gs.phase === 'playing' && (
              <div className="text-emerald-500 text-xs animate-pulse">
                Waiting for {gs.players[gs.currentPlayer]?.name}...
              </div>
            )}
          </div>
        </div>

        {/* ── East player (Amy) ── */}
        <div className="flex flex-col items-center justify-center w-20 bg-emerald-900 border-l border-emerald-700 px-2 py-4 gap-2">
          <PlayerLabel player={eastPlayer} isCurrent={gs.currentPlayer === 1} isHuman={false} />
          <div className="flex flex-col gap-0.5">
            {eastPlayer.hand.map((t, i) => (
              <TileDisplay key={t.id + i} tile={t} faceDown size="sm" />
            ))}
          </div>
          {eastPlayer.exposed.length > 0 && (
            <div className="flex flex-col gap-1 mt-1">
              {eastPlayer.exposed.map((g, i) => (
                <ExposedGroup key={i} group={g} size="sm" />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Human player (South) ── */}
      <div className="bg-emerald-950 border-t border-emerald-700 p-4">
        <div className="flex items-center gap-2 mb-3">
          <PlayerLabel player={human} isCurrent={isHumanTurn} isHuman={true} />
          {human.exposed.length > 0 && (
            <div className="flex gap-2 ml-4">
              {human.exposed.map((g, i) => (
                <ExposedGroup key={i} group={g} size="sm" />
              ))}
            </div>
          )}
        </div>
        <div className="flex flex-wrap gap-1.5">
          {human.hand.map(tile => {
            const isSelected = tile.id === selectedTileId
            const isCharlestonSelected = isCharleston && gs.charleston.selections[0].includes(tile.id)
            const finalSelected = isSelected || isCharlestonSelected
            const clickable = isCharleston || humanNeedsDiscard
            return (
              <TileDisplay
                key={tile.id}
                tile={tile}
                size="md"
                selected={finalSelected}
                onClick={() => handleTileClick(tile.id)}
                disabled={!clickable}
              />
            )
          })}
        </div>
      </div>

      {/* ── Game Over Overlay ── */}
      {gs.phase === 'gameover' && (
        <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-10">
          <div className="bg-white rounded-3xl shadow-2xl p-8 text-center max-w-sm mx-4">
            {gs.winner !== null ? (
              <>
                <div className="text-6xl mb-3">🀄</div>
                <h3 className="font-display text-3xl font-bold text-rose-700 mb-2">
                  {gs.winner === 0 ? 'Mahjong!' : `${gs.players[gs.winner]?.name} Wins!`}
                </h3>
                {gs.winningHandName && (
                  <p className="text-rose-500 mb-1 font-semibold">{gs.winningHandName}</p>
                )}
                {gs.winner !== 0 && (
                  <p className="text-rose-400 text-sm mb-4">Better luck next time!</p>
                )}
                {gs.winner === 0 && (
                  <p className="text-rose-400 text-sm mb-4">Congratulations! 🌸</p>
                )}
              </>
            ) : (
              <>
                <div className="text-6xl mb-3">🏳️</div>
                <h3 className="font-display text-3xl font-bold text-gray-700 mb-2">Draw Game</h3>
                <p className="text-gray-500 text-sm mb-4">The wall ran out before anyone won.</p>
              </>
            )}
            <div className="flex gap-3 justify-center">
              <button
                onClick={handlePlayAgain}
                className="bg-rose-500 text-white font-bold py-3 px-6 rounded-2xl hover:bg-rose-600 transition-colors shadow-lg"
              >
                Play Again 🌸
              </button>
              <button
                onClick={onQuit}
                className="bg-gray-100 text-gray-700 font-bold py-3 px-6 rounded-2xl hover:bg-gray-200 transition-colors"
              >
                Quit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
