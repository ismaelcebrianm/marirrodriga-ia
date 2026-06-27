import { useState } from 'react'
import LogoIcon from './LogoIcon'

const SECTORS = [
  { id: 'dental',      emoji: '🦷', label: 'Clínica dental' },
  { id: 'deporte',     emoji: '🏋️', label: 'Centro deportivo' },
  { id: 'estetica',    emoji: '💆', label: 'Centro de estética' },
  { id: 'autoescuela', emoji: '🚗', label: 'Autoescuela' },
  { id: 'otro',        emoji: '🏢', label: 'Otro tipo de negocio' },
  { id: 'curiosity',   emoji: '👀', label: 'Solo estoy explorando' },
]

const INTERESTS = [
  { id: 'citas',        emoji: '📅', label: 'Gestionar citas y agenda' },
  { id: 'comunicacion', emoji: '💬', label: 'Comunicarme mejor con clientes' },
  { id: 'admin',        emoji: '📊', label: 'Reducir trabajo administrativo' },
  { id: 'presencia',    emoji: '📱', label: 'Mejorar mi presencia online' },
  { id: 'todo',         emoji: '🎯', label: 'Ver todo el catálogo' },
]

export default function OnboardingModal({ onComplete, onSkip }) {
  const [step, setStep] = useState(1)
  const [sector, setSector] = useState(null)
  const [interest, setInterest] = useState(null)

  function pickSector(id) {
    setSector(id)
    if (id === 'curiosity') { onComplete({ sector: id, interest: 'todo' }); return }
    setStep(2)
  }

  return (
    <div className="ob-overlay">
      <div className="ob-box">
        <div className="ob-head">
          <LogoIcon className="ob-logo-icon" />
          <span className="ob-logo-text">Marirrodriga<b>.IA</b></span>
        </div>

        <div className="ob-dots">
          <span className={`ob-dot${step === 1 ? ' ob-dot--on' : ''}`} />
          <span className={`ob-dot${step === 2 ? ' ob-dot--on' : ''}`} />
        </div>

        {step === 1 ? (
          <>
            <h2 className="ob-q">¿A qué te dedicas?</h2>
            <p className="ob-hint">Te mostramos solo lo que tiene sentido para ti</p>
            <div className="ob-opts">
              {SECTORS.map(s => (
                <button key={s.id} className="ob-btn" onClick={() => pickSector(s.id)}>
                  <span className="ob-ico">{s.emoji}</span>
                  {s.label}
                </button>
              ))}
            </div>
          </>
        ) : (
          <>
            <h2 className="ob-q">¿Qué buscas principalmente?</h2>
            <p className="ob-hint">Elige lo que más se ajusta a lo que necesitas ahora</p>
            <div className="ob-opts ob-opts--col1">
              {INTERESTS.map(i => (
                <button
                  key={i.id}
                  className={`ob-btn${interest === i.id ? ' ob-btn--sel' : ''}`}
                  onClick={() => setInterest(i.id)}
                >
                  <span className="ob-ico">{i.emoji}</span>
                  {i.label}
                </button>
              ))}
            </div>
            <div className="ob-row">
              <button className="ob-back" onClick={() => { setStep(1); setInterest(null) }}>← Atrás</button>
              <button
                className="ob-primary"
                disabled={!interest}
                onClick={() => onComplete({ sector, interest })}
              >
                Ver mis recomendaciones →
              </button>
            </div>
          </>
        )}

        <button className="ob-skip" onClick={onSkip}>Explorar la web completa sin personalizar →</button>
      </div>
    </div>
  )
}
