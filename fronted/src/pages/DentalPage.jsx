import { useState } from 'react'
import { ArrowLeft, Check, Shield, Calendar, Star, RefreshCw } from 'lucide-react'

/* ── Paleta dental ───────────────────────────────────────────── */
const WEBHOOK = 'https://isman8nproyect.cloud/webhook/solicitud-negocio'

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

/* ── Datos ───────────────────────────────────────────────────── */
const PLANS = [
  {
    id: 'basico',
    label: 'Básico',
    name: 'Recepción IA',
    desc: 'No pierdas más citas porque nadie cogió el teléfono.',
    monthly: 200,
    setup: 500,
    featured: false,
    ideal: 'Clínicas que quieren empezar a automatizar con poco riesgo.',
    features: [
      { text: 'Chatbot de citas 24/7 por WhatsApp o web — tus pacientes reservan cuando quieren, sin esperar a que recepción esté libre', hi: false, inh: false },
      { text: 'Sincronización con tu calendario actual — el bot consulta huecos reales antes de ofrecer cita', hi: false, inh: false },
      { text: 'Recordatorios automáticos pre-cita (48h y 24h) con confirmación del paciente — menos sillas vacías', hi: false, inh: false },
      { text: 'Soporte por email en horario laboral', hi: false, inh: false },
    ],
  },
  {
    id: 'estandar',
    label: 'Estándar',
    name: 'Clínica sin fugas',
    desc: 'Cubre los tres momentos donde más dinero se escapa: la cita, el presupuesto y el paciente que no vuelve.',
    monthly: 350,
    setup: 900,
    featured: true,
    ideal: 'Clínicas que quieren dejar de perder ingresos en los puntos críticos.',
    features: [
      { text: 'Todo lo del plan Básico', hi: false, inh: true },
      { text: 'Chatbot de cierre de presupuestos — agente especializado por tratamiento (ortodoncia, implantes…) que resuelve dudas del paciente 24/7 durante su período de decisión', hi: true, inh: false },
      { text: 'Seguimiento post-cita automatizado — el sistema contacta al paciente después del tratamiento', hi: false, inh: false },
      { text: 'Solicitud automática de reseñas en Google tras cada visita', hi: false, inh: false },
      { text: 'Reactivación automática de pacientes inactivos — detecta quién lleva demasiado tiempo sin venir y le contacta para agendar revisión', hi: false, inh: false },
      { text: 'Informe mensual: citas gestionadas, no-shows evitados, presupuestos reactivados, dudas frecuentes y barreras de cierre detectadas', hi: true, inh: false },
    ],
  },
  {
    id: 'premium',
    label: 'Premium',
    name: 'Clínica inteligente',
    desc: 'Todo automatizado, más visibilidad real sobre los números de tu negocio para tomar mejores decisiones.',
    monthly: 550,
    setup: 1500,
    featured: false,
    ideal: 'Clínicas que quieren control total sobre operaciones y finanzas.',
    features: [
      { text: 'Todo lo del plan Estándar', hi: false, inh: true },
      { text: 'Dashboard mensual de tu clínica — ingresos, gastos, producción por profesional y comparativa entre meses, todo visual y sin tocar Excel', hi: true, inh: false },
      { text: 'Sesión estratégica trimestral — revisión conjunta de los datos acumulados para detectar oportunidades y ajustar procesos', hi: false, inh: false },
      { text: 'Soporte prioritario con respuesta en menos de 4 horas', hi: false, inh: false },
    ],
  },
]

