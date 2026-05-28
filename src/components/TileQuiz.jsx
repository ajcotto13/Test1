import { useState, useCallback } from 'react'
import { BEGINNER_TILES, INTERMEDIATE_TILES, ADVANCED_TILES } from '../data/tiles.js'

const LEVELS = [
  {
    id: 'beginner',
    label: '🌱 Beginner',
    description: 'Characters, Bamboo & Circles only',
    tiles: BEGINNER_TILES,
    color: 'bg-green-500',
  },
  {
    id: 'intermediate',
    label: '🎯 Intermediate',
    description: 'All suits including Winds & Dragons',
    tiles: INTERMEDIATE_TILES,
    color: 'bg-amber-500',
  },
  {
    id: 'advanced',
    label: '🏆 Advanced',
    description: 'Everything including Flowers & Jokers',
    tiles: ADVANCED_TILES,
    color: 'bg-rose-500',
  },
]

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function getOptions(correct, pool) {
  const others = pool.filter(t => t.id !== correct.id)
  const wrong = shuffle(others).slice(0, 3)
  return shuffle([correct, ...wrong])
}

const TOTAL_QUESTIONS = 10

export default function TileQuiz() {
  const [level, setLevel] = useState(null)
  const [questions, setQuestions] = useState([])
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState(null)
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [bestStreak, setBestStreak] = useState(0)
  const [phase, setPhase] = useState('select') // select | quiz | result
  const [animation, setAnimation] = useState('')

  const startQuiz = useCallback((lvl) => {
    const pool = lvl.tiles
    const qs = shuffle(pool).slice(0, Math.min(TOTAL_QUESTIONS, pool.length)).map(tile => ({
      tile,
      options: getOptions(tile, pool),
    }))
    setLevel(lvl)
    setQuestions(qs)
    setCurrent(0)
    setSelected(null)
    setScore(0)
    setStreak(0)
    setBestStreak(0)
    setPhase('quiz')
    setAnimation('')
  }, [])

  const handleAnswer = useCallback((option) => {
    if (selected) return
    setSelected(option)
    const correct = questions[current].tile
    if (option.id === correct.id) {
      setScore(s => s + 1)
      setStreak(s => {
        const next = s + 1
        setBestStreak(b => Math.max(b, next))
        return next
      })
      setAnimation('celebrate')
    } else {
      setStreak(0)
      setAnimation('shake')
    }
    setTimeout(() => {
      setAnimation('')
      if (current + 1 >= questions.length) {
        setPhase('result')
      } else {
        setCurrent(c => c + 1)
        setSelected(null)
      }
    }, 1200)
  }, [selected, questions, current])

  const pct = questions.length ? Math.round((score / questions.length) * 100) : 0

  if (phase === 'select') {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">🎯</div>
          <h3 className="font-display text-2xl font-bold text-rose-900 mb-2">Tile Recognition Quiz</h3>
          <p className="text-rose-600">Test your knowledge! Choose a difficulty to begin.</p>
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          {LEVELS.map(lvl => (
            <button
              key={lvl.id}
              onClick={() => startQuiz(lvl)}
              className="card p-6 text-center hover:scale-105 transition-transform active:scale-95"
            >
              <div className="text-3xl mb-3">{lvl.label.split(' ')[0]}</div>
              <div className="font-display font-bold text-rose-900 mb-1">
                {lvl.label.split(' ').slice(1).join(' ')}
              </div>
              <div className="text-rose-500 text-xs">{lvl.description}</div>
              <div className="mt-4">
                <span className={`badge text-white text-xs ${lvl.color}`}>
                  {lvl.tiles.length} tiles
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    )
  }

  if (phase === 'result') {
    const msg = pct >= 90 ? { emoji: '🏆', text: 'Mahjong Master!', sub: 'Incredible score!' }
      : pct >= 70 ? { emoji: '🎉', text: 'Great Job!', sub: 'You\'re getting there!' }
      : pct >= 50 ? { emoji: '🌸', text: 'Nice Try!', sub: 'A bit more practice and you\'ll crush it.' }
      : { emoji: '💪', text: 'Keep Practicing!', sub: 'Review the Tile Guide and try again!' }

    return (
      <div className="max-w-md mx-auto text-center">
        <div className="card p-8">
          <div className="text-6xl mb-4">{msg.emoji}</div>
          <h3 className="font-display text-3xl font-bold text-rose-900 mb-2">{msg.text}</h3>
          <p className="text-rose-600 mb-6">{msg.sub}</p>

          <div className="bg-rose-50 rounded-2xl p-6 mb-6 grid grid-cols-3 gap-4">
            <div>
              <div className="font-display text-3xl font-bold text-rose-600">{score}/{questions.length}</div>
              <div className="text-rose-400 text-xs font-medium">Score</div>
            </div>
            <div>
              <div className="font-display text-3xl font-bold text-rose-600">{pct}%</div>
              <div className="text-rose-400 text-xs font-medium">Accuracy</div>
            </div>
            <div>
              <div className="font-display text-3xl font-bold text-rose-600">{bestStreak}</div>
              <div className="text-rose-400 text-xs font-medium">Best Streak</div>
            </div>
          </div>

          <div className="flex gap-3 justify-center flex-wrap">
            <button
              onClick={() => startQuiz(level)}
              className="btn-primary"
            >
              Play Again 🎯
            </button>
            <button
              onClick={() => setPhase('select')}
              className="btn-secondary"
            >
              Change Level
            </button>
          </div>
        </div>
      </div>
    )
  }

  const q = questions[current]
  const correct = q.tile

  return (
    <div className="max-w-xl mx-auto">
      {/* Progress bar */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex-1 bg-rose-100 rounded-full h-2">
          <div
            className="bg-rose-400 h-2 rounded-full transition-all duration-500"
            style={{ width: `${((current + 1) / questions.length) * 100}%` }}
          />
        </div>
        <span className="text-rose-500 text-sm font-semibold whitespace-nowrap">
          {current + 1} / {questions.length}
        </span>
      </div>

      {/* Score/streak bar */}
      <div className="flex gap-4 mb-6 justify-center text-sm">
        <span className="bg-rose-100 text-rose-600 rounded-full px-3 py-1 font-semibold">
          ✅ {score} correct
        </span>
        {streak >= 2 && (
          <span className="bg-amber-100 text-amber-600 rounded-full px-3 py-1 font-semibold animate-pulse">
            🔥 {streak} streak!
          </span>
        )}
      </div>

      {/* Question card */}
      <div className={`card p-8 text-center mb-6 ${animation}`}>
        <p className="text-rose-500 text-sm font-semibold mb-4">What tile is this?</p>
        <div className="text-8xl mb-2 leading-none">{correct.symbol}</div>
        <div className="text-rose-400 text-xs mt-2">
          Tap an answer below
        </div>
      </div>

      {/* Options */}
      <div className="grid grid-cols-2 gap-3">
        {q.options.map(option => {
          let style = 'bg-white border-2 border-rose-200 hover:border-rose-400 hover:bg-rose-50 text-rose-800'
          if (selected) {
            if (option.id === correct.id) {
              style = 'bg-green-100 border-2 border-green-400 text-green-800'
            } else if (option.id === selected.id && option.id !== correct.id) {
              style = 'bg-red-100 border-2 border-red-400 text-red-800'
            } else {
              style = 'bg-white border-2 border-rose-100 text-rose-400 opacity-60'
            }
          }

          return (
            <button
              key={option.id}
              onClick={() => handleAnswer(option)}
              disabled={!!selected}
              className={`p-4 rounded-2xl text-left transition-all duration-200 ${style} ${!selected ? 'active:scale-95' : ''}`}
            >
              <div className="text-2xl mb-1">{option.symbol}</div>
              <div className="font-semibold text-sm leading-tight">{option.name}</div>
              <div className="text-xs opacity-70">{option.suit || option.suitNickname}</div>
              {selected && option.id === correct.id && (
                <div className="mt-2 text-xs text-green-700 leading-relaxed italic">
                  {correct.fact}
                </div>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
