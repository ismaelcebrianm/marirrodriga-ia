import { useState } from 'react'
import { ArrowRight, ChevronDown, Rocket } from 'lucide-react'
import DentalPage      from './DentalPage'
import EsteticaPage    from './EsteticaPage'
import GimnasioPage    from './GimnasioPage'
import AutoescuelaPage from './AutoescuelaPage'
import ReservasPage    from './ReservasPage'
import {
  AgentIllus,
  IllustrationS1, IllustrationS2, IllustrationS3,
  RecordatorioDemo, ResenasDemo, ResumenDiarioDemo,
  PresupuestosDemo, ReactivacionDemo,
} from './ServicesPage'

/* ── Sector pages map ────────────────────────────────────────── */

const SECTOR_PAGES = {
  dental:      { id: 'dental',      emoji: '🦷', name: 'Clínica Dental',    tagline: 'Agenda sin llamadas, más reseñas, menos no-shows.',                   price: 'Desde 200€/mes' },
  deporte:     { id: 'deporte',     emoji: '🏋️', name: 'Centro Deportivo',  tagline: 'Más retención, menos bajas — sin más personal.',                       price: 'Desde 200€/mes' },
  estetica:    { id: 'estetica',    emoji: '💆', name: 'Centro de Estética', tagline: 'Agenda llena todos los días, sin gestionarla tú.',                     price: 'Desde 150€/mes' },
  autoescuela: { id: 'autoescuela', emoji: '🚗', name: 'Autoescuela',        tagline: 'Matrículas online y seguimiento sin WhatsApps manuales.',              price: 'Desde 150€/mes' },
  reservas:    { id: 'reservas',    emoji: '📅', name: 'Sistema de Citas',   tagline: 'Tu propia agenda por WhatsApp, sin comisiones externas.',              price: 'Desde 150€/mes' },
  web:         { id: 'web',         emoji: '🌐', name: 'Web + IA Integrada', tagline: 'Una web que trabaja para ti, las 24 horas.',                           price: 'Desde 500€ setup' },
}

const EMBEDDED_PAGES = {
  dental:      DentalPage,
  estetica:    EsteticaPage,
  deporte:     GimnasioPage,
  autoescuela: AutoescuelaPage,
  reservas:    ReservasPage,
}

/* ── Agent definitions ───────────────────────────────────────── */

