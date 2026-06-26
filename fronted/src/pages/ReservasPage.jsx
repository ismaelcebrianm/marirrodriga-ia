import { useState } from 'react'
import { ArrowLeft, Check, Shield, Clock, Star, RefreshCw } from 'lucide-react'

const WEBHOOK = import.meta.env.VITE_N8N_WEBHOOK_URL || ''

const C = {
  cream:  '#F5F0E8',
  cream2: '#EDE8DD',
  navy:   '#1A1A2E',
  gold:   '#C8A052',
  goldH:  '#B8923E',
  text:   '#4A4540',
  muted:  '#8C8680',
  border: '#E0DCD4',
}

const PLANS = [
  {
    id: 'basico',
    label: 'Básico',
    name: 'Agenda sin Booksy',
    desc: 'Tu propio sistema de reservas por WhatsApp. Sin plataformas de terceros, sin comisiones, sin que tus datos vivan en casa de otro.',
    monthly: 150,
    setup: 400,
    featured: false,
    ideal: 'Negocios que quieren dejar de pagar Booksy, Fresha o Treatwell y tener sus reservas en WhatsApp.',
    features: [
      { text: 'Reservas por WhatsApp 24/7 — El cliente escribe, el asistente responde al instante, ofrece los huecos reales de tu agenda y cierra la cita solo.', hi: false, inh: false },
      { text: 'Agenda flexible al minuto — Sin franjas rígidas ni huecos muertos. Si el siguiente cliente puede entrar a las 11:07, entra a las 11:07.', hi: false, inh: false },
      { text: 'Recordatorios automáticos con confirmación — 24h antes, el cliente recibe un WhatsApp. Si no puede venir, cancela o cambia la hora sin llamarte.', hi: false, inh: false },
      { text: 'Base de datos de clientes propia — Sus datos y su historial son tuyos, no de ninguna plataforma de terceros.', hi: false, inh: false },
    ],
  },
  {
    id: 'completo',
    label: 'Completo',
    name: 'Clientes que Vuelven',
    desc: 'Todo el sistema de reservas más reputación online automática y recuperación de clientes dormidos. El ciclo completo sin tocar nada.',
    monthly: 200,
    setup: 500,
    featured: true,
    ideal: 'Negocios que además de gestionar citas quieren crecer en reseñas y recuperar clientes sin esfuerzo.',
    features: [
      { text: 'Todo lo del plan Básico', hi: false, inh: true },
      { text: 'Reseñas Google automáticas — Tras cada cita el sistema pide valoración. Si la experiencia fue buena, lleva al cliente directo a Google. Sin acordarte de pedirlo nunca más.', hi: true, inh: false },
      { text: 'Reactivación de clientes dormidos — Si un habitual lleva más tiempo del normal sin reservar, recibe un mensaje automático. Recuperar 2-3 clientes al mes ya paga el servicio.', hi: true, inh: false },
      { text: 'Informe mensual — Citas gestionadas, ausencias evitadas, clientes reactivados y evolución de reseñas. En tu correo cada mes.', hi: false, inh: false },
    ],
  },
]

const POPUP_CFG = {
  basico:   { title: '¿Te interesa el plan Básico?',    desc: 'Reservas por WhatsApp y recordatorios. Sin Booksy, sin comisiones. Te contamos cómo quedaría.' },
  completo: { title: '¿Te interesa el plan Completo?',  desc: 'El sistema completo: reservas, reseñas y reactivación. Valoración gratuita incluida.' },
  general:  { title: '¿Hablamos sobre tu negocio?',     desc: 'Valoración gratuita de 15 minutos. Sin compromiso.' },
}

