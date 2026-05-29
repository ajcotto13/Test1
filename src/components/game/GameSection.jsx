import { useState } from 'react'
import GameLobby from './GameLobby.jsx'
import GameBoard from './GameBoard.jsx'

export default function GameSection() {
  const [gameStarted, setGameStarted] = useState(false)
  const [playerName, setPlayerName] = useState('You')

  return (
    <section id="play" className="py-20 bg-emerald-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="badge bg-emerald-700 text-emerald-200 mb-4">Play Now</div>
          <h2 className="font-display text-4xl font-bold text-white mb-3">Play American Mahjong</h2>
          <p className="text-emerald-300">Practice against 3 AI opponents — American NMJL rules</p>
        </div>
        {!gameStarted
          ? <GameLobby onStartGame={(name) => { setPlayerName(name); setGameStarted(true) }} />
          : <GameBoard playerName={playerName} onQuit={() => setGameStarted(false)} />
        }
      </div>
    </section>
  )
}
