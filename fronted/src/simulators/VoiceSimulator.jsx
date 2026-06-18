import { useState } from 'react'
import { PhoneCall, PhoneOff, Mic, User } from 'lucide-react'

const N8N_VOZ = import.meta.env.VITE_N8N_VOZ || ''

const OPTIONS = [
  '¿Qué servicios ofrece vuestra agencia?',
  'Quiero un descuento especial este mes',
  '¿Tienen integración con mi CRM?',
]

const LOCAL_RESPONSES = [
  'Ofrecemos automatizaciones a medida: agentes conversacionales por voz o texto, generación automática de facturas, clasificadores de correos y PDFs, y cualificación de leads. ¿Cuál encaja mejor con tu operativa?',
  '¡Buen intento! La calidad tiene un precio, pero si firmas este mes la integración con tu CRM va de regalo. ¿Trato?',
  'Conectamos con Salesforce, HubSpot, Zoho, ActiveCampaign o cualquier sistema mediante APIs y webhooks. Leemos contactos, actualizamos estados y agendamos llamadas de forma autónoma.',
]

export default function VoiceSimulator() {
  const [screen,   setScreen]   = useState('idle')
  const [dialogue, setDialogue] = useState([])
  const [status,   setStatus]   = useState('')
  const [timer,    setTimer]    = useState(0)
  const [interval, setIv]       = useState(null)

  function startCall() {
    setScreen('calling')
    setDialogue([])
    setStatus('Conectando…')

    setTimeout(() => {
      setStatus('En llamada')
      const iv = setInterval(() => setTimer(t => t + 1), 1000)
      setIv(iv)
      setTimer(0)
      setDialogue([{ role: 'agent', text: 'Hola, bienvenido al asistente virtual de Marirrodriga.IA. ¿En qué puedo ayudarte hoy?' }])
    }, 1200)
  }

  async function choose(idx) {
    setDialogue(prev => [...prev, { role: 'user', text: OPTIONS[idx] }])
    setStatus('Escuchando…')

    if (N8N_VOZ) {
      try {
        const res  = await fetch(N8N_VOZ, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ userSpeech: OPTIONS[idx], optionIndex: idx + 1 }) })
        const data = await res.json()
        setDialogue(prev => [...prev, { role: 'agent', text: data.agentResponse || '…' }])
      } catch {
        setDialogue(prev => [...prev, { role: 'agent', text: 'Perdona, pequeña interferencia. ¿Podrías repetirlo?' }])
      }
      setStatus('En llamada')
      return
    }

    setTimeout(() => {
      setDialogue(prev => [...prev, { role: 'agent', text: LOCAL_RESPONSES[idx] }])
      setStatus('En llamada')
    }, 1200)
  }

  function endCall() {
    clearInterval(interval)
    setIv(null)
    setTimer(0)
    setScreen('idle')
    setDialogue([])
  }

  function fmt(s) {
    return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`
  }

  if (screen === 'idle') {
    return (
      <div className="vc-idle">
        <div className="vc-idle__icon"><PhoneCall size={22} /></div>
        <div className="vc-idle__info">
          <div className="vc-idle__number">+34 900 83 92 11</div>
          <p className="vc-idle__hint">
            <strong>Reto:</strong> Simula una llamada e intenta conseguir un descuento especial o pregúntale por las integraciones.
          </p>
        </div>
        <button className="vc-idle__btn" onClick={startCall}>
          <PhoneCall size={14} /> Iniciar llamada simulada
        </button>
      </div>
    )
  }

  return (
    <div className="vc-call">

      {/* HEADER */}
      <div className="vc-call__header">
        <div className="vc-call__avatar"><Mic size={16} /></div>
        <div className="vc-call__meta">
          <div className="vc-call__name">Agente Marirrodriga.IA</div>
          <div className="vc-call__status">
            <span className="vc-call__dot" />
            {status} {status === 'En llamada' && <span className="vc-call__timer">{fmt(timer)}</span>}
          </div>
        </div>
        <button className="vc-call__hangup" onClick={endCall}>
          <PhoneOff size={13} /> Colgar
        </button>
      </div>

      {/* TRANSCRIPCIÓN */}
      <div className="vc-transcript">
        {dialogue.map((d, i) => (
          <div key={i} className={`vc-line vc-line--${d.role}`}>
            <div className="vc-line__who">
              {d.role === 'agent' ? <Mic size={11} /> : <User size={11} />}
              {d.role === 'agent' ? 'Agente' : 'Tú'}
            </div>
            <div className="vc-line__text">{d.text}</div>
          </div>
        ))}
        {status === 'Escuchando…' && (
          <div className="vc-line vc-line--agent">
            <div className="vc-line__who"><Mic size={11} />Agente</div>
            <div className="vc-line__text vc-line__typing">
              <span /><span /><span />
            </div>
          </div>
        )}
      </div>

      {/* OPCIONES */}
      {dialogue.length > 0 && (
        <div className="vc-options">
          <p className="vc-options__label">Elige qué decir:</p>
          {OPTIONS.map((opt, i) => (
            <button key={i} className="vc-options__btn" onClick={() => choose(i)}>
              {opt}
            </button>
          ))}
        </div>
      )}

    </div>
  )
}
