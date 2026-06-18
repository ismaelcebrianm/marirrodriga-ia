import { useState } from 'react'
import {
  ChevronDown, Mic, MessageSquare, Phone, Send, Rocket,
  PlayCircle, Check, ArrowRight, Mail, FileText,
  FolderKey, Database, Bell, Bot, Star
} from 'lucide-react'
import StoryboardPlayer  from '../simulators/StoryboardPlayer'
import VoiceSimulator    from '../simulators/VoiceSimulator'
import TelegramSimulator from '../simulators/TelegramSimulator'
import InvoiceSimulator  from '../simulators/InvoiceSimulator'
import DocumentSimulator from '../simulators/DocumentSimulator'
import LeadSimulator     from '../simulators/LeadSimulator'

/* ─── ILLUSTRATION COMPONENTS ───────────────────────────────── */

function IllustrationS1() {
  return (
    <div className="illustration-s1">
      <div className="phone-mockup-wrap">
        <div className="phone-notch" />
        <div className="phone-screen-split">
          <div className="split-half split-left">
            <div className="wave-container">
              {[...Array(6)].map((_, i) => <div key={i} className="wave-bar" />)}
            </div>
            <span className="split-label"><Mic size={8} /> Voz</span>
          </div>
          <div className="split-half split-right">
            <div className="chat-mini-bubbles">
              <div className="mini-bubble bubble-in">¿Precios?</div>
              <div className="mini-bubble bubble-out">¡Hola! Agenda...</div>
            </div>
            <span className="split-label"><MessageSquare size={8} /> Chat</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function IllustrationS2() {
  return (
    <div className="illustration-s2">
      <div className="invoice-flow-wrap">
        <div className="tg-msg-visual">
          <Send size={14} />
          <span>Instalación fontanería, 150€ + IVA</span>
        </div>
        <div className="flow-arrow">↓</div>
        <div className="invoice-pdf-visual">
          <div className="pdf-header-v">FACTURA</div>
          <div className="pdf-line-v" />
          <div className="pdf-line-v short" />
          <div className="pdf-total-v">Total: 181.50 €</div>
          <div className="pdf-stamp">PAGADO</div>
        </div>
      </div>
    </div>
  )
}

function IllustrationS3() {
  return (
    <div className="illustration-s3">
      <div className="funnel-wrap">
        <div className="funnel-docs">
          <div className="funnel-doc"><Mail size={11} /> Email</div>
          <div className="funnel-doc"><FileText size={11} /> PDF</div>
        </div>
        <div className="funnel-shape">
          <div className="funnel-glow" />
        </div>
        <div className="funnel-outputs">
          <div className="funnel-out"><FolderKey size={11} /> Clasificado</div>
          <div className="funnel-out"><Database size={11} /> Sheets</div>
        </div>
      </div>
    </div>
  )
}

function IllustrationS4() {
  return (
    <div className="illustration-s4">
      <div className="radar-wrap">
        <div className="radar-circle">
          <div className="radar-sweep" />
          <div className="radar-blip blip-1" />
          <div className="radar-blip blip-2 active" />
        </div>
        <div className="notif-bubble">
          <div className="notif-header">
            <Bell size={11} />
            <strong>Cliente de alto valor</strong>
          </div>
          <span className="notif-score">Interés: 9.5/10 · Querrá comprar</span>
        </div>
      </div>
    </div>
  )
}

/* ─── STORYBOARD DATA ────────────────────────────────────────── */

const STORYBOARDS = [
  {
    videoTitle: 'Mari Robot explica: Mitos y herramientas del Agente',
    duration: 15,
    slides: [
      { scene: 'Escena 1/3: Mitos del Bot', script: '"¡Hola! Soy Mari Robot. Olvídate del bot típico que solo dice \'No te entiendo\'. Nuestros agentes tienen <strong>Tools</strong>. Pueden actuar por sí mismos."' },
      { scene: 'Escena 2/3: Herramientas conectadas', script: '"Por ejemplo, si un cliente pide cita, el bot consulta el calendario en tiempo real, reserva el hueco y lo guarda en tu CRM de inmediato."' },
      { scene: 'Escena 3/3: Prompt maestro', script: '"Configuramos un prompt de personalidad. Un restaurante lo usará para reservas con humor, y un abogado para filtrar consultas serias automáticamente."' },
    ],
    scriptFooter: 'Conexión CRM, Herramientas en tiempo real, Personalidad del prompt.',
  },
  {
    videoTitle: 'Mari Robot explica: Facturas con n8n y Verifactu',
    duration: 12,
    slides: [
      { scene: 'Escena 1/3: El día a día', script: '"Imagina que acabas de salir de hacer un trabajo. En vez de esperar a llegar a la oficina, abres Telegram desde el móvil..."' },
      { scene: 'Escena 2/3: Envío por Telegram', script: '"Envías un mensaje rápido: \'Reparación de fontanería a Juan, 150 euros\'. Nuestro flujo en n8n procesa el texto en segundos."' },
      { scene: 'Escena 3/3: Cálculo y conectividad', script: '"El sistema calcula impuestos, autogenera el PDF y, opcionalmente, lo envía a tu software contable cumpliendo con <strong>Verifactu</strong>."' },
    ],
    scriptFooter: 'Workflow n8n, Generación de PDFs, Normativa Verifactu.',
  },
  {
    videoTitle: 'Mari Robot explica: Extracción de datos y Notion CRM',
    duration: 13,
    slides: [
      { scene: 'Escena 1/3: Pérdida de tiempo', script: '"¿Pasas horas leyendo PDFs de 50 páginas? La IA lee y entiende el contexto completo en milisegundos."' },
      { scene: 'Escena 2/3: Extracción', script: '"La IA extrae datos clave: fechas, importes, nombres, y los organiza directamente en tablas de Notion o Google Sheets."' },
      { scene: 'Escena 3/3: Auto-respuestas', script: '"Además, clasifica el correo por prioridad (Urgente, Reclamación, Venta) y redacta borradores que solo tienes que revisar y enviar."' },
    ],
    scriptFooter: 'Clasificación de urgencia, Integración Notion/Sheets, OCR inteligente.',
  },
  {
    videoTitle: 'Mari Robot explica: Scoring de Leads automatizado',
    duration: 11,
    slides: [
      { scene: 'Escena 1/3: Tráfico inútil', script: '"¿Tus comerciales pierden tiempo llamando a leads que solo querían curiosear? Eso pasa cuando tratas a todos por igual."' },
      { scene: 'Escena 2/3: Scoring inteligente', script: '"Nuestros formularios se conectan a un scoring por IA. Si alguien rellena con datos de una gran empresa y presupuesto alto, la IA lo cualifica de inmediato."' },
      { scene: 'Escena 3/3: Alerta en tiempo real', script: '"Instantáneamente, tu equipo recibe una notificación en Slack o Telegram: <strong>\'!¡Cliente de alto valor!\'</strong>. Con su perfil completo y botón para llamarle."' },
    ],
    scriptFooter: 'Filtro de contactos, Notificaciones Slack/Telegram, CRM Sync.',
  },
]

/* ─── SERVICE CARD ───────────────────────────────────────────── */

function ServiceCard({ id, open, onToggle, badge, title, desc, illustration, storyboard, demoLabel, demoContent }) {
  return (
    <div className={`service-card${open ? ' expanded' : ''}`} id={`service-${id}`}>
      <div className="service-card-main">
        <div className="service-visual">{illustration}</div>
        <div className="service-content">
          <div className="service-badge">{badge}</div>
          <h3 className="service-title">{title}</h3>
          <p className="service-copy">{desc}</p>
          <button className="btn-expand" onClick={() => onToggle(id)}>
            <span>{open ? 'Cerrar simulador' : '¡Pruébalo aquí mismo!'}</span>
            <ChevronDown size={14} className={`btn-icon${open ? ' rotated' : ''}`} />
          </button>
        </div>
      </div>

      {open && (
        <div className="service-details-panel">
          <div className="panel-grid">
            <div className="panel-col panel-video-area">
              <StoryboardPlayer {...storyboard} />
            </div>
            <div className="panel-col panel-demo-area">
              <p className="panel-subtitle">
                <Rocket size={15} />
                {demoLabel}
              </p>
              {demoContent}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

/* ─── SERVICE 1: DEMO WITH TABS ──────────────────────────────── */

function VoiceAndTelegramTabs() {
  const [tab, setTab] = useState('voz')
  return (
    <div className="sub-demo-container active">
      <div className="panel-header-row">
        <div className="demo-selector-tabs">
          <button className={`demo-tab${tab === 'voz' ? ' active' : ''}`} onClick={() => setTab('voz')}>
            <Phone size={13} /> Voz
          </button>
          <button className={`demo-tab${tab === 'telegram' ? ' active' : ''}`} onClick={() => setTab('telegram')}>
            <Send size={13} /> WhatsApp / Telegram
          </button>
        </div>
      </div>
      {tab === 'voz'      && <><p className="demo-instructions">Simula una llamada interactiva con el agente conversacional:</p><VoiceSimulator /></>}
      {tab === 'telegram' && <><p className="demo-instructions">Explora una demostración de chat con nuestro bot de personalidad:</p><TelegramSimulator /></>}
    </div>
  )
}

/* ─── CONTACT GIANT CARD ─────────────────────────────────────── */

const N8N_CUSTOM  = import.meta.env.VITE_N8N_WEBHOOK_URL || ''
const CHATBOT_URL = 'https://t.me/marirrodrigaIA_bot'

function GiantContactCard() {
  const [idea,    setIdea]    = useState('')
  const [contact, setContact] = useState('')
  const [modal,   setModal]   = useState(false)

  async function submit(e) {
    e.preventDefault()
    if (!idea.trim() || !contact.trim()) return
    if (N8N_CUSTOM) {
      try { await fetch(N8N_CUSTOM, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ idea, contact, source: 'taller-proyecto-medida' }) }) } catch {}
    }
    setIdea('')
    setContact('')
    setModal(true)
  }

  return (
    <>
      <div className="project-card" id="proyecto-medida">
        <div className="project-card__glow" />

        {/* HEADER */}
        <div className="project-card__header">
          <div className="slbl">¿Tienes en mente un proceso muy tuyo?</div>
          <h2 className="project-card__title">
            Lo automatizamos<br />a medida.
          </h2>
          <p className="project-card__subtitle">
            La verdadera magia no está en una sola herramienta — está en encadenarlas.
            Diseñamos flujos que resuelven tareas de principio a fin: desde que llega el primer
            contacto hasta que el trabajo queda registrado, facturado y confirmado, sin que
            tú toques nada. Si tu negocio tiene un proceso especial, lo construimos a tu medida.
          </p>
        </div>

        {/* OPTIONS */}
        <div className="project-card__options">

          {/* CHATBOT — RECOMENDADO */}
          <div className="project-option project-option--featured">
            <div className="project-option__badge">
              <Star size={10} />
              Recomendado
            </div>
            <div className="project-option__icon"><Bot size={22} /></div>
            <h3 className="project-option__title">Habla con nuestro agente</h3>
            <p className="project-option__desc">
              Te guía paso a paso para entender qué necesitas y cómo lograrlo.
              Puedes comunicarte por <strong>audio o por chat</strong> — como prefieras.
              Retoma la conversación a lo largo de días mientras piensas qué más te gustaría
              automatizar en tu negocio. El agente analiza tu caso y te propone
              <strong> soluciones reales</strong>, no respuestas genéricas.
            </p>
            <a
              className="project-option__cta project-option__cta--primary"
              href={CHATBOT_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Abrir el agente <ArrowRight size={15} />
            </a>
          </div>

          {/* FORMULARIO */}
          <div className="project-option">
            <div className="project-option__icon project-option__icon--secondary"><Mail size={22} /></div>
            <h3 className="project-option__title">O déjanos tu contacto</h3>
            <p className="project-option__desc project-option__desc--short">
              Cuéntanos tu idea brevemente y te respondemos con un análisis de viabilidad en menos de 24 horas.
            </p>
            <form className="project-form" onSubmit={submit}>
              <div className="form-group-custom">
                <label>Tu proyecto o idea:</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Ej: Cuando un cliente firma un contrato, quiero que se cree una carpeta en Drive y se le envíe un email de bienvenida automáticamente..."
                  value={idea}
                  onChange={e => setIdea(e.target.value)}
                />
              </div>
              <div className="form-group-custom">
                <label>Email o WhatsApp:</label>
                <input
                  type="text"
                  required
                  placeholder="+34 600 000 000 · tu@email.com"
                  value={contact}
                  onChange={e => setContact(e.target.value)}
                />
              </div>
              <button type="submit" className="project-option__cta project-option__cta--secondary">
                Enviar <ArrowRight size={14} />
              </button>
            </form>
          </div>

        </div>
      </div>

      {modal && (
        <div className="modal-overlay active" onClick={e => e.target === e.currentTarget && setModal(false)}>
          <div className="success-modal-card">
            <div className="check-icon-circle">
              <Check size={30} />
            </div>
            <h3 className="modal-title">¡Solicitud recibida!</h3>
            <p className="modal-text">Nos pondremos en contacto contigo en menos de 24 horas con un análisis de viabilidad de tu proyecto.</p>
            <button className="btn-modal-close" onClick={() => setModal(false)}>Cerrar</button>
          </div>
        </div>
      )}
    </>
  )
}

/* ─── MAIN PAGE ──────────────────────────────────────────────── */

export default function ServicesPage({ onNavigate }) {
  const [openCard, setOpenCard] = useState(null)

  function toggle(id) {
    setOpenCard(prev => prev === id ? null : id)
  }

  const services = [
    {
      id: 1,
      badge: 'Voz & Texto',
      title: '1. Asistentes y Agentes Conversacionales',
      desc: 'Asistentes virtuales que no solo responden, sino que ejecutan. Atiende a tus clientes, resuelve dudas y agenda citas en automático, 24/7.',
      illustration: <IllustrationS1 />,
      storyboard: STORYBOARDS[0],
      demoLabel: 'Demo interactiva — elige canal',
      demoContent: <VoiceAndTelegramTabs />,
    },
    {
      id: 2,
      badge: 'Gestión rápida',
      title: '2. Generación Automática de Facturas',
      desc: 'Tus facturas listas en segundos. Cuéntale al sistema qué has vendido y recibe el PDF estructurado y listo para enviar.',
      illustration: <IllustrationS2 />,
      storyboard: STORYBOARDS[1],
      demoLabel: 'Pruébalo gratis en tiempo real',
      demoContent: <InvoiceSimulator />,
    },
    {
      id: 3,
      badge: 'Orden inteligente',
      title: '3. Gestión Documental y Clasificación de Correos',
      desc: 'Tu oficina sin papeles ni bandejas de entrada colapsadas. Extraemos datos clave de tus PDFs y filtramos tu correo por ti.',
      illustration: <IllustrationS3 />,
      storyboard: STORYBOARDS[2],
      demoLabel: 'Pon a prueba la IA lectora',
      demoContent: <DocumentSimulator />,
    },
    {
      id: 4,
      badge: 'Conversión',
      title: '4. Conversión de clientes potenciales',
      desc: 'Deja de perder tiempo con contactos que no van a contratar. Identificamos quién tiene intención real de compra y alertamos a tu equipo antes de que la oportunidad se enfríe.',
      illustration: <IllustrationS4 />,
      storyboard: STORYBOARDS[3],
      demoLabel: 'Simulador de filtro de clientes (rol inverso)',
      demoContent: <><p className="demo-instructions">Vas a jugar el papel del dueño del negocio. Rellena el formulario y mira la alerta que recibe tu equipo:</p><LeadSimulator /></>,
    },
  ]

  return (
    <>
      {/* Hero */}
      <div className="svcs-hero">
        <div className="svc-note"><div className="bdot" />Demos interactivas · Sin registro · Sin instalaciones</div>
        <h1>El Taller de <em>automatización.</em></h1>
        <p>Elige una herramienta, interactúa con el simulador en tiempo real y comprueba tú mismo cuánto tiempo recuperarías en tu negocio.</p>
      </div>

      {/* Catalog */}
      <main className="catalog-section">
        <div className="container">
          <div className="section-title-wrapper">
            <h2 className="section-title">Herramientas del Taller</h2>
            <p className="section-desc">Elige una herramienta, despliégala y prueba el simulador interactivo en tiempo real. Sin registro, sin compromiso.</p>
          </div>

          <div className="services-grid">
            {services.map(s => (
              <ServiceCard
                key={s.id}
                open={openCard === s.id}
                onToggle={toggle}
                {...s}
              />
            ))}
          </div>
        </div>
      </main>
    </>
  )
}
