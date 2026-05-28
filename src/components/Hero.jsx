export default function Hero({ scrollTo }) {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-rose-50 via-blush to-rose-100" />

      {/* Decorative tile pattern */}
      <div className="absolute inset-0 tile-bg opacity-60" />

      {/* Floating tile decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
        {[
          { tile: '🀇', top: '8%', left: '3%', rotate: '-15deg', size: '3rem', opacity: 0.15 },
          { tile: '🀄', top: '12%', right: '5%', rotate: '10deg', size: '3.5rem', opacity: 0.18 },
          { tile: '🀙', top: '25%', left: '6%', rotate: '8deg', size: '2.5rem', opacity: 0.12 },
          { tile: '🀅', bottom: '30%', right: '4%', rotate: '-12deg', size: '3rem', opacity: 0.15 },
          { tile: '🀐', bottom: '20%', left: '4%', rotate: '20deg', size: '2.8rem', opacity: 0.12 },
          { tile: '🀀', top: '60%', right: '8%', rotate: '-8deg', size: '2.5rem', opacity: 0.14 },
          { tile: '🀡', top: '40%', left: '2%', rotate: '5deg', size: '2rem', opacity: 0.10 },
          { tile: '🌸', bottom: '12%', right: '12%', rotate: '0deg', size: '2rem', opacity: 0.20 },
          { tile: '🌸', top: '70%', left: '10%', rotate: '0deg', size: '1.5rem', opacity: 0.20 },
        ].map((item, i) => (
          <span
            key={i}
            className="absolute"
            style={{
              top: item.top,
              bottom: item.bottom,
              left: item.left,
              right: item.right,
              fontSize: item.size,
              transform: `rotate(${item.rotate})`,
              opacity: item.opacity,
            }}
          >
            {item.tile}
          </span>
        ))}
      </div>

      {/* Hero content */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto pt-20">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-rose-200 rounded-full px-4 py-2 mb-6 shadow-sm">
          <span className="text-rose-400">🌸</span>
          <span className="text-rose-600 text-sm font-semibold">Houston's Premier Mahjong Community</span>
          <span className="text-rose-400">🌸</span>
        </div>

        {/* Main heading */}
        <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-bold text-rose-900 mb-4 leading-tight">
          That's{' '}
          <span className="text-rose-500 italic">Amahjing!</span>
        </h1>

        {/* Sub-heading */}
        <p className="text-xl sm:text-2xl text-rose-700 font-light mb-3 italic font-display">
          Learn. Play. Connect.
        </p>

        <p className="text-base sm:text-lg text-rose-600 max-w-2xl mx-auto mb-10 leading-relaxed">
          Houston's most welcoming Mahjong community. Whether you've never touched a tile or you're chasing your first Mahjong, we'll meet you where you are — and make it{' '}
          <span className="font-semibold text-rose-700">incredibly fun.</span>
        </p>

        {/* Tile showcase */}
        <div className="flex justify-center gap-2 sm:gap-3 mb-10 flex-wrap">
          {['🀇', '🀙', '🀐', '🀄', '🀅', '🀀', '🃏'].map((tile, i) => (
            <span
              key={i}
              className="tile text-3xl sm:text-4xl cursor-default"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {tile}
            </span>
          ))}
        </div>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => scrollTo('community')}
            className="btn-primary text-base px-8 py-4"
          >
            Join Our Community 🌸
          </button>
          <button
            onClick={() => scrollTo('learn')}
            className="btn-secondary text-base px-8 py-4"
          >
            Start Learning 🎴
          </button>
          <button
            onClick={() => scrollTo('events')}
            className="text-rose-500 font-semibold hover:text-rose-700 transition-colors underline underline-offset-4 decoration-rose-300"
          >
            See upcoming classes →
          </button>
        </div>

        {/* Stats row */}
        <div className="mt-16 grid grid-cols-3 gap-4 max-w-lg mx-auto">
          {[
            { value: '500+', label: 'Students Taught' },
            { value: '4.9★', label: 'Average Rating' },
            { value: '3 yrs', label: 'In the Houston Community' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="font-display text-2xl sm:text-3xl font-bold text-rose-600">{stat.value}</div>
              <div className="text-xs sm:text-sm text-rose-500 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0 80L60 68C120 56 240 32 360 24C480 16 600 24 720 32C840 40 960 48 1080 44C1200 40 1320 24 1380 16L1440 8V80H0Z" fill="#fffbfd" />
        </svg>
      </div>
    </section>
  )
}
