import { useState } from 'react'
import { ArrowRight, Clock, Send, CheckCircle, Star } from 'lucide-react'

// Reemplazar por la URL del webhook n8n cuando esté creado el workflow
const SECTOR_WEBHOOK = ''

function WebIllus() {
  return (
    <div style={{ width: '100%', height: '100%', background: 'linear-gradient(145deg, #DBEAFE 0%, #EFF6FF 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '18px 14px', boxSizing: 'border-box', overflow: 'hidden' }}>
      <svg viewBox="0 0 320 176" style={{ width: '100%', filter: 'drop-shadow(0 6px 18px rgba(26,26,46,.16))' }}>
        <rect width="320" height="176" rx="9" fill="white" />
        {/* Toolbar */}
        <rect width="320" height="28" rx="9" fill="#1A1A2E" />
        <rect y="20" width="320" height="8" fill="#1A1A2E" />
        <circle cx="14" cy="14" r="3.8" fill="#FF5F57" />
        <circle cx="26" cy="14" r="3.8" fill="#FFBD2E" />
        <circle cx="38" cy="14" r="3.8" fill="#28CA41" />
        <rect x="56" y="8" width="178" height="12" rx="6" fill="rgba(255,255,255,.1)" />
        <rect x="68" y="12" width="8" height="4" rx="1" fill="rgba(255,255,255,.3)" />
        <rect x="80" y="12" width="70" height="4" rx="1" fill="rgba(255,255,255,.22)" />
        {/* Nav */}
        <rect y="28" width="320" height="20" fill="#F8FAFC" />
        <rect x="10" y="33" width="30" height="7" rx="2" fill="#1A1A2E" opacity=".8" />
        <rect x="46" y="34" width="14" height="5" rx="1.5" fill="#C8A052" opacity=".7" />
        <rect x="164" y="35" width="20" height="4" rx="1.5" fill="#94A3B8" />
        <rect x="190" y="35" width="20" height="4" rx="1.5" fill="#94A3B8" />
        <rect x="216" y="35" width="20" height="4" rx="1.5" fill="#94A3B8" />
        <rect x="244" y="31" width="64" height="16" rx="5" fill="#C8A052" />
        <rect x="254" y="35" width="44" height="5" rx="1.5" fill="white" opacity=".85" />
        {/* Hero */}
        <rect y="48" width="320" height="74" fill="#1A1A2E" />
        <rect x="12" y="62" width="148" height="9" rx="2.5" fill="white" opacity=".92" />
        <rect x="12" y="76" width="120" height="6" rx="2" fill="white" opacity=".38" />
        <rect x="12" y="87" width="100" height="6" rx="2" fill="white" opacity=".38" />
        <rect x="12" y="101" width="68" height="14" rx="4.5" fill="#C8A052" />
        <rect x="86" y="101" width="50" height="14" rx="4.5" fill="rgba(255,255,255,.1)" />
        {/* Right device mockup */}
        <rect x="198" y="54" width="110" height="62" rx="7" fill="rgba(255,255,255,.06)" stroke="rgba(200,160,82,.3)" strokeWidth="1" />
        <rect x="208" y="63" width="90" height="8" rx="2" fill="rgba(200,160,82,.22)" />
        <rect x="208" y="76" width="70" height="5" rx="1.5" fill="rgba(255,255,255,.12)" />
        <rect x="208" y="85" width="55" height="5" rx="1.5" fill="rgba(255,255,255,.08)" />
        <rect x="208" y="97" width="46" height="12" rx="3" fill="rgba(200,160,82,.3)" />
        {/* AI chip */}
        <rect x="200" y="53" width="64" height="19" rx="9.5" fill="#C8A052" />
        <rect x="208" y="58" width="8" height="9" rx="1.5" fill="rgba(255,255,255,.35)" />
        <rect x="220" y="60" width="36" height="5" rx="1.5" fill="white" opacity=".9" />
        {/* Feature cards */}
        <rect x="10" y="132" width="88" height="36" rx="5" fill="white" stroke="#E5E7EB" strokeWidth=".8" />
        <rect x="16" y="139" width="18" height="18" rx="3.5" fill="#EFF6FF" />
        <rect x="18" y="151" width="3" height="4" rx=".5" fill="#3B82F6" />
        <rect x="22" y="147" width="3" height="8" rx=".5" fill="#3B82F6" />
        <rect x="26" y="144" width="3" height="11" rx=".5" fill="#3B82F6" />
        <rect x="38" y="141" width="52" height="5" rx="1.5" fill="#1A1A2E" opacity=".75" />
        <rect x="38" y="151" width="40" height="4" rx="1.5" fill="#94A3B8" />
        <rect x="16" y="161" width="74" height="3.5" rx="1.5" fill="#E5E7EB" />
        <rect x="114" y="132" width="88" height="36" rx="5" fill="white" stroke="#E5E7EB" strokeWidth=".8" />
        <rect x="120" y="139" width="18" height="18" rx="3.5" fill="#FFF7ED" />
        <rect x="122" y="141" width="14" height="11" rx="2.5" fill="none" stroke="#F97316" strokeWidth="1.3" />
        <path d="M124 152 L122 156 L127 153.5" fill="#F97316" />
        <rect x="142" y="141" width="52" height="5" rx="1.5" fill="#1A1A2E" opacity=".75" />
        <rect x="142" y="151" width="40" height="4" rx="1.5" fill="#94A3B8" />
        <rect x="120" y="161" width="74" height="3.5" rx="1.5" fill="#E5E7EB" />
        <rect x="218" y="132" width="92" height="36" rx="5" fill="white" stroke="#E5E7EB" strokeWidth=".8" />
        <rect x="224" y="139" width="18" height="18" rx="3.5" fill="#F0FDF4" />
        <path d="M233 140.5 L234.2 143.8 L237.7 143.8 L235 145.8 L236 149 L233 147.1 L230 149 L231 145.8 L228.3 143.8 L231.8 143.8Z" fill="#22C55E" />
        <rect x="246" y="141" width="56" height="5" rx="1.5" fill="#1A1A2E" opacity=".75" />
        <rect x="246" y="151" width="42" height="4" rx="1.5" fill="#94A3B8" />
        <rect x="224" y="161" width="78" height="3.5" rx="1.5" fill="#E5E7EB" />
      </svg>
    </div>
  )
}

function RrssIllus() {
  return (
    <div style={{ width: '100%', height: '100%', background: 'linear-gradient(145deg, #DCFCE7 0%, #F0FDF4 100%)', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '12px 10px', boxSizing: 'border-box' }}>
      <svg viewBox="0 0 320 185" style={{ width: '100%' }}>
        {/* Sparkles background */}
        <g opacity=".38">
          <rect x="26" y="16" width="2" height="12" rx="1" fill="#C8A052" />
          <rect x="21" y="21" width="12" height="2" rx="1" fill="#C8A052" />
        </g>
        <g opacity=".22">
          <rect x="289" y="34" width="2" height="9" rx="1" fill="#C8A052" />
          <rect x="285.5" y="37.5" width="9" height="2" rx="1" fill="#C8A052" />
        </g>
        <g opacity=".2">
          <rect x="297" y="156" width="2" height="10" rx="1" fill="#22C55E" />
          <rect x="293" y="160" width="10" height="2" rx="1" fill="#22C55E" />
        </g>
        {/* Back card — Instagram/purple */}
        <g transform="rotate(6,218,96)">
          <rect x="108" y="14" width="182" height="155" rx="10" fill="white" stroke="#E5E7EB" strokeWidth="1" opacity=".6" />
          <rect x="108" y="14" width="182" height="54" rx="10" fill="#7C3AED" opacity=".42" />
          <rect x="108" y="52" width="182" height="16" fill="#7C3AED" opacity=".42" />
          <rect x="118" y="80" width="82" height="5" rx="2" fill="#E5E7EB" />
          <rect x="118" y="90" width="66" height="5" rx="2" fill="#E5E7EB" />
          <rect x="118" y="100" width="74" height="5" rx="2" fill="#E5E7EB" />
          <rect x="118" y="114" width="138" height="30" rx="5" fill="#EDE9FE" opacity=".7" />
        </g>
        {/* Back card — LinkedIn/blue */}
        <g transform="rotate(-5,106,96)">
          <rect x="24" y="16" width="182" height="155" rx="10" fill="white" stroke="#E5E7EB" strokeWidth="1" opacity=".68" />
          <rect x="24" y="16" width="182" height="34" rx="10" fill="#0A66C2" opacity=".48" />
          <rect x="24" y="38" width="182" height="12" fill="#0A66C2" opacity=".48" />
          <circle cx="44" cy="66" r="12" fill="#DBEAFE" opacity=".85" />
          <rect x="62" y="61" width="80" height="5" rx="2" fill="#E2E8F0" />
          <rect x="62" y="71" width="60" height="4" rx="2" fill="#E2E8F0" />
          <rect x="34" y="88" width="148" height="4" rx="2" fill="#E2E8F0" />
          <rect x="34" y="98" width="130" height="4" rx="2" fill="#E2E8F0" />
          <rect x="34" y="108" width="110" height="4" rx="2" fill="#E2E8F0" />
        </g>
        {/* Front card */}
        <rect x="62" y="6" width="196" height="172" rx="11" fill="white" stroke="#D1D5DB" strokeWidth="1.2" />
        {/* Avatar */}
        <circle cx="84" cy="32" r="14" fill="#EDE9FE" />
        <circle cx="84" cy="28.5" r="5" fill="#7C3AED" />
        <path d="M75 41 Q84 47 93 41" fill="#7C3AED" />
        {/* Name/handle */}
        <rect x="104" y="24" width="90" height="7" rx="2.5" fill="#111827" opacity=".82" />
        <rect x="104" y="37" width="66" height="4.5" rx="2" fill="#9CA3AF" />
        {/* IA badge */}
        <rect x="212" y="20" width="38" height="19" rx="9.5" fill="#C8A052" />
        <rect x="219" y="25" width="6" height="9" rx="1.5" fill="rgba(255,255,255,.35)" />
        <rect x="228" y="27" width="16" height="5" rx="1.5" fill="white" opacity=".9" />
        {/* Post text lines */}
        <rect x="72" y="56" width="172" height="6" rx="2" fill="#374151" opacity=".85" />
        <rect x="72" y="67" width="158" height="5" rx="2" fill="#374151" opacity=".55" />
        <rect x="72" y="77" width="144" height="5" rx="2" fill="#374151" opacity=".55" />
        <rect x="72" y="87" width="110" height="5" rx="2" fill="#374151" opacity=".3" />
        {/* Post image */}
        <rect x="72" y="101" width="172" height="42" rx="7" fill="#EDE9FE" />
        <rect x="82" y="112" width="80" height="6" rx="2" fill="#7C3AED" opacity=".38" />
        <rect x="82" y="123" width="60" height="5" rx="2" fill="#7C3AED" opacity=".25" />
        <circle cx="212" cy="121" r="13" fill="#DDD6FE" />
        <path d="M208 115 L208 127 L219 121Z" fill="#7C3AED" opacity=".55" />
        {/* Engagement divider */}
        <line x1="72" y1="151" x2="244" y2="151" stroke="#F3F4F6" strokeWidth="1" />
        {/* Heart */}
        <path d="M76 158 C76 156 77.5 154 79 154 C80 154 81 154.8 81.5 156 C82 154.8 83 154 84 154 C85.5 154 87 156 87 158 C87 160.5 81.5 164.5 81.5 164.5 C81.5 164.5 76 160.5 76 158Z" fill="#EF4444" opacity=".7" />
        <rect x="90" y="157" width="18" height="4" rx="2" fill="#E5E7EB" />
        {/* Comment */}
        <rect x="118" y="154" width="14" height="10" rx="2.5" fill="none" stroke="#9CA3AF" strokeWidth="1.2" />
        <path d="M120 164 L118 167.5 L123 165" fill="#9CA3AF" />
        <rect x="136" y="157" width="18" height="4" rx="2" fill="#E5E7EB" />
        {/* Share */}
        <path d="M164 157 L170 161 L176 157" fill="none" stroke="#9CA3AF" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="170" y1="161" x2="170" y2="167" stroke="#9CA3AF" strokeWidth="1.2" />
        {/* Scheduled badge */}
        <rect x="182" y="151" width="72" height="17" rx="8.5" fill="#F0FDF4" stroke="#86EFAC" strokeWidth="1" />
        <circle cx="194" cy="159.5" r="4.5" fill="none" stroke="#22C55E" strokeWidth="1.3" />
        <path d="M194 156.5 L194 159.5 L196.5 161.5" stroke="#22C55E" strokeWidth="1.2" strokeLinecap="round" />
        <rect x="202" y="156" width="46" height="5" rx="2" fill="#22C55E" opacity=".6" />
      </svg>
    </div>
  )
}

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
    coverIllus: WebIllus,
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
    coverIllus: RrssIllus,
    available: true,
  },
]

