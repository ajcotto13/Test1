import { useState, useEffect } from 'react'

const NAV_LINKS = [
  { id: 'learn', label: 'Learn' },
  { id: 'services', label: 'Classes' },
  { id: 'community', label: 'Community' },
  { id: 'events', label: 'Events' },
  { id: 'contact', label: 'Contact' },
]

export default function Navigation({ scrollTo, active }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNav = (id) => {
    scrollTo(id)
    setMenuOpen(false)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-md shadow-rose-100' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <button
            onClick={() => handleNav('home')}
            className="flex items-center gap-2 group"
          >
            <span className="text-2xl">🀄</span>
            <div className="leading-tight">
              <div className="font-display font-bold text-rose-600 text-lg group-hover:text-rose-700 transition-colors">
                That's Amahjing!
              </div>
              <div className="text-xs text-rose-400 font-light tracking-wide">Houston's Mahjong Community</div>
            </div>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(link => (
              <button
                key={link.id}
                onClick={() => handleNav(link.id)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  active === link.id
                    ? 'bg-rose-100 text-rose-600'
                    : 'text-rose-800 hover:bg-rose-50 hover:text-rose-600'
                }`}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => handleNav('community')}
              className="ml-3 btn-primary text-sm px-5 py-2"
            >
              Join the Club 🌸
            </button>
          </nav>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-rose-50 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`block w-5 h-0.5 bg-rose-600 transition-all duration-200 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-5 h-0.5 bg-rose-600 transition-all duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-0.5 bg-rose-600 transition-all duration-200 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white/98 backdrop-blur-md border-t border-rose-100 shadow-lg">
          <div className="px-4 py-4 flex flex-col gap-1">
            {NAV_LINKS.map(link => (
              <button
                key={link.id}
                onClick={() => handleNav(link.id)}
                className="text-left px-4 py-3 rounded-xl text-rose-800 font-semibold hover:bg-rose-50 hover:text-rose-600 transition-colors"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => handleNav('community')}
              className="mt-2 btn-primary text-sm"
            >
              Join the Club 🌸
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
