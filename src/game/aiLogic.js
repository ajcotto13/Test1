/**
 * AI decision-making for American Mahjong.
 * Simple but reasonable heuristics.
 */

import { WINNING_HANDS, findMatchingHand } from './hands.js'

// ─── Helpers ──────────────────────────────────────────────────────────────────

function isJoker(tile) {
  return tile.suit === 'joker' || tile.value === 'J'
}

/**
 * Count how many tiles in `hand` contribute toward a given winning hand.
 * Returns a score (higher = better fit).
 */
function scoreHandFit(tiles, hand) {
  let score = 0
  const nonJokers = tiles.filter(t => !isJoker(t))
  const jokerCount = tiles.filter(isJoker).length

  for (const group of hand.groups) {
    let matching = 0
    if (group.suit === 'any' && group.value === 'any') {
      // Generic group — any tile helps
      const grouped = {}
      nonJokers.forEach(t => {
        const key = `${t.suit}:${t.value}`
        grouped[key] = (grouped[key] || 0) + 1
      })
      const best = Math.max(0, ...Object.values(grouped))
      matching = Math.min(best, group.count)
    } else if (group.suit === 'any') {
      // Any suit but specific value
      const matching2 = nonJokers.filter(t => t.value === group.value)
      matching = Math.min(matching2.length, group.count)
    } else if (group.value === 'any') {
      // Specific suit but any value
      const matching2 = nonJokers.filter(t => t.suit === group.suit)
      matching = Math.min(matching2.length, group.count)
    } else {
      // Specific suit and value
      const matching2 = nonJokers.filter(t => t.suit === group.suit && t.value === group.value)
      matching = Math.min(matching2.length, group.count)
    }
    score += matching
  }

  score += jokerCount // jokers are always useful
  return score
}

// ─── Exports ──────────────────────────────────────────────────────────────────

/**
 * Given 13 tiles, pick the winning hand the AI should target.
 */
export function pickTargetHand(tiles) {
  let bestId = WINNING_HANDS[0].id
  let bestScore = -1

  for (const hand of WINNING_HANDS) {
    const s = scoreHandFit(tiles, hand)
    if (s > bestScore) {
      bestScore = s
      bestId = hand.id
    }
  }

  return bestId
}

/**
 * Return 3 tile ids from `hand` to pass during Charleston.
 * Passes tiles least useful for the target hand.
 */
export function selectCharlestonTiles(hand, targetHandId) {
  const target = WINNING_HANDS.find(h => h.id === targetHandId) || WINNING_HANDS[0]

  // Score each tile's contribution: remove it and see how score changes
  const tileScores = hand.map(tile => {
    const without = hand.filter(t => t.id !== tile.id)
    const score = scoreHandFit(without, target)
    return { tile, score } // lower score = tile was more useful (we want to pass LOW utility tiles)
  })

  // Sort descending by score-after-removal — highest means tile contributed LEAST
  tileScores.sort((a, b) => b.score - a.score)

  return tileScores.slice(0, 3).map(x => x.tile.id)
}

/**
 * Return tile id to discard: tile least useful for target hand.
 */
export function pickDiscardTile(hand, targetHandId) {
  if (hand.length === 0) return null
  const target = WINNING_HANDS.find(h => h.id === targetHandId) || WINNING_HANDS[0]

  const tileScores = hand.map(tile => {
    const without = hand.filter(t => t.id !== tile.id)
    const score = scoreHandFit(without, target)
    return { tile, score }
  })

  tileScores.sort((a, b) => b.score - a.score)
  return tileScores[0].tile.id
}

/**
 * Decide whether to claim a discard.
 * Returns 'pung' | 'kong' | 'mahjong' | null.
 */
export function shouldClaimDiscard(hand, exposed, discardTile, targetHandId) {
  if (!discardTile) return null
  if (isJoker(discardTile)) return null // can't claim jokers

  const target = WINNING_HANDS.find(h => h.id === targetHandId) || WINNING_HANDS[0]
  const exposedTiles = exposed.flatMap(g => g.tiles)

  // Check mahjong first
  const allTiles = [...hand, discardTile, ...exposedTiles]
  if (allTiles.length === 14 && findMatchingHand(allTiles)) return 'mahjong'

  // Count how many of this tile we have
  const realCount = hand.filter(t =>
    !isJoker(t) && t.suit === discardTile.suit && t.value === discardTile.value
  ).length
  const jokerCount = hand.filter(isJoker).length

  // Only claim if the tile is useful for the target hand
  const isUseful = target.groups.some(g => {
    if (g.suit !== 'any' && g.suit !== discardTile.suit) return false
    if (g.value !== 'any' && g.value !== discardTile.value) return false
    return true
  })

  if (!isUseful) return null

  // Kong: have 3 (with jokers)
  if (realCount + jokerCount >= 3) return 'kong'
  // Pung: have 2 (with jokers)
  if (realCount + jokerCount >= 2) return 'pung'

  return null
}

/**
 * Get the next AI action for a player.
 */
export function getAITurn(state, playerId) {
  const player = state.players[playerId]
  const { phase, claimWindow, charleston } = state

  // Charleston phase
  if (phase === 'charleston' && !charleston.done) {
    const targetHandId = player.targetHandId || pickTargetHand(player.hand)
    const tileIds = selectCharlestonTiles(player.hand, targetHandId)
    return { type: 'charleston', tileIds }
  }

  // Claim window
  if (claimWindow.open && state.lastDiscardBy !== playerId) {
    if (!player.passed) {
      const targetHandId = player.targetHandId || pickTargetHand(player.hand)
      const claimType = shouldClaimDiscard(player.hand, player.exposed, claimWindow.discard, targetHandId)
      if (claimType) return { type: 'claim', claimType }
      return { type: 'pass' }
    }
    return { type: 'pass' }
  }

  // Playing phase — AI's turn
  if (phase === 'playing' && state.currentPlayer === playerId) {
    // Draw if we just started a turn (hand has 13 tiles and no claim)
    if (player.hand.length === 13) {
      return { type: 'draw' }
    }
    // Discard
    if (player.hand.length >= 14) {
      const targetHandId = player.targetHandId || pickTargetHand(player.hand)
      const tileId = pickDiscardTile(player.hand, targetHandId)
      return { type: 'discard', tileId }
    }
  }

  return { type: 'wait' }
}
