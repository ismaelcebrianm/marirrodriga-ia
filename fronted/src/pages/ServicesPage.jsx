import { useState, useEffect } from 'react'
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

const CHATBOT_URL = 'https://t.me/Marirrodrigabot'

const ISMABOT_FEATURES = [
  { icon: Brain,         label: 'Memoria de chat',         desc: 'Recuerda lo que le has contado, sesión a sesión.' },
  { icon: Mic,           label: 'Texto, imagen y audio',   desc: 'Escríbele, mándale una foto o envía un audio de voz.' },
  { icon: MessageSquare, label: 'Conversación sin prisa',  desc: 'Vuelve cuando quieras. Retoma donde lo dejaste.' },
  { icon: FileText,      label: 'Informes personalizados', desc: 'Te genera un plan adaptado a tu negocio concreto.' },
]

const CHAT_MSGS = [
  { from: 'bot',  text: 'Hola 👋 Soy ISMABOT. ¿A qué te dedicas?' },
  { from: 'user', text: 'Clínica de fisioterapia. Somos 3 fisios.' },
  { from: 'bot',  text: '¿Qué procesos lleváis todavía a mano?' },
  { from: 'user', text: 'Agenda, facturas y recordatorios.' },
  { from: 'bot',  text: 'Para darte un plan útil de verdad, necesito escucharte.' },
  { from: 'bot',  text: 'Mándame un audio de cómo va el flujo desde que llama un paciente hasta que paga.' },
  { from: 'user', text: '🎤 Audio · 1:24', audio: true },
  { from: 'bot',  text: 'Esos son los cuellos de botella clásicos 👌' },
  { from: 'bot',  text: 'Pásate unos días fijándote en qué más automatizarías mientras trabajas.' },
  { from: 'bot',  text: 'Cuando lo tengas claro — agendamos con el boss: Ismael 🤝' },
]

function IsmabotChatPreview() {
  const [shown,  setShown]  = useState([])
  const [typing, setTyping] = useState(false)
  const [cta,    setCta]    = useState(false)

  useEffect(() => {
    const ts = []
    const add = (fn, ms) => ts.push(setTimeout(fn, ms))

    add(() => setTyping(true),                                    300)
    add(() => { setTyping(false); setShown([0]) },               1100)  // bot: "Hola..."
    add(() => setShown(m => [...m, 1]),                          1800)  // user: "Clínica..."
    add(() => setTyping(true),                                   2100)
    add(() => { setTyping(false); setShown(m => [...m, 2]) },   2900)  // bot: "¿Qué procesos..."
    add(() => setShown(m => [...m, 3]),                          3600)  // user: "Agenda..."
    add(() => setTyping(true),                                   3900)
    add(() => { setTyping(false); setShown(m => [...m, 4]) },   4600)  // bot: "Para darte..."
    add(() => setTyping(true),                                   4900)
    add(() => { setTyping(false); setShown(m => [...m, 5]) },   5600)  // bot: "Mándame un audio..."
    add(() => setShown(m => [...m, 6]),                          6400)  // user: audio
    add(() => setTyping(true),                                   6900)
    add(() => { setTyping(false); setShown(m => [...m, 7]) },   8100)  // bot: "Esos son..." (pausa larga)
    add(() => setTyping(true),                                   8400)
    add(() => { setTyping(false); setShown(m => [...m, 8]) },   9100)  // bot: "Pásate..."
    add(() => setTyping(true),                                   9400)
    add(() => { setTyping(false); setShown(m => [...m, 9]) },  10100)  // bot: "Cuando lo tengas..."
    add(() => setCta(true),                                    10800)

    return () => ts.forEach(clearTimeout)
  }, [])

  return (
    <div className="icp-wrap">
      <div className="icp-header">
        <div className="icp-avatar"><Bot size={13} /></div>
        <span className="icp-name">ISMABOT</span>
        <span className="icp-online">● En línea</span>
      </div>
      <div className="icp-messages">
        {shown.map(i => {
          const msg = CHAT_MSGS[i]
          if (msg.audio) return (
            <div key={i} className="icp-bubble icp-bubble--user icp-bubble--audio">
              <span className="icp-audio-icon">🎤</span>
              <div className="icp-audio-bars">{[...Array(12)].map((_, j) => <span key={j} />)}</div>
              <span className="icp-audio-dur">1:24</span>
            </div>
          )
          return (
            <div key={i} className={`icp-bubble icp-bubble--${msg.from}`}>{msg.text}</div>
          )
        })}
        {typing && (
          <div className="icp-bubble icp-bubble--bot icp-typing">
            <span /><span /><span />
          </div>
        )}
      </div>
      {cta && (
        <a className="ismabot-cta ismabot-cta--inline" href={CHATBOT_URL} target="_blank" rel="noopener noreferrer">
          Hablar con ISMABOT → Ismael te contacta <ArrowRight size={13} />
        </a>
      )}
    </div>
  )
}