const FILTER_SECTORS = [
  { id: 'dental',      label: 'Clínica Dental',   emoji: '🦷' },
  { id: 'estetica',    label: 'Estética',          emoji: '💆' },
  { id: 'deporte',     label: 'Centro Deportivo',  emoji: '🏋️' },
  { id: 'autoescuela', label: 'Autoescuela',       emoji: '🚗' },
]

const CITAS_CARD = {
  id: 'reservas',
  emoji: '📅',
  name: 'Solo Citas',
  tagline: '¿Solo buscas automatizar tu agenda?',
  desc: 'Tu propio sistema de reservas por WhatsApp — sin Booksy, sin Fresha, sin comisiones. Desde 150€/mes.',
  price: 'Desde 150€/mes',
  coverBg: 'linear-gradient(135deg, #1A1A2E 0%, #2D2D4E 100%)',
  coverIllus: null,
  coverPhoto: null,
  available: true,
}

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
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,.38)', marginBottom: 6 }}>2 planes disponibles</div>
        <div style={{ fontSize: 22, fontWeight: 800, color: '#fff', fontFamily: "Georgia, serif", marginBottom: 2 }}>desde 150€<span style={{ fontSize: 13, fontWeight: 400, color: 'rgba(255,255,255,.4)' }}>/mes</span></div>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,.3)', marginBottom: 18 }}>+ setup pago único</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 13, fontWeight: 700, color: hov ? '#C8A052' : 'rgba(255,255,255,.75)', transition: 'color .2s' }}>
          Ver la oferta completa
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
        </div>
      </div>
    </div>
  )
}