const AGENT_DEFS = {
  'Reservas 24/7 por WhatsApp': {
    badge: 'Chat & Voz',
    fullTitle: 'Reservas y citas 24/7',
    desc: 'El cliente reserva, cancela o cambia su cita sin llamar. A cualquier hora, en WhatsApp o en tu web.',
    illustration: <IllustrationS1 />,
    demoType: 'link',
    serviceId: 1,
  },
  'Recordatorios automáticos': {
    badge: 'Anti no-show',
    fullTitle: 'Recordatorios automáticos de cita',
    desc: 'Avisos antes de cada cita con confirmación incluida. El cliente confirma o cancela con un toque — sin llamar.',
    illustration: <AgentIllus emoji="🔔" accent="#F59E0B" />,
    demoType: 'inline',
    Demo: RecordatorioDemo,
    demoLabel: 'Flujo de recordatorio en tiempo real',
  },
  'Chatbot IA personalizado': {
    badge: 'Chat & Voz',
    fullTitle: 'Chatbot IA personalizado',
    desc: 'Responde preguntas frecuentes, cualifica leads y escala solo lo que necesita tu atención.',
    illustration: <IllustrationS1 />,
    demoType: 'link',
    serviceId: 1,
  },
  'Emails automáticos': {
    badge: 'Seguimiento',
    fullTitle: 'Seguimiento automático por email',
    desc: 'Bienvenida, seguimiento y reactivación adaptados a tu negocio. El sistema hace el seguimiento que nadie quiere hacer.',
    illustration: <AgentIllus emoji="📧" accent="#6366F1" />,
    demoType: 'inline',
    Demo: PresupuestosDemo,
    demoLabel: 'Seguimiento automático en acción',
  },
  'Facturación automática': {
    badge: 'Gestión rápida',
    fullTitle: 'Generación automática de facturas',
    desc: 'Facturas generadas, enviadas y registradas contablemente sin que toques nada. Cumple con Verifactu.',
    illustration: <IllustrationS2 />,
    demoType: 'link',
    serviceId: 2,
  },
  'Gestión documental IA': {
    badge: 'Orden inteligente',
    fullTitle: 'Gestión documental y clasificación de correos',
    desc: 'Extrae datos de PDFs y clasifica tu correo automáticamente. Tu oficina sin papeles ni bandeja de entrada colapsada.',
    illustration: <IllustrationS3 />,
    demoType: 'link',
    serviceId: 3,
  },
  'Web profesional con IA': {
    badge: 'Presencia digital',
    fullTitle: 'Web profesional con IA integrada',
    desc: 'Chatbot integrado, blog con publicación automática y formularios inteligentes conectados a tu sistema.',
    illustration: <AgentIllus emoji="🌐" accent="#3B82F6" />,
    demoType: 'page',
    pageTo: 'web',
  },
  'RRSS automatizadas': {
    badge: 'Contenido',
    fullTitle: 'Redes sociales automatizadas',
    desc: 'Publicación diaria en Instagram, LinkedIn y TikTok sin que lo tengas que tocar.',
    illustration: <AgentIllus emoji="📱" accent="#EC4899" />,
    demoType: 'page',
    pageTo: 'rrss',
  },
  'Reseñas automáticas en Google': {
    badge: 'Reputación',
    fullTitle: 'Reseñas en Google en automático',
    desc: 'Tras cada servicio, el agente envía un mensaje personalizado con enlace directo a Google. Sin pedirlo nunca más.',
    illustration: <AgentIllus emoji="⭐" accent="#EAB308" />,
    demoType: 'inline',
    Demo: ResenasDemo,
    demoLabel: 'Del servicio a la reseña, automático',
  },
  'Resumen diario del negocio': {
    badge: 'Control total',
    fullTitle: 'Resumen diario del negocio',
    desc: 'Recibes en Telegram un informe completo a la hora que configures: citas, facturación estimada y alertas urgentes.',
    illustration: <AgentIllus emoji="📊" accent="#6366F1" />,
    demoType: 'inline',
    Demo: ResumenDiarioDemo,
    demoLabel: 'Tu resumen diario, así llega',
  },
  'Reactivación de clientes inactivos': {
    badge: 'Retención',
    fullTitle: 'Reactivación de clientes inactivos',
    desc: 'Detecta clientes sin actividad y les envía un mensaje personalizado. Si responden, agenda la cita directamente.',
    illustration: <AgentIllus emoji="🔄" accent="#EC4899" />,
    demoType: 'inline',
    Demo: ReactivacionDemo,
    demoLabel: 'Cliente inactivo reactivado',
  },
}

/* ── Agent sets ──────────────────────────────────────────────── */

const AGENT_SETS = {
  citas:        [{ t: 'Reservas 24/7 por WhatsApp'         }, { t: 'Recordatorios automáticos'         }],
  comunicacion: [{ t: 'Chatbot IA personalizado'           }, { t: 'Emails automáticos'                }],
  admin:        [{ t: 'Facturación automática'             }, { t: 'Gestión documental IA'             }],
  presencia:    [{ t: 'Web profesional con IA'             }, { t: 'RRSS automatizadas'                }],
  web:          [{ t: 'Web profesional con IA'             }],
  software:     [],
}

function mergeAgents(interestArr) {
  const seen = new Set()
  const result = []
  for (const id of interestArr) {
    if (id === 'software') continue
    for (const a of (AGENT_SETS[id] || [])) {
      if (!seen.has(a.t)) { seen.add(a.t); result.push(a.t) }
    }
  }
  return result
}

