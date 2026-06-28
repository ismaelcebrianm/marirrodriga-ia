import { useMemo } from 'react'
import { Bot, Zap, MessageSquare, ArrowRight } from 'lucide-react'

const IA_CONCEPTS = [
  {
    icon: Bot,
    title: 'Software por sector',
    body: 'Un software completo de automatización diseñado para tu tipo de negocio. Citas, presupuestos, recordatorios e informes — configurado en 48h y funcionando solo desde el primer mes.',
  },
  {
    icon: Zap,
    title: 'IA a la carta',
    body: '¿Ya tienes tu software y solo quieres añadir una función concreta? Elige el agente que necesitas del catálogo — sin cambiar lo que ya tienes, sin permanencia.',
  },
  {
    icon: MessageSquare,
    title: 'Sin código, sin técnicos',
    body: 'Nos encargamos de todo: configuración, integración y mantenimiento. Tú decides qué automatizar, nosotros lo montamos y lo mantenemos funcionando.',
  },
]

const SECTOR_STATS = [
  { value: '40%',    label: 'de aumento medio en productividad',        source: 'Accenture, 2024' },
  { value: '−30%',   label: 'en costes operativos tras automatizar',     source: 'McKinsey Global Institute' },
  { value: '2,5h',   label: 'ahorradas por empleado al día',             source: 'IBM Institute for Business Value' },
  { value: '3 de 4', label: 'empresas planean ampliar su inversión en IA', source: 'IDC, 2025' },
]

export default function HomePage({ onScrollTo, onOpenOnboarding }) {
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

        {onOpenOnboarding && (
          <div className="hero-adapt-wrap">
            <button className="hb-adapt-hero" onClick={onOpenOnboarding}>
              <span className="hb-adapt-hero__sparkle">✦</span>
              Adapta esta web a tus necesidades
              <span className="hb-adapt-hero__arrow">→</span>
            </button>
          </div>
        )}

        <div className="hero-inner">
          {/* IZQUIERDA: copy */}
          <div className="hero-copy">
            <p className="hero-prehook">
              Automatización con IA para negocios que quieren crecer.
            </p>
            <h1>Tu negocio,<br />trabajando <em>solo.</em></h1>
            <p className="sub">
              Softwares de IA para tu sector o funciones a la carta para lo que necesitas.
              Setup en 48h, sin permanencia y con resultados medibles desde el primer mes.
            </p>
            <div className="hbtns">
              <button className="hb1" onClick={() => onScrollTo('negocio')}>Ver soluciones por sector →</button>
              <button className="hb2" onClick={() => onScrollTo('contacto')}>Hablar con nosotros</button>
            </div>
            <div className="hero-trust">
              <span>Garantía de resultados</span>
              <span className="hero-trust__sep" />
              <span>Sin permanencia</span>
              <span className="hero-trust__sep" />
              <span>Resultados medibles desde el mes 1</span>
            </div>
          </div>

          {/* DERECHA: menú de secciones */}
          <nav className="hero-sidenav" aria-label="Secciones de la página">
            <button className="hero-sidenav__item hero-sidenav__item--negocio" onClick={() => onScrollTo('negocio')}>
              <span className="hero-sidenav__num">01</span>
              <div className="hero-sidenav__text">
                <span className="hero-sidenav__title">Para tu negocio</span>
                <span className="hero-sidenav__desc">Más funciones que tu software actual y, en la mayoría de casos, más barato — hecho para tu sector</span>
              </div>
              <ArrowRight size={14} className="hero-sidenav__arrow" />
            </button>
            <button className="hero-sidenav__item" onClick={() => onScrollTo('agentes')}>
              <span className="hero-sidenav__num">02</span>
              <div className="hero-sidenav__text">
                <span className="hero-sidenav__title">IA a la carta</span>
                <span className="hero-sidenav__desc">Automatización a la carta — elige la herramienta que necesitas, sin cambiar lo que ya tienes</span>
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
          </nav>
        </div>
      </div>

      {/* ── ANTES DE ENTRAR — sección unificada ───────────── */}
      <section className="antes-section">

        {/* Cabecera */}
        <div className="antes-header">
          <div className="slbl">Cómo funciona</div>
          <h2 className="antes-header__title">Dos formas de trabajar<br />con nosotros.</h2>
          <p className="antes-header__sub">
            Un paquete completo para tu sector o un agente individual para una tarea concreta.
            Tú eliges el nivel de implicación.
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

        {/* Dos formas de trabajar */}
        <div className="antes-taller">
          <div className="antes-taller__copy">
            <div className="slbl">¿Cuál es tu caso?</div>
            <h3 className="antes-taller__title">¿Software completo o<br />función a la carta?</h3>
            <p className="antes-taller__body">
              Si tienes un negocio con un sector definido — clínica dental, centro deportivo, autoescuela —
              el software de tu sector cubre todo desde el primer día: citas, presupuestos, recordatorios e informes.
              Si ya tienes tu propio software y solo quieres añadir una función concreta,
              elige lo que necesitas del catálogo sin compromisos ni permanencia.
            </p>
            <div style={{ display: 'flex', gap: 10, marginTop: 20, flexWrap: 'wrap' }}>
              <button className="hb1" onClick={() => onScrollTo('negocio')}>Ver soluciones por sector →</button>
              <button className="hb2" onClick={() => onScrollTo('agentes')}>Ver IA a la carta</button>
            </div>
          </div>
          <div className="antes-taller__pills">
            <div className="taller-pill"><span className="taller-pill__dot" />Setup en 48h</div>
            <div className="taller-pill"><span className="taller-pill__dot" />Sin permanencia</div>
            <div className="taller-pill"><span className="taller-pill__dot" />Resultados medibles desde el mes 1</div>
            <div className="taller-pill"><span className="taller-pill__dot" />Garantía de funcionamiento incluida</div>
          </div>
        </div>

      </section>
    </>
  )
}