export default function NegocioPage({ onNavigate, onScrollTo }) {
  const [filter, setFilter] = useState(null)

  const filteredCards = filter ? [
    SECTORS.find(s => s.id === filter),
    SECTORS.find(s => s.id === 'rrss'),
    SECTORS.find(s => s.id === 'web'),
    CITAS_CARD,
  ] : null

  function renderCard(s, recommended = false) {
    const CoverIllus = s.coverIllus
    return (
      <div
        key={s.id}
        className="blog-card"
        style={{ opacity: s.available ? 1 : 0.55, cursor: s.available ? 'pointer' : 'default', position: 'relative' }}
        onClick={() => s.available && onNavigate(s.id)}
        role={s.available ? 'button' : undefined}
        tabIndex={s.available ? 0 : undefined}
        onKeyDown={s.available ? e => e.key === 'Enter' && onNavigate(s.id) : undefined}
      >
        <div className="blog-card__img" style={(s.coverPhoto || CoverIllus) ? {} : { background: s.coverBg, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
          {s.coverPhoto
            ? <img src={s.coverPhoto} alt={s.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            : CoverIllus
              ? <CoverIllus />
              : <span style={{ fontSize: 60, lineHeight: 1 }}>{s.emoji}</span>
          }
          {recommended && (
            <div style={{ position: 'absolute', top: 10, left: 10, display: 'inline-flex', alignItems: 'center', gap: 5, background: '#C8A052', borderRadius: 20, padding: '5px 13px', fontSize: 11, fontWeight: 700, color: '#fff', letterSpacing: '.04em' }}>
              <Star size={10} fill="#fff" strokeWidth={0} /> Recomendado para ti
            </div>
          )}
          {!s.available && (
            <span style={{ position: 'absolute', top: 10, right: 10, display: 'inline-flex', alignItems: 'center', gap: 5, background: 'rgba(0,0,0,.55)', borderRadius: 20, padding: '4px 12px', fontSize: 11, fontWeight: 700, color: '#fff', letterSpacing: '.04em' }}>
              <Clock size={10} /> Próximamente
            </span>
          )}
        </div>
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
    )
  }

  const pill = active => ({
    padding: '11px 24px', borderRadius: 100, fontSize: 14, fontWeight: 600,
    cursor: 'pointer', fontFamily: 'inherit', transition: 'all .18s',
    border: '1.5px solid',
    background: active ? '#1A1A2E' : '#fff',
    color: active ? '#fff' : 'var(--text-1)',
    borderColor: active ? '#1A1A2E' : 'var(--border)',
    boxShadow: active ? '0 4px 16px rgba(26,26,46,.22)' : '0 1px 5px rgba(0,0,0,.07)',
  })

  return (
    <div>
      {/* ── HERO ─────────────────────────────────────────── */}
      <div className="svcs-hero">
        <div className="svc-note"><div className="bdot" />Soluciones verticales · IA adaptada a cada sector</div>
        <h1>Software con integraciones IA, para <em>tu tipo de negocio</em></h1>
        <p>No todas las empresas tienen los mismos problemas. Aquí encontrarás sistemas pensados para cómo funciona realmente tu sector — con precios claros y resultados medibles.</p>
      </div>

      {/* ── FILTRO ───────────────────────────────────────── */}
      <div style={{
        position: 'sticky', top: 62, zIndex: 20,
        borderTop: '1px solid var(--border-light)',
        borderBottom: '1px solid var(--border-light)',
        background: 'rgba(255,255,255,0.9)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        padding: '18px 24px',
      }}>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', maxWidth: 1200, margin: '0 auto' }}>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--text-3)', flexShrink: 0, marginRight: 6 }}>
            Tu sector
          </span>
          <div style={{ width: 1, height: 22, background: 'var(--border-light)', marginRight: 4, flexShrink: 0 }} />
          <button onClick={() => setFilter(null)} style={pill(filter === null)}>
            Todos
          </button>
          {FILTER_SECTORS.map(f => (
            <button key={f.id} onClick={() => setFilter(f.id)} style={pill(filter === f.id)}>
              {f.emoji} {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── CARDS ────────────────────────────────────────── */}
      {filter ? (
        <div className="section--services" style={{ maxWidth: 860, margin: '0 auto' }}>
          <div className="blog-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
            {filteredCards.map((s, i) => renderCard(s, i === 0))}
          </div>
        </div>
      ) : (
        <div className="section--services" style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="blog-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
                {SECTORS.map(s => renderCard(s, false))}
              </div>
            </div>
            <CitasOfferCard onNavigate={onNavigate} />
          </div>
        </div>
      )}

      {/* ── SECTOR REQUEST FORM ──────────────────────────── */}
      <SectorRequestForm />
    </div>
  )
}
