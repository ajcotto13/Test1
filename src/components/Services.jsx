import { SERVICES } from '../data/content.js'

export default function Services({ scrollTo }) {
  return (
    <section id="services" className="py-20 bg-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="badge bg-gold-300 text-gold-700 mb-4">Classes & Services</div>
          <h2 className="section-heading">
            Find your perfect{' '}
            <span className="text-rose-500 italic">Mahjong experience</span>
          </h2>
          <p className="section-subheading">
            From first-timer to strategy pro — we have a class, party, or service made for you.
          </p>
        </div>

        {/* Service cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          {SERVICES.map(service => (
            <div key={service.id} className="card flex flex-col">
              {/* Tag */}
              <div className="px-5 pt-5">
                <span className={`badge text-white text-xs ${service.tagColor}`}>
                  {service.tag}
                </span>
              </div>

              {/* Icon & title */}
              <div className="px-5 py-4">
                <div className="text-4xl mb-3">{service.emoji}</div>
                <h3 className="font-display font-bold text-rose-900 text-xl mb-1">{service.title}</h3>
                <div className="text-gold-600 font-bold text-sm mb-3">{service.price}</div>
                <p className="text-rose-700 text-sm leading-relaxed">{service.description}</p>
              </div>

              {/* Features */}
              <div className="px-5 pb-5 flex-1">
                <div className="border-t border-rose-100 pt-4 space-y-2">
                  {service.features.map((f, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-rose-700">
                      <span className="text-rose-400 mt-0.5">✓</span>
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="px-5 pb-5">
                <button
                  onClick={() => scrollTo('events')}
                  className="btn-primary w-full text-sm"
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Private parties CTA */}
        <div className="bg-gradient-to-r from-rose-500 to-rose-600 rounded-3xl p-8 sm:p-12 text-center text-white shadow-xl">
          <div className="text-4xl mb-4">🥂</div>
          <h3 className="font-display text-3xl font-bold mb-3">
            Planning a private event?
          </h3>
          <p className="text-rose-100 text-lg mb-8 max-w-2xl mx-auto">
            Bachelorette parties, birthdays, ladies' nights, corporate team building — we bring the tiles, the instruction, and ALL the fun. Fully customizable for your group.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => scrollTo('contact')}
              className="bg-white text-rose-600 font-bold px-8 py-4 rounded-full hover:bg-rose-50 transition-colors shadow-md"
            >
              Get a Custom Quote
            </button>
            <button
              onClick={() => scrollTo('contact')}
              className="border-2 border-white text-white font-bold px-8 py-4 rounded-full hover:bg-white/10 transition-colors"
            >
              Ask Us Anything
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