function IsmabotCard() {
  const [open, setOpen] = useState(false)
  return (
    <div className={`service-card service-card--ismabot${open ? ' expanded' : ''}`} id="service-ismabot">
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
            Has explorado las herramientas. Ahora ISMABOT analiza tu negocio, identifica qué automatizaciones
            son realmente aplicables a tu caso y te prepara un plan concreto.
            Después te pone en contacto directo con <strong>Ismael</strong>, el experto detrás de todo esto,
            para que lo llevéis a la práctica juntos.
          </p>
          <button className="btn-expand btn-expand--ismabot" onClick={() => setOpen(v => !v)}>
            <span>{open ? 'Cerrar' : 'Ver cómo piensa ISMABOT'}</span>
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
              <p className="ismabot-expand-note" style={{marginTop: '16px'}}>Disponible ahora · Gratis · Sin registro</p>
            </div>
            <div className="panel-demo-area">
              <p className="panel-subtitle"><Rocket size={15} />Así piensa ISMABOT</p>
              <IsmabotChatPreview />
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
      { icon: '🔔', label: 'Recuerda la cita al cliente con la antelación que configures, por WhatsApp o email' },
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
      { icon: '⏰', label: 'Recordatorio de pago en el plazo que configures' },
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
      { icon: '🔁', label: 'Seguimiento automático si no hay respuesta, en el plazo que definas' },
      { icon: '👤', label: 'Asignación automática al comercial correcto en CRM' },
      { icon: '📈', label: 'Reporte semanal de conversión y pipeline' },
    ],
    savings: {
      label: 'Un comercial tarda semanas en localizar, investigar y cualificar 50 leads. Un agente lo hace en minutos cruzando múltiples fuentes de datos: LinkedIn, Google Maps, noticias de empresa, registros mercantiles. Tu equipo solo habla con quien ya está listo para comprar.',
    }
  },
  // 4 — Recordatorios de cita
  {
    core: 'Aviso automático antes de cada cita, en los plazos que configures',
    steps: [
      { icon: '✅', label: 'El cliente confirma o cancela con un toque — sin llamar' },
      { icon: '🔄', label: 'Si cancela, el hueco se libera y se ofrece a la lista de espera' },
      { icon: '📧', label: 'Canal configurable: WhatsApp, email o ambos' },
      { icon: '📊', label: 'Log de confirmaciones en tiempo real' },
      { icon: '🧾', label: 'Se integra con tu calendario sin cambiar nada' },
    ],
    savings: { label: 'Un no-show en consulta, clínica o peluquería cuesta entre 30€ y 150€ de media. Con recordatorios automáticos la tasa baja entre el 50% y el 75% desde el primer mes.' }
  },
  // 5 — Reseñas Google
  {
    core: 'Solicitud de reseña enviada justo después del servicio',
    steps: [
      { icon: '🎯', label: 'Personalizado con el nombre del cliente y el servicio recibido' },
      { icon: '🔗', label: 'Enlace directo a tu perfil de Google Business' },
      { icon: '⏱️', label: 'Timing optimizado: se envía cuando el cliente está más satisfecho' },
      { icon: '📈', label: 'Más reseñas = más visibilidad en Google Maps y buscador' },
      { icon: '🔔', label: 'Alerta si llega una reseña negativa para responder rápido' },
    ],
    savings: { label: 'Una estrella más en Google puede suponer hasta un 9% de aumento en ingresos. El 88% de los consumidores confía en reseñas igual que en recomendaciones personales. Este agente las consigue en automático.' }
  },
  // 6 — Resumen diario
  {
    core: 'Informe del día en Telegram o email, a la hora que elijas',
    steps: [
      { icon: '📅', label: 'Citas del día: completadas, canceladas y pendientes' },
      { icon: '💬', label: 'Mensajes y consultas recibidos — con los urgentes marcados' },
      { icon: '💶', label: 'Facturación estimada del día' },
      { icon: '🔔', label: 'Alertas: presupuestos sin responder, clientes inactivos' },
      { icon: '📆', label: 'Resumen semanal automático los viernes' },
    ],
    savings: { label: 'Saber qué ha pasado en tu negocio sin abrir 5 apps. Un informe consolidado cada tarde para cerrar el día con toda la información relevante en 30 segundos.' }
  },
  // 7 — Seguimiento de presupuestos
  {
    core: 'Seguimiento automático en los plazos que definas',
    steps: [
      { icon: '📧', label: 'Primer recordatorio útil: "¿tienes alguna duda sobre el presupuesto?"' },
      { icon: '💬', label: 'Segundo aviso con respuestas a las objeciones más frecuentes' },
      { icon: '🔔', label: 'Alerta al comercial si el cliente abre el email pero no responde' },
      { icon: '❌', label: 'Se detiene automáticamente si el cliente acepta o rechaza' },
      { icon: '📊', label: 'Tasa de cierre y motivos de rechazo en informe mensual' },
    ],
    savings: { label: 'El 80% de las ventas requieren 5 contactos. El 44% de los comerciales se rinden tras el primero. Este agente hace el seguimiento que nadie quiere hacer — de forma sistemática y sin molestar.' }
  },
  // 8 — Reactivación de inactivos
  {
    core: 'Detecta clientes sin actividad y los contacta solo',
    steps: [
      { icon: '🔍', label: 'Umbral configurable: 30, 60 o 90 días sin actividad' },
      { icon: '✍️', label: 'Mensaje personalizado con el historial del cliente' },
      { icon: '🎁', label: 'Opción de incluir oferta o descuento de reactivación' },
      { icon: '📅', label: 'Si responde con interés, agenda cita sin intervención' },
      { icon: '📊', label: 'Informe de recuperaciones conseguidas cada mes' },
    ],
    savings: { label: 'Recuperar un cliente inactivo cuesta 5 veces menos que captar uno nuevo. La mayoría de negocios tienen cientos de clientes que simplemente "se olvidaron". Este agente los recupera en automático.' }
  },
  // 9 — Agente de voz
  {
    core: 'Atiende llamadas entrantes y gestiona la agenda 24/7',
    steps: [
      { icon: '📞', label: 'Consulta disponibilidad real y reserva cita en el momento' },
      { icon: '🔄', label: 'Modifica o cancela citas con lenguaje natural' },
      { icon: '❓', label: 'Responde preguntas frecuentes: precios, ubicación, servicios' },
      { icon: '👤', label: 'Escala a persona real si la consulta es compleja' },
      { icon: '📋', label: 'Resumen de cada llamada enviado por email al instante' },
    ],
    savings: { label: 'Una llamada perdida fuera de horario es un cliente que va a la competencia. Con un agente de voz, ninguna llamada queda sin responder — ni a las 10 de la noche ni en festivos.' }
  },
  // 10 — Pipeline outbound
  {
    core: 'Del prospecto frío al contacto cualificado, solo',
    steps: [
      { icon: '🔍', label: 'Localiza prospectos en Google Maps, LinkedIn o tu base de datos' },
      { icon: '✉️', label: 'Primer contacto personalizado por email o LinkedIn' },
      { icon: '🔁', label: 'Seguimiento automático si no responde en 48h y 7 días' },
      { icon: '🎯', label: 'Solo alerta al comercial cuando hay respuesta o interés real' },
      { icon: '📊', label: 'KPIs de apertura, respuesta y conversión en tiempo real' },
    ],
    savings: { label: 'Un comercial puede gestionar 30-40 contactos en frío por semana. Un pipeline automatizado gestiona 500. Sin cambiar a tu equipo, multiplicando el alcance.' }
  },
  // 11 — WhatsApp automático
  {
    core: 'Tu WhatsApp responde solo, a cualquier hora',
    steps: [
      { icon: '💬', label: 'Preguntas frecuentes, precios y disponibilidad respondidas al instante' },
      { icon: '📅', label: 'Gestiona reservas directamente desde el chat' },
      { icon: '🔔', label: 'Te avisa si hay una consulta que no sabe resolver' },
      { icon: '🧠', label: 'Aprende de tu negocio: menú, servicios, horarios, tarifas' },
      { icon: '📊', label: 'Log de conversaciones y consultas más frecuentes' },
    ],
    savings: { label: 'El 67% de los clientes prefiere WhatsApp antes de llamar. Si tardas más de 5 minutos en responder, el 50% busca otra opción. Este agente responde en segundos, sin que tú estés pendiente.' }
  },
]

