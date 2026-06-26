import { useState } from 'react'
import { Bot, Mail, ArrowRight, Star, Brain, Mic, FileText, MessageSquare } from 'lucide-react'

const BOT_URL        = 'https://t.me/Marirrodrigabot'
const WEBHOOK_URL    = import.meta.env.VITE_N8N_WEBHOOK_URL
const PERSONAL_EMAIL = 'ismaelcebrian14@gmail.com'

const ISMABOT_FEATURES = [
  { icon: Brain,         label: 'Memoria de chat' },
  { icon: Mic,           label: 'Texto, imagen y audio' },
  { icon: MessageSquare, label: 'Conversación sin prisa' },
  { icon: FileText,      label: 'Informes personalizados' },
]

export default function ContactPage() {
  const [form,      setForm]      = useState({ nombre: '', email: '', mensaje: '' })
  const [loading,   setLoading]   = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error,     setError]     = useState('')

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  async function submit(e) {
    e.preventDefault()
    if (!form.nombre.trim() || !form.email.trim()) return
    setLoading(true)
    try {
      await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          timestamp: new Date().toISOString(),
          source: 'marirrodriga-web-contacto',
        }),
      })
      setSubmitted(true)
    } catch {
      setError('Error al enviar. Prueba a contactarnos directamente por chat.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="contact-page">

      <div className="contact-hero">
        <div className="svc-note"><div className="bdot" />Respuesta inmediata · Agente IA disponible ahora</div>
        <h1>Cuéntanos tu caso.<br />No pierdas <em>tu tiempo.</em></h1>
        <p>No esperas, no formularios largos, no intermediarios. Elige cómo prefieres hablar y el agente te explica, resuelve y agenda si hace falta.</p>
      </div>

      <div className="contact-body">

        {/* ISMABOT — tarjeta destacada */}
        <div className="contact-ismabot">
          <div className="contact-ismabot__badge"><Star size={10} /> Recomendado</div>
          <div className="contact-ismabot__top">
            <div className="contact-ismabot__icon"><Bot size={22} /></div>
            <div>
              <div className="contact-ismabot__name">ISMABOT</div>
              <p className="contact-ismabot__desc">
                Agente de IA que te guía sin compromiso para entender qué podrías automatizar
                en tu negocio. Tiene memoria, acepta texto, imagen y audio, y puede generarte
                un informe personalizado con lo que hablemos.
              </p>
            </div>
          </div>
          <div className="contact-ismabot__features">
            {ISMABOT_FEATURES.map(({ icon: Icon, label }) => (
              <div key={label} className="contact-ismabot__feat">
                <Icon size={12} /> {label}
              </div>
            ))}
          </div>
          <a
            className="contact-ismabot__cta"
            href={BOT_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Hablar con ISMABOT en Telegram <ArrowRight size={14} />
          </a>
        </div>

        {/* OTRAS OPCIONES */}
        <div className="contact-options" style={{ marginTop: '16px' }}>
          <a className="contact-opt contact-opt--secondary" href={`mailto:${PERSONAL_EMAIL}`}>
            <div className="contact-opt__icon"><Mail size={22} /></div>
            <div>
              <div className="contact-opt__title">Email directo</div>
              <div className="contact-opt__sub">{PERSONAL_EMAIL} — te respondemos en menos de 24h.</div>
            </div>
            <span className="contact-opt__arrow">→</span>
          </a>
        </div>

        {/* SEPARADOR */}
        <div className="contact-divider">
          <span>o déjanos tu contacto y te escribimos nosotros</span>
        </div>

        {/* FORMULARIO */}
        {!submitted ? (
          <form className="contact-form" onSubmit={submit} noValidate>
            <div className="contact-form__row">
              <div className="contact-form__field">
                <label className="contact-form__label" htmlFor="contact-nombre">Nombre *</label>
                <input
                  id="contact-nombre"
                  className="contact-form__input"
                  placeholder="Tu nombre"
                  value={form.nombre}
                  onChange={(e) => update('nombre', e.target.value)}
                  required
                />
              </div>
              <div className="contact-form__field">
                <label className="contact-form__label" htmlFor="contact-email">Email *</label>
                <input
                  id="contact-email"
                  type="email"
                  className="contact-form__input"
                  placeholder="tu@email.com"
                  value={form.email}
                  onChange={(e) => update('email', e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="contact-form__field">
              <label className="contact-form__label" htmlFor="contact-mensaje">¿Qué quieres automatizar? <span className="label-optional">(opcional)</span></label>
              <textarea
                id="contact-mensaje"
                className="contact-form__textarea"
                rows={3}
                placeholder="Ej: Quiero automatizar la gestión de citas de mi clínica..."
                value={form.mensaje}
                onChange={(e) => update('mensaje', e.target.value)}
              />
            </div>
            {error && <p className="contact-form__error">{error}</p>}
            <button className="contact-form__submit" type="submit" disabled={loading}>
              {loading ? '✦ Enviando…' : 'Enviar y que me contacten →'}
            </button>
            <p className="contact-form__disclaimer">Sin spam · Te respondemos en menos de 24h</p>
          </form>
        ) : (
          <div className="contact-success">
            <span className="contact-success__icon">✅</span>
            <h3>¡Recibido, {form.nombre}!</h3>
            <p>Te escribimos a <strong>{form.email}</strong> en menos de 24h. Si prefieres respuesta inmediata, ISMABOT está disponible ahora.</p>
            <a className="contact-ismabot__cta" href={BOT_URL} target="_blank" rel="noopener noreferrer" style={{ marginTop: '16px' }}>
              Hablar con ISMABOT en Telegram <ArrowRight size={14} />
            </a>
          </div>
        )}

      </div>
    </div>
  )
}
