import { useState } from 'react'
import { SUITS } from '../data/tiles.js'

function TileCard({ tile, suitColor }) {
  const [showFact, setShowFact] = useState(false)

  return (
    <div
      className="tile-card cursor-pointer"
      onClick={() => setShowFact(!showFact)}
      title={tile.name}
    >
      <div className="tile-inner bg-white border-2 border-rose-100 rounded-xl p-3 text-center shadow-sm hover:shadow-md transition-all hover:border-rose-300">
        <div className="text-4xl mb-1 leading-none">{tile.symbol}</div>
        <div className="text-xs font-semibold text-rose-600">{tile.name}</div>
        {showFact && (
          <div className="mt-2 text-xs text-rose-500 leading-relaxed bg-rose-50 rounded-lg p-2 text-left pop-in">
            {tile.fact}
          </div>
        )}
      </div>
    </div>
  )
}

export default function TileGuide() {
  const [activeSuit, setActiveSuit] = useState('all')
  const [expandedSuit, setExpandedSuit] = useState(null)

  const displaySuits = activeSuit === 'all'
    ? SUITS
    : SUITS.filter(s => s.id === activeSuit)

  return (
    <div>
      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        <button
          onClick={() => setActiveSuit('all')}
          className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
            activeSuit === 'all'
              ? 'bg-rose-500 text-white shadow-md'
              : 'bg-white border border-rose-200 text-rose-600 hover:bg-rose-50'
          }`}
        >
          All Tiles
        </button>
        {SUITS.map(suit => (
          <button
            key={suit.id}
            onClick={() => setActiveSuit(suit.id)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all flex items-center gap-1.5 ${
              activeSuit === suit.id
                ? 'bg-rose-500 text-white shadow-md'
                : 'bg-white border border-rose-200 text-rose-600 hover:bg-rose-50'
            }`}
          >
            <span>{suit.emoji}</span>
            {suit.name}
          </button>
        ))}
      </div>

      <p className="text-center text-rose-500 text-sm mb-8 italic">
        💡 Click any tile to learn a fun fact about it!
      </p>

      {/* Suit sections */}
      <div className="space-y-8">
        {displaySuits.map(suit => (
          <div
            key={suit.id}
            className="card overflow-hidden"
          >
            {/* Suit header */}
            <button
              className="w-full flex items-center justify-between p-5 hover:bg-rose-50 transition-colors text-left"
              onClick={() => setExpandedSuit(expandedSuit === suit.id ? null : suit.id)}
            >
              <div className="flex items-center gap-3">
                <span
                  className="w-10 h-10 rounded-full flex items-center justify-center text-xl"
                  style={{ backgroundColor: suit.bgColor }}
                >
                  {suit.emoji}
                </span>
                <div>
                  <div className="font-display font-bold text-rose-900 text-lg">
                    {suit.name}
                    <span className="text-rose-400 font-normal text-sm ml-2">"{suit.nickname}"</span>
                  </div>
                  <div className="text-rose-500 text-sm">{suit.tiles.length} tiles</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className="hidden sm:block badge text-xs font-bold"
                  style={{ backgroundColor: suit.bgColor, color: suit.color }}
                >
                  {suit.nickname}
                </span>
                <span className="text-rose-400 text-lg">
                  {expandedSuit === suit.id ? '▲' : '▼'}
                </span>
              </div>
            </button>

            {/* Expanded content */}
            {(expandedSuit === suit.id || activeSuit !== 'all') && (
              <div className="px-5 pb-5 border-t border-rose-100">
                <p className="text-rose-600 text-sm leading-relaxed my-4">{suit.description}</p>
                <div
                  className="text-sm rounded-xl p-3 mb-5 flex gap-2 items-start"
                  style={{ backgroundColor: suit.bgColor }}
                >
                  <span>💡</span>
                  <span style={{ color: suit.color }} className="font-medium">{suit.tip}</span>
                </div>

                {/* Tile grid */}
                <div className="flex flex-wrap gap-3">
                  {suit.tiles.map(tile => (
                    <TileCard key={tile.id} tile={tile} suitColor={suit.color} />
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