/* ─── SERVICE CARD ───────────────────────────────────────────── */

function ServiceCard({ id, open, onToggle, badge, title, desc, illustration, expansionIndex, demoLabel, demoContent, onNavigate, inCart, onCartToggle }) {
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
          <button
            className={`btn-cart-add${inCart ? ' btn-cart-add--active' : ''}`}
            onClick={(e) => { e.stopPropagation(); onCartToggle() }}
          >
            {inCart ? <><Check size={13} /> Añadido al presupuesto</> : '+ Añadir al presupuesto'}
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

/* ─── CART ───────────────────────────────────────────────────── */

function CartBar({ count, cartServices, onOpen }) {
  if (count === 0) return null
  return (
    <div className="cart-bar">
      <div className="cart-bar__info">
        <span className="cart-bar__count">{count} {count === 1 ? 'función seleccionada' : 'funciones seleccionadas'}</span>
        <span className="cart-bar__names">
          {cartServices.slice(0, 2).map(s => s.badge).join(' · ')}
          {count > 2 ? ` · +${count - 2} más` : ''}
        </span>
      </div>
      <button className="cart-bar__cta" onClick={onOpen}>
        Solicitar presupuesto <ArrowRight size={15} />
      </button>
    </div>
  )
}

function CartModal({ cartServices, onRemove, onClose }) {
  const [name,  setName]  = useState('')
  const [email, setEmail] = useState('')
  const [sent,  setSent]  = useState(false)

  async function handleSubmit() {
    if (!name.trim() || !email.trim()) return
    const titles = cartServices.map(s => s.title)
    const payload = { nombre: name, email, servicios: titles, source: 'carrito-ia-carta' }
    if (N8N_CUSTOM) {
      try { await fetch(N8N_CUSTOM, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }) } catch {}
    } else {
      const sub  = encodeURIComponent('Solicitud de presupuesto — IA a la carta')
      const body = encodeURIComponent(`Nombre: ${name}\nEmail: ${email}\n\nFunciones seleccionadas:\n${titles.map((t, i) => `${i + 1}. ${t}`).join('\n')}`)
      window.open(`mailto:ismaelcebrian14@gmail.com?subject=${sub}&body=${body}`)
    }
    setSent(true)
  }

  return (
    <div className="cart-modal-overlay" onClick={onClose}>
      <div className="cart-modal" onClick={e => e.stopPropagation()}>
        {sent ? (
          <div className="cart-modal__success">
            <div className="cart-modal__success-icon"><Check size={24} /></div>
            <h3>¡Solicitud enviada!</h3>
            <p>Te contactamos en menos de 24 horas con tu presupuesto personalizado.</p>
            <button className="cart-modal__close-btn" onClick={onClose}>Cerrar</button>
          </div>
        ) : (
          <>
            <div className="cart-modal__header">
              <h3>Tu selección de funciones</h3>
              <button className="cart-modal__x" onClick={onClose}>✕</button>
            </div>
            <ul className="cart-modal__list">
              {cartServices.map(s => (
                <li key={s.id} className="cart-modal__item">
                  <span className="cart-modal__item-badge">{s.badge}</span>
                  <span className="cart-modal__item-title">{s.title}</span>
                  <button className="cart-modal__item-remove" onClick={() => onRemove(s.id)}>✕</button>
                </li>
              ))}
            </ul>
            <div className="cart-modal__form">
              <p className="cart-modal__form-label">Déjanos tus datos y te enviamos el presupuesto:</p>
              <input
                type="text"
                placeholder="Tu nombre"
                value={name}
                onChange={e => setName(e.target.value)}
                className="cart-modal__input"
              />
              <input
                type="email"
                placeholder="Tu email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="cart-modal__input"
              />
              <button
                className="cart-modal__submit"
                onClick={handleSubmit}
                disabled={!name.trim() || !email.trim()}
              >
                Solicitar presupuesto <ArrowRight size={14} />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

/* ─── QUICK NAV ──────────────────────────────────────────────── */

const NAV_ITEMS = [
  { id: 1,  label: 'Chat & Voz' },
  { id: 2,  label: 'Facturas' },
  { id: 3,  label: 'Documentos' },
  { id: 4,  label: 'Leads' },
  { id: 5,  label: 'Recordatorios' },
  { id: 6,  label: 'Reseñas' },
  { id: 7,  label: 'Resumen diario' },
  { id: 8,  label: 'Presupuestos' },
  { id: 9,  label: 'Reactivación' },
  { id: 10, label: 'Agente de voz' },
  { id: 11, label: 'Outbound' },
  { id: 12, label: 'WhatsApp' },
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
      <button className="taller-nav-btn taller-nav-btn--ismabot" onClick={() => onGo('ismabot')}>
        <span className="taller-nav-num taller-nav-num--ismabot">★</span>
        ISMABOT
      </button>
    </nav>
  )
}

function AgentIllus({ emoji, accent = '#7C3AED' }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
      <div style={{
        width: 84, height: 84, borderRadius: 22,
        background: `radial-gradient(circle at 35% 35%, ${accent}28, ${accent}0a)`,
        border: `1.5px solid ${accent}40`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 42, boxShadow: `0 0 28px ${accent}20`,
      }}>
        {emoji}
      </div>
    </div>
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

function RrssPreviewDemo() {
  function goToNoticias() {
    const el = document.getElementById('reto-diario')
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="demo-preview demo-preview--rrss">
      <div className="rrss-preview-img-wrap" onClick={goToNoticias} title="Ver Actualidad IA">
        <img
          src="/noticias-preview.png"
          alt="Sección Actualidad IA — noticias generadas automáticamente"
          className="rrss-preview-img"
          loading="lazy"
        />
        <div className="rrss-preview-img__overlay">
          <div className="rrss-preview-img__badge">🤖 Gestionado 100% con IA</div>
          <p className="rrss-preview-img__claim">
            Noticias de última hora seleccionadas, redactadas e ilustradas por IA. Se publican solas en tu blog, LinkedIn, Instagram, X y newsletter. Sin tocar nada.
          </p>
        </div>
      </div>
      <div className="rrss-channels">
        <div className="rrss-ch"><Globe size={11} /> Blog</div>
        <div className="rrss-ch"><Send size={11} /> LinkedIn</div>
        <div className="rrss-ch"><Mail size={11} /> Newsletter</div>
        <div className="rrss-ch">✕ X / Twitter</div>
        <div className="rrss-ch">📸 Instagram</div>
      </div>
      <button className="demo-preview__live-btn" onClick={goToNoticias}>
        Ver Actualidad IA en vivo →
      </button>
    </div>
  )
}

/* ─── MAIN PAGE ──────────────────────────────────────────────── */

export default function ServicesPage({ onNavigate }) {
  const [openCard,   setOpenCard]   = useState(null)
  const [cart,       setCart]       = useState(new Set())
  const [cartModal,  setCartModal]  = useState(false)

  function toggle(id) { setOpenCard(prev => prev === id ? null : id) }

  function toggleCart(id) {
    setCart(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  function goToService(id) {
    if (id === 'ismabot') {
      setTimeout(() => {
        document.getElementById('service-ismabot')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 60)
      return
    }
    setOpenCard(id)
    setTimeout(() => {
      document.getElementById(`service-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
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
      badge: 'Anti no-show',
      title: '5. Recordatorios Automáticos de Cita',
      desc: 'Avisa a tus clientes antes de su cita, en los plazos que configures. Ellos confirman o cancelan con un toque — sin llamar. Si cancelan, el hueco se reasigna a la lista de espera automáticamente.',
      illustration: <AgentIllus emoji="🔔" accent="#F59E0B" />,
      expansionIndex: 4,
      demoContent: null,
    },
    {
      id: 6,
      badge: 'Reputación',
      title: '6. Reseñas en Google en Automático',
      desc: 'Tras cada servicio, el agente envía un mensaje personalizado con enlace directo a tu perfil de Google. Sin pedir nada — simplemente en el momento en que el cliente está más satisfecho.',
      illustration: <AgentIllus emoji="⭐" accent="#EAB308" />,
      expansionIndex: 5,
      demoContent: null,
    },
    {
      id: 7,
      badge: 'Control total',
      title: '7. Resumen Diario del Negocio',
      desc: 'Recibes en Telegram o email un informe completo a la hora que configures: citas, consultas, facturación estimada y alertas urgentes. Y un resumen semanal automático.',
      illustration: <AgentIllus emoji="📊" accent="#6366F1" />,
      expansionIndex: 6,
      demoContent: null,
    },
    {
      id: 8,
      badge: 'Ventas',
      title: '8. Seguimiento Automático de Presupuestos',
      desc: 'El agente hace seguimiento tras enviar un presupuesto, en los plazos que definas, con mensajes útiles — no spam. Se detiene solo cuando el cliente acepta o rechaza.',
      illustration: <AgentIllus emoji="📋" accent="#10B981" />,
      expansionIndex: 7,
      demoContent: null,
    },
    {
      id: 9,
      badge: 'Retención',
      title: '9. Reactivación de Clientes Inactivos',
      desc: 'Detecta clientes sin actividad en 30, 60 o 90 días y les envía un mensaje con su historial. Si responden con interés, agenda la cita directamente — sin que tú hagas nada.',
      illustration: <AgentIllus emoji="🔄" accent="#EC4899" />,
      expansionIndex: 8,
      demoContent: null,
    },
    {
      id: 10,
      badge: 'Atención 24/7',
      title: '10. Agente de Voz para Citas',
      desc: 'Atiende llamadas entrantes, consulta tu agenda en tiempo real y gestiona reservas con lenguaje natural. Ninguna llamada queda sin responder — ni a las 10 de la noche ni en festivos.',
      illustration: <AgentIllus emoji="📞" accent="#8B5CF6" />,
      expansionIndex: 9,
      demoContent: null,
    },
    {
      id: 11,
      badge: 'Captación',
      title: '11. Pipeline de Captación Outbound',
      desc: 'Del prospecto frío al contacto cualificado, solo. El agente localiza, contacta y hace seguimiento. Tu comercial solo actúa cuando hay interés real de compra.',
      illustration: <AgentIllus emoji="🎯" accent="#EF4444" />,
      expansionIndex: 10,
      demoContent: null,
    },
    {
      id: 12,
      badge: 'WhatsApp',
      title: '12. Respuesta Automática por WhatsApp',
      desc: 'Tu WhatsApp responde solo: preguntas frecuentes, precios, disponibilidad y reservas — al instante, a cualquier hora. Te avisa si hay algo que no sabe gestionar.',
      illustration: <AgentIllus emoji="💬" accent="#22C55E" />,
      expansionIndex: 11,
      demoContent: null,
    },
  ]

  const cartServices = services.filter(s => cart.has(s.id))

  return (
    <>
      <div className="svcs-hero">
        <div className="svc-note"><div className="bdot" />IA a la carta · Sin permanencia</div>
        <h1>Automatización <em>a la carta.</em></h1>
        <p>¿Contento con tu software pero buscas una funcionalidad concreta? Elige el agente que necesitas, pruébalo en tiempo real y actívalo sin cambiar nada de lo que ya tienes.</p>
      </div>

      <main className="catalog-section">
        <div className="container">
          <div className="section-title-wrapper">
            <h2 className="section-title">Catálogo de agentes</h2>
            <p className="section-desc">Despliega cualquier agente y pruébalo en tiempo real. Sin registro, sin compromiso.</p>
          </div>

          <TallerNav onGo={goToService} />

          <div className="services-grid">
            {services.map(s => (
              <ServiceCard
                key={s.id}
                open={openCard === s.id}
                onToggle={toggle}
                onNavigate={onNavigate}
                inCart={cart.has(s.id)}
                onCartToggle={() => toggleCart(s.id)}
                {...s}
              />
            ))}
          </div>

          <IsmabotCard />
        </div>
      </main>

      <CartBar count={cart.size} cartServices={cartServices} onOpen={() => setCartModal(true)} />
      {cartModal && (
        <CartModal cartServices={cartServices} onRemove={toggleCart} onClose={() => setCartModal(false)} />
      )}
    </>
  )
}
