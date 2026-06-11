import { useState } from 'react'
import ReadingTutor from './components/ReadingTutor.jsx'

function Header() {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-indigo-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-3xl">🦉</span>
          <div className="leading-tight">
            <div className="font-extrabold text-indigo-700 text-lg leading-none">Professor Hoot</div>
            <div className="text-xs text-indigo-400 font-semibold tracking-wide">Reading Adventure</div>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-indigo-50 border border-indigo-100 rounded-full px-4 py-1.5">
          <span className="text-yellow-400 text-sm">★</span>
          <span className="text-indigo-600 text-sm font-bold">3rd Grade Reading</span>
        </div>
      </div>
    </header>
  )
}

function Hero({ onStart }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-400 text-white">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-2xl" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/4 blur-2xl" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 py-16 md:py-24 text-center">
        <div className="text-8xl mb-4 float inline-block">🦉</div>
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight">
          Professor Hoot's<br />
          <span className="text-yellow-300">Reading Adventure!</span>
        </h1>
        <p className="text-indigo-100 text-lg md:text-xl max-w-xl mx-auto mb-8 leading-relaxed">
          Read amazing stories, answer questions, and earn stars!
          Professor Hoot will help you if you get stuck. 🌟
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {['🦋 Nature', '📚 Stories', '🐝 Science', '⭐ Space', '🐢 Fables'].map(tag => (
            <span key={tag} className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-4 py-1.5 text-sm font-semibold">
              {tag}
            </span>
          ))}
        </div>

        <button
          onClick={onStart}
          className="bg-yellow-400 hover:bg-yellow-300 text-indigo-900 font-extrabold text-xl px-10 py-4 rounded-full shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-200"
        >
          Start Reading! →
        </button>

        {/* Stats row */}
        <div className="flex flex-wrap justify-center gap-8 mt-12 text-center">
          {[
            { num: '8', label: 'Fun Passages' },
            { num: '40', label: 'Questions' },
            { num: '3', label: 'Difficulty Levels' },
          ].map(s => (
            <div key={s.label}>
              <div className="text-3xl font-extrabold text-yellow-300">{s.num}</div>
              <div className="text-indigo-200 text-sm font-semibold">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function HowItWorks() {
  const steps = [
    { emoji: '📖', title: 'Read the Passage', desc: 'Read a short story or article carefully. Take your time!' },
    { emoji: '🎯', title: 'Answer Questions', desc: 'Choose the best answer for each multiple-choice question.' },
    { emoji: '🦉', title: 'Get Help', desc: "Got one wrong? Professor Hoot explains why with a helpful hint!" },
    { emoji: '🌟', title: 'Earn Stars', desc: 'Collect stars for every correct answer and see your score!' },
  ]

  return (
    <section className="bg-white py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-indigo-700 mb-10">How It Works</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {steps.map((s, i) => (
            <div key={i} className="text-center bg-indigo-50 rounded-2xl p-6 border border-indigo-100">
              <div className="text-5xl mb-3">{s.emoji}</div>
              <div className="text-xs font-bold text-indigo-400 mb-1">STEP {i + 1}</div>
              <h3 className="font-extrabold text-indigo-800 mb-2">{s.title}</h3>
              <p className="text-indigo-500 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="bg-indigo-900 text-indigo-300 text-center py-8 px-4">
      <div className="text-3xl mb-2">🦉</div>
      <p className="font-bold text-white mb-1">Professor Hoot's Reading Adventure</p>
      <p className="text-sm">Building better readers, one story at a time. ⭐</p>
    </footer>
  )
}

export default function App() {
  const [started, setStarted] = useState(false)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {!started && <Hero onStart={() => setStarted(true)} />}
        {!started && <HowItWorks />}
        <ReadingTutor autoStart={started} />
      </main>
      <Footer />
    </div>
  )
}
