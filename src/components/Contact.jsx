import { useState } from 'react'

const SUBJECTS = [
  'General Question',
  'Book a Beginner Class',
  'Book a Strategy Session',
  'Plan a Private Party',
  'Tile Sets & Accessories',
  'Press / Partnership',
  'Other',
]

export default function Contact() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', subject: '', message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) {
      setError('Please fill in your name, email, and message.')
      return
    }
    setError('')
    setSubmitted(true)
  }

  return (
    <section id="contact" className="py-20 bg-blush">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="badge bg-rose-200 text-rose-700 mb-4">Get In Touch</div>
          <h2 className="section-heading">
            We'd love to{' '}
            <span className="text-rose-500 italic">hear from you!</span>
          </h2>
          <p className="section-subheading">
            Questions about classes, private parties, tile sets, or anything Mahjong? We're here for it!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact info */}
          <div>
            <h3 className="font-display text-2xl font-bold text-rose-900 mb-6">
              That's Amahjing! Houston
            </h3>

            <div className="space-y-5 mb-8">
              {[
                {
                  icon: '📧',
                  title: 'Email Us',
                  value: 'hello@thatsamahjzing.com',
                  sub: 'We typically reply within 24 hours',
                  link: 'mailto:hello@thatsamahjzing.com',
                },
                {
                  icon: '📱',
                  title: 'Text or Call',
                  value: '(281) 555-MAHJ',
                  sub: 'Mon–Sat 9 AM – 7 PM CST',
                  link: 'tel:+12815556245',
                },
                {
                  icon: '📍',
                  title: 'Based in Houston, TX',
                  value: 'Houston, TX & surrounding areas',
                  sub: 'Classes in West Houston, Katy, Sugar Land & more',
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center text-xl flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <div className="font-bold text-rose-900 text-sm">{item.title}</div>
                    {item.link ? (
                      <a href={item.link} className="text-rose-600 hover:text-rose-800 transition-colors font-medium">
                        {item.value}
                      </a>
                    ) : (
                      <div className="text-rose-600 font-medium">{item.value}</div>
                    )}
                    <div className="text-rose-400 text-xs mt-0.5">{item.sub}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Social media */}
            <div>
              <h4 className="font-bold text-rose-800 text-sm mb-3 uppercase tracking-wide">Follow Along</h4>
              <div className="flex gap-3">
                {[
                  { platform: 'Instagram', emoji: '📸', handle: '@thatsamahjzing', href: '#' },
                  { platform: 'Facebook', emoji: '📘', handle: 'That\'s Amahjing!', href: '#' },
                  { platform: 'TikTok', emoji: '🎥', handle: '@thatsamahjzing', href: '#' },
                ].map(s => (
                  <a
                    key={s.platform}
                    href={s.href}
                    className="card px-4 py-3 flex items-center gap-2 hover:bg-rose-50 transition-colors"
                  >
                    <span className="text-lg">{s.emoji}</span>
                    <div>
                      <div className="font-bold text-rose-800 text-xs">{s.platform}</div>
                      <div className="text-rose-400 text-xs">{s.handle}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Decorative tile row */}
            <div className="mt-8 flex gap-2 opacity-60">
              {['🀇', '🀙', '🀐', '🀄', '🌸'].map((t, i) => (
                <span key={i} className="tile text-2xl pointer-events-none">{t}</span>
              ))}
            </div>
          </div>

          {/* Contact form */}
          <div className="card p-8">
            {submitted ? (
              <div className="text-center py-8 pop-in">
                <div className="text-6xl mb-4">💌</div>
                <h3 className="font-display text-2xl font-bold text-rose-900 mb-3">
                  Message sent!
                </h3>
                <p className="text-rose-600">
                  Thanks for reaching out, {form.name.split(' ')[0]}! We'll get back to you within 24 hours. Can't wait to connect!
                </p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', subject: '', message: '' }) }}
                  className="mt-6 btn-secondary"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="font-display text-xl font-bold text-rose-900">Send us a message</h3>

                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-red-600 text-sm">
                    {error}
                  </div>
                )}

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="form-label">Name *</label>
                    <input
                      required
                      className="form-input"
                      placeholder="Jane Smith"
                      value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="form-label">Email *</label>
                    <input
                      required
                      type="email"
                      className="form-input"
                      placeholder="jane@example.com"
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
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
                      value={form.phone}
                      onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="form-label">Subject</label>
                    <select
                      className="form-input"
                      value={form.subject}
                      onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                    >
                      <option value="">Select a topic...</option>
                      {SUBJECTS.map(s => <option key={s}>{s}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="form-label">Message *</label>
                  <textarea
                    required
                    rows={5}
                    className="form-input resize-none"
                    placeholder="Tell us what you're looking for! Questions about classes, private parties, tile sets — we love hearing from you."
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  />
                </div>

                <button type="submit" className="btn-primary w-full text-base py-4">
                  Send Message 💌
                </button>

                <p className="text-center text-rose-400 text-xs">
                  We respond within 24 hours, Mon–Sat.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
