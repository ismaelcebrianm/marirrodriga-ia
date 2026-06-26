import { useState } from 'react'
import { ArrowLeft, Check, Shield, Calendar, Star, RefreshCw } from 'lucide-react'

const WEBHOOK = import.meta.env.VITE_N8N_WEBHOOK_URL || ''

const C = {
  cream: '#F5F0E8', cream2: '#EDE8DD',
  navy: '#1A1A2E', gold: '#C8A052', goldH: '#B8923E',
  text: '#4A4540', muted: '#8C8680', border: '#E0DCD4',
}

const PLANS = [
  {
    id: 'basico', label: 'Básico', name: 'Agenda sin Huecos', featured: false,
    monthly: 180, setup: 450,
    desc: 'Tus clientes reservan por WhatsApp, los recordatorios reducen las ausencias y cada cita termina pidiendo una reseña en Google.',
    ideal: 'Centros de uñas, peluquerías y estética básica que quieren dejar de perder citas y ganar reseñas.',
    features: [
      { text: 'Reservas por WhatsApp 24/7 — El asistente responde, ofrece huecos reales y cierra la cita sin que nadie coja el teléfono.', hi: false, inh: false },
      { text: 'Recordatorios con confirmación — 24h antes de cada cita. Quien no pueda venir avisa y libera el hueco.', hi: false, inh: false },
      { text: 'Reseñas Google automáticas — El 70% de las decisiones de compra en estética se toman mirando reseñas y fotos en Google.', hi: true, inh: false },
      { text: 'Base de datos de clientes propia — Sus datos y su historial son tuyos, no de ninguna plataforma de terceros.', hi: false, inh: false },
    ],
  },
  {
    id: 'estandar', label: 'Estándar', name: 'Cliente Fiel', featured: true,
    monthly: 300, setup: 750,
    desc: 'Todo lo anterior más el seguimiento que hace que un cliente puntual se convierta en uno que vuelve, sesión tras sesión.',
    ideal: 'Clínicas estéticas con tratamientos por sesiones (láser, corporal, facial) que quieren retener y rellenar la agenda.',
    features: [
      { text: 'Todo lo del plan Básico', hi: false, inh: true },
      { text: 'Seguimiento post-tratamiento — El cliente recibe cuidados y pautas tras la sesión, y un aviso para reservar la siguiente.', hi: true, inh: false },
      { text: 'Reactivación de clientes dormidos — Si alguien lleva más tiempo del normal sin volver, recibe un mensaje automático. Recuperar 2-3 clientes al mes ya paga el servicio.', hi: true, inh: false },
      { text: 'Bonos y fidelización — El sistema lleva la cuenta de sesiones de cada bono y avisa cuando se agota.', hi: false, inh: false },
      { text: 'Informe mensual automático — Citas, ausencias evitadas, clientes reactivados y evolución de reseñas. En tu correo cada mes.', hi: false, inh: false },
    ],
  },
  {
    id: 'premium', label: 'Premium', name: 'Clínica Autónoma', featured: false,
    monthly: 450, setup: 1200,
    desc: 'El sistema completo para clínicas que también reciben llamadas y quieren crecer sin contratar más recepción.',
    ideal: 'Medicina estética y clínicas con varias cabinas o sedes y alto volumen de llamadas.',
    features: [
      { text: 'Todo lo del plan Estándar', hi: false, inh: true },
      { text: 'Agente de voz IA — Atiende las llamadas, consulta disponibilidad real y cierra citas por teléfono 24/7. Una llamada perdida en medicina estética son cientos de euros que no entran.', hi: true, inh: false },
      { text: 'Dashboard web completo — Panel visual de citas, clientes activos, bonos y métricas del centro, desarrollado a medida.', hi: false, inh: false },
      { text: 'Multi-cabina y multi-sede — El sistema coordina varias profesionales y locales sin solapar citas.', hi: false, inh: false },
      { text: 'Soporte prioritario + revisión mensual — Respuesta en menos de 4h y sesión mensual para optimizar el sistema.', hi: false, inh: false },
    ],
  },
]

