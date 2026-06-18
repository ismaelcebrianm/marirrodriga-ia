import { useMemo } from 'react'
import { Bot, Zap, MessageSquare, ArrowRight } from 'lucide-react'

const IA_CONCEPTS = [
  {
    icon: Bot,
    title: '¿Qué es un agente de IA?',
    body: 'Una IA que no solo responde, sino que actúa. Puede reservar citas, clasificar correos o generar facturas. Tú decides qué acciones ocurren solas y cuáles requieren tu visto bueno antes de ejecutarse.',
  },
  {
    icon: Zap,
    title: '¿Qué significa automatizar?',
    body: 'Convertir una tarea repetitiva en un proceso que ocurre solo. Una vez configurado, funciona 24/7 sin coste adicional por cada ejecución.',
  },
  {
    icon: MessageSquare,
    title: '¿En qué se diferencia del bot de antes?',
    body: 'El bot antiguo seguía un guion fijo. Los agentes actuales entienden contexto, toman decisiones y se conectan a tus herramientas reales.',
  },
]

const SECTOR_STATS = [
  { value: '40%',    label: 'de aumento medio en productividad',        source: 'Accenture, 2024' },
  { value: '−30%',   label: 'en costes operativos tras automatizar',     source: 'McKinsey Global Institute' },
  { value: '2,5h',   label: 'ahorradas por empleado al día',             source: 'IBM Institute for Business Value' },
  { value: '3 de 4', label: 'empresas planean ampliar su inversión en IA', source: 'IDC, 2025' },
]

export default function HomePage({ onScrollTo }) {
  const nodes = useMemo(() =>
    Array.from({ length: 14 }, (_, i) => {
      const s = 2 + Math.random() * 5
      return {
        key: i,
        style: {
          width: `${s}px`, height: `${s}px`,
          left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`,
          animationDuration: `${3 + Math.random() * 5}s`,
          animationDelay: `${Math.random() * 4}s`,
        },
      }
    }), []
  )

  return (
    <>
      {/* ── HERO ──────────────────────────────────────────── */}
      <div className="hero">
        <div className="hgrid" />
        <div className="hglow" />
        <div className="nodes">
          {nodes.map((n) => <div key={n.key} className="node" style={n.style} />)}
        </div>

        <div className="hero-inner">
          {/* IZQUIERDA: copy */}
          <div className="hero-copy">
            <p className="hero-prehook">
              Ya te han dicho que debes implementar IA en tu negocio.
            </p>
            <h1>Aquí puedes<br />comprobarlo <em>tú mismo.</em></h1>
            <p className="sub">
              Sin vendedores, sin precios, sin promesas vacías. Solo herramientas reales
              funcionando en tu navegador — para que veas con tus propios ojos qué puede
              hacer la IA por tu empresa.
            </p>
            <div className="hbtns">
              <button className="hb1" onClick={() => onScrollTo('taller')}>Entrar al Taller →</button>
              <button className="hb2" onClick={() => onScrollTo('contacto')}>Hablar con nosotros</button>
            </div>
            <div className="hero-trust">
              <span>Sin registro</span>
              <span className="hero-trust__sep" />
              <span>Sin hablar de dinero</span>
              <span className="hero-trust__sep" />
              <span>Sin compromiso</span>
            </div>
          </div>

          {/* DERECHA: menú de secciones */}
          <nav className="hero-sidenav" aria-label="Secciones de la página">
            <button className="hero-sidenav__item" onClick={() => onScrollTo('medida')}>
              <span className="hero-sidenav__num">01</span>
              <div className="hero-sidenav__text">
                <span className="hero-sidenav__title">A medida</span>
                <span className="hero-sidenav__desc">Automatizaciones diseñadas para tu proceso concreto</span>
              </div>
              <ArrowRight size={14} className="hero-sidenav__arrow" />
            </button>
            <button className="hero-sidenav__item" onClick={() => onScrollTo('taller')}>
              <span className="hero-sidenav__num">02</span>
              <div className="hero-sidenav__text">
                <span className="hero-sidenav__title">El Taller</span>
                <span className="hero-sidenav__desc">Simuladores de IA en tiempo real, sin registro ni compromiso</span>
              </div>
              <ArrowRight size={14} className="hero-sidenav__arrow" />
            </button>
            <button className="hero-sidenav__item" onClick={() => onScrollTo('reto-diario')}>
              <span className="hero-sidenav__num">03</span>
              <div className="hero-sidenav__text">
                <span className="hero-sidenav__title">Actualidad IA</span>
                <span className="hero-sidenav__desc">Noticias de IA aplicadas a tu negocio, actualizadas cada día</span>
              </div>
              <ArrowRight size={14} className="hero-sidenav__arrow" />
            </button>
            <button className="hero-sidenav__item" onClick={() => onScrollTo('contacto')}>
              <span className="hero-sidenav__num">04</span>
              <div className="hero-sidenav__text">
                <span className="hero-sidenav__title">Contacto</span>
                <span className="hero-sidenav__desc">Cuéntanos tu caso, te respondemos hoy mismo</span>
              </div>
              <ArrowRight size={14} className="hero-sidenav__arrow" />
            </button>
          </nav>
        </div>
      </div>

      {/* ── ANTES DE ENTRAR — sección unificada ───────────── */}
      <section className="antes-section">

        {/* Cabecera */}
        <div className="antes-header">
          <div className="slbl">Antes de entrar</div>
          <h2 className="antes-header__title">Todo lo que necesitas saber<br />en tres minutos.</h2>
          <p className="antes-header__sub">
            Sin tecnicismos, sin jerga de Silicon Valley. Empieza aquí y llega al Taller
            sabiendo exactamente qué esperar.
          </p>
        </div>

        {/* 3 conceptos */}
        <div className="concepts-grid">
          {IA_CONCEPTS.map(({ icon: Icon, title, body }) => (
            <div key={title} className="concept-card">
              <div className="concept-icon"><Icon size={20} /></div>
              <h3>{title}</h3>
              <p>{body}</p>
            </div>
          ))}
        </div>

        {/* Datos del sector */}
        <div className="antes-stats">
          <p className="antes-stats__label">Lo que dicen los datos</p>
          <div className="antes-stats__grid">
            {SECTOR_STATS.map((s, i) => (
              <div key={i} className="antes-stat">
                <div className="antes-stat__value">{s.value}</div>
                <div className="antes-stat__label">{s.label}</div>
                <div className="antes-stat__source">{s.source}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Qué es El Taller */}
        <div className="antes-taller">
          <div className="antes-taller__copy">
            <div className="slbl">El Taller</div>
            <h3 className="antes-taller__title">Un espacio para probar,<br />no para comprar.</h3>
            <p className="antes-taller__body">
              El Taller es la parte de esta web donde puedes interactuar con agentes de IA
              reales en tiempo real. Sin registros, sin vendedores, sin presión.
              Pon a trabajar un agente de voz, genera una factura en segundos o filtra
              quién quiere comprar de verdad entre tus contactos.
            </p>
            <button className="hb1" onClick={() => onScrollTo('taller')}>
              Entrar al Taller →
            </button>
          </div>
          <div className="antes-taller__pills">
            <div className="taller-pill"><span className="taller-pill__dot" />Prueba sin registrarte</div>
            <div className="taller-pill"><span className="taller-pill__dot" />Simuladores en tiempo real</div>
            <div className="taller-pill"><span className="taller-pill__dot" />Explicación paso a paso</div>
            <div className="taller-pill"><span className="taller-pill__dot" />Tú decides qué explorar</div>
          </div>
        </div>

      </section>
    </>
  )
}