function PlanCard({ plan, onContact }) {
  const f = plan.featured
  const bg      = f ? C.navy : '#fff'
  const border  = f ? `2px solid ${C.gold}` : `1px solid ${C.border}`
  const shadow  = f ? '0 24px 64px rgba(26,26,46,.28)' : '0 2px 16px rgba(0,0,0,.04)'
  const textH   = f ? '#fff' : C.navy
  const textB   = f ? 'rgba(255,255,255,.65)' : '#6B6560'
  const textM   = f ? 'rgba(255,255,255,.4)' : C.muted
  const textInh = f ? 'rgba(255,255,255,.38)' : '#A09A94'
  const checkC  = f ? C.gold : C.navy
  const checkInh = f ? 'rgba(200,160,82,.45)' : '#C8C2BA'

  return (
    <div style={{
      flex: '1 1 280px', maxWidth: 420,
      background: bg, border, borderRadius: 16, boxShadow: shadow,
      padding: f ? '40px 28px 32px' : '32px 28px',
      display: 'flex', flexDirection: 'column',
      position: 'relative',
    }}>
      {f && (
        <div style={{
          position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)',
          background: C.gold, color: '#fff',
          fontSize: 11, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase',
          padding: '6px 20px', borderRadius: 20,
          display: 'flex', alignItems: 'center', gap: 5, whiteSpace: 'nowrap',
        }}>
          <Star size={11} fill="#fff" strokeWidth={0} /> Más elegido
        </div>
      )}

      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.13em', textTransform: 'uppercase', color: f ? C.gold : C.muted, marginBottom: 4 }}>
        {plan.label}
      </div>
      <h3 style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: 24, fontWeight: 700, color: textH, margin: '0 0 10px', lineHeight: 1.2 }}>
        {plan.name}
      </h3>
      <p style={{ fontSize: 14, lineHeight: 1.55, color: textB, margin: '0 0 24px', minHeight: 42 }}>
        {plan.desc}
      </p>

      <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 6 }}>
        <span style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: 42, fontWeight: 700, color: textH, lineHeight: 1 }}>
          {plan.monthly}€
        </span>
        <span style={{ fontSize: 15, color: textM }}>/mes</span>
      </div>
      <div style={{ fontSize: 13, color: textM, marginBottom: 6 }}>
        Puesta en marcha: {plan.setup.toLocaleString('es-ES')}€ (pago único)
      </div>
      <div style={{ fontSize: 12, color: textM, fontStyle: 'italic', marginBottom: 20 }}>
        {plan.ideal}
      </div>

      <div style={{ height: 1, background: f ? 'rgba(255,255,255,.1)' : C.border, marginBottom: 20 }} />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 13, flex: 1 }}>
        {plan.features.map((feat, i) => (
          <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
            <Check size={16} strokeWidth={2.5} style={{ flexShrink: 0, marginTop: 2, color: feat.inh ? checkInh : checkC }} />
            <span style={{
              fontSize: 14, lineHeight: 1.55,
              color: feat.inh ? textInh : feat.hi ? textH : textB,
              fontWeight: feat.hi ? 600 : 400,
            }}>
              {feat.text}
            </span>
          </div>
        ))}
      </div>

      <button
        onClick={() => onContact(plan.id)}
        style={{
          marginTop: 28, width: '100%', padding: '14px 24px',
          borderRadius: 10, cursor: 'pointer',
          border: f ? 'none' : `1.5px solid ${C.navy}`,
          background: f ? C.gold : 'transparent',
          color: f ? '#fff' : C.navy,
          fontSize: 15, fontWeight: 600,
          fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
          transition: 'all .2s ease',
        }}
        onMouseEnter={e => {
          if (f) e.currentTarget.style.background = C.goldH
          else { e.currentTarget.style.background = C.navy; e.currentTarget.style.color = '#fff' }
        }}
        onMouseLeave={e => {
          if (f) e.currentTarget.style.background = C.gold
          else { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = C.navy }
        }}
      >
        Solicitar información
      </button>
    </div>
  )
}

