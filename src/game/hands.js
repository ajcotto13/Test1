/**
 * 20 representative American Mahjong winning hands (simplified NMJL-style).
 * Each hand has groups describing what tiles are needed.
 *
 * Group types:
 *   kong  = 4 of a kind
 *   pung  = 3 of a kind
 *   pair  = 2 of a kind
 *   quint = 5 (kong + joker substitute — represented as 5-of-a-kind conceptually)
 *   single = 1 tile
 *
 * suit: 'any' means any single suit (but all 'any' groups in a hand must be the same suit)
 * value: number or wind-letter or dragon-letter or 'any'
 */

export const WINNING_HANDS = [
  // ─── Like Numbers ───────────────────────────────────────────────────────────
  {
    id: 'LN-1',
    name: 'Triple Kong 2',
    category: 'Like Numbers',
    description: 'FF 2222 2222 2222 (flowers + three kongs of 2 in three suits)',
    points: 25,
    groups: [
      { type: 'pair',   suit: 'flowers',    value: 'any', count: 2 },
      { type: 'kong',   suit: 'characters', value: 2,     count: 4 },
      { type: 'kong',   suit: 'bamboo',     value: 2,     count: 4 },
      { type: 'kong',   suit: 'circles',    value: 2,     count: 4 },
    ],
  },
  {
    id: 'LN-2',
    name: 'Triple Kong 8',
    category: 'Like Numbers',
    description: 'FF 8888 8888 8888 (flowers + three kongs of 8 in three suits)',
    points: 25,
    groups: [
      { type: 'pair',   suit: 'flowers',    value: 'any', count: 2 },
      { type: 'kong',   suit: 'characters', value: 8,     count: 4 },
      { type: 'kong',   suit: 'bamboo',     value: 8,     count: 4 },
      { type: 'kong',   suit: 'circles',    value: 8,     count: 4 },
    ],
  },
  {
    id: 'LN-3',
    name: 'Quad Kong 6',
    category: 'Like Numbers',
    description: '6666 6666 6666 66 (three kongs of 6 + one pair of 6)',
    points: 30,
    groups: [
      { type: 'kong', suit: 'any', value: 6, count: 4 },
      { type: 'kong', suit: 'any', value: 6, count: 4 },
      { type: 'kong', suit: 'any', value: 6, count: 4 },
      { type: 'pair', suit: 'any', value: 6, count: 2 },
    ],
    multiSuit: true,
  },
  {
    id: 'LN-4',
    name: 'Odd Numbers',
    category: 'Like Numbers',
    description: '1111 3333 5555 7 (kongs of 1, 3, 5 + single 7, any one suit)',
    points: 25,
    groups: [
      { type: 'kong',   suit: 'any', value: 1, count: 4 },
      { type: 'kong',   suit: 'any', value: 3, count: 4 },
      { type: 'kong',   suit: 'any', value: 5, count: 4 },
      { type: 'single', suit: 'any', value: 7, count: 1 },
    ],
    sameSuit: true,
  },
  {
    id: 'LN-5',
    name: 'Even Numbers',
    category: 'Like Numbers',
    description: '2222 4444 6666 88 (kongs of 2, 4, 6 + pair 8, any one suit)',
    points: 25,
    groups: [
      { type: 'kong', suit: 'any', value: 2, count: 4 },
      { type: 'kong', suit: 'any', value: 4, count: 4 },
      { type: 'kong', suit: 'any', value: 6, count: 4 },
      { type: 'pair', suit: 'any', value: 8, count: 2 },
    ],
    sameSuit: true,
  },

  // ─── Consecutive Runs ────────────────────────────────────────────────────────
  {
    id: 'CR-1',
    name: 'Run of 1-2-3',
    category: 'Consecutive',
    description: '1111 2222 3333 44 (kongs 1,2,3 + pair 4, same suit)',
    points: 25,
    groups: [
      { type: 'kong', suit: 'any', value: 1, count: 4 },
      { type: 'kong', suit: 'any', value: 2, count: 4 },
      { type: 'kong', suit: 'any', value: 3, count: 4 },
      { type: 'pair', suit: 'any', value: 4, count: 2 },
    ],
    sameSuit: true,
  },
  {
    id: 'CR-2',
    name: 'Run of 7-8-9',
    category: 'Consecutive',
    description: '7777 8888 9999 66 (kongs 7,8,9 + pair 6, same suit)',
    points: 25,
    groups: [
      { type: 'kong', suit: 'any', value: 7, count: 4 },
      { type: 'kong', suit: 'any', value: 8, count: 4 },
      { type: 'kong', suit: 'any', value: 9, count: 4 },
      { type: 'pair', suit: 'any', value: 6, count: 2 },
    ],
    sameSuit: true,
  },
  {
    id: 'CR-3',
    name: 'Five Consecutive Pairs',
    category: 'Consecutive',
    description: '11 22 33 44 55 66 77 (7 pairs, consecutive, same suit)',
    points: 25,
    groups: [
      { type: 'pair', suit: 'any', value: 1, count: 2 },
      { type: 'pair', suit: 'any', value: 2, count: 2 },
      { type: 'pair', suit: 'any', value: 3, count: 2 },
      { type: 'pair', suit: 'any', value: 4, count: 2 },
      { type: 'pair', suit: 'any', value: 5, count: 2 },
      { type: 'pair', suit: 'any', value: 6, count: 2 },
      { type: 'pair', suit: 'any', value: 7, count: 2 },
    ],
    sameSuit: true,
  },
  {
    id: 'CR-4',
    name: 'Three Consecutive Kongs',
    category: 'Consecutive',
    description: '3333 4444 5555 33 (kongs of 3,4,5 + pair 3, same suit)',
    points: 30,
    groups: [
      { type: 'kong', suit: 'any', value: 3, count: 4 },
      { type: 'kong', suit: 'any', value: 4, count: 4 },
      { type: 'kong', suit: 'any', value: 5, count: 4 },
      { type: 'pair', suit: 'any', value: 3, count: 2 },
    ],
    sameSuit: true,
  },

  // ─── Winds & Dragons ─────────────────────────────────────────────────────────
  {
    id: 'WD-1',
    name: 'All Four Winds',
    category: 'Winds & Dragons',
    description: 'EEEE SSSS WWWW NNNN (kongs of all 4 winds)',
    points: 30,
    groups: [
      { type: 'kong', suit: 'winds', value: 'E', count: 4 },
      { type: 'kong', suit: 'winds', value: 'S', count: 4 },
      { type: 'kong', suit: 'winds', value: 'W', count: 4 },
      { type: 'kong', suit: 'winds', value: 'N', count: 4 },
    ],
  },
  {
    id: 'WD-2',
    name: 'Winds Pungs',
    category: 'Winds & Dragons',
    description: 'EEE SSS WWW NNN EE (pungs of all 4 winds + pair East)',
    points: 25,
    groups: [
      { type: 'pung', suit: 'winds', value: 'E', count: 3 },
      { type: 'pung', suit: 'winds', value: 'S', count: 3 },
      { type: 'pung', suit: 'winds', value: 'W', count: 3 },
      { type: 'pung', suit: 'winds', value: 'N', count: 3 },
      { type: 'pair', suit: 'winds', value: 'E', count: 2 },
    ],
  },
  {
    id: 'WD-3',
    name: 'Three Dragons',
    category: 'Winds & Dragons',
    description: 'RRR GGG WWW RRGG (pungs of dragons + pair each Red & Green)',
    points: 25,
    groups: [
      { type: 'pung', suit: 'dragons', value: 'R', count: 3 },
      { type: 'pung', suit: 'dragons', value: 'G', count: 3 },
      { type: 'pung', suit: 'dragons', value: 'W', count: 3 },
      { type: 'pair', suit: 'dragons', value: 'R', count: 2 },
      { type: 'pair', suit: 'dragons', value: 'G', count: 2 },
    ],
  },
  {
    id: 'WD-4',
    name: 'Wind-Dragon Mix',
    category: 'Winds & Dragons',
    description: 'EEEE RRRR GGGG WW (kongs East + Red + Green dragon + pair White)',
    points: 30,
    groups: [
      { type: 'kong', suit: 'winds',   value: 'E', count: 4 },
      { type: 'kong', suit: 'dragons', value: 'R', count: 4 },
      { type: 'kong', suit: 'dragons', value: 'G', count: 4 },
      { type: 'pair', suit: 'dragons', value: 'W', count: 2 },
    ],
  },

  // ─── Flowers ─────────────────────────────────────────────────────────────────
  {
    id: 'FL-1',
    name: 'Flowers & Dragons',
    category: 'Flowers',
    description: 'FFFF RRRR GGGG WW (4 flowers + kong Red + kong Green + pair White)',
    points: 25,
    groups: [
      { type: 'kong', suit: 'flowers', value: 'any', count: 4 },
      { type: 'kong', suit: 'dragons', value: 'R',   count: 4 },
      { type: 'kong', suit: 'dragons', value: 'G',   count: 4 },
      { type: 'pair', suit: 'dragons', value: 'W',   count: 2 },
    ],
  },
  {
    id: 'FL-2',
    name: 'Flowers & Winds',
    category: 'Flowers',
    description: 'FFFF EEEE SSSS WW (4 flowers + kong East + kong South + pair West)',
    points: 25,
    groups: [
      { type: 'kong', suit: 'flowers', value: 'any', count: 4 },
      { type: 'kong', suit: 'winds',   value: 'E',   count: 4 },
      { type: 'kong', suit: 'winds',   value: 'S',   count: 4 },
      { type: 'pair', suit: 'winds',   value: 'W',   count: 2 },
    ],
  },
  {
    id: 'FL-3',
    name: 'Flowers & Numbers',
    category: 'Flowers',
    description: 'FFFF 1111 9999 11 (4 flowers + kong 1 + kong 9 + pair 1, same suit)',
    points: 25,
    groups: [
      { type: 'kong', suit: 'flowers', value: 'any', count: 4 },
      { type: 'kong', suit: 'any',     value: 1,     count: 4 },
      { type: 'kong', suit: 'any',     value: 9,     count: 4 },
      { type: 'pair', suit: 'any',     value: 1,     count: 2 },
    ],
    sameSuitForNumbers: true,
  },

  // ─── Singles & Pairs ─────────────────────────────────────────────────────────
  {
    id: 'SP-1',
    name: 'Seven Pairs',
    category: 'Singles & Pairs',
    description: '11 22 33 44 55 66 77 (7 pairs of any tiles, any suits)',
    points: 25,
    groups: [
      { type: 'pair', suit: 'any', value: 'any', count: 2 },
      { type: 'pair', suit: 'any', value: 'any', count: 2 },
      { type: 'pair', suit: 'any', value: 'any', count: 2 },
      { type: 'pair', suit: 'any', value: 'any', count: 2 },
      { type: 'pair', suit: 'any', value: 'any', count: 2 },
      { type: 'pair', suit: 'any', value: 'any', count: 2 },
      { type: 'pair', suit: 'any', value: 'any', count: 2 },
    ],
    anyPairs: true,
  },
  {
    id: 'SP-2',
    name: 'Five Pungs',
    category: 'Singles & Pairs',
    description: 'XXX XXX XXX XXX XX (4 pungs + pair, any tiles)',
    points: 25,
    groups: [
      { type: 'pung', suit: 'any', value: 'any', count: 3 },
      { type: 'pung', suit: 'any', value: 'any', count: 3 },
      { type: 'pung', suit: 'any', value: 'any', count: 3 },
      { type: 'pung', suit: 'any', value: 'any', count: 3 },
      { type: 'pair', suit: 'any', value: 'any', count: 2 },
    ],
    anyGroups: true,
  },
  {
    id: 'SP-3',
    name: 'Three Kongs & Pair',
    category: 'Singles & Pairs',
    description: 'XXXX XXXX XXXX XX (3 kongs + pair, any tiles)',
    points: 30,
    groups: [
      { type: 'kong', suit: 'any', value: 'any', count: 4 },
      { type: 'kong', suit: 'any', value: 'any', count: 4 },
      { type: 'kong', suit: 'any', value: 'any', count: 4 },
      { type: 'pair', suit: 'any', value: 'any', count: 2 },
    ],
    anyGroups: true,
  },
  {
    id: 'SP-4',
    name: 'Number Singles',
    category: 'Singles & Pairs',
    description: '1 2 3 4 5 6 7 8 9 EE SS WW NN (1 each of 1–9 + wind pairs)',
    points: 25,
    groups: [
      { type: 'single', suit: 'any', value: 1, count: 1 },
      { type: 'single', suit: 'any', value: 2, count: 1 },
      { type: 'single', suit: 'any', value: 3, count: 1 },
      { type: 'single', suit: 'any', value: 4, count: 1 },
      { type: 'single', suit: 'any', value: 5, count: 1 },
      { type: 'single', suit: 'any', value: 6, count: 1 },
      { type: 'single', suit: 'any', value: 7, count: 1 },
      { type: 'single', suit: 'any', value: 8, count: 1 },
      { type: 'single', suit: 'any', value: 9, count: 1 },
      { type: 'pair',   suit: 'winds', value: 'E', count: 2 },
      { type: 'pair',   suit: 'winds', value: 'S', count: 2 },
    ],
    sameSuit: true,
  },
]

