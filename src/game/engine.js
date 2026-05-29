/**
 * Pure game engine for American Mahjong.
 * All functions are pure (no side effects, no React).
 */

import { generateDeck } from './tileDeck.js'
import { findMatchingHand } from './hands.js'

// ─── Helpers ─────────────────────────────────────────────────────────────────

const SUIT_ORDER = ['characters', 'bamboo', 'circles', 'winds', 'dragons', 'flowers', 'joker']

function suitIndex(suit) {
  const i = SUIT_ORDER.indexOf(suit)
  return i === -1 ? 99 : i
}

function valueToNum(value) {
  if (typeof value === 'number') return value
  const map = { E: 1, S: 2, W: 3, N: 4, R: 1, G: 2, J: 0 }
  return map[value] ?? 99
}

export function sortHand(tiles) {
  return [...tiles].sort((a, b) => {
    const si = suitIndex(a.suit) - suitIndex(b.suit)
    if (si !== 0) return si
    return valueToNum(a.value) - valueToNum(b.value)
  })
}

function addLog(state, msg) {
  const log = [...state.log, msg].slice(-8)
  return { ...state, log }
}

function getPlayer(state, id) {
  return state.players[id]
}

// ─── Initial State ────────────────────────────────────────────────────────────

export function createInitialState(playerNames) {
  const seats = ['east', 'south', 'west', 'north']
  const players = playerNames.slice(0, 4).map((name, i) => ({
    id: i,
    name,
    isHuman: i === 0,
    seat: seats[i],
    hand: [],
    exposed: [],
    targetHandId: null,
    passed: false,
  }))

  return {
    phase: 'lobby',
    players,
    wall: [],
    discardPile: [],
    lastDiscard: null,
    lastDiscardBy: null,
    currentPlayer: 0,
    dealerIndex: 0,
    charleston: {
      round: 0,
      selections: [[], [], [], []],
      done: false,
    },
    claimWindow: {
      open: false,
      discard: null,
      claimedBy: null,
      claimType: null,
    },
    winner: null,
    winningHandName: null,
    log: ['Welcome to American Mahjong!'],
    turnNumber: 0,
  }
}

// ─── Deal ─────────────────────────────────────────────────────────────────────

export function dealTiles(state) {
  const deck = generateDeck()
  let wall = [...deck]
  const players = state.players.map((p, i) => {
    const count = i === state.dealerIndex ? 14 : 13
    const hand = sortHand(wall.splice(0, count))
    return { ...p, hand, exposed: [], passed: false, targetHandId: null }
  })

  return {
    ...state,
    phase: 'charleston',
    players,
    wall,
    discardPile: [],
    lastDiscard: null,
    lastDiscardBy: null,
    currentPlayer: state.dealerIndex,
    winner: null,
    winningHandName: null,
    claimWindow: { open: false, discard: null, claimedBy: null, claimType: null },
    charleston: { round: 0, selections: [[], [], [], []], done: false },
    log: ['Tiles dealt! Charleston time — select 3 tiles to pass.'],
    turnNumber: 0,
  }
}

// ─── Charleston ───────────────────────────────────────────────────────────────

export function selectCharlestonTile(state, playerId, tileId) {
  const charleston = state.charleston
  const player = state.players[playerId]
  const currentSel = charleston.selections[playerId]

  // Toggle selection
  let newSel
  if (currentSel.includes(tileId)) {
    newSel = currentSel.filter(id => id !== tileId)
  } else {
    if (currentSel.length >= 3) return state // already 3 selected
    newSel = [...currentSel, tileId]
  }

  const newSelections = charleston.selections.map((s, i) => i === playerId ? newSel : s)
  return {
    ...state,
    charleston: { ...charleston, selections: newSelections },
  }
}

export function confirmCharlestonPass(state) {
  const { charleston, players } = state

  // Verify all 4 players have selected 3 tiles
  for (let i = 0; i < 4; i++) {
    if (charleston.selections[i].length !== 3) return state
  }

  const round = charleston.round
  // Direction: round 0 = pass right (id+1), round 1 = across (id+2), round 2 = left (id+3)
  const offsets = [1, 2, 3]
  const offset = offsets[round]

  // Build the tiles to pass for each player
  const tilesPassed = players.map((p, i) => {
    return charleston.selections[i].map(tid => p.hand.find(t => t.id === tid)).filter(Boolean)
  })

  // New hands: remove passed tiles, add received tiles
  const newPlayers = players.map((p, i) => {
    const passTo = (i + offset) % 4
    const passFrom = (i - offset + 4) % 4
    const removedIds = new Set(charleston.selections[i])
    const handWithout = p.hand.filter(t => !removedIds.has(t.id))
    const received = tilesPassed[passFrom]
    const newHand = sortHand([...handWithout, ...received])
    return { ...p, hand: newHand }
  })

  const dirNames = ['right', 'across', 'left']
  const newRound = round + 1
  const done = newRound >= 3

  const newState = {
    ...state,
    players: newPlayers,
    charleston: {
      round: newRound,
      selections: [[], [], [], []],
      done,
    },
    phase: done ? 'playing' : 'charleston',
    log: [...state.log.slice(-7), done
      ? 'Charleston complete! Game begins.'
      : `Passed ${dirNames[round]}. Now pass ${dirNames[newRound]}.`
    ],
  }

  return newState
}