const POPUP_CFG = {
  basico:   { title: '¿Te interesa el plan Básico?',   desc: 'Reservas, recordatorios y reseñas. Te contamos cómo quedaría para tu centro.' },
  estandar: { title: '¿Te interesa el plan Estándar?', desc: 'El más elegido. Citas, seguimiento, reactivación e informes. Valoración gratuita.' },
  premium:  { title: '¿Te interesa el plan Premium?',  desc: 'Sistema completo con agente de voz y dashboard. Control total sin más personal.' },
  general:  { title: '¿Hablamos sobre tu clínica?',    desc: 'Valoración gratuita de 15 minutos. Sin compromiso.' },
}

function PlanCard({ plan, onContact }) {
  const f = plan.featured
  const bg = f ? C.navy : '#fff'
  const border = f ? `2px solid ${C.gold}` : `1px solid ${C.border}`
  const shadow = f ? '0 24px 64px rgba(26,26,46,.28)' : '0 2px 16px rgba(0,0,0,.04)'
  const textH = f ? '#fff' : C.navy
  const textB = f ? 'rgba(255,255,255,.65)' : '#6B6560'
  const textM = f ? 'rgba(255,255,255,.4)' : C.muted
  const textInh = f ? 'rgba(255,255,255,.38)' : '#A09A94'
  const checkC = f ? C.gold : C.navy
  const checkInh = f ? 'rgba(200,160,82,.45)' : '#C8C2BA'

  return (
    <div style={{ flex: '1 1 280px', maxWidth: 390, background: bg, border, borderRadius: 16, boxShadow: shadow, padding: f ? '40px 28px 32px' : '32px 28px', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      {f && (
        <div style={{ position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)', background: C.gold, color: '#fff', fontSize: 11, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', padding: '6px 20px', borderRadius: 20, display: 'flex', alignItems: 'center', gap: 5, whiteSpace: 'nowrap' }}>
          <Star size={11} fill="#fff" strokeWidth={0} /> Más elegido
        </div>
      )}
      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.13em', textTransform: 'uppercase', color: f ? C.gold : C.muted, marginBottom: 4 }}>{plan.label}</div>
      <h3 style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: 24, fontWeight: 700, color: textH, margin: '0 0 10px', lineHeight: 1.2 }}>{plan.name}</h3>
      <p style={{ fontSize: 14, lineHeight: 1.55, color: textB, margin: '0 0 24px', minHeight: 42 }}>{plan.desc}</p>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 6 }}>
        <span style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: 42, fontWeight: 700, color: textH, lineHeight: 1 }}>{plan.monthly}€</span>
        <span style={{ fontSize: 15, color: textM }}>/mes</span>
      </div>
      <div style={{ fontSize: 13, color: textM, marginBottom: 6 }}>Puesta en marcha: {plan.setup.toLocaleString('es-ES')}€ (pago único)</div>
      <div style={{ fontSize: 12, color: textM, fontStyle: 'italic', marginBottom: 20 }}>{plan.ideal}</div>
      <div style={{ height: 1, background: f ? 'rgba(255,255,255,.1)' : C.border, marginBottom: 20 }} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 13, flex: 1 }}>
        {plan.features.map((feat, i) => (
          <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
            <Check size={16} strokeWidth={2.5} style={{ flexShrink: 0, marginTop: 2, color: feat.inh ? checkInh : checkC }} />
            <span style={{ fontSize: 14, lineHeight: 1.55, color: feat.inh ? textInh : feat.hi ? textH : textB, fontWeight: feat.hi ? 600 : 400 }}>{feat.text}</span>
          </div>
        ))}
      </div>
      <button onClick={() => onContact(plan.id)}
        style={{ marginTop: 28, width: '100%', padding: '14px 24px', borderRadius: 10, cursor: 'pointer', border: f ? 'none' : `1.5px solid ${C.navy}`, background: f ? C.gold : 'transparent', color: f ? '#fff' : C.navy, fontSize: 15, fontWeight: 600, fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", transition: 'all .2s ease' }}
        onMouseEnter={e => { if (f) e.currentTarget.style.background = C.goldH; else { e.currentTarget.style.background = C.navy; e.currentTarget.style.color = '#fff' } }}
        onMouseLeave={e => { if (f) e.currentTarget.style.background = C.gold; else { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = C.navy } }}
      >Solicitar información</button>
    </div>
  )
}