// ─── Pattern Matching ─────────────────────────────────────────────────────────

/**
 * Check if a tile is a joker.
 */
function isJoker(tile) {
  return tile.suit === 'joker' || tile.value === 'J'
}

/**
 * Check if a tile matches a group spec (ignoring joker wilds).
 */
function tileMatchesSpec(tile, spec) {
  if (isJoker(tile)) return false // jokers handled separately
  if (spec.suit !== 'any' && spec.suit !== tile.suit) return false
  if (spec.value !== 'any' && spec.value !== tile.value) return false
  return true
}

/**
 * Try to match tiles to a specific group spec using available tiles.
 * Returns { matched: tile[], remaining: tile[] } or null.
 * Jokers can fill in for any tile in pung/kong/quint (not pair/single).
 */
function matchGroup(spec, available) {
  const needed = spec.count
  const canUseJoker = spec.type === 'pung' || spec.type === 'kong' || spec.type === 'quint'

  // Count matching real tiles
  const matching = available.filter(t => tileMatchesSpec(t, spec))
  const jokers = available.filter(t => isJoker(t))

  if (matching.length + (canUseJoker ? jokers.length : 0) < needed) return null

  // Prefer real tiles over jokers
  const used = []
  let rem = [...available]

  // Take real matching tiles first
  for (const t of matching) {
    if (used.length >= needed) break
    used.push(t)
    rem = rem.filter(x => x.id !== t.id)
  }

  // Fill with jokers if allowed
  if (canUseJoker) {
    for (const j of jokers) {
      if (used.length >= needed) break
      if (rem.find(x => x.id === j.id)) {
        used.push(j)
        rem = rem.filter(x => x.id !== j.id)
      }
    }
  }

  if (used.length < needed) return null

  return { matched: used, remaining: rem }
}

