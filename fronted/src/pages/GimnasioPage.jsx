import { useState } from 'react'
import { ArrowLeft, Check, Shield, Calendar, Star, RefreshCw } from 'lucide-react'

const WEBHOOK = 'https://isman8nproyect.cloud/webhook/solicitud-negocio'

const C = {
  cream: '#F5F0E8', cream2: '#EDE8DD',
  navy: '#1A1A2E', gold: '#C8A052', goldH: '#B8923E',
  text: '#4A4540', muted: '#8C8680', border: '#E0DCD4',
}

const PLANS = [
  {
    id: 'basico', label: 'Básico', name: 'Socios que Renuevan', featured: false,
    monthly: 200, setup: 500,
    desc: 'Reservas de clases sin llamadas, recordatorios que llenan las salas y un aviso cuando un socio empieza a desengancharse.',
    ideal: 'Gimnasios y centros que quieren reducir bajas y dejar de gestionar reservas a mano.',
    features: [
      { text: 'Reservas de clases por WhatsApp 24/7 — El socio reserva, cancela o cambia su clase sin llamar ni esperar a recepción.', hi: false, inh: false },
      { text: 'Recordatorios de clase y cuota — Avisos automáticos de cada clase reservada y de la renovación de cuota. Menos plazas vacías y menos impagos.', hi: false, inh: false },
      { text: 'Alerta de bajas tempranas — El 50% de las bajas ocurre en los primeros 90 días. Si un socio reduce su frecuencia, el sistema te avisa para actuar antes de que cancele.', hi: true, inh: false },
      { text: 'Base de datos de socios propia — Altas, asistencia e historial en tu sistema, no en una plataforma de terceros.', hi: false, inh: false },
    ],
  },
  {
    id: 'estandar', label: 'Estándar', name: 'Motor de Retención', featured: true,
    monthly: 350, setup: 900,
    desc: 'Todo lo anterior más rutinas personalizadas con IA y detección activa de riesgo de baja. Porque un socio que ve progreso no se va.',
    ideal: 'Centros que quieren atacar la causa nº1 de baja —la falta de resultados— sin contratar más entrenadores.',
    features: [
      { text: 'Todo lo del plan Básico', hi: false, inh: true },
      { text: 'Generador de rutinas con IA — El socio rellena un formulario y recibe una rutina personalizada por objetivo y nivel. La causa nº1 de baja es no ver resultados — esto la ataca sin más personal.', hi: true, inh: false },
      { text: 'Detección de riesgo de baja — El sistema cruza asistencia y comportamiento, marca a los socios en riesgo y lanza una acción de retención automática antes de que pidan la baja.', hi: true, inh: false },
      { text: 'Reseñas Google automáticas — Cada socio satisfecho es una reseña que capta al siguiente. El sistema las pide en el momento justo.', hi: false, inh: false },
      { text: 'Informe mensual automático — Altas, bajas, asistencia, socios reactivados y rotación. En tu correo cada mes.', hi: false, inh: false },
    ],
  },
  {
    id: 'premium', label: 'Premium', name: 'Centro Inteligente', featured: false,
    monthly: 550, setup: 1500,
    desc: 'El sistema completo para centros que quieren profesionalizar la gestión y tratar a cada socio según su comportamiento real.',
    ideal: 'Centros grandes o con varias sedes que quieren retención basada en datos y comunicación segmentada.',
    features: [
      { text: 'Todo lo del plan Estándar', hi: false, inh: true },
      { text: 'Dashboard de socios y métricas — Panel visual con ocupación por franjas, tasa de retención, LTV y rotación, desarrollado a medida.', hi: true, inh: false },
      { text: 'Seguimiento de progreso del socio — Registro de evolución de cada socio que alimenta su motivación y tus acciones de retención.', hi: true, inh: false },
      { text: 'Comunicación segmentada — Mensajes distintos según perfil y comportamiento. No es lo mismo un recién llegado que un socio de 2 años.', hi: false, inh: false },
      { text: 'Soporte prioritario + revisión mensual — Respuesta en menos de 4h y sesión mensual para optimizar la retención contigo.', hi: false, inh: false },
    ],
  },
]

