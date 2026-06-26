import { useState } from 'react'
import { ArrowRight, Clock, Send, CheckCircle } from 'lucide-react'

// Reemplazar por la URL del webhook n8n cuando esté creado el workflow
const SECTOR_WEBHOOK = ''

const SECTORS = [
  {
    id: 'dental',
    emoji: '🦷',
    name: 'Clínica Dental',
    tagline: 'Dentia — llena la agenda, cierra presupuestos y reactiva pacientes.',
    desc: 'Citas 24/7, seguimiento de presupuestos, recordatorios anti no-show e informes mensuales. Instalación compatible con tu software actual.',
    price: 'Desde 200€/mes',
    coverBg: 'linear-gradient(135deg, #EBF8FF 0%, #BEE3F8 100%)',
    coverPhoto: '/cover-dental.png',
    available: true,
  },
  {
    id: 'estetica',
    emoji: '💆',
    name: 'Clínica de Estética',
    tagline: 'Gestión de citas y seguimiento de tratamientos.',
    desc: 'El mismo sistema adaptado a centros de estética. Citas, seguimiento de tratamientos y reactivación de clientes.',
    price: null,
    coverBg: 'linear-gradient(135deg, #FFF5F7 0%, #FED7E2 100%)',
    coverPhoto: '/cover-estetica.png',
    available: true,
  },
  {
    id: 'deporte',
    emoji: '🏋️',
    name: 'Centro Deportivo',
    tagline: 'Reservas, cuotas y reactivación de socios.',
    desc: 'Reservas de clases, recordatorios de cuotas, bienvenida a nuevos socios y reactivación de bajas.',
    price: null,
    coverBg: 'linear-gradient(135deg, #F0FFF4 0%, #C6F6D2 100%)',
    coverPhoto: '/cover-deporte.png',
    available: true,
  },
  {
    id: 'autoescuela',
    emoji: '🚗',
    name: 'Autoescuela',
    tagline: 'Gestión de alumnos, clases y exámenes en automático.',
    desc: 'Chatbot de consultas e inscripciones, recordatorios de clases y exámenes, seguimiento de alumnos y reactivación de leads que no convirtieron.',
    price: null,
    coverBg: 'linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)',
    coverPhoto: '/cover-autoescuela.png',
    available: true,
  },
  {
    id: 'web',
    emoji: '🌐',
    name: 'Presencia Web',
    tagline: 'Tu web conectada a todas tus automatizaciones.',
    desc: 'Páginas web modernas, rápidas y conectadas a tus agentes de IA. Sin plantillas genéricas, con chatbot, leads y blog integrados desde el primer día.',
    price: null,
    coverBg: 'linear-gradient(135deg, #EFF6FF 0%, #BFDBFE 100%)',
    coverPhoto: '/og-image.png',
    available: true,
  },
  {
    id: 'rrss',
    emoji: '📱',
    name: 'RRSS & Blog',
    tagline: 'Contenido diario en tu blog, redes y newsletter sin tocar nada.',
    desc: 'La IA selecciona temas, redacta, genera imágenes y publica en tu nombre en LinkedIn, Instagram, X y newsletter. Todos los días, sin intervención.',
    price: null,
    coverBg: 'linear-gradient(135deg, #F0FDF4 0%, #BBF7D0 100%)',
    coverPhoto: '/noticias-preview.png',
    available: true,
  },
]

const S = {
  bg:      'var(--bg-secondary)',
  border:  'var(--border-light)',
  brand:   'var(--brand)',
  text1:   'var(--text-1)',
  text3:   'var(--text-3)',
  input:   { width: '100%', padding: '12px 14px', borderRadius: 10, border: '1.5px solid var(--border)', background: '#fff', fontSize: 14, fontFamily: 'var(--font-body)', color: 'var(--text-1)', outline: 'none', boxSizing: 'border-box', transition: 'border-color .2s' },
}

