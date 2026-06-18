import { useState } from 'react'
import { Bot, Star, Mail, ArrowRight, Check, Mic, Image, Brain, FileText, MessageSquare } from 'lucide-react'

const N8N_CUSTOM  = import.meta.env.VITE_N8N_WEBHOOK_URL || ''
const CHATBOT_URL = 'https://t.me/marirrodrigaIA_bot'

const FEATURES = [
  { icon: Brain,       label: 'Memoria de chat',          desc: 'Recuerda todo lo que le has contado, sesión a sesión.' },
  { icon: Mic,         label: 'Texto, imagen y audio',     desc: 'Escríbele, mándale una foto o envía un audio de voz.' },
  { icon: MessageSquare, label: 'Conversación sin prisa',  desc: 'Vuelve cuando quieras. La conversación sigue donde la dejaste.' },
  { icon: FileText,    label: 'Informes personalizados',   desc: 'Te genera un plan o propuesta adaptada a tu negocio concreto.' },
]

export default function MedidaSection() {
  const [idea,    setIdea]    = useState('')
  const [contact, setContact] = useState('')
  const [modal,   setModal]   = useState(false)

  async function submit(e) {
    e.preventDefault()
    if (!idea.trim() || !contact.trim()) return
    if (N8N_CUSTOM) {
      try {
        await fetch(N8N_CUSTOM, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ idea, contact, source: 'seccion-medida' }),
        })
      } catch {}
    }
    setIdea('')
    setContact('')
    setModal(true)
  }

  return (
    <div className="medida-section">

      {/* HERO */}
      <div className="medida-hero">
        <div className="medida-hero__badge">
          <Star size={11} /> Nuestro activo principal
        </div>
        <h1>ISMABOT.<br /><em>Tu guía sin compromiso.</em></h1>
        <p>
          Un agente de IA diseñado para una sola cosa: ayudarte a entender qué podrías
          automatizar en tu negocio, sin jerga técnica ni presión comercial.
          Habla con él cuando quieras, tan despacio como necesites.
        </p>
      </div>

      {/* CUERPO */}
      <div className="medida-body">

        {/* TARJETA ISMABOT */}
        <div className="ismabot-card">
          <div className="ismabot-card__glow" />

          <div className="ismabot-card__top">
            <div className="ismabot-card__icon">
              <Bot size={28} />
            </div>
            <div>
              <div className="ismabot-card__label">Agente de inteligencia artificial</div>
              <h2 className="ismabot-card__name">ISMABOT</h2>
              <p className="ismabot-card__mission">
                Su misión es escucharte, hacerte las preguntas correctas y ayudarte a
                visualizar cómo quedaría tu negocio con automatización — sin compromiso,
                sin necesidad de saber de tecnología. Al final puedes pedirle un
                informe o plan personalizado con lo que hemos hablado.
              </p>
            </div>
          </div>

          <div className="ismabot-features">
            {FEATURES.map(({ icon: Icon, label, desc }) => (
              <div key={label} className="ismabot-feature">
                <div className="ismabot-feature__icon"><Icon size={16} /></div>
                <div>
                  <div className="ismabot-feature__label">{label}</div>
                  <div className="ismabot-feature__desc">{desc}</div>
                </div>
              </div>
            ))}
          </div>

          <a
            className="ismabot-cta"
            href={CHATBOT_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Hablar con ISMABOT en Telegram <ArrowRight size={16} />
          </a>
        </div>

        {/* FORMULARIO — contacto alternativo */}
        <div className="medida-alt">
          <div className="medida-alt__header">
            <div className="project-option__icon project-option__icon--secondary"><Mail size={20} /></div>
            <div>
              <h3 className="project-option__title">¿Prefieres que te contactemos nosotros?</h3>
              <p className="project-option__desc project-option__desc--short">
                Cuéntanos tu idea y te respondemos con un análisis en menos de 24 horas.
              </p>
            </div>
          </div>
          <form className="project-form" onSubmit={submit}>
            <div className="form-group-custom">
              <label>Tu proyecto o idea:</label>
              <textarea
                required rows={3}
                placeholder="Ej: Cuando un cliente firma un contrato, quiero que se cree una carpeta en Drive y se le envíe un email de bienvenida automáticamente..."
                value={idea}
                onChange={e => setIdea(e.target.value)}
              />
            </div>
            <div className="form-group-custom">
              <label>Email o WhatsApp:</label>
              <input
                type="text" required
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
    </div>
  )
}
