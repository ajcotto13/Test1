import { useState, useEffect } from 'react'
import { SEED_COMMUNITY_POSTS } from '../data/content.js'

const SKILL_LEVELS = ['Complete Beginner', 'Played a Little', 'Intermediate', 'Advanced', 'Expert']
const HOW_HEARD = ['Instagram', 'Facebook', 'Friend/Word of Mouth', 'Google Search', 'Houston Event', 'Other']
const CATEGORIES = ['Tips & Tricks', 'Rules Questions', 'Show & Tell', 'Upcoming Games', 'General Chat']

function loadPosts() {
  try {
    const saved = localStorage.getItem('amahjing_posts')
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

function savePosts(posts) {
  try {
    localStorage.setItem('amahjing_posts', JSON.stringify(posts))
  } catch {}
}

function PostCard({ post }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="card p-5">
      <div className="flex items-start gap-3 mb-3">
        <span className="text-2xl">{post.avatar || '👤'}</span>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="font-bold text-rose-900 text-sm">{post.author}</span>
            <span className="badge bg-rose-100 text-rose-500 text-xs">{post.category}</span>
            <span className="text-rose-300 text-xs">{post.time}</span>
          </div>
          <h4 className="font-display font-semibold text-rose-800">{post.title}</h4>
        </div>
      </div>

      <p className="text-rose-700 text-sm leading-relaxed mb-3">{post.body}</p>

      {post.replies && post.replies.length > 0 && (
        <div>
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-rose-500 text-xs font-semibold hover:text-rose-700 transition-colors"
          >
            💬 {post.replies.length} {post.replies.length === 1 ? 'reply' : 'replies'} {expanded ? '▲' : '▼'}
          </button>
          {expanded && (
            <div className="mt-3 space-y-2 pl-4 border-l-2 border-rose-200">
              {post.replies.map((reply, i) => (
                <div key={i} className="bg-rose-50 rounded-xl p-3">
                  <div className="font-semibold text-rose-700 text-xs mb-1">{reply.author}</div>
                  <p className="text-rose-600 text-sm">{reply.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function CommunityBoard() {
  const [userPosts, setUserPosts] = useState(loadPosts)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ title: '', body: '', category: CATEGORIES[0], author: '' })
  const [submitted, setSubmitted] = useState(false)
  const [filter, setFilter] = useState('All')

  const allPosts = [...SEED_COMMUNITY_POSTS, ...userPosts]
  const filtered = filter === 'All' ? allPosts : allPosts.filter(p => p.category === filter)

  const submitPost = (e) => {
    e.preventDefault()
    const post = {
      id: `user_${Date.now()}`,
      author: form.author || 'Community Member',
      avatar: '👤',
      time: 'Just now',
      category: form.category,
      title: form.title,
      body: form.body,
      replies: [],
    }
    const next = [post, ...userPosts]
    setUserPosts(next)
    savePosts(next)
    setSubmitted(true)
    setForm({ title: '', body: '', category: CATEGORIES[0], author: '' })
    setTimeout(() => { setSubmitted(false); setShowForm(false) }, 2000)
  }

  return (
    <div>
      {/* Filter & post button */}
      <div className="flex flex-wrap gap-2 items-center justify-between mb-6">
        <div className="flex flex-wrap gap-2">
          {['All', ...CATEGORIES].map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                filter === cat
                  ? 'bg-rose-500 text-white'
                  : 'bg-white border border-rose-200 text-rose-600 hover:bg-rose-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn-primary text-sm px-4 py-2"
        >
          + New Post
        </button>
      </div>

      {/* New post form */}
      {showForm && (
        <div className="card p-6 mb-6 border-rose-300 pop-in">
          {submitted ? (
            <div className="text-center py-4">
              <div className="text-4xl mb-2">🌸</div>
              <p className="font-bold text-rose-700">Your post is live! Welcome to the community!</p>
            </div>
          ) : (
            <form onSubmit={submitPost} className="space-y-4">
              <h4 className="font-display font-bold text-rose-900">Share with the community</h4>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Your Name</label>
                  <input
                    className="form-input"
                    placeholder="e.g. Sarah M."
                    value={form.author}
                    onChange={e => setForm(f => ({ ...f, author: e.target.value }))}
                    maxLength={40}
                  />
                </div>
                <div>
                  <label className="form-label">Category</label>
                  <select
                    className="form-input"
                    value={form.category}
                    onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                  >
                    {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="form-label">Title *</label>
                <input
                  required
                  className="form-input"
                  placeholder="What's on your mind?"
                  value={form.title}
                  onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                  maxLength={100}
                />
              </div>
              <div>
                <label className="form-label">Message *</label>
                <textarea
                  required
                  rows={4}
                  className="form-input resize-none"
                  placeholder="Share a tip, ask a question, show off your tiles..."
                  value={form.body}
                  onChange={e => setForm(f => ({ ...f, body: e.target.value }))}
                  maxLength={500}
                />
              </div>
              <div className="flex gap-3">
                <button type="submit" className="btn-primary">Post to Community 🌸</button>
                <button type="button" onClick={() => setShowForm(false)} className="btn-secondary">Cancel</button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* Posts */}
      <div className="space-y-4">
        {filtered.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-8 text-rose-400">
            <div className="text-3xl mb-2">🌸</div>
            <p>No posts in this category yet — be the first!</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default function Community() {
  const [activeTab, setActiveTab] = useState('join')
  const [joinForm, setJoinForm] = useState({
    name: '', email: '', phone: '', city: 'Houston', skill: '', heard: '', newsletter: true,
  })
  const [joinSubmitted, setJoinSubmitted] = useState(false)
  const [joinError, setJoinError] = useState('')

  const handleJoin = (e) => {
    e.preventDefault()
    if (!joinForm.name || !joinForm.email) {
      setJoinError('Please fill in your name and email.')
      return
    }
    setJoinError('')
    setJoinSubmitted(true)
  }

  return (
    <section id="community" className="py-20 bg-gradient-to-b from-rose-50 to-blush">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="badge bg-rose-200 text-rose-700 mb-4">Community</div>
          <h2 className="section-heading">
            Your Mahjong{' '}
            <span className="text-rose-500 italic">family awaits</span>
          </h2>
          <p className="section-subheading">
            Join hundreds of Houston Mahjong players — get class updates, tips, and connect with fellow tile lovers!
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-3 justify-center mb-10">
          {[
            { id: 'join', label: '🌸 Join the Club' },
            { id: 'board', label: '💬 Community Board' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-full font-semibold text-sm transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-rose-500 text-white shadow-lg scale-105'
                  : 'bg-white text-rose-600 border border-rose-200 hover:bg-rose-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Join form */}
        {activeTab === 'join' && (
          <div className="max-w-2xl mx-auto">
            {joinSubmitted ? (
              <div className="card p-10 text-center pop-in">
                <div className="text-6xl mb-4">🌸</div>
                <h3 className="font-display text-3xl font-bold text-rose-900 mb-3">
                  Welcome to the club, {joinForm.name.split(' ')[0]}!
                </h3>
                <p className="text-rose-600 mb-6">
                  You're now part of Houston's most Amahjing Mahjong community! Check your email for a welcome message — we can't wait to play with you.
                </p>
                <div className="flex flex-wrap gap-3 justify-center">
                  <button onClick={() => setActiveTab('board')} className="btn-primary">
                    Visit the Community Board 💬
                  </button>
                </div>
              </div>
            ) : (
              <div className="card p-8">
                <h3 className="font-display text-2xl font-bold text-rose-900 mb-2">
                  Join the That's Amahjing Community! 🀄
                </h3>
                <p className="text-rose-600 text-sm mb-6">
                  Get class announcements, Mahjong tips, Houston event info, and connect with fellow players.
                </p>

                {joinError && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-3 mb-4 text-red-600 text-sm">
                    {joinError}
                  </div>
                )}

                <form onSubmit={handleJoin} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="form-label">Full Name *</label>
                      <input
                        required
                        className="form-input"
                        placeholder="Jane Smith"
                        value={joinForm.name}
                        onChange={e => setJoinForm(f => ({ ...f, name: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="form-label">Email Address *</label>
                      <input
                        required
                        type="email"
                        className="form-input"
                        placeholder="jane@example.com"
                        value={joinForm.email}
                        onChange={e => setJoinForm(f => ({ ...f, email: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="form-label">Phone (optional)</label>
                      <input
                        type="tel"
                        className="form-input"
                        placeholder="(713) 555-0000"
                        value={joinForm.phone}
                        onChange={e => setJoinForm(f => ({ ...f, phone: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="form-label">City / Area</label>
                      <input
                        className="form-input"
                        placeholder="Houston, Katy, Sugar Land..."
                        value={joinForm.city}
                        onChange={e => setJoinForm(f => ({ ...f, city: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="form-label">Your Mahjong skill level</label>
                    <select
                      className="form-input"
                      value={joinForm.skill}
                      onChange={e => setJoinForm(f => ({ ...f, skill: e.target.value }))}
                    >
                      <option value="">Select your level...</option>
                      {SKILL_LEVELS.map(s => <option key={s}>{s}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="form-label">How did you hear about us?</label>
                    <select
                      className="form-input"
                      value={joinForm.heard}
                      onChange={e => setJoinForm(f => ({ ...f, heard: e.target.value }))}
                    >
                      <option value="">Select one...</option>
                      {HOW_HEARD.map(h => <option key={h}>{h}</option>)}
                    </select>
                  </div>

                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={joinForm.newsletter}
                      onChange={e => setJoinForm(f => ({ ...f, newsletter: e.target.checked }))}
                      className="mt-1 accent-rose-500"
                    />
                    <span className="text-rose-700 text-sm leading-relaxed">
                      Yes! Send me class announcements, Mahjong tips, and Houston Mahjong news. (You can unsubscribe anytime.)
                    </span>
                  </label>

                  <button type="submit" className="btn-primary w-full text-base py-4">
                    Join That's Amahjing! 🌸
                  </button>

                  <p className="text-center text-rose-400 text-xs">
                    We'll never share your information. Pinky promise. 🤙
                  </p>
                </form>
              </div>
            )}
          </div>
        )}

        {/* Community board */}
        {activeTab === 'board' && (
          <div className="max-w-3xl mx-auto">
            <CommunityBoard />
          </div>
        )}
      </div>
    </section>
  )
}
