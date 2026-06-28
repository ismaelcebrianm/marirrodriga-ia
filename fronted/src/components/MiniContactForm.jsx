import { useState } from 'react'

const WEBHOOK_URL = import.meta.env.VITE_N8N_WEBHOOK_URL

export default function MiniContactForm() {
  const [form,      setForm]      = useState({ nombre: '', email: '', mensaje: '' })
  const [loading,   setLoading]   = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error,     setError]     = useState('')

  function update(field, value) {
    setForm(prev => ({ ...prev, [field]: value }))
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
      setError('Error al enviar. Escríbenos por Telegram.')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="mcf-success">
        <span className="mcf-success__icon">✅</span>
        <p>¡Recibido, <strong>{form.nombre}</strong>! Te escribimos a <strong>{form.email}</strong> en menos de 24h.</p>
      </div>
    )
  }

  return (
    <form className="mcf-form" onSubmit={submit} noValidate>
      <div className="mcf-row">
        <input
          className="mcf-input"
          placeholder="Tu nombre *"
          value={form.nombre}
          onChange={e => update('nombre', e.target.value)}
          required
        />
        <input
          className="mcf-input"
          type="email"
          placeholder="tu@email.com *"
          value={form.email}
          onChange={e => update('email', e.target.value)}
          required
        />
      </div>
      <textarea
        className="mcf-textarea"
        rows={3}
        placeholder="¿Qué quieres automatizar? (opcional)"
        value={form.mensaje}
        onChange={e => update('mensaje', e.target.value)}
      />
      {error && <p className="mcf-error">{error}</p>}
      <button className="mcf-submit" type="submit" disabled={loading}>
        {loading ? '✦ Enviando…' : 'Enviar y que me contacten →'}
      </button>
      <p className="mcf-disclaimer">Sin spam · Respuesta en menos de 24h</p>
    </form>
  )
}
