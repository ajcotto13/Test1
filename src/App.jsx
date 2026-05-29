import { useState } from 'react'
import Navigation from './components/Navigation.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import LearningHub from './components/LearningHub.jsx'
import GameSection from './components/game/GameSection.jsx'
import Services from './components/Services.jsx'
import Community from './components/Community.jsx'
import Events from './components/Events.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  const [activeSection, setActiveSection] = useState('home')

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) {
      const offset = 72
      const y = el.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
    setActiveSection(id)
  }

  return (
    <div className="min-h-screen bg-ivory font-body">
      <Navigation scrollTo={scrollTo} active={activeSection} />
      <main>
        <Hero scrollTo={scrollTo} />
        <About />
        <LearningHub />
        <GameSection />
        <Services scrollTo={scrollTo} />
        <Community />
        <Events />
        <Contact />
      </main>
      <Footer scrollTo={scrollTo} />
    </div>
  )
}