const POPUP_CFG = {
  basico:   { title: '¿Te interesa el plan Básico?',   desc: 'Reservas, recordatorios y alertas de baja. Te contamos cómo quedaría para tu centro.' },
  estandar: { title: '¿Te interesa el plan Estándar?', desc: 'El más elegido. Rutinas IA, detección de riesgo y reseñas. Valoración gratuita.' },
  premium:  { title: '¿Te interesa el plan Premium?',  desc: 'Dashboard completo, segmentación y seguimiento de progreso. Control total.' },
  general:  { title: '¿Hablamos sobre tu centro?',     desc: 'Valoración gratuita de 15 minutos. Sin compromiso.' },
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
  const [apellidos, setApellidos] = useState('')
  const [email, setEmail] = useState('')
  const [biz, setBiz] = useState('')
  const [sent, setSent] = useState(false)
  const cfg = POPUP_CFG[plan] || POPUP_CFG.general

  async function handleSubmit() {
    if (!name.trim() || !apellidos.trim() || !email.trim()) return
    const payload = { nombre: name, apellidos, email, negocio: biz, sector: 'Gimnasio / Centro deportivo', plan, source: 'web-sector-gimnasio' }
    try { await fetch(WEBHOOK, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }) } catch {
      const sub = encodeURIComponent(`Lead web — Gimnasio — ${name} ${apellidos}`)
      const body = encodeURIComponent(`Nombre: ${name} ${apellidos}\nEmail: ${email}\nNegocio: ${biz || '-'}\nPlan: ${plan}`)
      window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=ismaelcebrian14@gmail.com&su=${sub}&body=${body}`)
    }
    setSent(true)
  }

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.5)', backdropFilter: 'blur(6px)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <div style={{ background: '#fff', borderRadius: 16, width: '100%', maxWidth: 420, overflow: 'hidden', boxShadow: '0 24px 64px rgba(0,0,0,.2)' }}>
        <div style={{ background: C.cream, borderBottom: `1px solid ${C.border}`, padding: '24px 24px 20px', position: 'relative' }}>
          <button onClick={onClose} style={{ position: 'absolute', top: 12, right: 14, background: 'none', border: 'none', fontSize: 18, color: C.muted, cursor: 'pointer' }}>✕</button>
          <div style={{ fontSize: 30, marginBottom: 8 }}>🏋️</div>
          <div style={{ display: 'inline-block', background: '#FFF8EC', border: '1px solid #E8D4A0', padding: '3px 10px', borderRadius: 100, fontSize: 11, color: '#8B6914', fontWeight: 700, marginBottom: 10 }}>Valoración gratuita incluida</div>
          <h3 style={{ fontFamily: "Georgia, serif", fontSize: 17, fontWeight: 700, color: C.navy, marginBottom: 5 }}>{cfg.title}</h3>
          <p style={{ fontSize: 13, color: C.text, lineHeight: 1.6, margin: 0 }}>{cfg.desc}</p>
        </div>
        {!sent ? (
          <div style={{ padding: '20px 24px 24px' }}>
            {[
              { label: 'Tu nombre', val: name, set: setName, ph: 'Ej: Carlos', type: 'text' },
              { label: 'Tus apellidos', val: apellidos, set: setApellidos, ph: 'Ej: López García', type: 'text' },
              { label: 'Tu email', val: email, set: setEmail, ph: 'tu@centro.com', type: 'email' },
              { label: 'Nombre de tu centro (opcional)', val: biz, set: setBiz, ph: 'GymFit...', type: 'text' },
            ].map(fi => (
              <div key={fi.label} style={{ marginBottom: 13 }}>
                <label style={{ fontSize: 12, fontWeight: 700, color: C.muted, display: 'block', marginBottom: 5 }}>{fi.label}</label>
                <input type={fi.type} value={fi.val} placeholder={fi.ph} onChange={e => fi.set(e.target.value)}
                  style={{ width: '100%', border: `1.5px solid ${C.border}`, borderRadius: 8, padding: '10px 13px', fontSize: 13, outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' }}
                  onFocus={e => { e.target.style.borderColor = C.gold }} onBlur={e => { e.target.style.borderColor = C.border }} />
              </div>
            ))}
            <button onClick={handleSubmit} disabled={!name.trim() || !apellidos.trim() || !email.trim()}
              style={{ width: '100%', background: C.navy, color: '#fff', border: 'none', padding: 13, borderRadius: 8, fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', opacity: (!name.trim() || !apellidos.trim() || !email.trim()) ? .45 : 1 }}>
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

export default function GimnasioPage({ onBack }) {
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
            Automatización con IA para gimnasios y centros deportivos
          </div>
          <h1 style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: 'clamp(26px, 4.5vw, 40px)', fontWeight: 700, color: C.navy, margin: '0 0 18px', lineHeight: 1.2 }}>
            Menos bajas, más renovaciones — sin contratar más personal
          </h1>
          <p style={{ fontSize: 16, lineHeight: 1.65, color: '#6B6560', maxWidth: 560, margin: '0 auto 12px' }}>
            Un sistema que gestiona reservas, detecta a los socios que están a punto de irse y los reengancha con rutinas personalizadas. Retener cuesta entre 5 y 7 veces menos que captar.
          </p>
          <p style={{ fontSize: 14, color: C.muted, fontStyle: 'italic', maxWidth: 500, margin: '0 auto 28px' }}>
            El 50% de las bajas ocurre en los primeros 90 días. La mayoría se pueden evitar si actúas a tiempo.
          </p>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(26,26,46,.05)', padding: '10px 22px', borderRadius: 24, fontSize: 13, color: C.text, marginBottom: 44 }}>
            <RefreshCw size={16} color={C.text} />
            Operativo en menos de una semana, sin cambiar cómo funciona tu centro
          </div>
        </div>

        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', display: 'flex', gap: 24, justifyContent: 'center', alignItems: 'stretch', flexWrap: 'wrap' }}>
          {PLANS.map(p => <PlanCard key={p.id} plan={p} onContact={setContactPlan} />)}
        </div>

        <div style={{ maxWidth: 820, margin: '56px auto 0', padding: '0 24px', display: 'flex', gap: 20, flexWrap: 'wrap', justifyContent: 'center' }}>
          {[
            { Icon: Shield, title: 'Garantía de resultado', text: 'Parte del setup y el primer mes son reembolsables si el sistema no funciona de forma autónoma en los primeros 30 días. Tu riesgo real es mínimo.' },
            { Icon: Calendar, title: 'La retención se paga sola', text: 'Subir tu retención un 5% puede aumentar tus ingresos entre un 25% y un 95%. Cada socio que no se va es LTV que no tienes que reemplazar gastando en captación.' },
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
          <p style={{ fontSize: 14, color: '#6B6560', lineHeight: 1.6, margin: '0 0 24px' }}>En 15 minutos te decimos qué plan tiene más sentido para tu centro y te enseñamos el sistema funcionando en directo.</p>
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
