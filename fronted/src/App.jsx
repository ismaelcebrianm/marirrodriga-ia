import { useRef, useState, useEffect } from 'react'
import CursorEffect from './components/CursorEffect'
import Nav          from './components/Nav'
import Footer       from './components/Footer'
import Popup        from './components/Popup'
import HomePage     from './pages/HomePage'
import ServicesPage from './pages/ServicesPage'
import RetoSection   from './pages/RetoSection'
import ContactPage  from './pages/ContactPage'
import BlogPage     from './pages/BlogPage'
import NegocioPage  from './pages/NegocioPage'
import DentalPage      from './pages/DentalPage'
import EsteticaPage    from './pages/EsteticaPage'
import GimnasioPage    from './pages/GimnasioPage'
import AutoescuelaPage from './pages/AutoescuelaPage'
import WebPage         from './pages/WebPage'
import RrssPage        from './pages/RrssPage'
import ReservasPage    from './pages/ReservasPage'

const HASH_PAGES = ['dental', 'blog', 'reservas', 'estetica', 'deporte', 'autoescuela', 'web', 'rrss']

const POPUP_CONFIG = {
  chatbot: { icon: '🤖', gift: '🎁 Demo configurada gratis',   title: '¿Quieres este chatbot para tu empresa?', desc: 'Lo configuramos con tu información real. Listo en 48h.',                          cta: 'Quiero el chatbot →' },
  email:   { icon: '📧', gift: '🎁 Email personalizado gratis', title: '¿Emails automáticos para tu negocio?',   desc: 'Te generamos una secuencia adaptada a tu empresa.',                               cta: 'Quiero mis emails →' },
  invoice: { icon: '🧾', gift: '🎁 Sistema configurado gratis', title: '¿Quieres facturación automática?',       desc: 'Lo montamos con tus datos reales en menos de 24h.',                               cta: 'Quiero el sistema →' },
  social:  { icon: '📱', gift: '🎁 10 posts gratis',            title: '¿10 posts reales para tu empresa?',      desc: 'Listos para publicar en Instagram, TikTok o LinkedIn esta semana.',                cta: 'Quiero mis 10 posts →' },
  mockup:  { icon: '🌐', gift: '🎁 Análisis web gratuito',      title: '¿Análisis completo de tu web?',          desc: 'Te decimos las 3 mejoras que más conversión generarían ahora mismo.',              cta: 'Quiero el análisis →' },
}

export default function App() {
  const [popup, setPopup]   = useState(null)
  const [page, setPage]     = useState(() => {
    const hash = window.location.hash.slice(1)
    return HASH_PAGES.includes(hash) ? hash : 'home'
  })
  const interacted          = useRef({})

  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [page])

  useEffect(() => {
    const hash = window.location.hash.slice(1)
    if (HASH_PAGES.includes(hash) && hash !== page) setPage(hash)
  }, [])

  function scrollTo(id) {
    if (page !== 'home') { navigate('home'); setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 100) }
    else document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  function navigate(p) {
    if (p === 'contacto-scroll') { navigate('home'); setTimeout(() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' }), 100); return }
    if (HASH_PAGES.includes(p)) { window.location.hash = p }
    else { window.location.hash = '' }
    setPage(p)
    window.scrollTo(0, 0)
  }

  function triggerPopup(service, force = false) {
    if (interacted.current[service] && !force) return
    interacted.current[service] = true
    setTimeout(() => setPopup(service), 700)
  }

  return (
    <>
      <div className="glow-bg glow-bg-1" />
      <div className="glow-bg glow-bg-2" />
      <div className="grid-overlay" />
      <CursorEffect />

      <Nav onScrollTo={scrollTo} onNavigate={navigate} currentPage={page} />

      {page === 'blog' ? (
        <BlogPage onNavigateHome={() => navigate('home')} />
      ) : page === 'reservas' ? (
        <ReservasPage onBack={() => { window.location.hash = ''; setPage('home'); setTimeout(() => document.getElementById('negocio')?.scrollIntoView({ behavior: 'smooth' }), 100) }} onScrollTo={scrollTo} />
      ) : page === 'dental' ? (
        <DentalPage onBack={() => { window.location.hash = ''; setPage('home'); setTimeout(() => document.getElementById('negocio')?.scrollIntoView({ behavior: 'smooth' }), 100) }} />
      ) : page === 'estetica' ? (
        <EsteticaPage onBack={() => { window.location.hash = ''; setPage('home'); setTimeout(() => document.getElementById('negocio')?.scrollIntoView({ behavior: 'smooth' }), 100) }} />
      ) : page === 'deporte' ? (
        <GimnasioPage onBack={() => { window.location.hash = ''; setPage('home'); setTimeout(() => document.getElementById('negocio')?.scrollIntoView({ behavior: 'smooth' }), 100) }} />
      ) : page === 'autoescuela' ? (
        <AutoescuelaPage onBack={() => { window.location.hash = ''; setPage('home'); setTimeout(() => document.getElementById('negocio')?.scrollIntoView({ behavior: 'smooth' }), 100) }} />
      ) : page === 'web' ? (
        <WebPage onBack={() => { window.location.hash = ''; setPage('home'); setTimeout(() => document.getElementById('negocio')?.scrollIntoView({ behavior: 'smooth' }), 100) }} />
      ) : page === 'rrss' ? (
        <RrssPage onBack={() => { window.location.hash = ''; setPage('home'); setTimeout(() => document.getElementById('negocio')?.scrollIntoView({ behavior: 'smooth' }), 100) }} />
      ) : (
        <>
          {/* ── INICIO ─────────────────────────────────────── */}
          <section id="inicio">
            <HomePage onScrollTo={scrollTo} />
          </section>

          {/* ── PARA TU NEGOCIO ────────────────────────────── */}
          <section id="negocio">
            <NegocioPage onNavigate={navigate} onScrollTo={scrollTo} />
          </section>

          {/* ── AGENTES INDIVIDUALES ───────────────────────── */}
          <section id="agentes">
            <ServicesPage triggerPopup={triggerPopup} onNavigate={navigate} />
          </section>

          {/* ── ACTUALIDAD IA ──────────────────────────────── */}
          <RetoSection onScrollTo={scrollTo} onNavigate={navigate} />

          {/* ── CONTACTO ───────────────────────────────────── */}
          <section id="contacto">
            <ContactPage />
          </section>
        </>
      )}

      <Footer onScrollTo={scrollTo} onNavigate={navigate} />

      {popup && (
        <Popup
          config={POPUP_CONFIG[popup]}
          onClose={() => setPopup(null)}
        />
      )}
    </>
  )
}
