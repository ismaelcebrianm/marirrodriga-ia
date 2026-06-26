import { useState } from 'react'
import { ArrowLeft, Check, Shield, Clock, ArrowRight } from 'lucide-react'

const C = {
  navy:   '#1A1A2E',
  gold:   '#C8A052',
  gold2:  '#B8923E',
  cream:  '#F5F0E8',
  muted:  '#6B6560',
  border: '#E0DCD4',
}

const FEATURES = [
  {
    title: 'Reservas por WhatsApp 24/7',
    desc: 'El cliente escribe, el asistente responde al instante, ofrece los huecos reales de tu agenda y cierra la cita solo — sin que toques el teléfono.',
  },
  {
    title: 'Agenda flexible al minuto',
    desc: 'Sin franjas rígidas ni huecos muertos entre citas. Si el siguiente cliente puede entrar a las 11:07, entra a las 11:07.',
  },
  {
    title: 'Recordatorios automáticos con confirmación',
    desc: '24h antes de cada cita, el cliente recibe un mensaje por WhatsApp. Si no puede venir, cancela o cambia la hora — sin llamarte.',
  },
  {
    title: 'Reseñas Google automáticas',
    desc: 'Tras cada cita el sistema pide valoración. Si la experiencia fue buena, lleva al cliente directo a Google para dejar reseña. Sin acordarte de pedirlo nunca más.',
  },
  {
    title: 'Reactivación de clientes dormidos',
    desc: 'Si un habitual lleva más tiempo del normal sin reservar, recibe un mensaje automático recordándole que tiene disponibilidad. Recuperas clientes sin mover un dedo.',
  },
]

