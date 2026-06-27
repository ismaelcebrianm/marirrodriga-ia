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
    id: 'basico', label: 'Básico', name: 'Recepción que no Duerme', featured: false,
    monthly: 180, setup: 450,
    desc: 'Un asistente que responde las consultas de siempre —precios, requisitos, cómo funciona— y deja que los alumnos reserven sus prácticas sin pasar por mostrador.',
    ideal: 'Autoescuelas que pierden horas informando y quieren liberar al personal administrativo.',
    features: [
      { text: 'Chatbot de consultas 24/7 — Responde precios, requisitos, documentación y cómo funciona el proceso. El admin deja de repetir lo mismo veinte veces al día y capta al alumno que pregunta a las 23h.', hi: true, inh: false },
      { text: 'Reserva de clases prácticas — El alumno reserva su práctica según el calendario real de cada profesor, por WhatsApp, sin llamar.', hi: false, inh: false },
      { text: 'Recordatorios de clase y examen — Avisos automáticos de cada práctica y de la fecha de examen. Menos prácticas perdidas, menos ausencias en examen.', hi: false, inh: false },
      { text: 'Base de datos de alumnos propia — Matrículas, contactos e historial en tu sistema, no en una herramienta de terceros.', hi: false, inh: false },
    ],
  },
  {
    id: 'estandar', label: 'Estándar', name: 'Matrículas que no se Escapan', featured: true,
    monthly: 320, setup: 800,
    desc: 'Todo lo anterior más la recuperación de los interesados que pidieron información y nunca se matricularon, y el seguimiento del progreso de cada alumno.',
    ideal: 'Autoescuelas que quieren convertir más consultas en matrículas y profesionalizar el seguimiento.',
    features: [
      { text: 'Todo lo del plan Básico', hi: false, inh: true },
      { text: 'Reactivación de interesados — Quien pidió precio y no se matriculó recibe un seguimiento automático. Una sola matrícula recuperada (700-1.200€) paga el servicio durante meses.', hi: true, inh: false },
      { text: 'Seguimiento de progreso del alumno — Registro de prácticas hechas y destrezas pendientes. El alumno sabe en qué punto está y por qué aún no va a examen.', hi: true, inh: false },
      { text: 'Recordatorio de pago de prácticas y tasas — Avisos automáticos de packs agotados y tasas pendientes. Menos impagos y menos sorpresas el día del examen.', hi: false, inh: false },
      { text: 'Informe mensual automático — Consultas atendidas, matrículas, interesados recuperados y prácticas reservadas. En tu correo cada mes.', hi: false, inh: false },
    ],
  },
]

