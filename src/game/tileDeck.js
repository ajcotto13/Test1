import { SUITS } from '../data/tiles.js'

// Build tile reference maps from existing SUITS data
const suitMap = {}
SUITS.forEach(suit => {
  suitMap[suit.id] = suit
})

function getTileRef(suitId, valueId) {
  const suit = suitMap[suitId]
  if (!suit) return null
  return suit.tiles.find(t => t.value === valueId || t.id === valueId) || null
}

/**
 * Generate a full 152-tile American Mahjong deck.
 * Returns array of tile objects: { id, suit, value, symbol, name }
 */
export function generateDeck() {
  const tiles = []
  let counter = 0

  function addTiles(suitId, value, symbol, name, copies) {
    for (let i = 0; i < copies; i++) {
      tiles.push({
        id: `${suitId}-${value}-${i}-${counter++}`,
        suit: suitId,
        value,
        symbol,
        name,
      })
    }
  }

  // Characters 1–9 × 4
  const charSuit = suitMap['characters']
  charSuit.tiles.forEach(t => addTiles('characters', t.value, t.symbol, t.name, 4))

  // Bamboo 1–9 × 4
  const bamSuit = suitMap['bamboo']
  bamSuit.tiles.forEach(t => addTiles('bamboo', t.value, t.symbol, t.name, 4))

  // Circles 1–9 × 4
  const dotSuit = suitMap['circles']
  dotSuit.tiles.forEach(t => addTiles('circles', t.value, t.symbol, t.name, 4))

  // Winds × 4 each
  const windSuit = suitMap['winds']
  windSuit.tiles.forEach(t => addTiles('winds', t.value, t.symbol, t.name, 4))

  // Dragons × 4 each
  const dragonSuit = suitMap['dragons']
  dragonSuit.tiles.forEach(t => addTiles('dragons', t.value, t.symbol, t.name, 4))

  // Flowers × 2 each (F1–F4)
  const flowerSuit = suitMap['flowers']
  flowerSuit.tiles.forEach(t => addTiles('flowers', t.value, t.symbol, t.name, 2))

  // Jokers × 8
  for (let i = 0; i < 8; i++) {
    tiles.push({
      id: `joker-J-${i}-${counter++}`,
      suit: 'joker',
      value: 'J',
      symbol: '🃏',
      name: 'Joker',
    })
  }

  return shuffleDeck(tiles)
}

/**
 * Fisher-Yates shuffle — returns a new array.
 */
export function shuffleDeck(deck) {
  const arr = [...deck]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}
