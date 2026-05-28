export const SUITS = [
  {
    id: 'characters',
    name: 'Characters',
    nickname: 'Cracks',
    emoji: '漢',
    color: '#c44b72',
    bgColor: '#fff0f6',
    description: 'Also called "Cracks." Decorated with Chinese numerals 一–九 (1–9) with a character (man/萬) beneath.',
    tip: 'Look for the Chinese number character stacked over another character.',
    tiles: [
      { id: 'c1', symbol: '🀇', value: 1, name: '1 Crack', fact: 'The 1-Crack is sometimes decorated with a bat in traditional sets — bats are lucky in Chinese culture!' },
      { id: 'c2', symbol: '🀈', value: 2, name: '2 Crack', fact: 'Characters tiles always have the 萬 (wan) character at the bottom.' },
      { id: 'c3', symbol: '🀉', value: 3, name: '3 Crack', fact: 'Three is a lucky number in Chinese culture.' },
      { id: 'c4', symbol: '🀊', value: 4, name: '4 Crack', fact: 'Four (四/sì) sounds like "death" in Chinese, so it is considered unlucky — handle with care!' },
      { id: 'c5', symbol: '🀋', value: 5, name: '5 Crack', fact: 'Five is the center of the number tiles, making it very versatile in hand-building.' },
      { id: 'c6', symbol: '🀌', value: 6, name: '6 Crack', fact: 'Six (六/liù) sounds like "smooth" in Chinese — a very auspicious tile.' },
      { id: 'c7', symbol: '🀍', value: 7, name: '7 Crack', fact: 'Seven is often considered lucky in Western culture too!' },
      { id: 'c8', symbol: '🀎', value: 8, name: '8 Crack', fact: 'Eight (八/bā) sounds like "prosperity" — one of the luckiest tiles.' },
      { id: 'c9', symbol: '🀏', value: 9, name: '9 Crack', fact: 'Nine is the highest number in Mahjong suits and often appears in advanced hands.' },
    ],
  },
  {
    id: 'bamboo',
    name: 'Bamboo',
    nickname: 'Bams',
    emoji: '🎋',
    color: '#2d6a4f',
    bgColor: '#f0fdf4',
    description: 'Also called "Bams." Depicted as green bamboo sticks — but the 1-Bam traditionally shows a colorful bird!',
    tip: 'The 1-Bam is unique: it shows a bird (sparrow or peacock). The rest show bamboo stalks.',
    tiles: [
      { id: 'b1', symbol: '🀐', value: 1, name: '1 Bam', fact: 'The 1-Bam (one bamboo) traditionally depicts a bird — often a colorful peacock or sparrow. Watch for this when learning to identify tiles!' },
      { id: 'b2', symbol: '🀑', value: 2, name: '2 Bam', fact: 'Two bamboo stalks side by side.' },
      { id: 'b3', symbol: '🀒', value: 3, name: '3 Bam', fact: 'Three is considered the first "safe" number for building sequences.' },
      { id: 'b4', symbol: '🀓', value: 4, name: '4 Bam', fact: 'Four bamboo stalks arranged in a grid pattern.' },
      { id: 'b5', symbol: '🀔', value: 5, name: '5 Bam', fact: 'The middle tile of the bamboo suit.' },
      { id: 'b6', symbol: '🀕', value: 6, name: '6 Bam', fact: 'Six bamboo stalks, very recognizable.' },
      { id: 'b7', symbol: '🀖', value: 7, name: '7 Bam', fact: 'Seven bams — a fan favorite for combinations!' },
      { id: 'b8', symbol: '🀗', value: 8, name: '8 Bam', fact: 'Eight (8) is a prosperity number in Chinese culture.' },
      { id: 'b9', symbol: '🀘', value: 9, name: '9 Bam', fact: 'Nine bamboo stalks — the highest bamboo tile.' },
    ],
  },
  {
    id: 'circles',
    name: 'Circles',
    nickname: 'Dots',
    emoji: '⭕',
    color: '#1d4ed8',
    bgColor: '#eff6ff',
    description: 'Also called "Dots." Decorated with coin-like circles in various arrangements from 1 to 9.',
    tip: 'Count the circles! They are arranged in patterns similar to dice.',
    tiles: [
      { id: 'd1', symbol: '🀙', value: 1, name: '1 Dot', fact: 'The 1-Dot shows a single large circle, sometimes with a decorative flower pattern inside.' },
      { id: 'd2', symbol: '🀚', value: 2, name: '2 Dot', fact: 'Two circles stacked vertically.' },
      { id: 'd3', symbol: '🀛', value: 3, name: '3 Dot', fact: 'Three circles in a triangle or column.' },
      { id: 'd4', symbol: '🀜', value: 4, name: '4 Dot', fact: 'Four circles in a 2×2 grid.' },
      { id: 'd5', symbol: '🀝', value: 5, name: '5 Dot', fact: 'Five circles — one in the center, four around it (like a die).' },
      { id: 'd6', symbol: '🀞', value: 6, name: '6 Dot', fact: 'Six circles in a 2×3 grid.' },
      { id: 'd7', symbol: '🀟', value: 7, name: '7 Dot', fact: 'Seven circles — a classic lucky number!' },
      { id: 'd8', symbol: '🀠', value: 8, name: '8 Dot', fact: 'Eight is especially lucky in Chinese tradition.' },
      { id: 'd9', symbol: '🀡', value: 9, name: '9 Dot', fact: 'Nine circles — the highest dot tile. Often used in "9-gate" hands.' },
    ],
  },
  {
    id: 'winds',
    name: 'Winds',
    nickname: 'Winds',
    emoji: '💨',
    color: '#92400e',
    bgColor: '#fffbeb',
    description: 'Four Wind tiles represent the compass directions. These are Honor tiles — they cannot form sequences, only groups of 3 or 4 identical tiles.',
    tip: 'Learn the Chinese characters: 東(East) 南(South) 西(West) 北(North)',
    tiles: [
      { id: 'ew', symbol: '🀀', value: 'E', name: 'East Wind', fact: 'East (東/Dong) is the most prestigious wind — the "dealer" seat is East each round.' },
      { id: 'sw', symbol: '🀁', value: 'S', name: 'South Wind', fact: 'South (南/Nan) is the second seat going clockwise from East.' },
      { id: 'ww', symbol: '🀂', value: 'W', name: 'West Wind', fact: 'West (西/Xi) is the third seat at the table.' },
      { id: 'nw', symbol: '🀃', value: 'N', name: 'North Wind', fact: 'North (北/Bei) is the fourth seat. In American Mahjong, North can be a "seat of honor"!' },
    ],
  },
  {
    id: 'dragons',
    name: 'Dragons',
    nickname: 'Dragons',
    emoji: '🐉',
    color: '#9f1239',
    bgColor: '#fff1f2',
    description: 'Three Dragon tiles are the most powerful Honor tiles. Like Winds, they only form groups — never sequences.',
    tip: 'Red Dragon has 中 (center/correct), Green Dragon has 發 (prosperity/fortune), White Dragon is blank or has 白 (white).',
    tiles: [
      { id: 'rd', symbol: '🀄', value: 'R', name: 'Red Dragon', fact: 'The Red Dragon (中/Zhong) means "center" or "correct." It\'s the most recognizable Mahjong symbol — it\'s even the default Mahjong emoji! 🀄' },
      { id: 'gd', symbol: '🀅', value: 'G', name: 'Green Dragon', fact: 'The Green Dragon (發/Fa) means "prosperity" or "to prosper." Very auspicious!' },
      { id: 'wd', symbol: '🀆', value: 'W', name: 'White Dragon', fact: 'The White Dragon (白/Bai) is often blank or shows a simple border. Some call it the "Soap" tile.' },
    ],
  },
  {
    id: 'flowers',
    name: 'Flowers',
    nickname: 'Flowers',
    emoji: '🌸',
    color: '#7e22ce',
    bgColor: '#faf5ff',
    description: 'Flower tiles are bonus tiles unique to each player\'s seat. In American Mahjong, there are 4 Flower tiles used in special hand combinations.',
    tip: 'Flowers are beautiful bonus tiles — in American Mahjong they appear on the NMJL card in specific hands.',
    tiles: [
      { id: 'f1', symbol: '🌸', value: 1, name: 'Flower 1', fact: 'Spring Flower — each flower corresponds to a season or compass direction.' },
      { id: 'f2', symbol: '🌺', value: 2, name: 'Flower 2', fact: 'Summer Flower — flowers add color and personality to tile sets!' },
      { id: 'f3', symbol: '🌹', value: 3, name: 'Flower 3', fact: 'Autumn Flower — traditionally a chrysanthemum.' },
      { id: 'f4', symbol: '🌻', value: 4, name: 'Flower 4', fact: 'Winter Flower — traditionally a plum blossom.' },
    ],
  },
  {
    id: 'jokers',
    name: 'Jokers',
    nickname: 'Jokers',
    emoji: '🃏',
    color: '#0f766e',
    bgColor: '#f0fdfa',
    description: 'Jokers are UNIQUE to American Mahjong — you won\'t find them in Asian versions! There are 8 Jokers and they are incredibly powerful wild cards.',
    tip: 'A Joker can substitute for ANY tile in a group of 3 or more — but NEVER in a pair. You can also "steal" an opponent\'s Joker if you have the real tile it represents!',
    tiles: [
      { id: 'j1', symbol: '🃏', value: 'J', name: 'Joker', fact: 'There are 8 Jokers in American Mahjong! A Joker can substitute for any tile in a Pung (3 of a kind), Kong (4 of a kind), or Quint (5 of a kind) — but NOT in a pair. You can steal an opponent\'s exposed Joker by replacing it with the real tile!' },
    ],
  },
]

export const ALL_QUIZ_TILES = SUITS.flatMap(suit =>
  suit.tiles.map(tile => ({
    ...tile,
    suit: suit.name,
    suitId: suit.id,
    suitNickname: suit.nickname,
    suitColor: suit.color,
  }))
)

export const BEGINNER_TILES = ALL_QUIZ_TILES.filter(t =>
  ['characters', 'bamboo', 'circles'].includes(t.suitId)
)

export const INTERMEDIATE_TILES = ALL_QUIZ_TILES.filter(t =>
  ['characters', 'bamboo', 'circles', 'winds', 'dragons'].includes(t.suitId)
)

export const ADVANCED_TILES = ALL_QUIZ_TILES
