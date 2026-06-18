import { useState } from 'react'
import { Sparkles, BookOpen, Users } from 'lucide-react'

const WEBHOOK_URL = import.meta.env.VITE_N8N_WEBHOOK_URL

const INITIAL_FORM = {
  nombre: '', apellido: '', email: '',
  dedicacion: '', nivel_ia: '', reto: '', como_conocido: '',
}

export default function LeadFormSection() {
  const [form,      setForm]      = useState(INITIAL_FORM)
  const [errors,    setErrors]    = useState({})
  const [loading,   setLoading]   = useState(false)
  const [submitted, setSubmitted] = useState(false)

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  function validate() {
    const e = {}
    if (!form.nombre.trim())    e.nombre    = 'Requerido'
    if (!form.apellido.trim())  e.apellido  = 'Requerido'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Email inválido'
    if (!form.dedicacion)       e.dedicacion = 'Requerido'
    if (!form.nivel_ia)         e.nivel_ia   = 'Requerido'
    return e
  }

  async function submit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setLoading(true)
    try {
      await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          timestamp: new Date().toISOString(),
          source: 'marirrodriga-web-recurso',
        }),
      })
      setSubmitted(true)
    } catch {
      setErrors({ _global: 'Error al enviar. Inténtalo de nuevo.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="gift-section">
      <div className="gift-section__inner">

        <div className="gift-header">
          <div className="gift-badge"><span>✦</span> Aprendizaje personalizado</div>
          <h2 className="gift-title">Un recurso hecho<br /><em>para ti, no para todos.</em></h2>
          <p className="gift-subtitle">
            Cuéntanos tu nivel y qué quieres automatizar. Te enviamos un recurso adaptado
            exactamente a tu punto de partida — no una plantilla genérica.
          </p>
        </div>

        <div className="gift-layout">

          {/* PANEL EXPLICATIVO */}
          <div className="gift-card">
            <div className="gift-how__item">
              <div className="gift-how__icon"><Sparkles size={18} /></div>
              <div>
                <div className="gift-how__title">Recurso adaptado a tu nivel</div>
                <div className="gift-how__desc">Según lo que nos cuentes, seleccionamos o generamos el material que mejor encaja con donde estás ahora y adónde quieres llegar.</div>
              </div>
            </div>
            <div className="gift-how__item">
              <div className="gift-how__icon"><BookOpen size={18} /></div>
              <div>
                <div className="gift-how__title">Tu propuesta mejora el catálogo</div>
                <div className="gift-how__desc">Lo que describes como reto o duda se procesa para crear nuevos materiales más útiles. Cada petición hace la biblioteca más completa.</div>
              </div>
            </div>
            <div className="gift-how__item">
              <div className="gift-how__icon"><Users size={18} /></div>
              <div>
                <div className="gift-how__title">Sin spam, solo lo que pediste</div>
                <div className="gift-how__desc">Recibirás únicamente el recurso que encargaste. Sin secuencias automáticas, sin newsletters no solicitadas.</div>
              </div>
            </div>
          </div>

          {/* FORM */}
          {!submitted ? (
            <form className="gift-form" onSubmit={submit} noValidate>
              <div className="gift-form__row">
                <div className="gift-form__field">
                  <label className="gift-form__label">Nombre *</label>
                  <input
                    className={`gift-form__input${errors.nombre ? ' gift-form__input--error' : ''}`}
                    placeholder="María"
                    value={form.nombre}
                    onChange={(e) => update('nombre', e.target.value)}
                  />
                  {errors.nombre && <span className="gift-form__error">{errors.nombre}</span>}
                </div>
                <div className="gift-form__field">
                  <label className="gift-form__label">Apellido *</label>
                  <input
                    className={`gift-form__input${errors.apellido ? ' gift-form__input--error' : ''}`}
                    placeholder="García"
                    value={form.apellido}
                    onChange={(e) => update('apellido', e.target.value)}
                  />
                  {errors.apellido && <span className="gift-form__error">{errors.apellido}</span>}
                </div>
              </div>

              <div className="gift-form__field">
                <label className="gift-form__label">Email *</label>
                <input
                  type="email"
                  className={`gift-form__input${errors.email ? ' gift-form__input--error' : ''}`}
                  placeholder="maria@tuempresa.com"
                  value={form.email}
                  onChange={(e) => update('email', e.target.value)}
                />
                {errors.email && <span className="gift-form__error">{errors.email}</span>}
              </div>

              <div className="gift-form__row">
                <div className="gift-form__field">
                  <label className="gift-form__label">¿A qué te dedicas? *</label>
                  <select
                    className={`gift-form__select${errors.dedicacion ? ' gift-form__input--error' : ''}`}
                    value={form.dedicacion}
                    onChange={(e) => update('dedicacion', e.target.value)}
                  >
                    <option value="">Selecciona…</option>
                    <option value="estudiante">Estudiante</option>
                    <option value="autonomo">Autónomo</option>
                    <option value="empresa">Empresa</option>
                    <option value="trabajador_cuenta_ajena">Trabajador por cuenta ajena</option>
                  </select>
                  {errors.dedicacion && <span className="gift-form__error">{errors.dedicacion}</span>}
                </div>
                <div className="gift-form__field">
                  <label className="gift-form__label">Nivel con la IA *</label>
                  <select
                    className={`gift-form__select${errors.nivel_ia ? ' gift-form__input--error' : ''}`}
                    value={form.nivel_ia}
                    onChange={(e) => update('nivel_ia', e.target.value)}
                  >
                    <option value="">Selecciona…</option>
                    <option value="basico">Básico — apenas la uso</option>
                    <option value="medio">Medio — genero textos, busco con IA</option>
                    <option value="alto">Alto — sé lo que son los agentes</option>
                    <option value="profesional">Profesional — desarrollo con IA</option>
                  </select>
                  {errors.nivel_ia && <span className="gift-form__error">{errors.nivel_ia}</span>}
                </div>
              </div>

              <div className="gift-form__field">
                <label className="gift-form__label">¿Qué quieres automatizar? <span className="gift-form__optional">(nos ayuda a personalizar el recurso)</span></label>
                <textarea
                  className="gift-form__textarea"
                  placeholder="Ej: gestión de citas, emails de seguimiento, facturación…"
                  rows={2}
                  value={form.reto}
                  onChange={(e) => update('reto', e.target.value)}
                />
              </div>

              <div className="gift-form__field">
                <label className="gift-form__label">¿Cómo nos conociste? <span className="gift-form__optional">(opcional)</span></label>
                <select
                  className="gift-form__select"
                  value={form.como_conocido}
                  onChange={(e) => update('como_conocido', e.target.value)}
                >
                  <option value="">Selecciona…</option>
                  <option value="tiktok">TikTok</option>
                  <option value="linkedin">LinkedIn</option>
                  <option value="referido">Me lo recomendaron</option>
                  <option value="google">Google</option>
                  <option value="otro">Otro</option>
                </select>
              </div>

              {errors._global && <p className="gift-form__error gift-form__error--global">{errors._global}</p>}

              <button className="gift-form__submit" type="submit" disabled={loading}>
                {loading ? '✦ Enviando…' : '✦ Enviarme mi recurso personalizado →'}
              </button>
              <p className="gift-form__disclaimer">Sin spam · Solo el recurso que pediste · Cancela cuando quieras</p>
            </form>
          ) : (
            <div className="gift-success">
              <span className="gift-success__icon">✦</span>
              <h3 className="gift-success__title">¡En camino, {form.nombre}!</h3>
              <p className="gift-success__text">
                Hemos recibido tu petición. En breve recibirás en <strong>{form.email}</strong> un recurso
                adaptado a tu nivel y a lo que quieres conseguir — no una plantilla genérica.
              </p>
              <p className="gift-success__text">
                Tu descripción también nos ayudará a crear nuevos materiales más útiles para
                empresas con tu perfil. Gracias por contribuir.
              </p>
              <p className="gift-success__sub">Revisa tu bandeja de entrada (y el spam por si acaso).</p>
            </div>
          )}

        </div>
      </div>
    </section>
  )
}