// ─── Draw ─────────────────────────────────────────────────────────────────────

export function drawTile(state) {
  if (state.wall.length === 0) {
    return {
      ...state,
      phase: 'gameover',
      winner: null,
      winningHandName: null,
      log: [...state.log.slice(-7), 'Wall exhausted — draw game!'],
    }
  }

  const [drawn, ...remainingWall] = state.wall
  const pid = state.currentPlayer
  const player = state.players[pid]
  const newHand = sortHand([...player.hand, drawn])
  const newPlayers = state.players.map((p, i) =>
    i === pid ? { ...p, hand: newHand } : p
  )

  let newState = {
    ...state,
    players: newPlayers,
    wall: remainingWall,
    turnNumber: state.turnNumber + 1,
  }
  newState = addLog(newState, `${player.name} draws a tile.`)
  return newState
}

// ─── Discard ──────────────────────────────────────────────────────────────────

export function discardTile(state, playerId, tileId) {
  const player = state.players[playerId]
  const tile = player.hand.find(t => t.id === tileId)
  if (!tile) return state

  const newHand = sortHand(player.hand.filter(t => t.id !== tileId))
  const newPlayers = state.players.map((p, i) =>
    i === playerId ? { ...p, hand: newHand, passed: false } : { ...p, passed: false }
  )

  let newState = {
    ...state,
    players: newPlayers,
    discardPile: [...state.discardPile, tile],
    lastDiscard: tile,
    lastDiscardBy: playerId,
    claimWindow: {
      open: true,
      discard: tile,
      claimedBy: null,
      claimType: null,
    },
    currentPlayer: (playerId + 1) % 4,
  }
  newState = addLog(newState, `${player.name} discards ${tile.name}.`)
  return newState
}

// ─── Claim Validation ─────────────────────────────────────────────────────────

function isJoker(tile) {
  return tile.suit === 'joker' || tile.value === 'J'
}

function countMatching(hand, suit, value) {
  return hand.filter(t => {
    if (isJoker(t)) return false
    return t.suit === suit && t.value === value
  }).length
}

function countJokers(hand) {
  return hand.filter(isJoker).length
}

export function canClaimPung(hand, tile) {
  const real = countMatching(hand, tile.suit, tile.value)
  const jokers = countJokers(hand)
  return real + jokers >= 2
}

export function canClaimKong(hand, tile) {
  const real = countMatching(hand, tile.suit, tile.value)
  const jokers = countJokers(hand)
  return real + jokers >= 3
}

export function canClaimMahjong(hand, exposed, tile) {
  // Simulate having the tile
  const allTiles = [...hand, tile]
  const exposedTiles = exposed.flatMap(g => g.tiles)
  const combined = [...allTiles, ...exposedTiles]
  if (combined.length !== 14) return false
  return !!findMatchingHand(combined)
}

// ─── Claim Discard ────────────────────────────────────────────────────────────

