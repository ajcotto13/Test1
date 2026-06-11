import { useState } from 'react'
import { PASSAGES } from '../data/readingPassages.js'

const SCREEN = { SELECT: 'select', READING: 'reading', QUIZ: 'quiz', RESULTS: 'results' }
const TOPIC_COLORS = {
  Science: 'bg-blue-100 text-blue-700',
  Fiction: 'bg-purple-100 text-purple-700',
  Fable: 'bg-amber-100 text-amber-700',
}

function DifficultyStars({ count }) {
  return (
    <span className="flex gap-0.5">
      {[1, 2, 3].map(n => (
        <span key={n} className={n <= count ? 'text-yellow-400' : 'text-gray-200'}>★</span>
      ))}
    </span>
  )
}

function PassageCard({ passage, onSelect }) {
  return (
    <button
      onClick={() => onSelect(passage)}
      className="group bg-white rounded-2xl shadow-md border-2 border-transparent hover:border-indigo-300 hover:shadow-xl transition-all duration-200 p-6 text-left w-full"
    >
      <div className="text-5xl mb-3">{passage.emoji}</div>
      <div className="flex items-center gap-2 mb-2">
        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${TOPIC_COLORS[passage.topic] || 'bg-gray-100 text-gray-600'}`}>
          {passage.topic}
        </span>
        <DifficultyStars count={passage.difficulty} />
      </div>
      <h3 className="font-bold text-gray-800 text-lg mb-1 group-hover:text-indigo-600 transition-colors">
        {passage.title}
      </h3>
      <p className="text-gray-500 text-sm leading-relaxed">{passage.description}</p>
      <div className="mt-4 text-indigo-500 font-semibold text-sm group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
        Start Reading →
      </div>
    </button>
  )
}

function SelectScreen({ onSelect }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {PASSAGES.map(p => (
        <PassageCard key={p.id} passage={p} onSelect={onSelect} />
      ))}
    </div>
  )
}

function ReadingScreen({ passage, onReady, onBack }) {
  return (
    <div className="max-w-3xl mx-auto">
      <button onClick={onBack} className="flex items-center gap-2 text-indigo-500 hover:text-indigo-700 font-semibold mb-6 transition-colors">
        ← Back to stories
      </button>
      <div className="bg-white rounded-2xl shadow-lg border border-indigo-100 overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-500 px-8 py-6 text-white">
          <div className="flex items-center gap-3 mb-1">
            <span className={`text-xs font-bold px-2 py-0.5 rounded-full bg-white/20`}>{passage.topic}</span>
            <span className="flex gap-0.5 text-yellow-300">
              {[1,2,3].map(n => <span key={n} className={n <= passage.difficulty ? '' : 'opacity-30'}>★</span>)}
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
            <span>{passage.emoji}</span>
            {passage.title}
          </h2>
        </div>
        <div className="px-8 py-6">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-6 flex items-center gap-2 text-amber-700 text-sm font-medium">
            <span>💡</span> Tip: Read carefully! You'll answer {passage.questions.length} questions about this passage.
          </div>
          {passage.passage.split('\n\n').map((para, i) => (
            <p key={i} className="text-gray-700 text-lg leading-relaxed mb-5 indent-8">{para}</p>
          ))}
        </div>
        <div className="px-8 pb-8 flex justify-center">
          <button
            onClick={onReady}
            className="bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 text-white font-bold px-10 py-4 rounded-full text-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
          >
            I'm Ready for Questions! 🎯
          </button>
        </div>
      </div>
    </div>
  )
}

const OPTION_LABELS = ['A', 'B', 'C', 'D']

function QuizScreen({ passage, onFinish }) {
  const [qIndex, setQIndex] = useState(0)
  const [selected, setSelected] = useState(null)
  const [score, setScore] = useState(0)
  const [shake, setShake] = useState(false)

  const question = passage.questions[qIndex]
  const total = passage.questions.length
  const isCorrect = selected === question.correct
  const isLast = qIndex === total - 1

  const handleSelect = (idx) => {
    if (selected !== null) return
    setSelected(idx)
    if (idx === question.correct) {
      setScore(s => s + 1)
    } else {
      setShake(true)
      setTimeout(() => setShake(false), 500)
    }
  }

  const handleNext = () => {
    if (isLast) {
      onFinish(isCorrect ? score + 1 : score)
    } else {
      setQIndex(q => q + 1)
      setSelected(null)
      setShake(false)
    }
  }

  const optionClass = (idx) => {
    const base = 'w-full text-left px-5 py-4 rounded-xl border-2 font-semibold text-base transition-all duration-200 flex items-start gap-3'
    if (selected === null) {
      return `${base} bg-white border-gray-200 hover:border-indigo-400 hover:bg-indigo-50 hover:shadow-md cursor-pointer`
    }
    if (idx === question.correct) {
      return `${base} bg-green-50 border-green-400 text-green-800`
    }
    if (idx === selected && idx !== question.correct) {
      return `${base} bg-red-50 border-red-400 text-red-700`
    }
    return `${base} bg-white border-gray-100 text-gray-400 cursor-default`
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-semibold text-gray-500">
            {passage.emoji} {passage.title}
          </span>
          <span className="text-sm font-bold text-indigo-600">
            Question {qIndex + 1} of {total}
          </span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-3">
          <div
            className="bg-indigo-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${((qIndex) / total) * 100}%` }}
          />
        </div>
      </div>

      {/* Question card */}
      <div className={`bg-white rounded-2xl shadow-lg border border-indigo-100 overflow-hidden ${shake ? 'shake' : ''}`}>
        <div className="bg-indigo-50 px-6 py-5 border-b border-indigo-100">
          <p className="text-gray-800 text-xl font-semibold leading-relaxed">{question.question}</p>
        </div>
        <div className="p-6 space-y-3">
          {question.options.map((opt, idx) => (
            <button key={idx} onClick={() => handleSelect(idx)} disabled={selected !== null} className={optionClass(idx)}>
              <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
                ${selected === null ? 'bg-indigo-100 text-indigo-600' :
                  idx === question.correct ? 'bg-green-500 text-white' :
                  idx === selected ? 'bg-red-400 text-white' :
                  'bg-gray-100 text-gray-400'
                }`}>
                {OPTION_LABELS[idx]}
              </span>
              <span className="pt-0.5">{opt}</span>
              {selected !== null && idx === question.correct && <span className="ml-auto">✓</span>}
              {selected !== null && idx === selected && idx !== question.correct && <span className="ml-auto">✗</span>}
            </button>
          ))}
        </div>

        {/* Feedback */}
        {selected !== null && (
          <div className={`mx-6 mb-6 rounded-xl p-5 ${isCorrect ? 'bg-green-50 border-2 border-green-300' : 'bg-amber-50 border-2 border-amber-300'}`}>
            {isCorrect ? (
              <div className="flex items-start gap-3">
                <span className="text-3xl">🌟</span>
                <div>
                  <p className="font-bold text-green-700 text-lg">Excellent work!</p>
                  <p className="text-green-600 text-sm mt-1">You got it right! Keep going — you're doing great!</p>
                </div>
              </div>
            ) : (
              <div className="flex items-start gap-3">
                <span className="text-4xl">🦉</span>
                <div>
                  <p className="font-bold text-amber-800 text-base mb-2">Professor Hoot says:</p>
                  <p className="text-amber-700 text-sm leading-relaxed">{question.explanation}</p>
                </div>
              </div>
            )}
          </div>
        )}

        {selected !== null && (
          <div className="px-6 pb-6 flex justify-end">
            <button
              onClick={handleNext}
              className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold px-8 py-3 rounded-full shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
            >
              {isLast ? 'See My Score! 🏆' : 'Next Question →'}
            </button>
          </div>
        )}
      </div>

      {/* Score tracker */}
      <div className="mt-4 text-center text-sm text-gray-400">
        Score so far: {score} / {qIndex + (selected !== null ? 1 : 0)} ⭐
      </div>
    </div>
  )
}

function ResultsScreen({ passage, score, onRetry, onSelectNew }) {
  const total = passage.questions.length
  const pct = Math.round((score / total) * 100)

  const getMessage = () => {
    if (pct === 100) return { emoji: '🏆', title: 'Perfect Score!', msg: "Wow, you got every single answer right! You're a reading superstar! Professor Hoot is so proud of you!" }
    if (pct >= 80) return { emoji: '🌟', title: 'Fantastic Job!', msg: "You did really well! You clearly read carefully. Try it again to see if you can get a perfect score!" }
    if (pct >= 60) return { emoji: '👍', title: 'Good Effort!', msg: "You're doing great! Reading takes practice. Try reading the passage again and look for the answers in the text." }
    return { emoji: '📖', title: 'Keep Practicing!', msg: "Every great reader started right where you are! Try reading the passage one more time slowly — the answers are all there!" }
  }

  const { emoji, title, msg } = getMessage()
  const stars = score

  return (
    <div className="max-w-lg mx-auto text-center">
      <div className="bg-white rounded-2xl shadow-xl border border-indigo-100 overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-500 px-8 py-8 text-white">
          <div className="text-7xl mb-3">{emoji}</div>
          <h2 className="text-3xl font-bold mb-1">{title}</h2>
          <p className="text-indigo-100 text-sm">{passage.emoji} {passage.title}</p>
        </div>

        <div className="px-8 py-6">
          {/* Score display */}
          <div className="bg-indigo-50 rounded-2xl p-6 mb-6">
            <div className="text-5xl font-bold text-indigo-600 mb-1">
              {score}<span className="text-gray-300 text-3xl">/{total}</span>
            </div>
            <div className="flex justify-center gap-1 my-2">
              {Array.from({ length: total }).map((_, i) => (
                <span key={i} className={`text-2xl ${i < stars ? 'text-yellow-400' : 'text-gray-200'}`}>★</span>
              ))}
            </div>
            <p className="text-indigo-400 font-semibold">{pct}% Correct</p>
          </div>

          {/* Professor Hoot message */}
          <div className="flex items-start gap-3 bg-amber-50 rounded-xl p-4 mb-6 text-left">
            <span className="text-3xl">🦉</span>
            <div>
              <p className="font-bold text-amber-800 text-sm mb-1">Professor Hoot says:</p>
              <p className="text-amber-700 text-sm leading-relaxed">{msg}</p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={onRetry}
              className="flex-1 bg-indigo-500 hover:bg-indigo-600 text-white font-bold px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-200"
            >
              Try Again 🔄
            </button>
            <button
              onClick={onSelectNew}
              className="flex-1 bg-white border-2 border-indigo-300 text-indigo-600 hover:bg-indigo-50 font-bold px-6 py-3 rounded-full transition-all duration-200"
            >
              New Story 📚
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ReadingTutor({ autoStart = false }) {
  const [screen, setScreen] = useState(SCREEN.SELECT)
  const [passage, setPassage] = useState(null)
  const [finalScore, setFinalScore] = useState(0)

  const handleSelect = (p) => {
    setPassage(p)
    setScreen(SCREEN.READING)
  }

  const handleReady = () => setScreen(SCREEN.QUIZ)

  const handleFinish = (score) => {
    setFinalScore(score)
    setScreen(SCREEN.RESULTS)
  }

  const handleRetry = () => setScreen(SCREEN.READING)

  const handleSelectNew = () => {
    setPassage(null)
    setScreen(SCREEN.SELECT)
  }

  return (
    <section id="reading-tutor" className="py-16 bg-gradient-to-b from-indigo-50 to-white min-h-[60vh]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {screen === SCREEN.SELECT && (
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-indigo-700 mb-3">
              Choose Your Story!
            </h2>
            <p className="text-indigo-400 text-lg max-w-xl mx-auto">
              Pick a passage, read carefully, then answer the questions.
            </p>
            <div className="flex flex-wrap justify-center gap-3 mt-3 text-sm text-indigo-300 font-semibold">
              <span>⭐ = Easy</span>
              <span>⭐⭐ = Medium</span>
              <span>⭐⭐⭐ = Challenge</span>
            </div>
          </div>
        )}

        {screen === SCREEN.SELECT && <SelectScreen onSelect={handleSelect} />}
        {screen === SCREEN.READING && passage && (
          <ReadingScreen passage={passage} onReady={handleReady} onBack={handleSelectNew} />
        )}
        {screen === SCREEN.QUIZ && passage && (
          <QuizScreen passage={passage} onFinish={handleFinish} />
        )}
        {screen === SCREEN.RESULTS && passage && (
          <ResultsScreen
            passage={passage}
            score={finalScore}
            onRetry={handleRetry}
            onSelectNew={handleSelectNew}
          />
        )}
      </div>
    </section>
  )
}