export default function ReservasPage({ onBack, onScrollTo }) {
  const [hover, setHover] = useState(false)
  const [hoverSec, setHoverSec] = useState(false)

  return (
    <div style={{ background: C.cream, minHeight: '100vh', paddingTop: 88 }}>

      {/* ── BACK ──────────────────────────────────── */}
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '24px 24px 0' }}>
        <button
          onClick={onBack}
          style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600, color: C.muted, padding: '6px 0', fontFamily: 'inherit' }}
        >
          <ArrowLeft size={14} /> Para tu negocio
        </button>
      </div>

      {/* ── HERO ──────────────────────────────────── */}
      <div style={{ maxWidth: 680, margin: '0 auto', padding: '48px 24px 40px', textAlign: 'center' }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: C.gold, marginBottom: 20 }}>
          Automatización IA para negocios con citas
        </div>
        <h1 style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontSize: 'clamp(24px, 4vw, 38px)', fontWeight: 700, color: C.navy, lineHeight: 1.2, margin: '0 0 18px' }}>
          Tu sistema de reservas propio,<br />sin depender de nadie
        </h1>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: C.muted, maxWidth: 500, margin: '0 auto' }}>
          Un asistente que atiende por WhatsApp 24/7, cierra citas solo y cuida a los clientes que ya tienes.
          Sin plataformas de terceros, sin comisiones, sin que tus datos vivan en casa de otro.
        </p>
      </div>

      {/* ── PRICING CARD ──────────────────────────── */}
      <div style={{ maxWidth: 680, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ background: C.navy, borderRadius: 20, border: `2px solid ${C.gold}`, overflow: 'hidden', boxShadow: '0 24px 64px rgba(26,26,46,.22)' }}>

          {/* Price header */}
          <div style={{ padding: '36px 40px 32px', borderBottom: '1px solid rgba(255,255,255,.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 20 }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: C.gold, marginBottom: 8 }}>
                Plan único
              </div>
              <h2 style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontSize: 26, fontWeight: 700, color: '#fff', margin: '0 0 6px', lineHeight: 1.1 }}>
                Sistema completo de reservas
              </h2>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,.5)', margin: 0, fontStyle: 'italic' }}>
                Todo lo que necesitas para dejar de depender de plataformas de terceros.
              </p>
            </div>
            <div style={{ textAlign: 'right', flexShrink: 0 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, justifyContent: 'flex-end' }}>
                <span style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontSize: 48, fontWeight: 700, color: '#fff', lineHeight: 1 }}>150€</span>
                <span style={{ fontSize: 15, color: 'rgba(255,255,255,.4)' }}>/mes</span>
              </div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,.35)', marginTop: 6 }}>+ 400€ puesta en marcha (único)</div>
            </div>
          </div>

          {/* Features */}
          <div style={{ padding: '32px 40px 36px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
              {FEATURES.map((f, i) => (
                <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                  <div style={{ flexShrink: 0, marginTop: 2 }}>
                    <Check size={16} color={C.gold} strokeWidth={2.5} />
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: '#fff', marginBottom: 3, lineHeight: 1.3 }}>{f.title}</div>
                    <div style={{ fontSize: 13, color: 'rgba(255,255,255,.52)', lineHeight: 1.6 }}>{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => onScrollTo('contacto')}
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
              style={{ marginTop: 32, width: '100%', padding: '15px 24px', borderRadius: 10, border: 'none', background: hover ? C.gold2 : C.gold, color: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer', transition: 'background .2s', fontFamily: 'inherit' }}
            >
              Solicitar información
            </button>
          </div>
        </div>
      </div>

      {/* ── TRUST PILLS ───────────────────────────── */}
      <div style={{ maxWidth: 680, margin: '20px auto 0', padding: '0 24px', display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 240, background: '#fff', border: `1px solid ${C.border}`, borderRadius: 14, padding: '22px 24px', display: 'flex', gap: 14, alignItems: 'flex-start' }}>
          <Shield size={22} color={C.navy} strokeWidth={1.5} style={{ flexShrink: 0, marginTop: 2 }} />
          <div>
            <div style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontSize: 15, fontWeight: 700, color: C.navy, marginBottom: 5 }}>Garantía de resultado</div>
            <p style={{ fontSize: 13, lineHeight: 1.6, color: C.muted, margin: 0 }}>200€ del setup son reembolsables si el sistema no gestiona citas de forma autónoma en los primeros 30 días.</p>
          </div>
        </div>
        <div style={{ flex: 1, minWidth: 240, background: '#fff', border: `1px solid ${C.border}`, borderRadius: 14, padding: '22px 24px', display: 'flex', gap: 14, alignItems: 'flex-start' }}>
          <Clock size={22} color={C.navy} strokeWidth={1.5} style={{ flexShrink: 0, marginTop: 2 }} />
          <div>
            <div style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontSize: 15, fontWeight: 700, color: C.navy, marginBottom: 5 }}>Sin permanencia</div>
            <p style={{ fontSize: 13, lineHeight: 1.6, color: C.muted, margin: 0 }}>El plan es mensual. Si en algún momento decides que no te compensa, cancelas y listo. Sin penalizaciones.</p>
          </div>
        </div>
      </div>

      {/* ── FOOTER CTA ────────────────────────────── */}
      <div style={{ maxWidth: 520, margin: '52px auto 0', padding: '0 24px 80px', textAlign: 'center' }}>
        <p style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontSize: 20, color: C.navy, fontWeight: 700, margin: '0 0 10px' }}>¿Tienes dudas?</p>
        <p style={{ fontSize: 14, color: C.muted, lineHeight: 1.6, margin: '0 0 24px' }}>
          Te enseñamos el sistema funcionando en directo en 15 minutos. Sin compromiso.
        </p>
        <button
          onClick={() => onScrollTo('contacto')}
          onMouseEnter={() => setHoverSec(true)}
          onMouseLeave={() => setHoverSec(false)}
          style={{ padding: '14px 36px', borderRadius: 10, border: `1.5px solid ${C.navy}`, background: hoverSec ? C.navy : 'transparent', color: hoverSec ? '#fff' : C.navy, fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', transition: 'all .2s' }}
        >
          Hablar con nosotros <ArrowRight size={14} style={{ display: 'inline', verticalAlign: 'middle' }} />
        </button>
        <p style={{ fontSize: 12, color: '#A09A94', marginTop: 20, fontStyle: 'italic' }}>Marirrodriga I.A. · Automatizamos lo que te roba tiempo.</p>
      </div>

    </div>
  )
}
