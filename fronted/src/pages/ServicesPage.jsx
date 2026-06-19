import { useState } from 'react'
import {
  ChevronDown, Mic, MessageSquare, Send, Rocket,
  Check, ArrowRight, Mail, FileText, FolderKey, Database,
  Bell, Bot, Star, Globe, Rss, Brain, Zap
} from 'lucide-react'
import TelegramSimulator from '../simulators/TelegramSimulator'
import InvoiceSimulator  from '../simulators/InvoiceSimulator'
import DocumentSimulator from '../simulators/DocumentSimulator'
import LeadSimulator     from '../simulators/LeadSimulator'

/* ─── ISMABOT CARD ───────────────────────────────────────────── */

const CHATBOT_URL = 'https://t.me/marirrodrigaIA_bot'

const ISMABOT_FEATURES = [
  { icon: Brain,         label: 'Memoria de chat',         desc: 'Recuerda lo que le has contado, sesión a sesión.' },
  { icon: Mic,           label: 'Texto, imagen y audio',   desc: 'Escríbele, mándale una foto o envía un audio de voz.' },
  { icon: MessageSquare, label: 'Conversación sin prisa',  desc: 'Vuelve cuando quieras. Retoma donde lo dejaste.' },
  { icon: FileText,      label: 'Informes personalizados', desc: 'Te genera un plan adaptado a tu negocio concreto.' },
]