/**
 * Generic: try to fill all groups from the hand using recursive matching.
 */
function tryMatchGroups(groups, available, groupIndex = 0) {
  if (groupIndex >= groups.length) {
    return available.length === 0
  }
  const spec = groups[groupIndex]
  const result = matchGroup(spec, available)
  if (!result) return false
  return tryMatchGroups(groups, result.remaining, groupIndex + 1)
}

/**
 * Check the 'anyPairs' hand (Seven Pairs): 7 distinct pairs from any tiles.
 * Jokers cannot be used in pairs.
 */
function checkSevenPairs(tiles) {
  const nonJokers = tiles.filter(t => !isJoker(t))
  if (nonJokers.length !== 14) return false

  // Group by suit+value
  const counts = {}
  for (const t of nonJokers) {
    const key = `${t.suit}:${t.value}`
    counts[key] = (counts[key] || 0) + 1
  }
  const pairs = Object.values(counts).filter(c => c >= 2)
  return pairs.length >= 7
}

/**
 * Check 'anyGroups' hand (flexible pungs+pair or kongs+pair):
 * Groups can be different tiles, just count-constrained.
 */
function checkAnyGroups(groups, tiles) {
  // Sort tiles into groups by suit+value key
  const counts = {}
  const jokers = tiles.filter(t => isJoker(t))
  const nonJokers = tiles.filter(t => !isJoker(t))

  for (const t of nonJokers) {
    const key = `${t.suit}:${t.value}`
    counts[key] = (counts[key] || 0) + 1
  }

  const pungSpecs  = groups.filter(g => g.type === 'pung').length
  const kongSpecs  = groups.filter(g => g.type === 'kong').length
  const pairSpecs  = groups.filter(g => g.type === 'pair').length

  let jokerPool = jokers.length
  const tileCounts = Object.values(counts)

  if (pungSpecs > 0 && pairSpecs > 0 && kongSpecs === 0) {
    // 4 pungs + 1 pair
    const triples = tileCounts.filter(c => c >= 3)
    const doubles = tileCounts.filter(c => c >= 2)
    // With jokers, we can boost tiles
    if (triples.length + jokerPool >= pungSpecs) {
      const usedJokersForPungs = Math.max(0, pungSpecs - triples.length)
      const remainingJokers = jokerPool - usedJokersForPungs
      // pair from remaining
      const usedForPungs = Math.min(triples.length, pungSpecs)
      const remainingTiles = tileCounts.slice()
      for (let i = 0; i < usedForPungs; i++) {
        const idx = remainingTiles.findIndex(c => c >= 3)
        if (idx !== -1) remainingTiles.splice(idx, 1)
      }
      return doubles.length + remainingJokers >= pairSpecs
    }
    return false
  }

  if (kongSpecs > 0 && pairSpecs > 0 && pungSpecs === 0) {
    // 3 kongs + 1 pair
    const quads = tileCounts.filter(c => c >= 4)
    if (quads.length + jokerPool >= kongSpecs) {
      const usedJokersForKongs = Math.max(0, kongSpecs - quads.length)
      const doubles = tileCounts.filter(c => c >= 2)
      return doubles.length >= pairSpecs
    }
    return false
  }

  return false
}

