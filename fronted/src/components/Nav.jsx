import LogoIcon from './LogoIcon'

export default function Nav({ onScrollTo }) {
  const goHome = (id) => { onScrollTo(id) }

  return (
    <nav>
      <a className="logo-wrap" href="#inicio" onClick={(e) => { e.preventDefault(); goHome('inicio') }}>
        <LogoIcon className="logo-svg" />
        <div className="logo-text">Marirrodriga<b>.IA</b></div>
      </a>
      <div className="nl">
        <a onClick={() => goHome('inicio')}>Inicio</a>
        <a onClick={() => goHome('medida')}>A medida</a>
        <a onClick={() => goHome('taller')}>El Taller</a>
        <a className="nav-reto" onClick={() => goHome('reto-diario')}>
          Actualidad IA
          <span className="nav-reto__badge">Nuevo</span>
        </a>
        <a onClick={() => goHome('contacto')}>Contacto</a>
      </div>
      <button className="nb" onClick={() => goHome('taller')}>Entrar al Taller →</button>
    </nav>
  )
}
