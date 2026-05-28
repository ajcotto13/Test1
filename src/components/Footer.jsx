export default function Footer({ scrollTo }) {
  const year = new Date().getFullYear()

  const sections = [
    {
      title: 'Learn',
      links: [
        { label: 'Tile Guide', id: 'learn' },
        { label: 'How to Play', id: 'learn' },
        { label: 'Tile Quiz', id: 'learn' },
        { label: 'Glossary', id: 'learn' },
      ],
    },
    {
      title: 'Community',
      links: [
        { label: 'Join the Club', id: 'community' },
        { label: 'Community Board', id: 'community' },
        { label: 'Upcoming Events', id: 'events' },
        { label: 'Newsletter', id: 'community' },
      ],
    },
    {
      title: 'Classes',
      links: [
        { label: 'Beginner Classes', id: 'services' },
        { label: 'Strategy Sessions', id: 'services' },
        { label: 'Private Parties', id: 'services' },
        { label: 'Shop Tiles', id: 'services' },
      ],
    },
  ]

  return (
    <footer className="bg-rose-900 text-rose-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand column */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-3xl">🀄</span>
              <div>
                <div className="font-display font-bold text-white text-lg">That's Amahjing!</div>
                <div className="text-rose-300 text-xs">Houston's Mahjong Community</div>
              </div>
            </div>
            <p className="text-rose-300 text-sm leading-relaxed mb-6">
              Houston's most welcoming Mahjong community. Learn, play, and connect with us!
            </p>
            {/* Social links */}
            <div className="flex gap-3">
              {[
                { icon: '📘', label: 'Facebook', href: '#' },
                { icon: '📸', label: 'Instagram', href: '#' },
                { icon: '🎥', label: 'TikTok', href: '#' },
              ].map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 bg-rose-800 hover:bg-rose-600 rounded-full flex items-center justify-center text-base transition-colors"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {sections.map(section => (
            <div key={section.title}>
              <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wide">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map(link => (
                  <li key={link.label}>
                    <button
                      onClick={() => scrollTo(link.id)}
                      className="text-rose-300 hover:text-white text-sm transition-colors text-left"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact info row */}
        <div className="border-t border-rose-800 pt-8 mb-8">
          <div className="flex flex-wrap gap-6 justify-center text-sm text-rose-300">
            <div className="flex items-center gap-2">
              <span>📍</span>
              <span>Houston, TX</span>
            </div>
            <div className="flex items-center gap-2">
              <span>📧</span>
              <a href="mailto:hello@thatsamahjzing.com" className="hover:text-white transition-colors">
                hello@thatsamahjzing.com
              </a>
            </div>
            <div className="flex items-center gap-2">
              <span>📱</span>
              <span>(281) 555-MAHJ</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 text-rose-400 text-xs">
          <p>© {year} That's Amahjing! All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <span className="text-rose-400">🌸</span> in Houston, TX
          </p>
        </div>
      </div>
    </footer>
  )
}