function ContactPopup({ plan, onClose }) {
  const [name, setName]   = useState('')
  const [email, setEmail] = useState('')
  const [biz, setBiz]     = useState('')
  const [sent, setSent]   = useState(false)
  const cfg = POPUP_CFG[plan] || POPUP_CFG.general

  async function handleSubmit() {
    if (!name.trim() || !email.trim()) return
    const payload = { nombre: name, email, negocio: biz, plan, source: 'web-sector-reservas' }
    if (WEBHOOK) {
      try { await fetch(WEBHOOK, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }) } catch {}
    } else {
      const sub = encodeURIComponent(`Lead web — ${plan} — ${name}`)
      const body = encodeURIComponent(`Nombre: ${name}\nEmail: ${email}\nNegocio: ${biz || '-'}\nPlan: ${plan}`)
      window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=ismaelcebrian14@gmail.com&su=${sub}&body=${body}`)
    }
    setSent(true)
  }

  return (
    <div
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.5)', backdropFilter: 'blur(6px)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div style={{ background: '#fff', borderRadius: 16, width: '100%', maxWidth: 420, overflow: 'hidden', boxShadow: '0 24px 64px rgba(0,0,0,.2)' }}>
        <div style={{ background: C.cream, borderBottom: `1px solid ${C.border}`, padding: '24px 24px 20px', position: 'relative' }}>
          <button onClick={onClose} style={{ position: 'absolute', top: 12, right: 14, background: 'none', border: 'none', fontSize: 18, color: C.muted, cursor: 'pointer' }}>✕</button>
          <div style={{ fontSize: 30, marginBottom: 8 }}>📅</div>
          <div style={{ display: 'inline-block', background: '#FFF8EC', border: '1px solid #E8D4A0', padding: '3px 10px', borderRadius: 100, fontSize: 11, color: '#8B6914', fontWeight: 700, marginBottom: 10 }}>
            Valoración gratuita incluida
          </div>
          <h3 style={{ fontFamily: "Georgia, serif", fontSize: 17, fontWeight: 700, color: C.navy, marginBottom: 5 }}>{cfg.title}</h3>
          <p style={{ fontSize: 13, color: C.text, lineHeight: 1.6, margin: 0 }}>{cfg.desc}</p>
        </div>
        {!sent ? (
          <div style={{ padding: '20px 24px 24px' }}>
            {[
              { label: 'Tu nombre', val: name, set: setName, ph: 'Ej: Ana García', type: 'text' },
              { label: 'Tu email', val: email, set: setEmail, ph: 'tu@negocio.com', type: 'email' },
              { label: 'Tipo de negocio (opcional)', val: biz, set: setBiz, ph: 'Peluquería, estética, fisio…', type: 'text' },
            ].map(fi => (
              <div key={fi.label} style={{ marginBottom: 13 }}>
                <label style={{ fontSize: 12, fontWeight: 700, color: C.muted, display: 'block', marginBottom: 5 }}>{fi.label}</label>
                <input type={fi.type} value={fi.val} placeholder={fi.ph} onChange={e => fi.set(e.target.value)}
                  style={{ width: '100%', border: `1.5px solid ${C.border}`, borderRadius: 8, padding: '10px 13px', fontSize: 13, outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' }}
                  onFocus={e => { e.target.style.borderColor = C.gold }}
                  onBlur={e => { e.target.style.borderColor = C.border }}
                />
              </div>
            ))}
            <button
              onClick={handleSubmit}
              disabled={!name.trim() || !email.trim()}
              style={{ width: '100%', background: C.navy, color: '#fff', border: 'none', padding: 13, borderRadius: 8, fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', opacity: (!name.trim() || !email.trim()) ? .45 : 1 }}
            >
              Quiero más información →
            </button>
            <p style={{ fontSize: 11, color: C.muted, textAlign: 'center', marginTop: 10 }}>Sin compromisos · Respondemos en menos de 24h</p>
          </div>
        ) : (
          <div style={{ padding: '40px 24px', textAlign: 'center' }}>
            <div style={{ fontSize: 48, marginBottom: 14 }}>🎉</div>
            <h3 style={{ fontSize: 18, fontWeight: 800, color: C.navy, marginBottom: 8 }}>¡Perfecto, {name.split(' ')[0]}!</h3>
            <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.7 }}>En menos de 24h te contactamos con los detalles y los próximos pasos.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default function ReservasPage({ onBack, onScrollTo }) {
  const [contactPlan, setContactPlan] = useState(null)

  return (
    <>
      <div style={{ minHeight: '100vh', background: C.cream, fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}>

        {/* ── BACK ──────────────────────────────────── */}
        <div style={{ maxWidth: 1240, margin: '0 auto', padding: '20px 24px 0' }}>
          <button
            onClick={onBack}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, color: C.muted, fontFamily: 'inherit', padding: '4px 0' }}
            onMouseEnter={e => e.currentTarget.style.color = C.gold}
            onMouseLeave={e => e.currentTarget.style.color = C.muted}
          >
            <ArrowLeft size={14} /> Para tu negocio
          </button>
        </div>

        {/* ── HERO ──────────────────────────────────── */}
        <div style={{ maxWidth: 780, margin: '0 auto', padding: '56px 24px 0', textAlign: 'center' }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.15em', textTransform: 'uppercase', color: C.gold, marginBottom: 20 }}>
            Automatización de agenda · Sin plataformas de terceros
          </div>
          <h1 style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: 'clamp(26px, 4.5vw, 40px)', fontWeight: 700, color: C.navy, margin: '0 0 18px', lineHeight: 1.2 }}>
            Tu sistema de reservas propio,<br />sin depender de nadie
          </h1>
          <p style={{ fontSize: 16, lineHeight: 1.65, color: '#6B6560', maxWidth: 560, margin: '0 auto 12px' }}>
            Un asistente que atiende por WhatsApp 24/7, cierra citas solo y cuida a los clientes que ya tienes.
            Sin Booksy, sin Fresha, sin comisiones, sin que tus datos vivan en casa de otro.
          </p>
          <p style={{ fontSize: 14, color: C.muted, fontStyle: 'italic', maxWidth: 500, margin: '0 auto 28px' }}>
            Para cualquier negocio que coja citas: peluquerías, centros de estética, fisioterapeutas, clínicas...
          </p>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(26,26,46,.05)', padding: '10px 22px', borderRadius: 24, fontSize: 13, color: C.text, marginBottom: 44 }}>
            <RefreshCw size={16} color={C.text} />
            Operativo en menos de una semana · Sin cambiar cómo trabajas
          </div>
        </div>

        {/* ── PLAN CARDS ────────────────────────────── */}
        <div style={{ maxWidth: 920, margin: '0 auto', padding: '0 24px', display: 'flex', gap: 24, justifyContent: 'center', alignItems: 'stretch', flexWrap: 'wrap' }}>
          {PLANS.map(p => <PlanCard key={p.id} plan={p} onContact={setContactPlan} />)}
        </div>

        {/* ── TRUST BLOCKS ──────────────────────────── */}
        <div style={{ maxWidth: 820, margin: '56px auto 0', padding: '0 24px', display: 'flex', gap: 20, flexWrap: 'wrap', justifyContent: 'center' }}>
          {[
            {
              Icon: Shield,
              title: 'Garantía de resultado',
              text: '200€ del setup son reembolsables si el sistema no gestiona citas de forma autónoma en los primeros 30 días. Tu riesgo real es mínimo.',
            },
            {
              Icon: Clock,
              title: 'Sin permanencia',
              text: 'Ambos planes son mensuales. Si en algún momento decides que no te compensa, cancelas y listo. Sin penalizaciones ni letras pequeñas.',
            },
          ].map(({ Icon, title, text }) => (
            <div key={title} style={{ flex: '1 1 280px', maxWidth: 390, background: '#fff', border: `1px solid ${C.border}`, borderRadius: 14, padding: 28, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <Icon size={24} color={C.navy} strokeWidth={1.5} style={{ marginBottom: 12 }} />
              <h3 style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: 17, fontWeight: 700, color: C.navy, margin: '0 0 8px' }}>{title}</h3>
              <p style={{ fontSize: 13, lineHeight: 1.65, color: '#6B6560', margin: 0 }}>{text}</p>
            </div>
          ))}
        </div>

        {/* ── BOTTOM CTA ────────────────────────────── */}
        <div style={{ maxWidth: 560, margin: '48px auto 0', padding: '0 24px 72px', textAlign: 'center' }}>
          <p style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: 21, fontWeight: 700, color: C.navy, margin: '0 0 10px' }}>
            ¿No sabes cuál te encaja?
          </p>
          <p style={{ fontSize: 14, color: '#6B6560', lineHeight: 1.6, margin: '0 0 24px' }}>
            En 15 minutos te enseñamos el sistema funcionando en directo y te decimos qué plan tiene más sentido para tu tipo de negocio.
          </p>
          <button
            onClick={() => setContactPlan('general')}
            style={{ padding: '14px 36px', borderRadius: 10, border: 'none', background: C.navy, color: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', transition: 'background .2s' }}
            onMouseEnter={e => e.currentTarget.style.background = '#2D2D4E'}
            onMouseLeave={e => e.currentTarget.style.background = C.navy}
          >
            Hablar con nosotros
          </button>
          <p style={{ fontSize: 12, color: C.muted, marginTop: 18, fontStyle: 'italic' }}>Marirrodriga I.A. · Automatizamos lo que te roba tiempo.</p>
        </div>
      </div>

      {contactPlan && <ContactPopup plan={contactPlan} onClose={() => setContactPlan(null)} />}
    </>
  )
}