function SectorRequestForm() {
  const [negocio,   setNegocio]   = useState('')
  const [problemas, setProblemas] = useState('')
  const [status,    setStatus]    = useState('idle') // idle | sending | done | error

  async function handleSubmit(e) {
    e.preventDefault()
    if (!negocio.trim()) return
    setStatus('sending')
    const payload = { negocio: negocio.trim(), problemas: problemas.trim(), origen: 'web-para-tu-negocio' }
    try {
      if (SECTOR_WEBHOOK) {
        await fetch(SECTOR_WEBHOOK, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      } else {
        const sub  = encodeURIComponent(`Nuevo sector solicitado: ${payload.negocio}`)
        const body = encodeURIComponent(`Negocio: ${payload.negocio}\n\nProblemas a cubrir:\n${payload.problemas || '(no especificado)'}`)
        window.open(`mailto:ismaelcebrian14@gmail.com?subject=${sub}&body=${body}`)
      }
      setStatus('done')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div style={{ borderTop: `1px solid ${S.border}`, background: S.bg, padding: '64px 48px' }}>
      <div style={{ maxWidth: 560, margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 26, fontWeight: 900, letterSpacing: '-1px', marginBottom: 10, color: S.text1 }}>
          ¿Tu sector no está aquí <span style={{ color: S.brand }}>todavía</span>?
        </h2>
        <p style={{ fontSize: 15, color: S.text3, lineHeight: 1.75, marginBottom: 32 }}>
          Cuéntanos qué tipo de negocio tienes y qué problemas quieres resolver. Lo añadimos por orden de demanda.
        </p>

        {status === 'done' ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, padding: '32px 0', color: '#16A34A' }}>
            <CheckCircle size={40} />
            <p style={{ fontWeight: 700, fontSize: 16, margin: 0 }}>Mensaje recibido. Te contactamos pronto.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14, textAlign: 'left' }}>
            <div>
              <label style={{ fontSize: 12, fontWeight: 700, color: S.text3, letterSpacing: '.06em', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>
                ¿Cuál es tu negocio?
              </label>
              <input
                type="text"
                placeholder="Ej: clínica veterinaria, academia de idiomas…"
                value={negocio}
                onChange={e => setNegocio(e.target.value)}
                required
                style={S.input}
                onFocus={e => e.target.style.borderColor = S.brand}
                onBlur={e => e.target.style.borderColor = 'var(--border)'}
              />
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 700, color: S.text3, letterSpacing: '.06em', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>
                ¿Qué problemas quieres que el software cubra?
              </label>
              <textarea
                placeholder="Ej: gestión de citas, recordatorios automáticos, seguimiento de clientes inactivos…"
                value={problemas}
                onChange={e => setProblemas(e.target.value)}
                rows={4}
                style={{ ...S.input, resize: 'vertical', lineHeight: 1.6 }}
                onFocus={e => e.target.style.borderColor = S.brand}
                onBlur={e => e.target.style.borderColor = 'var(--border)'}
              />
            </div>
            <button
              type="submit"
              disabled={status === 'sending'}
              className="nb"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '13px 32px', fontSize: 15, opacity: status === 'sending' ? .6 : 1, cursor: status === 'sending' ? 'not-allowed' : 'pointer' }}
            >
              <Send size={15} />
              {status === 'sending' ? 'Enviando…' : 'Proponer mi sector'}
            </button>
            {status === 'error' && <p style={{ fontSize: 13, color: '#DC2626', textAlign: 'center', margin: 0 }}>Error al enviar. Inténtalo de nuevo.</p>}
          </form>
        )}
      </div>
    </div>
  )
}

