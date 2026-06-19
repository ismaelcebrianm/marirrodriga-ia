import LogoIcon from './LogoIcon'

export default function Footer({ onScrollTo }) {
  return (
    <footer>
      <div className="footer-logo">
        <LogoIcon className="logo-svg" />
        <div>
          <div className="footer-logo-text">Marirrodriga<b>.IA</b></div>
          <div className="footer-tagline">Automatizamos lo que te roba tiempo.</div>
        </div>
      </div>
      <div className="footer-links">
        <a onClick={() => onScrollTo('inicio')}>Inicio</a>
        <a onClick={() => onScrollTo('taller')}>El Taller</a>
        <a onClick={() => onScrollTo('reto-diario')}>Actualidad IA</a>
        <a onClick={() => onScrollTo('contacto')}>Contacto</a>
      </div>
      <div className="footer-copy">© 2026 Marirrodriga.IA · Todos los derechos reservados</div>
    </footer>
  )
}
