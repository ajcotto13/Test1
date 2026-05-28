import { useState } from 'react'
import { EVENTS } from '../data/content.js'

function EventModal({ event, onClose }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', guests: '1' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-rose-900/40 backdrop-blur-sm" onClick={onClose}>
      <div
        className="bg-white rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto pop-in"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <span className="text-2xl">{event.emoji}</span>
              <h3 className="font-display text-xl font-bold text-rose-900 mt-1">{event.title}</h3>
            </div>
            <button onClick={onClose} className="text-rose-300 hover:text-rose-600 text-xl transition-colors">✕</button>
          </div>

          {submitted ? (
            <div className="text-center py-6">
              <div className="text-5xl mb-3">🌸</div>
              <h4 className="font-display text-2xl font-bold text-rose-900 mb-2">You're registered!</h4>
              <p className="text-rose-600 text-sm">
                We'll send confirmation details to {form.email}. See you there!
              </p>
              <button onClick={onClose} className="mt-5 btn-primary">Done!</button>
            </div>
          ) : (
            <>
              <div className="bg-rose-50 rounded-2xl p-4 mb-5 space-y-2 text-sm">
                <div className="flex gap-2"><span>📅</span><span className="text-rose-700">{event.date}</span></div>
                <div className="flex gap-2"><span>🕐</span><span className="text-rose-700">{event.time}</span></div>
                <div className="flex gap-2"><span>📍</span><span className="text-rose-700">{event.location}</span></div>
                <div className="flex gap-2"><span>💰</span><span className="text-rose-700 font-bold">{event.price} per person</span></div>
                {event.spotsLeft > 0 && (
                  <div className="flex gap-2"><span>🪑</span><span className="text-rose-600 font-semibold">{event.spotsLeft} spots remaining!</span></div>
                )}
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="form-label">Full Name *</label>
                  <input required className="form-input" placeholder="Jane Smith"
                    value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                </div>
                <div>
                  <label className="form-label">Email *</label>
                  <input required type="email" className="form-input" placeholder="jane@example.com"
                    value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
                </div>
                <div>
                  <label className="form-label">Phone (optional)</label>
                  <input type="tel" className="form-input" placeholder="(713) 555-0000"
                    value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
                </div>
                {!event.isTemplate && (
                  <div>
                    <label className="form-label">Number of guests (including you)</label>
                    <select className="form-input" value={form.guests}
                      onChange={e => setForm(f => ({ ...f, guests: e.target.value }))}>
                      {['1', '2', '3', '4'].map(n => <option key={n}>{n}</option>)}
                    </select>
                  </div>
                )}
                <button type="submit" className="btn-primary w-full">
                  {event.isTemplate ? 'Request My Party Quote 🥂' : 'Reserve My Spot 🌸'}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default function Events() {
  const [selectedEvent, setSelectedEvent] = useState(null)

  return (
    <section id="events" className="py-20 bg-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="badge bg-rose-200 text-rose-700 mb-4">Houston Events</div>
          <h2 className="section-heading">
            Upcoming classes &{' '}
            <span className="text-rose-500 italic">events</span>
          </h2>
          <p className="section-subheading">
            All events are in the Houston area. Exact addresses sent upon registration. Spots fill fast!
          </p>
        </div>

        {/* Event cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {EVENTS.map(event => {
            const soldOut = event.spots > 0 && event.spotsLeft === 0
            const almostFull = event.spots > 0 && event.spotsLeft <= 3 && event.spotsLeft > 0

            return (
              <div key={event.id} className="card flex flex-col overflow-hidden">
                {/* Top color strip */}
                <div className={`h-2 ${event.tagColor}`} />

                <div className="p-5 flex-1 flex flex-col">
                  {/* Tag & emoji */}
                  <div className="flex items-center justify-between mb-3">
                    <span className={`badge text-white text-xs ${event.tagColor}`}>
                      {event.tag}
                    </span>
                    <span className="text-2xl">{event.emoji}</span>
                  </div>

                  {/* Title */}
                  <h3 className="font-display font-bold text-rose-900 text-lg mb-3 leading-tight">
                    {event.title}
                  </h3>

                  {/* Details */}
                  <div className="space-y-1.5 mb-4 text-xs text-rose-600">
                    <div className="flex gap-2">
                      <span>📅</span>
                      <span>{event.date}</span>
                    </div>
                    <div className="flex gap-2">
                      <span>🕐</span>
                      <span>{event.time}</span>
                    </div>
                    <div className="flex gap-2">
                      <span>📍</span>
                      <span>{event.location}</span>
                    </div>
                    <div className="flex gap-2 font-bold text-rose-700">
                      <span>💰</span>
                      <span>{event.price}</span>
                    </div>
                  </div>

                  <p className="text-rose-700 text-xs leading-relaxed flex-1 mb-4">
                    {event.description}
                  </p>

                  {/* Spots */}
                  {event.spotsLeft > 0 && (
                    <div className={`text-xs font-bold mb-3 ${almostFull ? 'text-amber-600' : 'text-rose-500'}`}>
                      {almostFull ? '⚠️' : '🪑'} {event.spotsLeft} spot{event.spotsLeft !== 1 ? 's' : ''} left
                      {event.spots > 0 && (
                        <div className="mt-1 h-1.5 bg-rose-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all ${almostFull ? 'bg-amber-400' : 'bg-rose-400'}`}
                            style={{ width: `${((event.spots - event.spotsLeft) / event.spots) * 100}%` }}
                          />
                        </div>
                      )}
                    </div>
                  )}

                  <button
                    onClick={() => setSelectedEvent(event)}
                    disabled={soldOut}
                    className={soldOut ? 'w-full py-3 rounded-full bg-rose-100 text-rose-400 font-semibold text-sm cursor-not-allowed' : 'btn-primary w-full text-sm'}
                  >
                    {soldOut ? 'Sold Out' : event.isTemplate ? 'Book Your Party 🥂' : 'Register Now 🌸'}
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {/* Request custom event */}
        <div className="text-center bg-rose-50 rounded-3xl p-8 border border-rose-200">
          <div className="text-3xl mb-3">📅</div>
          <h3 className="font-display text-2xl font-bold text-rose-900 mb-2">
            Don't see the right date?
          </h3>
          <p className="text-rose-600 mb-5">
            We add new Houston classes regularly. Join our community to get first access to new events, or contact us to request a custom class date.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => document.getElementById('community')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-primary"
            >
              Get Event Notifications 🌸
            </button>
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-secondary"
            >
              Request a Class Date
            </button>
          </div>
        </div>
      </div>

      {/* Registration modal */}
      {selectedEvent && (
        <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
      )}
    </section>
  )
}
