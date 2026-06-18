import { useState } from 'react'
import { Bot, Star, Mail, ArrowRight, Check } from 'lucide-react'

const N8N_CUSTOM  = import.meta.env.VITE_N8N_WEBHOOK_URL || ''
const CHATBOT_URL = 'https://t.me/marirrodrigaIA_bot'

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
    <>
      {/* Cabecera de sección */}
      <div className="medida-hero">
        <div className="slbl">¿Tienes en mente un proceso muy tuyo?</div>
        <h1>Lo automatizamos<br /><em>a medida.</em></h1>
        <p>
          La verdadera magia no está en una sola herramienta — está en encadenarlas.
          Si tu negocio tiene un proceso especial, lo construimos a tu medida.
        </p>
      </div>

      {/* Contenido */}
      <div className="medida-body">
        <div className="project-card" id="proyecto-medida">
          <div className="project-card__glow" />

          <div className="project-card__header">
            <p className="project-card__subtitle">
              Diseñamos flujos que resuelven tareas de principio a fin: desde que llega el primer
              contacto hasta que el trabajo queda registrado, facturado y confirmado, sin que
              tú toques nada.
            </p>
          </div>

          <div className="project-card__options">

            {/* CHATBOT — RECOMENDADO */}
            <div className="project-option project-option--featured">
              <div className="project-option__badge">
                <Star size={10} /> Recomendado
              </div>
              <div className="project-option__icon"><Bot size={22} /></div>
              <h3 className="project-option__title">Habla con nuestro agente</h3>
              <p className="project-option__desc">
                Te guía paso a paso para entender qué necesitas y cómo lograrlo.
                Puedes comunicarte por <strong>audio o por chat</strong> — como prefieras.
                Retoma la conversación a lo largo de días mientras piensas qué más te gustaría
                automatizar. El agente analiza tu caso y te propone
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
