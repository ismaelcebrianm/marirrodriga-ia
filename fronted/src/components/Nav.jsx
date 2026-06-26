import { useState, useEffect } from 'react'
import LogoIcon from './LogoIcon'

const SCROLL_LINKS = [
  { id: 'inicio',      label: 'Inicio' },
  { id: 'negocio',     label: 'Para tu negocio', cls: 'nav-negocio' },
  { id: 'agentes',     label: 'IA a la carta' },
  { id: 'reto-diario', label: 'Actualidad IA', badge: 'Nuevo', badgeCls: 'nav-reto__badge' },
  { id: 'contacto',    label: 'Contacto' },
]

export default function Nav({ onScrollTo, onNavigate, currentPage }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  function go(id) {
    setOpen(false)
    onScrollTo(id)
  }

  return (
    <>
      <nav>
        <a className="logo-wrap" href="#inicio" onClick={(e) => { e.preventDefault(); go('inicio') }}>
          <LogoIcon className="logo-svg" />
          <div className="logo-text">Marirrodriga<b>.IA</b></div>
        </a>

        {/* Desktop links */}
        <div className="nl">
          {SCROLL_LINKS.map(l => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className={[l.id === 'negocio' && currentPage === 'dental' ? 'on' : '', l.cls || ''].filter(Boolean).join(' ')}
              onClick={(e) => { e.preventDefault(); go(l.id) }}
            >
              <span className="nav-label-wrap">
                {l.label}
                {l.badge && <span className={l.badgeCls}>{l.badge}</span>}
              </span>
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <button className="nb" onClick={() => go('negocio')}>Para tu negocio →</button>

        {/* Hamburger button — solo móvil */}
        <button
          className={`ham-btn${open ? ' ham-btn--open' : ''}`}
          onClick={() => setOpen(v => !v)}
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* Mobile overlay menu */}
      <div className={`mob-menu${open ? ' mob-menu--open' : ''}`} aria-hidden={!open}>
        <nav className="mob-menu__nav">
          {SCROLL_LINKS.map(l => (
            <a key={l.id} className={`mob-menu__link${l.cls ? ' ' + l.cls : ''}`} href={`#${l.id}`} onClick={(e) => { e.preventDefault(); go(l.id) }}>
              <span className="nav-label-wrap">
                {l.label}
                {l.badge && <span className={l.badgeCls}>{l.badge}</span>}
              </span>
            </a>
          ))}
          <button className="mob-menu__cta" onClick={() => go('negocio')}>
            Para tu negocio →
          </button>
        </nav>
      </div>
    </>
  )
}