function getConfig({ sector, interest }) {
  if (sector === 'curiosity') return null
  const interestArr = Array.isArray(interest) ? interest : (interest ? [interest] : [])
  if (interestArr.length === 0) return null

  const hasSoftware = interestArr.includes('software')
  const agents      = mergeAgents(interestArr)

  const sectorLabel = hasSoftware && interestArr.length === 1
    ? 'Tu software todo en uno'
    : 'Tu solución principal'

  if (sector !== 'otro') {
    const headlines = {
      dental:      { h: 'Para clínicas dentales',   s: 'Automatiza tu consulta: citas, recordatorios, reactivación de pacientes y más reseñas Google.' },
      deporte:     { h: 'Para centros deportivos',  s: 'Retén más socios y elimina la rotación sin contratar más personal.' },
      estetica:    { h: 'Para centros de estética', s: 'Agenda llena, clientas que vuelven y reseñas que atraen a las nuevas.' },
      autoescuela: { h: 'Para autoescuelas',        s: 'Matrículas más fáciles, seguimiento automático del alumno y menos gestión manual.' },
    }
    const hl = headlines[sector] || { h: 'Para tu negocio', s: 'Automatización IA adaptada a lo que realmente necesitas.' }
    return { headline: hl.h, subtext: hl.s, sectorPage: SECTOR_PAGES[sector], sectorLabel, agents, hasSoftware }
  }

  let otroPage = null
  if (hasSoftware || interestArr.includes('citas'))   otroPage = SECTOR_PAGES.reservas
  else if (interestArr.includes('web'))               otroPage = SECTOR_PAGES.web
  else if (interestArr.includes('presencia'))         otroPage = SECTOR_PAGES.web

  const otroHL = hasSoftware
    ? { h: 'Un software que lo gestione todo',    s: 'Diseñamos el sistema completo adaptado a las necesidades específicas de tu negocio.' }
    : interestArr.includes('citas')
    ? { h: 'Tu sistema de citas propio',          s: 'Sin Booksy, sin comisiones. Tu propia agenda por WhatsApp.' }
    : interestArr.includes('web')
    ? { h: 'Tu web profesional con IA integrada', s: 'Una web que trabaja para ti — con chatbot, captación de leads y reservas automáticas.' }
    : interestArr.includes('presencia')
    ? { h: 'Refuerza tu presencia online',        s: 'Web con IA integrada y redes sociales automatizadas.' }
    : interestArr.includes('comunicacion')
    ? { h: 'Automatiza la comunicación',          s: 'Chatbot IA, emails y seguimientos que nunca se olvidan.' }
    : { h: 'Reduce el trabajo administrativo',    s: 'Facturación, documentos y gestión sin intervención manual.' }

  return { headline: otroHL.h, subtext: otroHL.s, sectorPage: otroPage, sectorLabel, agents, hasSoftware }
}

/* ── Agent Card ──────────────────────────────────────────────── */

