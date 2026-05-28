import { TESTIMONIALS } from '../data/content.js'

function StarRating({ rating }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < rating ? 'text-gold-500' : 'text-rose-200'}>★</span>
      ))}
    </div>
  )
}

export default function About() {
  return (
    <section id="about" className="py-20 bg-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* About the business */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          <div>
            <div className="badge bg-rose-100 text-rose-600 mb-4">Our Story</div>
            <h2 className="section-heading">
              Mahjong is more than a game —<br />
              <span className="text-rose-500 italic">it's a connection.</span>
            </h2>
            <div className="space-y-4 text-rose-700 leading-relaxed">
              <p>
                That's Amahjing! was born from a simple belief: Mahjong is one of the most social, strategic, and joyful games in the world — and everyone in Houston deserves a chance to experience it.
              </p>
              <p>
                We started teaching in living rooms and quickly grew into Houston's go-to Mahjong community. Whether you're brand new to tiles or looking to sharpen your strategy, we create a warm, judgment-free space where every player belongs.
              </p>
              <p>
                Our classes are small, our vibes are good, and our passion for this game is <span className="font-semibold text-rose-600 italic">absolutely Amahjing.</span> Come for the tiles — stay for the friendships.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {[
                { emoji: '🎓', label: 'Expert Instruction' },
                { emoji: '💕', label: 'Welcoming Community' },
                { emoji: '📍', label: 'Houston Based' },
                { emoji: '🃏', label: 'American Mahjong' },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 bg-rose-50 border border-rose-200 rounded-full px-4 py-2"
                >
                  <span>{item.emoji}</span>
                  <span className="text-rose-700 text-sm font-semibold">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Visual card */}
          <div className="relative">
            <div className="bg-gradient-to-br from-rose-100 to-rose-200 rounded-3xl p-8 text-center shadow-xl">
              <div className="text-6xl mb-4">🀄</div>
              <h3 className="font-display text-2xl font-bold text-rose-800 mb-2">That's Amahjing!</h3>
              <p className="text-rose-600 mb-6">Houston's Mahjong Community</p>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { emoji: '🌸', title: 'Beginner Friendly', desc: 'Zero experience needed' },
                  { emoji: '🎯', title: 'Strategy Classes', desc: 'Level up your game' },
                  { emoji: '🥂', title: 'Private Parties', desc: 'Unforgettable events' },
                  { emoji: '💌', title: 'Community', desc: 'Your Mahjong family' },
                ].map((item, i) => (
                  <div key={i} className="bg-white/70 rounded-2xl p-4 text-left">
                    <div className="text-xl mb-1">{item.emoji}</div>
                    <div className="font-bold text-rose-800 text-sm">{item.title}</div>
                    <div className="text-rose-500 text-xs">{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-gold-300 rounded-full opacity-40" />
            <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-rose-300 rounded-full opacity-40" />
          </div>
        </div>

        {/* Testimonials */}
        <div className="text-center mb-12">
          <div className="badge bg-gold-300 text-gold-700 mb-4">What Our Players Say</div>
          <h2 className="section-heading">Loved by the Houston Mahjong community</h2>
          <p className="section-subheading">Real stories from real players — we couldn't be more proud.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS.map(t => (
            <div key={t.id} className="card p-6 flex flex-col gap-3">
              <StarRating rating={t.rating} />
              <p className="text-rose-800 text-sm leading-relaxed flex-1">"{t.text}"</p>
              <div className="pt-3 border-t border-rose-100">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{t.avatar}</span>
                  <div>
                    <div className="font-bold text-rose-900 text-sm">{t.name}</div>
                    <div className="text-rose-400 text-xs">{t.location}</div>
                  </div>
                </div>
                <div className="mt-2">
                  <span className="badge bg-rose-100 text-rose-500">{t.course}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