function IsmabotCard() {
  const [open, setOpen] = useState(false)
  return (
    <div className={`service-card service-card--ismabot${open ? ' expanded' : ''}`}>
      <div className="service-card-main">
        <div className="service-visual ismabot-illustration">
          <div className="ismabot-illus-icon"><Bot size={36} /></div>
          <div className="ismabot-illus-dots">
            <span /><span /><span />
          </div>
          <div className="ismabot-illus-bubble">Hola, ¿qué podrías automatizar?</div>
        </div>
        <div className="service-content">
          <div className="service-badge service-badge--ismabot"><Star size={10} /> Agente a medida</div>
          <h3 className="service-title">ISMABOT — Tu guía sin compromiso</h3>
          <p className="service-copy">
            Un agente de IA que te escucha, te hace las preguntas correctas y te ayuda a visualizar
            cómo quedaría tu negocio con automatización. Sin jerga técnica, sin presión comercial.
            Al final puede generarte un informe o plan personalizado.
          </p>
          <button className="btn-expand btn-expand--ismabot" onClick={() => setOpen(v => !v)}>
            <span>{open ? 'Cerrar' : 'Hablar con ISMABOT'}</span>
            <ChevronDown size={14} className={`btn-icon${open ? ' rotated' : ''}`} />
          </button>
        </div>
      </div>

      {open && (
        <div className="service-details-panel service-details-panel--ismabot">
          <div className="ismabot-expand-grid">
            <div>
              <p className="ismabot-expand-title">¿Qué puede hacer por ti?</p>
              <div className="ismabot-expand-features">
                {ISMABOT_FEATURES.map(({ icon: Icon, label, desc }) => (
                  <div key={label} className="ismabot-expand-feat">
                    <div className="ismabot-expand-feat__icon"><Icon size={15} /></div>
                    <div>
                      <div className="ismabot-expand-feat__label">{label}</div>
                      <div className="ismabot-expand-feat__desc">{desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="ismabot-expand-cta-col">
              <p className="ismabot-expand-mission">
                Su misión es una sola: que cuando acabes la conversación tengas claro qué automatizar
                y cómo encajaría en tu negocio. Sin necesidad de saber de tecnología.
              </p>
              <a className="ismabot-cta" href={CHATBOT_URL} target="_blank" rel="noopener noreferrer">
                Abrir ISMABOT en Telegram <ArrowRight size={15} />
              </a>
              <p className="ismabot-expand-note">Disponible ahora · Gratis · Sin registro</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

/* ─── ILLUSTRATIONS ──────────────────────────────────────────── */

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

function IllustrationS5() {
  return (
    <div className="illustration-s5">
      <div className="browser-mockup">
        <div className="browser-bar">
          <div className="browser-dots">
            <span /><span /><span />
          </div>
          <div className="browser-url">marirrodriga.ia</div>
        </div>
        <div className="browser-content">
          <div className="site-preview-hero" />
          <div className="site-preview-grid">
            <div className="site-preview-block" />
            <div className="site-preview-block" />
            <div className="site-preview-block" />
          </div>
        </div>
      </div>
    </div>
  )
}

function IllustrationS6() {
  return (
    <div className="illustration-s6">
      <div className="content-flow-wrap">
        <div className="content-source"><Rss size={13} /> Noticias IA</div>
        <div className="content-arrow">↓</div>
        <div className="content-brain">
          <Zap size={16} />
          <span>IA</span>
        </div>
        <div className="content-arrow">↓</div>
        <div className="content-channels">
          <div className="content-ch"><Globe size={11} /> Blog</div>
          <div className="content-ch"><Send size={11} /> RRSS</div>
          <div className="content-ch"><Mail size={11} /> News</div>
        </div>
      </div>
    </div>
  )
}

/* ─── FLOW EXPANSION ─────────────────────────────────────────── */

function FlowExpansion({ title, core, steps, savings, proof, onNavigate }) {
  return (
    <div className="flow-expansion">
      <h4 className="flow-exp-title">{title || '¿Y si lo llevamos más lejos?'}</h4>

      <div className="flow-exp-chain">
        <div className="flow-node flow-node--core">
          <span className="flow-node-dot" />
          {core}
        </div>
        {steps.map((step, i) => (
          <div key={i} className="flow-step">
            <div className="flow-connector" />
            <div className="flow-node">
              <span className="flow-node-icon">{step.icon}</span>
              <span>{step.label}</span>
            </div>
          </div>
        ))}
      </div>

      {savings && (
        <div className="flow-savings">
          <p className="savings-desc">{savings.label}</p>
        </div>
      )}

      {proof && (
        <div className="flow-proof">
          <p className="proof-label">La prueba en vivo:</p>
          <div className="proof-links">
            {proof.map((p, i) =>
              p.onClick
                ? <button key={i} className="proof-link" onClick={() => p.onClick(onNavigate)}>{p.label} →</button>
                : <a key={i} className="proof-link" href={p.href} target="_blank" rel="noopener noreferrer">{p.label} →</a>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

/* ─── EXPANSION DATA ─────────────────────────────────────────── */

const EXPANSIONS = [
  {
    core: 'Atiende consultas y agenda citas 24/7',
    steps: [
      { icon: '🔔', label: 'Recuerda la cita al cliente 1 hora antes por WhatsApp o SMS' },
      { icon: '⭐', label: 'Solicita reseña en Google Business tras el servicio' },
      { icon: '🧾', label: 'Genera la factura del servicio automáticamente' },
      { icon: '📊', label: 'Actualiza historial del cliente en tu CRM' },
      { icon: '📋', label: 'Prepara el informe mensual de citas y facturación' },
    ],
    savings: {
      label: 'Atiende, agenda y hace seguimiento a cualquier hora — también a las 3 de la mañana, en festivos y fines de semana, cuando ningún empleado estaría cogiendo el teléfono.',
    }
  },
  {
    core: 'Mensaje de texto → Factura PDF lista al instante',
    steps: [
      { icon: '✅', label: 'Validación y envío por Verifactu (obligatorio desde 2026)' },
      { icon: '📧', label: 'Envío automático al cliente por email' },
      { icon: '⏰', label: 'Recordatorio de pago si no abona en 15 días' },
      { icon: '📑', label: 'Registro contable automático en Google Sheets' },
      { icon: '📂', label: 'Carpeta Drive organizada con tus facturas y justificantes' },
      { icon: '📆', label: 'Informe mensual listo para la gestoría en un clic' },
    ],
    savings: {
      label: 'Facturar, cuadrar la contabilidad y preparar documentación para gestoría consume entre 15 y 20 horas al mes en la mayoría de negocios. El agente lo hace solo — y cumple con Verifactu de serie.',
    }
  },
  {
    core: 'Extrae datos de PDFs y clasifica correos por IA',
    steps: [
      { icon: '💬', label: 'Auto-respuesta según urgencia: venta, reclamación o rutina' },
      { icon: '📁', label: 'Archivado automático en Drive por categoría y fecha' },
      { icon: '📲', label: 'Alerta Telegram si detecta un correo urgente' },
      { icon: '🗃️', label: 'CRM actualizado con datos extraídos automáticamente' },
      { icon: '📊', label: 'Informe semanal de actividad de bandeja de entrada' },
    ],
    savings: {
      label: 'Clasificar correos, extraer datos de facturas y archivar documentos: tareas que bloquean horas de trabajo real cada día. El agente las procesa en tiempo real, sin acumulación.',
    }
  },
  {
    core: 'Score IA + alerta inmediata al equipo comercial',
    steps: [
      { icon: '🔍', label: 'Cruza LinkedIn, Google Maps, noticias y registros mercantiles' },
      { icon: '📧', label: 'Email de bienvenida personalizado en segundos' },
      { icon: '🔁', label: 'Seguimiento automático si no responde en 24h' },
      { icon: '👤', label: 'Asignación automática al comercial correcto en CRM' },
      { icon: '📈', label: 'Reporte semanal de conversión y pipeline' },
    ],
    savings: {
      label: 'Un comercial tarda semanas en localizar, investigar y cualificar 50 leads. Un agente lo hace en minutos cruzando múltiples fuentes de datos: LinkedIn, Google Maps, noticias de empresa, registros mercantiles. Tu equipo solo habla con quien ya está listo para comprar.',
    }
  },
  {
    title: 'Qué incluye',
    core: 'Diseño web personalizado desde cero',
    steps: [
      { icon: '📱', label: 'Responsive: perfecta en móvil, tablet y escritorio' },
      { icon: '⚡', label: 'Velocidad optimizada — Core Web Vitals en verde' },
      { icon: '🔍', label: 'SEO técnico y semántico incluido desde el día 1' },
      { icon: '🤖', label: 'Conectada a tus automatizaciones n8n (chatbot, leads, blog...)' },
      { icon: '🛠️', label: 'Mantenimiento y actualizaciones incluidas' },
    ],
    proof: [
      { label: 'Ver esta misma web (hecha por nosotros)', href: '/' }
    ]
  },
  {
    title: 'Cómo funciona',
    core: 'IA selecciona noticias relevantes de tu sector',
    steps: [
      { icon: '✍️', label: 'Redacta artículos completos adaptados a tu audiencia' },
      { icon: '🎨', label: 'Genera imagen editorial única por artículo con IA' },
      { icon: '🌐', label: 'Publica en tu blog automáticamente' },
      { icon: '📲', label: 'Adapta el contenido para LinkedIn, Instagram y Twitter/X' },
      { icon: '📩', label: 'Newsletter semanal a tus suscriptores sin tocar nada' },
    ],
    proof: [
      { label: 'Ver el blog de IA (publicación automática)', onClick: (nav) => nav && nav('blog') },
    ]
  },
]

/* ─── SERVICE CARD ───────────────────────────────────────────── */

function ServiceCard({ id, open, onToggle, badge, title, desc, illustration, expansionIndex, demoLabel, demoContent, onNavigate }) {
  const expansion = EXPANSIONS[expansionIndex]
  const hasDemo = Boolean(demoContent)
  return (
    <div className={`service-card${open ? ' expanded' : ''}`} id={`service-${id}`}>
      <div className="service-card-main">
        <div className="service-visual">{illustration}</div>
        <div className="service-content">
          <div className="service-badge">{badge}</div>
          <h3 className="service-title">{title}</h3>
          <p className="service-copy">{desc}</p>
          <button className="btn-expand" onClick={() => onToggle(id)}>
            <span>{open ? 'Cerrar' : (hasDemo ? '¡Pruébalo aquí mismo!' : 'Ver más detalles')}</span>
            <ChevronDown size={14} className={`btn-icon${open ? ' rotated' : ''}`} />
          </button>
        </div>
      </div>

      {open && (
        <div className="service-details-panel">
          <div className={`panel-grid${!hasDemo ? ' panel-grid--full' : ''}`}>
            <div className="panel-col panel-flow-area">
              <FlowExpansion {...expansion} onNavigate={onNavigate} />
            </div>
            {hasDemo && (
              <div className="panel-col panel-demo-area">
                <p className="panel-subtitle">
                  <Rocket size={15} />
                  {demoLabel}
                </p>
                {demoContent}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}


/* ─── CONTACT GIANT CARD ─────────────────────────────────────── */

const N8N_CUSTOM  = import.meta.env.VITE_N8N_WEBHOOK_URL || ''

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
    setIdea(''); setContact(''); setModal(true)
  }

  return (
    <>
      <div className="project-card" id="proyecto-medida">
        <div className="project-card__glow" />
        <div className="project-card__header">
          <div className="slbl">¿Tienes en mente un proceso muy tuyo?</div>
          <h2 className="project-card__title">Lo automatizamos<br />a medida.</h2>
          <p className="project-card__subtitle">
            La verdadera magia no está en una sola herramienta — está en encadenarlas.
            Diseñamos flujos que resuelven tareas de principio a fin: desde que llega el primer
            contacto hasta que el trabajo queda registrado, facturado y confirmado, sin que
            tú toques nada. Si tu negocio tiene un proceso especial, lo construimos a tu medida.
          </p>
        </div>
        <div className="project-card__options">
          <div className="project-option project-option--featured">
            <div className="project-option__badge"><Star size={10} />Recomendado</div>
            <div className="project-option__icon"><Bot size={22} /></div>
            <h3 className="project-option__title">Habla con nuestro agente</h3>
            <p className="project-option__desc">
              Te guía paso a paso para entender qué necesitas y cómo lograrlo.
              Analiza tu caso y te propone <strong>soluciones reales</strong>, no respuestas genéricas.
              Con memoria de conversación y capacidad para generar informes personalizados.
            </p>
            <a className="project-option__cta project-option__cta--primary" href={CHATBOT_URL} target="_blank" rel="noopener noreferrer">
              Abrir el agente <ArrowRight size={15} />
            </a>
          </div>
          <div className="project-option">
            <div className="project-option__icon project-option__icon--secondary"><Mail size={22} /></div>
            <h3 className="project-option__title">O déjanos tu contacto</h3>
            <p className="project-option__desc project-option__desc--short">
              Cuéntanos tu idea brevemente y te respondemos con un análisis de viabilidad en menos de 24 horas.
            </p>
            <form className="project-form" onSubmit={submit}>
              <div className="form-group-custom">
                <label>Tu proyecto o idea:</label>
                <textarea required rows={3}
                  placeholder="Ej: Cuando un cliente firma un contrato, quiero que se cree una carpeta en Drive y se le envíe un email de bienvenida automáticamente..."
                  value={idea} onChange={e => setIdea(e.target.value)} />
              </div>
              <div className="form-group-custom">
                <label>Email o WhatsApp:</label>
                <input type="text" required placeholder="+34 600 000 000 · tu@email.com"
                  value={contact} onChange={e => setContact(e.target.value)} />
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
            <div className="check-icon-circle"><Check size={30} /></div>
            <h3 className="modal-title">¡Solicitud recibida!</h3>
            <p className="modal-text">Nos pondremos en contacto contigo en menos de 24 horas con un análisis de viabilidad de tu proyecto.</p>
            <button className="btn-modal-close" onClick={() => setModal(false)}>Cerrar</button>
          </div>
        </div>
      )}
    </>
  )
}

/* ─── QUICK NAV ──────────────────────────────────────────────── */

const NAV_ITEMS = [
  { id: 1, label: 'Chat & Voz' },
  { id: 2, label: 'Facturas' },
  { id: 3, label: 'Documentos' },
  { id: 4, label: 'Leads' },
  { id: 5, label: 'Web' },
  { id: 6, label: 'Blog & RRSS' },
]

function TallerNav({ onGo }) {
  return (
    <nav className="taller-nav">
      <span className="taller-nav__label">Ir a:</span>
      {NAV_ITEMS.map(({ id, label }) => (
        <button key={id} className="taller-nav-btn" onClick={() => onGo(id)}>
          <span className="taller-nav-num">{id}</span>
          {label}
        </button>
      ))}
    </nav>
  )
}

/* ─── DEMO GRÁFICOS: WEB & RRSS ──────────────────────────────── */

function WebPreviewDemo({ onNavigate }) {
  return (
    <div className="demo-preview demo-preview--web">
      <p className="demo-preview__tag">Portfolio · Ejemplo real en producción</p>
      <div className="wp-site-card">
        <div className="wp-site-card__header">
          <div className="wp-site-brand">Marirrodriga<strong>.IA</strong></div>
          <div className="wp-site-badge">● En vivo</div>
        </div>
        <div className="wp-site-sections">
          <div className="wp-section-chip">El Taller</div>
          <div className="wp-section-chip">Actualidad IA</div>
          <div className="wp-section-chip">ISMABOT</div>
          <div className="wp-section-chip">Blog automático</div>
          <div className="wp-section-chip">Contacto</div>
        </div>
        <p className="wp-site-claim">React · Vite · Supabase · n8n · <span>construida en menos de 14 días</span></p>
      </div>
      <p className="demo-preview__note">
        Esta misma web es nuestro mejor ejemplo: conectada a todas las automatizaciones en vivo, con blog de publicación diaria automática, simuladores interactivos y agente de IA integrado.
      </p>
      <button className="demo-preview__live-btn" onClick={() => onNavigate && onNavigate('inicio')}>
        Ver la web completa →
      </button>
    </div>
  )
}

function RrssPreviewDemo({ onNavigate }) {
  return (
    <div className="demo-preview demo-preview--rrss">
      <p className="demo-preview__tag">Publicado automáticamente · hace 3h</p>
      <div className="rrss-post-card">
        <div className="rrss-post-header">
          <div className="rrss-avatar">M</div>
          <div className="rrss-post-header-text">
            <div className="rrss-author">Marirrodriga.IA</div>
            <div className="rrss-platform">LinkedIn · Automatizado con IA</div>
          </div>
          <div className="rrss-platform-badge">in</div>
        </div>
        <p className="rrss-post-body">
          La IA no está aquí para reemplazar tu negocio.<br />
          Está aquí para que dejes de hacer lo que odias — y puedas centrarte en lo que solo tú puedes hacer.<br /><br />
          <span className="rrss-hashtags">#AutomatizaciónIA #PYMEs #n8n</span>
        </p>
        <div className="rrss-post-footer">
          <span>👍 <strong>41</strong></span>
          <span>💬 9 comentarios</span>
          <span>↗ 12 reposts</span>
        </div>
      </div>
      <p className="demo-preview__note">
        Noticias de última hora seleccionadas por IA, redactadas con imagen editorial generada automáticamente y publicadas solas — en tu blog, LinkedIn, Instagram, X y newsletter. Sin tocar nada. Adaptable a cualquier sector o red social.
      </p>
      <div className="rrss-channels">
        <div className="rrss-ch"><Globe size={11} /> Blog</div>
        <div className="rrss-ch"><Send size={11} /> LinkedIn</div>
        <div className="rrss-ch"><Mail size={11} /> Newsletter</div>
        <div className="rrss-ch">✕ X / Twitter</div>
        <div className="rrss-ch">📸 Instagram</div>
      </div>
      <button className="demo-preview__live-btn" onClick={() => onNavigate && onNavigate('reto-diario')}>
        Ver las noticias en vivo →
      </button>
    </div>
  )
}

/* ─── MAIN PAGE ──────────────────────────────────────────────── */

export default function ServicesPage({ onNavigate }) {
  const [openCard, setOpenCard] = useState(null)

  function toggle(id) { setOpenCard(prev => prev === id ? null : id) }

  function goToService(id) {
    setOpenCard(id)
    setTimeout(() => {
      const el = document.getElementById(`service-${id}`)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 60)
  }

  const services = [
    {
      id: 1,
      badge: 'Chat & Voz',
      title: '1. Asistentes y Agentes Conversacionales',
      desc: 'Asistentes virtuales que no solo responden, sino que ejecutan. Atienden por chat, WhatsApp o incluso por voz — resuelven dudas, agendan citas y gestionan solicitudes en automático, 24/7.',
      illustration: <IllustrationS1 />,
      expansionIndex: 0,
      demoLabel: 'Agente real en vivo — Mari Robot',
      demoContent: <TelegramSimulator />,
    },
    {
      id: 2,
      badge: 'Gestión rápida',
      title: '2. Generación Automática de Facturas',
      desc: 'Tus facturas listas en segundos. Cuéntale al sistema qué has vendido y recibe el PDF estructurado, enviado y registrado contablemente.',
      illustration: <IllustrationS2 />,
      expansionIndex: 1,
      demoLabel: 'Pruébalo gratis en tiempo real',
      demoContent: <InvoiceSimulator />,
    },
    {
      id: 3,
      badge: 'Orden inteligente',
      title: '3. Gestión Documental y Clasificación de Correos',
      desc: 'Tu oficina sin papeles ni bandejas de entrada colapsadas. Extraemos datos clave de tus PDFs y filtramos tu correo por ti.',
      illustration: <IllustrationS3 />,
      expansionIndex: 2,
      demoLabel: 'Pon a prueba la IA lectora',
      demoContent: <DocumentSimulator />,
    },
    {
      id: 4,
      badge: 'Conversión',
      title: '4. Conversión de clientes potenciales',
      desc: 'Deja de perder tiempo con contactos que no van a contratar. Identificamos quién tiene intención real de compra y alertamos a tu equipo al instante.',
      illustration: <IllustrationS4 />,
      expansionIndex: 3,
      demoLabel: 'Simulador de filtro de clientes (rol inverso)',
      demoContent: <><p className="demo-instructions">Vas a jugar el papel del dueño del negocio. Rellena el formulario y mira la alerta que recibe tu equipo:</p><LeadSimulator /></>,
    },
    {
      id: 5,
      badge: 'Presencia digital',
      title: '5. Creación de Páginas Web',
      desc: 'Páginas web modernas, rápidas y conectadas a tus automatizaciones. Sin plantillas genéricas. Esta misma web fue creada por mi hermano y por mí en menos de 14 días.',
      illustration: <IllustrationS5 />,
      expansionIndex: 4,
      demoLabel: 'Portfolio — ejemplo real en producción',
      demoContent: <WebPreviewDemo onNavigate={onNavigate} />,
    },
    {
      id: 6,
      badge: 'Contenido automatizado',
      title: '6. Blog, Newsletter y RRSS en Automático',
      desc: 'Publica contenido de calidad en tu blog, redes y newsletter sin tocar nada. La IA selecciona, redacta y publica en tu nombre, todos los días.',
      illustration: <IllustrationS6 />,
      expansionIndex: 5,
      demoLabel: 'Publicación generada por IA — ejemplo real',
      demoContent: <RrssPreviewDemo onNavigate={onNavigate} />,
    },
  ]

  return (
    <>
      <div className="svcs-hero">
        <div className="svc-note"><div className="bdot" />Demos interactivas · Sin registro · Sin instalaciones</div>
        <h1>El Taller de <em>automatización.</em></h1>
        <p>Elige una herramienta, interactúa con el simulador en tiempo real y comprueba tú mismo cuánto tiempo recuperarías en tu negocio.</p>
      </div>

      <main className="catalog-section">
        <div className="container">
          <div className="section-title-wrapper">
            <h2 className="section-title">Herramientas del Taller</h2>
            <p className="section-desc">Despliega cualquier servicio y pruébalo en tiempo real. Sin registro, sin compromiso.</p>
          </div>

          <TallerNav onGo={goToService} />

          <IsmabotCard />

          <div className="services-grid">
            {services.map(s => (
              <ServiceCard key={s.id} open={openCard === s.id} onToggle={toggle} onNavigate={onNavigate} {...s} />
            ))}
          </div>
        </div>
      </main>

      <GiantContactCard />
    </>
  )
}