function AgentCard({ agentTitle, onNavigate, onViewFull }) {
  const [open, setOpen] = useState(false)
  const def = AGENT_DEFS[agentTitle]
  if (!def) return null

  const { badge, fullTitle, desc, illustration, demoType, Demo, demoLabel, serviceId, pageTo } = def
  const hasInlineDemo = demoType === 'inline' && Demo

  function handleCta() {
    if (demoType === 'link') {
      onViewFull && onViewFull()
      setTimeout(() => {
        document.getElementById(`service-${serviceId}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 200)
    } else if (demoType === 'page') {
      onNavigate && onNavigate(pageTo)
    } else {
      setOpen(v => !v)
    }
  }

  return (
    <div className={`service-card${open ? ' expanded' : ''}`}>
      <div className="service-card-main">
        <div className="service-visual">{illustration}</div>
        <div className="service-content">
          <div className="service-badge">{badge}</div>
          <h3 className="service-title">{fullTitle}</h3>
          <p className="service-copy">{desc}</p>
          <button className="btn-expand" onClick={handleCta}>
            <span>
              {demoType === 'inline'
                ? (open ? 'Cerrar' : '¡Pruébalo aquí mismo!')
                : demoType === 'link'
                ? 'Ver demo interactiva en El Taller'
                : 'Ver más detalles'}
            </span>
            {demoType === 'inline' && (
              <ChevronDown size={14} className={`btn-icon${open ? ' rotated' : ''}`} />
            )}
            {demoType !== 'inline' && <ArrowRight size={14} className="btn-icon" />}
          </button>
        </div>
      </div>

      {open && hasInlineDemo && (
        <div className="service-details-panel">
          <div className="panel-grid panel-grid--full">
            <div className="panel-col panel-demo-area">
              <p className="panel-subtitle"><Rocket size={15} />{demoLabel}</p>
              <Demo />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

/* ── Main component ──────────────────────────────────────────── */

export default function PersonalizedHome({ profile, onNavigate, onViewFull, onReset }) {
  const config = getConfig(profile)

  if (!config) {
    onViewFull()
    return null
  }

  const { headline, subtext, sectorPage, sectorLabel, agents, hasSoftware } = config
  const SectorComp = hasSoftware && sectorPage ? EMBEDDED_PAGES[sectorPage.id] : null

  return (
    <div className="ph-page">
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <div className="ph-hero">
        <div className="ph-badge">✨ Recomendado para ti</div>
        <h1>{headline}</h1>
        <p>{subtext}</p>
        <div className="ph-hero-btns">
          <button className="hb1" onClick={() => onViewFull('contacto')}>Hablar con nosotros</button>
          <button className="hb2" onClick={() => onViewFull()}>Ver la web completa</button>
        </div>
      </div>

      <div className="ph-body">

        {/* ── Software / Planes embebidos ───────────────────────── */}
        {SectorComp && (
          <div className="ph-section">
            <div className="ph-lbl">{sectorLabel}</div>

            {/* Cabecera de la sección de planes */}
            <div className="ph-plans-header">
              <span className="ph-plans-sector">{sectorPage.emoji} {sectorPage.name}</span>
              <p className="ph-plans-tagline">{sectorPage.tagline}</p>
            </div>

            {/* Plan cards con diseño original */}
            <div className="ph-plans-wrap">
              <SectorComp embedded />
            </div>

            <div className="ph-plans-foot">
              <button className="hb2" onClick={() => onNavigate(sectorPage.id)}>
                Ver la página completa <ArrowRight size={13} />
              </button>
            </div>
          </div>
        )}

        {/* ── Soft-card para sector sin embedded (web, reservas sin plan) ── */}
        {!SectorComp && sectorPage && (
          <div className="ph-section">
            <div className="ph-lbl">{sectorLabel}</div>
            <div className="ph-card" onClick={() => onNavigate(sectorPage.id)}>
              <div className="ph-card-inner">
                <div className="ph-card-tag">{sectorPage.emoji} {sectorPage.name}</div>
                <h3>{sectorPage.tagline}</h3>
              </div>
              <div className="ph-card-foot">
                <div className="ph-price">{sectorPage.price}</div>
                <button
                  className="hb1 hb1--sm"
                  onClick={e => { e.stopPropagation(); onNavigate(sectorPage.id) }}
                >
                  Ver oferta completa <ArrowRight size={13} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── Agentes à la carte ────────────────────────────────── */}
        {agents.length > 0 && (
          <div className="ph-section">
            <div className="ph-lbl">
              {hasSoftware ? '¿O prefieres contratar solo una función?' : 'Tus herramientas recomendadas'}
            </div>
            {hasSoftware && (
              <p className="ph-agents-intro">
                Si no necesitas el software completo, también puedes contratar cada herramienta por separado —
                sin permanencia y sin el resto del sistema.
              </p>
            )}
            <div className="ph-agents-list">
              {agents.map(agentTitle => (
                <AgentCard
                  key={agentTitle}
                  agentTitle={agentTitle}
                  onNavigate={onNavigate}
                  onViewFull={onViewFull}
                />
              ))}
            </div>
            <div className="ph-agents-cta">
              <button className="hb2" onClick={() => onViewFull('agentes')}>Ver el catálogo completo de agentes →</button>
            </div>
          </div>
        )}
      </div>

      {/* ── Footer ───────────────────────────────────────────────── */}
      <div className="ph-end">
        <button className="hb2" onClick={() => onViewFull()}>Ver la web completa →</button>
        <button className="ph-link" onClick={onReset}>Cambiar mis preferencias</button>
      </div>
    </div>
  )
}
