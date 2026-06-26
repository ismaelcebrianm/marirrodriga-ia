import LogoIcon from './LogoIcon'

export default function Footer({ onScrollTo, onNavigate }) {
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
        <a onClick={() => onScrollTo('negocio')}>Para tu negocio</a>
        <a onClick={() => onScrollTo('agentes')}>IA a la carta</a>
        <a onClick={() => onScrollTo('reto-diario')}>Actualidad IA</a>
        <a onClick={() => onScrollTo('contacto')}>Contacto</a>
      </div>
      <div className="footer-copy">© 2026 Marirrodriga.IA · Todos los derechos reservados</div>
    </footer>
  )
}
