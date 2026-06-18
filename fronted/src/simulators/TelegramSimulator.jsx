import { useState, useEffect, useRef } from 'react'

const N8N_TG = import.meta.env.VITE_N8N_TELEGRAM || ''

const QUICK = [
  '¿Cuándo hay disponibilidad?',
  'Quiero agendar una demo',
  '¿Qué puedes hacer?',
]

const CHISTES = [
  '¿Por qué los programadores prefieren el modo oscuro? Porque la luz atrae a los bugs. 😂',
  'Un programador va al super y su pareja le dice: "Trae una barra de pan, y si hay huevos, trae una docena". Regresó con 12 barras de pan.',
  'Hay 10 tipos de personas en el mundo: los que entienden binario y los que no.',
]

function localReply(text) {
  const t = text.toLowerCase()
  if (t.includes('hacer') || t.includes('sabéis') || t.includes('servicios'))
    return 'Automatizamos tareas repetitivas de oficina: facturas, llamadas, resúmenes de correo, cualificación de leads… Básicamente, hacemos que trabajes menos y produzcas más. 🚀'
  if (t.includes('chiste') || t.includes('broma'))
    return CHISTES[Math.floor(Math.random() * CHISTES.length)]
  if (t.includes('cuesta') || t.includes('precio') || t.includes('coste'))
    return 'Mucho menos de lo que cuesta perder 2 horas al día con tareas repetitivas. Nos adaptamos a tu flujo exacto, por eso hacemos presupuesto personalizado. ¡Cuéntanos tu caso! 👇'
  return 'Interesante pregunta 🤔 Soy MariRobot — rápida, eficiente y sin rodeos. ¿Vemos cómo automatizar tu operativa?'
}

function nowTime() {
  const d = new Date()
  return `${d.getHours()}:${String(d.getMinutes()).padStart(2, '0')}`
}

export default function TelegramSimulator() {
  const [messages, setMessages] = useState([
    { role: 'bot', text: '¡Hola! Soy Mari Robot, tu agente de demostración en Marirrodriga I.A. Ponme a prueba pidiendo, consultando o cancelando una cita en mi agenda. Tranquilo, esto es solo un test y la reserva se borrará automáticamente al terminar nuestro chat.', time: nowTime() }
  ])
  const [input, setInput]   = useState('')
  const [typing, setTyping] = useState(false)
  const boxRef = useRef(null)

  useEffect(() => {
    if (boxRef.current) boxRef.current.scrollTop = boxRef.current.scrollHeight
  }, [messages, typing])

  async function send(text) {
    const msg = (text || input).trim()
    if (!msg || typing) return
    setInput('')
    setMessages(prev => [...prev, { role: 'user', text: msg, time: nowTime() }])
    setTyping(true)

    if (N8N_TG) {
      try {
        const res  = await fetch(N8N_TG, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message: msg, sessionId: 'demo-web' }) })
        const data = await res.json()
        const parts = Array.isArray(data.parts) && data.parts.length > 0
          ? data.parts
          : [data.reply || '…']
        // Show each part sequentially with typing indicator between them (ISMABOT pattern)
        setTyping(false)
        setMessages(prev => [...prev, { role: 'bot', text: parts[0], time: nowTime() }])
        for (let i = 1; i < parts.length; i++) {
          setTyping(true)
          await new Promise(r => setTimeout(r, 1200))
          setTyping(false)
          setMessages(prev => [...prev, { role: 'bot', text: parts[i], time: nowTime() }])
        }
      } catch {
        setTyping(false)
        setMessages(prev => [...prev, { role: 'bot', text: 'Error de conexión. Prueba de nuevo.', time: nowTime() }])
      }
      return
    }

    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'bot', text: localReply(msg), time: nowTime() }])
      setTyping(false)
    }, 1100)
  }

  return (
    <div className="tg">

      {/* HEADER */}
      <div className="tg__header">
        <div className="tg__avatar">MR</div>
        <div className="tg__info">
          <div className="tg__name">
            Agente_Marirrodriga_IA
            <span className="tg__verified">✓</span>
          </div>
          <div className="tg__status">bot · en línea · agenda real</div>
        </div>
        <div className="tg__dots">⋮</div>
      </div>

      {/* MESSAGES */}
      <div className="tg__messages" ref={boxRef}>
        {messages.map((m, i) => (
          <div key={i} className={`tg__bubble tg__bubble--${m.role}`}>
            <span className="tg__bubble-text">{m.text}</span>
            <span className="tg__bubble-time">{m.time}</span>
          </div>
        ))}
        {typing && (
          <div className="tg__bubble tg__bubble--bot tg__bubble--typing">
            <span className="tg__dot" /><span className="tg__dot" /><span className="tg__dot" />
          </div>
        )}
      </div>

      {/* QUICK REPLIES */}
      <div className="tg__quick">
        {QUICK.map(q => (
          <button key={q} className="tg__quick-btn" onClick={() => send(q)}>{q}</button>
        ))}
      </div>

      {/* INPUT */}
      <div className="tg__input-row">
        <input
          className="tg__input"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send()}
          placeholder="Mensaje…"
        />
        <button className="tg__send" onClick={() => send()} aria-label="Enviar">
          <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
          </svg>
        </button>
      </div>

    </div>
  )
}