/**
 * Main export: given 14 tiles, return the first matching WINNING_HAND or null.
 */
export function findMatchingHand(hand14tiles) {
  if (!hand14tiles || hand14tiles.length !== 14) return null

  for (const hand of WINNING_HANDS) {
    if (hand.anyPairs) {
      if (checkSevenPairs(hand14tiles)) return hand
      continue
    }

    if (hand.anyGroups) {
      if (checkAnyGroups(hand.groups, hand14tiles)) return hand
      continue
    }

    if (hand.sameSuit) {
      // Try each number suit
      for (const suit of ['characters', 'bamboo', 'circles']) {
        const mapped = hand.groups.map(g =>
          g.suit === 'any' ? { ...g, suit } : g
        )
        if (tryMatchGroups(mapped, [...hand14tiles])) return hand
      }
      continue
    }

    if (hand.multiSuit) {
      // Groups are all 'any' suit but each must be a different suit
      // Brute-force the three suits
      const suits = ['characters', 'bamboo', 'circles']
      const permutations = [
        [suits[0], suits[1], suits[2]],
        [suits[0], suits[2], suits[1]],
        [suits[1], suits[0], suits[2]],
        [suits[1], suits[2], suits[0]],
        [suits[2], suits[0], suits[1]],
        [suits[2], suits[1], suits[0]],
      ]
      let found = false
      for (const perm of permutations) {
        let pi = 0
        const mapped = hand.groups.map(g => {
          if (g.suit === 'any') {
            return { ...g, suit: perm[pi++ % perm.length] }
          }
          return g
        })
        if (tryMatchGroups(mapped, [...hand14tiles])) {
          found = true
          break
        }
      }
      if (found) return hand
      continue
    }

    // Default: match groups literally
    if (tryMatchGroups(hand.groups, [...hand14tiles])) return hand
  }

  return null
}