function CitasOfferCard({ onNavigate }) {
  const [hov, setHov] = useState(false)
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onNavigate('reservas')}
      onKeyDown={e => e.key === 'Enter' && onNavigate('reservas')}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        width: 252,
        flexShrink: 0,
        background: '#1A1A2E',
        borderRadius: 16,
        border: `1.5px solid ${hov ? '#C8A052' : 'rgba(200,160,82,.35)'}`,
        padding: '26px 22px',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        transition: 'border-color .2s, box-shadow .2s',
        boxShadow: hov ? '0 8px 40px rgba(200,160,82,.2)' : '0 4px 20px rgba(26,26,46,.2)',
      }}
    >
      <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#C8A052', marginBottom: 14 }}>
        Para negocios con citas
      </div>
      <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 17, fontWeight: 900, color: '#fff', margin: '0 0 14px', lineHeight: 1.25, letterSpacing: '-0.3px' }}>
        ¿Solo buscas automatizar tu agenda?
      </h3>
      <p style={{ fontSize: 13, color: 'rgba(255,255,255,.52)', lineHeight: 1.7, margin: '0 0 20px' }}>
        Tu propio sistema de reservas por WhatsApp — sin Booksy, sin Fresha, sin comisiones.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 'auto' }}>
        {[
          'Reservas 24/7 por WhatsApp',
          'Recordatorios con confirmación',
          'Reseñas Google automáticas',
          'Reactivación de inactivos',
        ].map(feat => (
          <div key={feat} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
            <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0, marginTop: 2 }}>
              <path d="M5 10.5L8.5 14L15 7" stroke="#C8A052" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span style={{ fontSize: 12.5, color: 'rgba(255,255,255,.65)', lineHeight: 1.45 }}>{feat}</span>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 24, paddingTop: 20, borderTop: '1px solid rgba(255,255,255,.08)' }}>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,.38)', marginBottom: 6 }}>Plan único</div>
        <div style={{ fontSize: 22, fontWeight: 800, color: '#fff', fontFamily: "Georgia, serif", marginBottom: 2 }}>150€<span style={{ fontSize: 13, fontWeight: 400, color: 'rgba(255,255,255,.4)' }}>/mes</span></div>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,.3)', marginBottom: 18 }}>+ 400€ puesta en marcha</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 13, fontWeight: 700, color: hov ? '#C8A052' : 'rgba(255,255,255,.75)', transition: 'color .2s' }}>
          Ver la oferta completa
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
        </div>
      </div>
    </div>
  )
}

export default function NegocioPage({ onNavigate, onScrollTo }) {
  return (
    <div>
      {/* ── HERO ─────────────────────────────────────────── */}
      <div className="svcs-hero">
        <div className="svc-note"><div className="bdot" />Soluciones verticales · IA adaptada a cada sector</div>
        <h1>Software con integraciones IA, para <em>tu tipo de negocio</em></h1>
        <p>No todas las empresas tienen los mismos problemas. Aquí encontrarás sistemas pensados para cómo funciona realmente tu sector — con precios claros y resultados medibles.</p>
      </div>

      {/* ── CARDS + CITAS CARD ───────────────────────────── */}
      <div className="section--services" style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="blog-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
              {SECTORS.map(s => (
                <div
                  key={s.id}
                  className="blog-card"
                  style={{ opacity: s.available ? 1 : 0.55, cursor: s.available ? 'pointer' : 'default', position: 'relative' }}
                  onClick={() => s.available && onNavigate(s.id)}
                  role={s.available ? 'button' : undefined}
                  tabIndex={s.available ? 0 : undefined}
                  onKeyDown={s.available ? (e) => e.key === 'Enter' && onNavigate(s.id) : undefined}
                >
                  {/* Cover */}
                  <div className="blog-card__img" style={s.coverPhoto ? {} : { background: s.coverBg, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
                    {s.coverPhoto
                      ? <img src={s.coverPhoto} alt={s.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      : <span style={{ fontSize: 60, lineHeight: 1 }}>{s.emoji}</span>
                    }
                    {!s.available && (
                      <span style={{ position: 'absolute', top: 10, right: 10, display: 'inline-flex', alignItems: 'center', gap: 5, background: 'rgba(0,0,0,.55)', borderRadius: 20, padding: '4px 12px', fontSize: 11, fontWeight: 700, color: '#fff', letterSpacing: '.04em' }}>
                        <Clock size={10} /> Próximamente
                      </span>
                    )}
                  </div>

                  {/* Body */}
                  <div className="blog-card__body">
                    <span className="blog-tag">{s.name}</span>
                    <h3 className="blog-card__title">{s.tagline}</h3>
                    <p className="blog-card__summary">{s.desc}</p>
                    <div className="blog-card__footer">
                      <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-1)' }}>
                        {s.price
                          ? s.price
                          : <span style={{ color: 'var(--text-4)', fontWeight: 400, fontSize: 11 }}>Ver oferta</span>
                        }
                      </span>
                      {s.available && (
                        <span className="blog-card__read-more" style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                          Ver oferta <ArrowRight size={11} />
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <CitasOfferCard onNavigate={onNavigate} />
        </div>
      </div>

      {/* ── SECTOR REQUEST FORM ──────────────────────────── */}
      <SectorRequestForm />
    </div>
  )
}