/* ── Plan card ───────────────────────────────────────────────── */
function PlanCard({ plan, onContact }) {
  const f = plan.featured
  const bg        = f ? C.navy   : '#FFFFFF'
  const border    = f ? `2px solid ${C.gold}` : `1px solid ${C.border}`
  const shadow    = f ? '0 24px 64px rgba(26,26,46,.28)' : '0 2px 16px rgba(0,0,0,.04)'
  const textH     = f ? '#FFFFFF'          : C.navy
  const textB     = f ? 'rgba(255,255,255,.65)' : '#6B6560'
  const textM     = f ? 'rgba(255,255,255,.4)'  : C.muted
  const textInh   = f ? 'rgba(255,255,255,.38)' : '#A09A94'
  const divider   = f ? 'rgba(255,255,255,.1)'  : C.border
  const checkC    = f ? C.gold                  : C.navy
  const checkInh  = f ? `rgba(200,160,82,.45)`  : '#C8C2BA'

  return (
    <div style={{
      flex: '1 1 280px', maxWidth: 390,
      background: bg, border, borderRadius: 16, boxShadow: shadow,
      padding: f ? '40px 28px 32px' : '32px 28px',
      display: 'flex', flexDirection: 'column',
      position: 'relative',
    }}>
      {/* badge */}
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

      {/* label */}
      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.13em', textTransform: 'uppercase', color: f ? C.gold : C.muted, marginBottom: 4 }}>
        {plan.label}
      </div>

      {/* name */}
      <h3 style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: 24, fontWeight: 700, color: textH, margin: '0 0 10px', lineHeight: 1.2 }}>
        {plan.name}
      </h3>

      {/* desc */}
      <p style={{ fontSize: 14, lineHeight: 1.55, color: textB, margin: '0 0 24px', minHeight: 42 }}>
        {plan.desc}
      </p>

      {/* price */}
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

      {/* divider */}
      <div style={{ height: 1, background: divider, marginBottom: 20 }} />

      {/* features */}
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

      {/* CTA */}
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

/* ── Popup ───────────────────────────────────────────────────── */
const POPUP_CFG = {
  basico:   { title: '¿Te interesa el plan Básico?',   desc: 'Chatbot de citas y recordatorios. Te contamos cómo quedaría para tu clínica.' },
  estandar: { title: '¿Te interesa el plan Estándar?', desc: 'El más elegido. Citas, presupuestos, reseñas, reactivación e informes. Valoración gratuita.' },
  premium:  { title: '¿Te interesa el plan Premium?',  desc: 'Todo el sistema más dashboard mensual. Control total sobre operaciones y finanzas.' },
  general:  { title: '¿Hablamos sobre tu clínica?',    desc: 'Valoración gratuita de 15 minutos. Sin compromiso.' },
}