const POPUP_CFG = {
  basico:   { title: '¿Te interesa el plan Básico?',   desc: 'Chatbot 24/7, reservas de prácticas y recordatorios. Sin tocar el mostrador.' },
  estandar: { title: '¿Te interesa el plan Estándar?', desc: 'El más elegido. Consultas, matrículas, seguimiento y recuperación de interesados.' },
  general:  { title: '¿Hablamos sobre tu autoescuela?', desc: 'Valoración gratuita de 15 minutos. Sin compromiso.' },
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
    <div style={{ flex: '1 1 300px', maxWidth: 420, background: bg, border, borderRadius: 16, boxShadow: shadow, padding: f ? '40px 28px 32px' : '32px 28px', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      {f && (
        <div style={{ position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)', background: C.gold, color: '#fff', fontSize: 11, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', padding: '6px 20px', borderRadius: 20, display: 'flex', alignItems: 'center', gap: 5, whiteSpace: 'nowrap' }}>
          <Star size={11} fill="#fff" strokeWidth={0} /> Recomendado
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
    const payload = { nombre: name, apellidos, email, negocio: biz, sector: 'Autoescuela', plan, source: 'web-sector-autoescuela' }
    try { await fetch(WEBHOOK, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }) } catch {
      const sub = encodeURIComponent(`Lead web — Autoescuela — ${name} ${apellidos}`)
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
          <div style={{ fontSize: 30, marginBottom: 8 }}>🚗</div>
          <div style={{ display: 'inline-block', background: '#FFF8EC', border: '1px solid #E8D4A0', padding: '3px 10px', borderRadius: 100, fontSize: 11, color: '#8B6914', fontWeight: 700, marginBottom: 10 }}>Valoración gratuita incluida</div>
          <h3 style={{ fontFamily: "Georgia, serif", fontSize: 17, fontWeight: 700, color: C.navy, marginBottom: 5 }}>{cfg.title}</h3>
          <p style={{ fontSize: 13, color: C.text, lineHeight: 1.6, margin: 0 }}>{cfg.desc}</p>
        </div>
        {!sent ? (
          <div style={{ padding: '20px 24px 24px' }}>
            {[
              { label: 'Tu nombre', val: name, set: setName, ph: 'Ej: Marta', type: 'text' },
              { label: 'Tus apellidos', val: apellidos, set: setApellidos, ph: 'Ej: Sánchez Ruiz', type: 'text' },
              { label: 'Tu email', val: email, set: setEmail, ph: 'tu@autoescuela.com', type: 'email' },
              { label: 'Nombre de tu autoescuela (opcional)', val: biz, set: setBiz, ph: 'Autoescuela...', type: 'text' },
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

export default function AutoescuelaPage({ onBack }) {
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
            Automatización con IA para autoescuelas
          </div>
          <h1 style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: 'clamp(26px, 4.5vw, 40px)', fontWeight: 700, color: C.navy, margin: '0 0 18px', lineHeight: 1.2 }}>
            Deja de perder horas informando y matrículas por el camino
          </h1>
          <p style={{ fontSize: 16, lineHeight: 1.65, color: '#6B6560', maxWidth: 560, margin: '0 auto 12px' }}>
            Un asistente que atiende las consultas repetitivas, gestiona la reserva de prácticas y recupera a los interesados que se quedaron a medias. Tu equipo se centra en formar, no en repetir precios.
          </p>
          <p style={{ fontSize: 14, color: C.muted, fontStyle: 'italic', maxWidth: 500, margin: '0 auto 28px' }}>
            El personal administrativo dedica la mayor parte del tiempo a informar y captar. Eso se puede automatizar.
          </p>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(26,26,46,.05)', padding: '10px 22px', borderRadius: 24, fontSize: 13, color: C.text, marginBottom: 44 }}>
            <RefreshCw size={16} color={C.text} />
            Operativo en menos de una semana, sin cambiar cómo funciona tu autoescuela
          </div>
        </div>

        <div style={{ maxWidth: 920, margin: '0 auto', padding: '0 24px', display: 'flex', gap: 24, justifyContent: 'center', alignItems: 'stretch', flexWrap: 'wrap' }}>
          {PLANS.map(p => <PlanCard key={p.id} plan={p} onContact={setContactPlan} />)}
        </div>

        <div style={{ maxWidth: 820, margin: '56px auto 0', padding: '0 24px', display: 'flex', gap: 20, flexWrap: 'wrap', justifyContent: 'center' }}>
          {[
            { Icon: Shield, title: 'Garantía de resultado', text: 'Parte del setup y el primer mes son reembolsables si el sistema no funciona de forma autónoma en los primeros 30 días. Tu riesgo real es mínimo.' },
            { Icon: Calendar, title: 'Cada consulta cuenta', text: 'Una matrícula completa son entre 700 y 1.200€. Capturar al interesado que escribe fuera de horario y recuperar al que no cerró es ingreso que hoy se va a la autoescuela de al lado.' },
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
          <p style={{ fontSize: 14, color: '#6B6560', lineHeight: 1.6, margin: '0 0 24px' }}>En 15 minutos te decimos qué plan tiene más sentido para tu autoescuela y te enseñamos el sistema funcionando en directo.</p>
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
