import { useState } from 'react'
import TileGuide from './TileGuide.jsx'
import TileQuiz from './TileQuiz.jsx'
import { HOW_TO_PLAY, GLOSSARY } from '../data/content.js'

const TABS = [
  { id: 'tiles', label: '🎴 Tile Guide' },
  { id: 'howto', label: '📖 How to Play' },
  { id: 'quiz', label: '🎯 Tile Quiz' },
  { id: 'glossary', label: '📚 Glossary' },
]

function HowToPlay() {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <p className="text-rose-600">
          American Mahjong has a few twists on the classic game — most importantly the{' '}
          <strong>Charleston</strong> and the{' '}
          <strong>NMJL card</strong>. Here's the full flow from setup to Mahjong!
        </p>
      </div>
      <div className="space-y-4">
        {HOW_TO_PLAY.map((step, i) => (
          <div key={i} className="card p-6 flex gap-4 items-start">
            <div className="flex-shrink-0 w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center">
              <span className="text-xl">{step.emoji}</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="badge bg-rose-500 text-white text-xs">Step {step.step}</span>
                <h4 className="font-display font-bold text-rose-900">{step.title}</h4>
              </div>
              <p className="text-rose-700 text-sm leading-relaxed">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 bg-gradient-to-r from-rose-100 to-rose-50 rounded-2xl p-6 border border-rose-200">
        <div className="flex items-start gap-3">
          <span className="text-2xl">💡</span>
          <div>
            <h4 className="font-bold text-rose-800 mb-1">The biggest American Mahjong difference?</h4>
            <p className="text-rose-700 text-sm leading-relaxed">
              Unlike Asian Mahjong variants, American Mahjong uses an annual NMJL card with specific winning hands that change every year, includes Joker tiles (wild cards!), and always starts with the Charleston tile-passing ritual. These three things make American Mahjong uniquely strategic and exciting!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function Glossary() {
  const [search, setSearch] = useState('')
  const filtered = GLOSSARY.filter(
    g => g.term.toLowerCase().includes(search.toLowerCase()) ||
         g.definition.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search terms... (try 'Joker', 'Charleston', 'Pung')"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="form-input"
        />
      </div>
      <div className="space-y-3">
        {filtered.map((item, i) => (
          <div key={i} className="card p-5 flex gap-4">
            <div className="flex-shrink-0 w-2 bg-rose-400 rounded-full" />
            <div>
              <h4 className="font-display font-bold text-rose-900 mb-1">{item.term}</h4>
              <p className="text-rose-600 text-sm leading-relaxed">{item.definition}</p>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-8 text-rose-400">
            <div className="text-3xl mb-2">🔍</div>
            <p>No terms matching "{search}" — try a different word!</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default function LearningHub() {
  const [activeTab, setActiveTab] = useState('tiles')

  return (
    <section id="learn" className="py-20 bg-blush">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <div className="badge bg-rose-200 text-rose-700 mb-4">Learning Hub</div>
          <h2 className="section-heading">
            Everything you need to{' '}
            <span className="text-rose-500 italic">master Mahjong</span>
          </h2>
          <p className="section-subheading">
            From your very first tile to your first Mahjong — we've got you covered with guides, rules, and interactive practice.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-3 rounded-full font-semibold text-sm transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-rose-500 text-white shadow-lg scale-105'
                  : 'bg-white text-rose-600 border border-rose-200 hover:bg-rose-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="min-h-64">
          {activeTab === 'tiles' && <TileGuide />}
          {activeTab === 'howto' && <HowToPlay />}
          {activeTab === 'quiz' && <TileQuiz />}
          {activeTab === 'glossary' && <Glossary />}
        </div>
      </div>
    </section>
  )
}