function ContactPopup({ plan, onClose }) {
  const [name, setName]         = useState('')
  const [apellidos, setApellidos] = useState('')
  const [email, setEmail]       = useState('')
  const [clinic, setClinic]     = useState('')
  const [sent, setSent]         = useState(false)
  const cfg = POPUP_CFG[plan] || POPUP_CFG.general

  async function handleSubmit() {
    if (!name.trim() || !apellidos.trim() || !email.trim()) return
    const payload = { nombre: name, apellidos, email, negocio: clinic, sector: 'Clínica dental', plan, source: 'web-sector-dental' }
    try { await fetch(WEBHOOK, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }) } catch {
      const sub = encodeURIComponent(`Lead web — Dental — ${name} ${apellidos}`)
      const body = encodeURIComponent(`Nombre: ${name} ${apellidos}\nEmail: ${email}\nClínica: ${clinic || '-'}\nPlan: ${plan}`)
      window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=ismaelcebrian14@gmail.com&su=${sub}&body=${body}`)
    }
    setSent(true)
  }

  return (
    <div
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.5)', backdropFilter: 'blur(6px)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, animation: 'fadeIn .2s ease' }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div style={{ background: '#fff', borderRadius: 16, width: '100%', maxWidth: 420, overflow: 'hidden', boxShadow: '0 24px 64px rgba(0,0,0,.2)', animation: 'slideUp .28s ease' }}>
        <div style={{ background: C.cream, borderBottom: `1px solid ${C.border}`, padding: '24px 24px 20px', position: 'relative' }}>
          <button onClick={onClose} style={{ position: 'absolute', top: 12, right: 14, background: 'none', border: 'none', fontSize: 18, color: C.muted, cursor: 'pointer' }}>✕</button>
          <div style={{ fontSize: 30, marginBottom: 8 }}>🦷</div>
          <div style={{ display: 'inline-block', background: '#FFF8EC', border: '1px solid #E8D4A0', padding: '3px 10px', borderRadius: 100, fontSize: 11, color: '#8B6914', fontWeight: 700, marginBottom: 10 }}>
            Valoración gratuita incluida
          </div>
          <h3 style={{ fontFamily: "Georgia, serif", fontSize: 17, fontWeight: 700, color: C.navy, marginBottom: 5 }}>{cfg.title}</h3>
          <p style={{ fontSize: 13, color: C.text, lineHeight: 1.6, margin: 0 }}>{cfg.desc}</p>
        </div>
        {!sent ? (
          <div style={{ padding: '20px 24px 24px' }}>
            {[
              { label: 'Tu nombre', val: name, set: setName, ph: 'Ej: Carlos', type: 'text' },
              { label: 'Tus apellidos', val: apellidos, set: setApellidos, ph: 'Ej: García López', type: 'text' },
              { label: 'Tu email', val: email, set: setEmail, ph: 'clinica@tudominio.com', type: 'email' },
              { label: 'Nombre de tu clínica (opcional)', val: clinic, set: setClinic, ph: 'Clínica Dental...', type: 'text' },
            ].map(f => (
              <div key={f.label} style={{ marginBottom: 13 }}>
                <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-2)', display: 'block', marginBottom: 5 }}>{f.label}</label>
                <input type={f.type} value={f.val} placeholder={f.ph} onChange={e => f.set(e.target.value)}
                  style={{ width: '100%', border: `1.5px solid ${C.border}`, borderRadius: 8, padding: '10px 13px', fontSize: 13, outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' }}
                  onFocus={e => { e.target.style.borderColor = C.gold }}
                  onBlur={e => { e.target.style.borderColor = C.border }}
                />
              </div>
            ))}
            <button
              onClick={handleSubmit}
              disabled={!name.trim() || !apellidos.trim() || !email.trim()}
              style={{ width: '100%', background: C.navy, color: '#fff', border: 'none', padding: 13, borderRadius: 8, fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', opacity: (!name.trim() || !apellidos.trim() || !email.trim()) ? .45 : 1 }}
            >
              Quiero más información →
            </button>
            <p style={{ fontSize: 11, color: C.muted, textAlign: 'center', marginTop: 10 }}>Sin compromisos · Respondemos en menos de 24h</p>
          </div>
        ) : (
          <div style={{ padding: '40px 24px', textAlign: 'center' }}>
            <div style={{ fontSize: 48, marginBottom: 14 }}>🎉</div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 18, fontWeight: 800, color: 'var(--text-1)', marginBottom: 8 }}>¡Perfecto, {name.split(' ')[0]}!</h3>
            <p style={{ fontSize: 13, color: 'var(--text-3)', lineHeight: 1.7 }}>En menos de 24h te contactamos con los detalles del plan y los próximos pasos.</p>
          </div>
        )}
      </div>
    </div>
  )
}

/* ── Page ────────────────────────────────────────────────────── */
export default function DentalPage({ onBack, embedded = false }) {
  const [contactPlan, setContactPlan] = useState(null)

  if (embedded) {
    return (
      <>
        <div style={{ display: 'flex', gap: 24, justifyContent: 'center', alignItems: 'stretch', flexWrap: 'wrap', fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}>
          {PLANS.map(p => <PlanCard key={p.id} plan={p} onContact={setContactPlan} />)}
        </div>
        {contactPlan && <ContactPopup plan={contactPlan} onClose={() => setContactPlan(null)} />}
      </>
    )
  }

  return (
    <>
      <div style={{ minHeight: '100vh', background: C.cream, fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}>

        {/* back */}
        <div style={{ maxWidth: 1240, margin: '0 auto', padding: '20px 24px 0' }}>
          <button onClick={onBack}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, color: C.muted, fontFamily: 'inherit', padding: '4px 0' }}
            onMouseEnter={e => e.currentTarget.style.color = C.gold}
            onMouseLeave={e => e.currentTarget.style.color = C.muted}
          >
            <ArrowLeft size={14} /> Para tu negocio
          </button>
        </div>

        {/* hero */}
        <div style={{ maxWidth: 780, margin: '0 auto', padding: '56px 24px 0', textAlign: 'center' }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.15em', textTransform: 'uppercase', color: C.gold, marginBottom: 20 }}>
            Automatización con IA para clínicas dentales
          </div>
          <h1 style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: 'clamp(26px, 4.5vw, 40px)', fontWeight: 700, color: C.navy, margin: '0 0 18px', lineHeight: 1.2 }}>
            Deja de perder pacientes e ingresos sin contratar a nadie más
          </h1>
          <p style={{ fontSize: 16, lineHeight: 1.65, color: '#6B6560', maxWidth: 560, margin: '0 auto 28px' }}>
            Tres problemas que tu clínica sufre cada semana. Dentia los resuelve sin contratar a nadie más.
          </p>

          {/* 3 problemas validados */}
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 8 }}>
            {[
              { n: '01', title: 'Sillas vacías por no-shows', sub: '~3 por semana · hasta 960€/mes perdidos sin hacer nada' },
              { n: '02', title: 'Presupuestos que mueren solos', sub: 'El paciente se va a pensar el implante... y no vuelve a llamar' },
              { n: '03', title: 'Consultas que nadie atiende', sub: 'Fuera de horario o con recepción saturada — ese paciente se va a la competencia' },
            ].map(p => (
              <div key={p.n} style={{
                flex: '1 1 160px', maxWidth: 215,
                background: C.cream2, border: `1px solid ${C.border}`,
                borderRadius: 12, padding: '16px 14px', textAlign: 'left',
              }}>
                <div style={{ fontSize: 11, fontWeight: 800, color: C.gold, letterSpacing: '.12em', marginBottom: 6 }}>{p.n}</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: C.navy, lineHeight: 1.35, marginBottom: 5 }}>{p.title}</div>
                <div style={{ fontSize: 11, color: C.muted, lineHeight: 1.55 }}>{p.sub}</div>
              </div>
            ))}
          </div>

          {/* compat badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(26,26,46,.05)', padding: '10px 22px', borderRadius: 24, fontSize: 13, color: C.text, margin: '28px 0 44px' }}>
            <RefreshCw size={16} color={C.text} />
            Instalación compatible con tu software actual · Garantía de funcionamiento incluida
          </div>
        </div>

        {/* cards */}
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', display: 'flex', gap: 24, justifyContent: 'center', alignItems: 'stretch', flexWrap: 'wrap' }}>
          {PLANS.map(p => <PlanCard key={p.id} plan={p} onContact={setContactPlan} />)}
        </div>

        {/* trust blocks */}
        <div style={{ maxWidth: 820, margin: '56px auto 0', padding: '0 24px', display: 'flex', gap: 20, flexWrap: 'wrap', justifyContent: 'center' }}>
          {[
            {
              Icon: Shield,
              title: 'Garantía de resultado',
              text: 'Parte del setup y el primer mes son reembolsables si el sistema no cumple métricas objetivas de rendimiento en 30 días. Tu riesgo es mínimo.',
            },
            {
              Icon: Calendar,
              title: 'Sin permanencia',
              text: 'Todos los planes son mensuales. Si en algún momento decides que no te compensa, cancelas y listo. Sin penalizaciones ni letras pequeñas.',
            },
          ].map(({ Icon, title, text }) => (
            <div key={title} style={{ flex: '1 1 280px', maxWidth: 390, background: '#fff', border: `1px solid ${C.border}`, borderRadius: 14, padding: 28, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <Icon size={24} color={C.navy} style={{ marginBottom: 12 }} />
              <h3 style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: 17, fontWeight: 700, color: C.navy, margin: '0 0 8px' }}>{title}</h3>
              <p style={{ fontSize: 13, lineHeight: 1.65, color: '#6B6560', margin: 0 }}>{text}</p>
            </div>
          ))}
        </div>

        {/* bottom CTA */}
        <div style={{ maxWidth: 560, margin: '48px auto 0', padding: '0 24px 72px', textAlign: 'center' }}>
          <p style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: 21, fontWeight: 700, color: C.navy, margin: '0 0 10px' }}>
            ¿No sabes cuál te encaja?
          </p>
          <p style={{ fontSize: 14, color: '#6B6560', lineHeight: 1.6, margin: '0 0 24px' }}>
            Te hacemos una valoración gratuita de tu clínica en 15 minutos y te decimos qué plan tiene más sentido para tu situación.
          </p>
          <button
            onClick={() => setContactPlan('general')}
            style={{ padding: '14px 36px', borderRadius: 10, border: 'none', background: C.navy, color: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', transition: 'background .2s' }}
            onMouseEnter={e => e.currentTarget.style.background = '#2D2D4E'}
            onMouseLeave={e => e.currentTarget.style.background = C.navy}
          >
            Hablar con nosotros
          </button>
          <p style={{ fontSize: 12, color: C.muted, marginTop: 18, fontStyle: 'italic' }}>
            Marirrodriga I.A. · Automatizamos lo que te roba tiempo.
          </p>
        </div>
      </div>

      {contactPlan && <ContactPopup plan={contactPlan} onClose={() => setContactPlan(null)} />}
    </>
  )
}
