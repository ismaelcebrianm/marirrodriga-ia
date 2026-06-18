import { useState } from 'react'

const N8N_WEBHOOK = import.meta.env.VITE_N8N_WEBHOOK_URL || ''

export default function Popup({ config, onClose }) {
  const [name, setName]           = useState('')
  const [email, setEmail]         = useState('')
  const [submitted, setSubmitted] = useState(false)

  async function handleSubmit() {
    if (!name.trim() || !email.trim()) {
      alert('Por favor rellena tu nombre y email.')
      return
    }
    if (N8N_WEBHOOK) {
      try {
        await fetch(N8N_WEBHOOK, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, source: config.source || 'popup-web', service: config.title }),
        })
      } catch {}
    }
    setSubmitted(true)
  }

  return (
    <div className="popup active" onClick={(e) => { if (e.target === e.currentTarget) onClose() }}>
      <div className="popup__box">
        <div className="popup__header">
          <button className="popup__close" onClick={onClose}>✕</button>
          <span className="popup__icon">{config.icon}</span>
          <span className="popup__gift">{config.gift}</span>
          <h3 className="popup__title">{config.title}</h3>
          <p className="popup__desc">{config.desc}</p>
        </div>

        {!submitted ? (
          <div className="popup__body">
            <label className="popup__label">Tu nombre</label>
            <input
              type="text"
              className="popup__input"
              placeholder="Ej: María García"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label className="popup__label">Tu email</label>
            <input
              type="email"
              className="popup__input"
              placeholder="maria@tuempresa.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className="popup__submit" onClick={handleSubmit}>{config.cta}</button>
            <p className="popup__hint">Sin compromisos · Respondemos en menos de 24h</p>
          </div>
        ) : (
          <div className="popup__success">
            <span className="popup__success-icon">🎉</span>
            <h3 className="popup__success-title">¡Perfecto, {name}!</h3>
            <p className="popup__success-text">En menos de 24h te contactamos. ¡Revisa tu email!</p>
          </div>
        )}
      </div>
    </div>
  )
}