function ContactPopup({ plan, onClose }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [biz, setBiz] = useState('')
  const [sent, setSent] = useState(false)
  const cfg = POPUP_CFG[plan] || POPUP_CFG.general

  async function handleSubmit() {
    if (!name.trim() || !email.trim()) return
    const payload = { nombre: name, email, negocio: biz, plan, source: 'web-sector-estetica' }
    if (WEBHOOK) {
      try { await fetch(WEBHOOK, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }) } catch {}
    } else {
      const sub = encodeURIComponent(`Lead web — ${plan} — ${name}`)
      const body = encodeURIComponent(`Nombre: ${name}\nEmail: ${email}\nNegocio: ${biz || '-'}\nPlan: ${plan}`)
      window.open(`mailto:ismaelcebrian14@gmail.com?subject=${sub}&body=${body}`)
    }
    setSent(true)
  }

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.5)', backdropFilter: 'blur(6px)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <div style={{ background: '#fff', borderRadius: 16, width: '100%', maxWidth: 420, overflow: 'hidden', boxShadow: '0 24px 64px rgba(0,0,0,.2)' }}>
        <div style={{ background: C.cream, borderBottom: `1px solid ${C.border}`, padding: '24px 24px 20px', position: 'relative' }}>
          <button onClick={onClose} style={{ position: 'absolute', top: 12, right: 14, background: 'none', border: 'none', fontSize: 18, color: C.muted, cursor: 'pointer' }}>✕</button>
          <div style={{ fontSize: 30, marginBottom: 8 }}>💆</div>
          <div style={{ display: 'inline-block', background: '#FFF8EC', border: '1px solid #E8D4A0', padding: '3px 10px', borderRadius: 100, fontSize: 11, color: '#8B6914', fontWeight: 700, marginBottom: 10 }}>Valoración gratuita incluida</div>
          <h3 style={{ fontFamily: "Georgia, serif", fontSize: 17, fontWeight: 700, color: C.navy, marginBottom: 5 }}>{cfg.title}</h3>
          <p style={{ fontSize: 13, color: C.text, lineHeight: 1.6, margin: 0 }}>{cfg.desc}</p>
        </div>
        {!sent ? (
          <div style={{ padding: '20px 24px 24px' }}>
            {[
              { label: 'Tu nombre', val: name, set: setName, ph: 'Ej: Ana García', type: 'text' },
              { label: 'Tu email', val: email, set: setEmail, ph: 'tu@clinica.com', type: 'email' },
              { label: 'Nombre de tu centro (opcional)', val: biz, set: setBiz, ph: 'Centro Estética...', type: 'text' },
            ].map(fi => (
              <div key={fi.label} style={{ marginBottom: 13 }}>
                <label style={{ fontSize: 12, fontWeight: 700, color: C.muted, display: 'block', marginBottom: 5 }}>{fi.label}</label>
                <input type={fi.type} value={fi.val} placeholder={fi.ph} onChange={e => fi.set(e.target.value)}
                  style={{ width: '100%', border: `1.5px solid ${C.border}`, borderRadius: 8, padding: '10px 13px', fontSize: 13, outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' }}
                  onFocus={e => { e.target.style.borderColor = C.gold }} onBlur={e => { e.target.style.borderColor = C.border }} />
              </div>
            ))}
            <button onClick={handleSubmit} disabled={!name.trim() || !email.trim()}
              style={{ width: '100%', background: C.navy, color: '#fff', border: 'none', padding: 13, borderRadius: 8, fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', opacity: (!name.trim() || !email.trim()) ? .45 : 1 }}>
              Quiero más información →
            </button>
            <p style={{ fontSize: 11, color: C.muted, textAlign: 'center', marginTop: 10 }}>Sin compromisos · Respondemos en menos de 24h</p>
          </div>
        ) : (
          <div style={{ padding: '40px 24px', textAlign: 'center' }}>
            <div style={{ fontSize: 48, marginBottom: 14 }}>🎉</div>
            <h3 style={{ fontSize: 18, fontWeight: 800, color: C.navy, marginBottom: 8 }}>¡Perfecto, {name.split(' ')[0]}!</h3>
            <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.7 }}>En menos de 24h te contactamos con los detalles del plan y los próximos pasos.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default function EsteticaPage({ onBack }) {
  const [contactPlan, setContactPlan] = useState(null)

  return (
    <>
      <div style={{ minHeight: '100vh', background: C.cream, fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', padding: '20px 24px 0' }}>
          <button onClick={onBack} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, color: C.muted, fontFamily: 'inherit', padding: '4px 0' }}
            onMouseEnter={e => e.currentTarget.style.color = C.gold} onMouseLeave={e => e.currentTarget.style.color = C.muted}>
            <ArrowLeft size={14} /> Para tu negocio
          </button>
        </div>

        <div style={{ maxWidth: 780, margin: '0 auto', padding: '56px 24px 0', textAlign: 'center' }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.15em', textTransform: 'uppercase', color: C.gold, marginBottom: 20 }}>
            Automatización con IA para clínicas de estética y belleza
          </div>
          <h1 style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: 'clamp(26px, 4.5vw, 40px)', fontWeight: 700, color: C.navy, margin: '0 0 18px', lineHeight: 1.2 }}>
            Llena tu agenda, fideliza y consigue más reseñas — en automático
          </h1>
          <p style={{ fontSize: 16, lineHeight: 1.65, color: '#6B6560', maxWidth: 560, margin: '0 auto 12px' }}>
            Un sistema que atiende por WhatsApp, recuerda cada cita, hace seguimiento de tratamientos y recupera a los clientes que dejaron de venir. Sin contratar más personal.
          </p>
          <p style={{ fontSize: 14, color: C.muted, fontStyle: 'italic', maxWidth: 500, margin: '0 auto 28px' }}>
            El sector pierde más de 300 millones al año en citas perdidas. El tuyo no tiene por qué.
          </p>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(26,26,46,.05)', padding: '10px 22px', borderRadius: 24, fontSize: 13, color: C.text, marginBottom: 44 }}>
            <RefreshCw size={16} color={C.text} />
            Operativo en menos de una semana, sin cambiar cómo trabaja tu clínica
          </div>
        </div>

        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', display: 'flex', gap: 24, justifyContent: 'center', alignItems: 'stretch', flexWrap: 'wrap' }}>
          {PLANS.map(p => <PlanCard key={p.id} plan={p} onContact={setContactPlan} />)}
        </div>

        <div style={{ maxWidth: 820, margin: '56px auto 0', padding: '0 24px', display: 'flex', gap: 20, flexWrap: 'wrap', justifyContent: 'center' }}>
          {[
            { Icon: Shield, title: 'Garantía de resultado', text: 'Parte del setup y el primer mes son reembolsables si el sistema no gestiona citas de forma autónoma en los primeros 30 días. Tu riesgo real es mínimo.' },
            { Icon: Calendar, title: 'Sin permanencia', text: 'Todos los planes son mensuales. Si en algún momento decides que no te compensa, cancelas y listo. Sin penalizaciones ni letras pequeñas.' },
          ].map(({ Icon, title, text }) => (
            <div key={title} style={{ flex: '1 1 280px', maxWidth: 390, background: '#fff', border: `1px solid ${C.border}`, borderRadius: 14, padding: 28, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <Icon size={24} color={C.navy} style={{ marginBottom: 12 }} />
              <h3 style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: 17, fontWeight: 700, color: C.navy, margin: '0 0 8px' }}>{title}</h3>
              <p style={{ fontSize: 13, lineHeight: 1.65, color: '#6B6560', margin: 0 }}>{text}</p>
            </div>
          ))}
        </div>

        <div style={{ maxWidth: 560, margin: '48px auto 0', padding: '0 24px 72px', textAlign: 'center' }}>
          <p style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: 21, fontWeight: 700, color: C.navy, margin: '0 0 10px' }}>¿No sabes cuál te encaja?</p>
          <p style={{ fontSize: 14, color: '#6B6560', lineHeight: 1.6, margin: '0 0 24px' }}>En 15 minutos te decimos qué plan tiene más sentido para tu clínica y te enseñamos el sistema funcionando en directo.</p>
          <button onClick={() => setContactPlan('general')}
            style={{ padding: '14px 36px', borderRadius: 10, border: 'none', background: C.navy, color: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', transition: 'background .2s' }}
            onMouseEnter={e => e.currentTarget.style.background = '#2D2D4E'} onMouseLeave={e => e.currentTarget.style.background = C.navy}>
            Hablar con nosotros
          </button>
          <p style={{ fontSize: 12, color: C.muted, marginTop: 18, fontStyle: 'italic' }}>Marirrodriga I.A. · Automatizamos lo que te roba tiempo.</p>
        </div>
      </div>
      {contactPlan && <ContactPopup plan={contactPlan} onClose={() => setContactPlan(null)} />}
    </>
  )
}