export function claimDiscard(state, playerId, type) {
  const { claimWindow, players } = state
  if (!claimWindow.open || !claimWindow.discard) return state
  if (claimWindow.claimedBy === playerId) return state // already claimed

  const tile = claimWindow.discard
  const player = players[playerId]

  // Validate
  if (type === 'pung' && !canClaimPung(player.hand, tile)) return state
  if (type === 'kong' && !canClaimKong(player.hand, tile)) return state
  if (type === 'mahjong' && !canClaimMahjong(player.hand, player.exposed, tile)) return state

  if (type === 'mahjong') {
    // Game over
    const allTiles = [...player.hand, tile]
    const exposedTiles = player.exposed.flatMap(g => g.tiles)
    const combined = [...allTiles, ...exposedTiles]
    const matchedHand = findMatchingHand(combined)
    let newState = {
      ...state,
      phase: 'gameover',
      winner: playerId,
      winningHandName: matchedHand ? matchedHand.name : 'Mahjong',
      claimWindow: { open: false, discard: null, claimedBy: null, claimType: null },
      discardPile: state.discardPile.slice(0, -1), // remove last discard (it's in hand)
    }
    newState = addLog(newState, `🀄 ${player.name} wins with ${matchedHand ? matchedHand.name : 'Mahjong'}!`)
    return newState
  }

  // Build the exposed group
  const needed = type === 'kong' ? 3 : 2
  let remaining = [...player.hand]
  const groupTiles = [tile]

  // Take real matching tiles first
  let taken = 0
  const matchingInHand = remaining.filter(t => !isJoker(t) && t.suit === tile.suit && t.value === tile.value)
  for (const t of matchingInHand) {
    if (taken >= needed) break
    groupTiles.push(t)
    remaining = remaining.filter(x => x.id !== t.id)
    taken++
  }

  // Fill with jokers if needed
  if (taken < needed) {
    const jokerTiles = remaining.filter(isJoker)
    for (const j of jokerTiles) {
      if (taken >= needed) break
      groupTiles.push(j)
      remaining = remaining.filter(x => x.id !== j.id)
      taken++
    }
  }

  const newExposed = [...player.exposed, {
    type,
    tiles: groupTiles,
    claimedFrom: state.lastDiscardBy,
  }]

  const newPlayers = state.players.map((p, i) =>
    i === playerId
      ? { ...p, hand: sortHand(remaining), exposed: newExposed }
      : p
  )

  let newState = {
    ...state,
    players: newPlayers,
    phase: 'playing',
    currentPlayer: playerId,
    claimWindow: { open: false, discard: null, claimedBy: null, claimType: null },
    discardPile: state.discardPile.slice(0, -1),
  }
  newState = addLog(newState, `${player.name} claims a ${type}! Must discard.`)
  return newState
}

// ─── Pass on Claim ────────────────────────────────────────────────────────────

export function passOnClaim(state, playerId) {
  const newPlayers = state.players.map((p, i) =>
    i === playerId ? { ...p, passed: true } : p
  )

  // Check if all non-discarder players have passed
  const discarderId = state.lastDiscardBy
  const allPassed = newPlayers
    .filter((_, i) => i !== discarderId)
    .every(p => p.passed)

  if (allPassed) {
    // Close window, next player draws
    let newState = {
      ...state,
      players: newPlayers.map(p => ({ ...p, passed: false })),
      claimWindow: { open: false, discard: null, claimedBy: null, claimType: null },
    }
    return newState
  }

  return { ...state, players: newPlayers }
}

// ─── Swap Joker ───────────────────────────────────────────────────────────────

export function swapJoker(state, playerId, targetPlayerId, groupIndex, jokerTileId, realTileId) {
  const targetPlayer = state.players[targetPlayerId]
  const actingPlayer = state.players[playerId]
  const group = targetPlayer.exposed[groupIndex]
  if (!group) return state

  // Find the joker in the group
  const jokerInGroup = group.tiles.find(t => t.id === jokerTileId && isJoker(t))
  if (!jokerInGroup) return state

  // Find the real tile in acting player's hand
  const realTile = actingPlayer.hand.find(t => t.id === realTileId)
  if (!realTile || isJoker(realTile)) return state

  // Validate: real tile must match the group's tile type
  const nonJokerInGroup = group.tiles.find(t => !isJoker(t))
  if (!nonJokerInGroup) return state
  if (realTile.suit !== nonJokerInGroup.suit || realTile.value !== nonJokerInGroup.value) return state

  // Swap: remove real tile from acting player's hand, put joker there
  // Update the group to use the real tile instead of joker
  const newGroupTiles = group.tiles.map(t => t.id === jokerTileId ? realTile : t)
  const newExposed = targetPlayer.exposed.map((g, i) =>
    i === groupIndex ? { ...g, tiles: newGroupTiles } : g
  )
  const newActingHand = sortHand([
    ...actingPlayer.hand.filter(t => t.id !== realTileId),
    jokerInGroup,
  ])

  const newPlayers = state.players.map((p, i) => {
    if (i === targetPlayerId) return { ...p, exposed: newExposed }
    if (i === playerId) return { ...p, hand: newActingHand }
    return p
  })

  let newState = { ...state, players: newPlayers }
  newState = addLog(newState, `${actingPlayer.name} swapped a Joker from ${targetPlayer.name}'s exposed set!`)
  return newState
}

// ─── Win Check ────────────────────────────────────────────────────────────────

export function checkWinCondition(state, playerId) {
  const player = state.players[playerId]
  const exposedTiles = player.exposed.flatMap(g => g.tiles)
  const allTiles = [...player.hand, ...exposedTiles]
  if (allTiles.length !== 14) return false
  return !!findMatchingHand(allTiles)
}
