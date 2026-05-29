/**
 * GameLobby — pre-game screen.
 * Props: { onStartGame: (playerName) => void }
 */
import { useState } from 'react'

const AI_PLAYERS = [
  { name: 'Amy', seat: 'East', emoji: '🌸' },
  { name: 'Betty', seat: 'North', emoji: '🌺' },
  { name: 'Carol', seat: 'West', emoji: '🌹' },
]

export default function GameLobby({ onStartGame }) {
  const [name, setName] = useState('You')

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-3xl shadow-xl border border-emerald-200 overflow-hidden">
        {/* Header */}
        <div className="bg-emerald-800 px-8 py-6 text-center">
          <div className="text-5xl mb-2">🀄</div>
          <h3 className="font-display text-2xl font-bold text-white">Play Mahjong</h3>
          <p className="text-emerald-300 text-sm mt-1">American NMJL Rules • 4 Players</p>
        </div>

        <div className="px-8 py-6">
          {/* Player name input */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-emerald-700 mb-2">Your Name</label>
            <input
              className="w-full px-4 py-3 border-2 border-emerald-200 rounded-xl focus:outline-none focus:border-emerald-400 text-emerald-900 placeholder-emerald-300 transition-colors"
              value={name}
              onChange={e => setName(e.target.value || 'You')}
              placeholder="Enter your name"
              maxLength={20}
            />
          </div>

          {/* AI opponents */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-emerald-700 mb-3">Your Opponents</h4>
            <div className="grid grid-cols-3 gap-3">
              {AI_PLAYERS.map(ai => (
                <div key={ai.name} className="bg-emerald-50 rounded-xl p-3 text-center border border-emerald-200">
                  <div className="text-2xl mb-1">{ai.emoji}</div>
                  <div className="font-semibold text-emerald-800 text-sm">{ai.name}</div>
                  <div className="text-xs text-emerald-500">{ai.seat}</div>
                  <span className="inline-block mt-1 px-2 py-0.5 bg-emerald-600 text-white text-xs rounded-full font-bold">AI</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick rules */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
            <h4 className="font-semibold text-amber-800 text-sm mb-2">Quick Rules</h4>
            <ul className="text-xs text-amber-700 space-y-1">
              <li>• <strong>Charleston:</strong> Pass 3 tiles right → across → left</li>
              <li>• <strong>Draw & Discard:</strong> Take from wall, discard unwanted tiles</li>
              <li>• <strong>Claim:</strong> Take a discard for Pung (3) or Kong (4)</li>
              <li>• <strong>Jokers:</strong> Wild in pungs/kongs — steal them with the real tile!</li>
              <li>• <strong>Win:</strong> Complete one of the NMJL hand patterns</li>
            </ul>
          </div>

          {/* Start button */}
          <button
            className="w-full bg-emerald-600 text-white font-bold py-4 rounded-2xl text-lg hover:bg-emerald-700 active:bg-emerald-800 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            onClick={() => onStartGame(name.trim() || 'You')}
          >
            Deal Me In! 🌸
          </button>
        </div>
      </div>
    </div>
  )
}
