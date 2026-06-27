import { ArrowRight } from 'lucide-react'

const SECTOR_PAGES = {
  dental:      { id: 'dental',      emoji: '🦷', name: 'Clínica Dental',    tagline: 'Agenda sin llamadas, más reseñas, menos no-shows.',                   desc: 'Sistema que gestiona citas por WhatsApp, recordatorios automáticos y reactiva pacientes inactivos.',        price: 'Desde 200€/mes' },
  deporte:     { id: 'deporte',     emoji: '🏋️', name: 'Centro Deportivo',  tagline: 'Más retención, menos bajas — sin más personal.',                       desc: 'Detecta socios en riesgo de baja y los reengancha con rutinas IA. Gestión de reservas incluida.',          price: 'Desde 200€/mes' },
  estetica:    { id: 'estetica',    emoji: '💆', name: 'Centro de Estética', tagline: 'Agenda llena todos los días, sin gestionarla tú.',                     desc: 'Citas por WhatsApp, recordatorios automáticos, reactivación de clientas y reseñas Google.',                price: 'Desde 150€/mes' },
  autoescuela: { id: 'autoescuela', emoji: '🚗', name: 'Autoescuela',        tagline: 'Matrículas online y seguimiento sin WhatsApps manuales.',              desc: 'Del primer contacto al alumno graduado: todo el proceso completamente automatizado.',                        price: 'Desde 150€/mes' },
  reservas:    { id: 'reservas',    emoji: '📅', name: 'Sistema de Citas',   tagline: 'Tu propia agenda por WhatsApp, sin comisiones externas.',              desc: 'Reservas 24/7, recordatorios con confirmación, reseñas Google y reactivación de clientes inactivos.',    price: 'Desde 150€/mes' },
  web:         { id: 'web',         emoji: '🌐', name: 'Web + IA Integrada', tagline: 'Una web que trabaja para ti, las 24 horas.',                           desc: 'Chatbot integrado, blog con publicación automática y formularios inteligentes conectados a tu sistema.',   price: 'Desde 500€ setup' },
}

const AGENT_SETS = {
  citas:        [{ emoji: '📅', t: 'Reservas 24/7 por WhatsApp',  d: 'El cliente reserva, cancela o cambia su cita sin llamar. A cualquier hora.' },          { emoji: '🔔', t: 'Recordatorios automáticos',   d: 'Avisos antes de cada cita con confirmación incluida. Menos no-shows, más ingresos.' }],
  comunicacion: [{ emoji: '🤖', t: 'Chatbot IA personalizado',    d: 'Responde preguntas frecuentes, cualifica leads y escala solo lo que necesita tu atención.' }, { emoji: '📧', t: 'Emails automáticos',         d: 'Bienvenida, seguimiento y reactivación adaptados a tu negocio.' }],
  admin:        [{ emoji: '🧾', t: 'Facturación automática',      d: 'Facturas generadas, enviadas y registradas contablemente sin que toques nada.' },         { emoji: '📄', t: 'Gestión documental IA',      d: 'Extrae datos de documentos y los estructura en tu sistema automáticamente.' }],
  presencia:    [{ emoji: '🌐', t: 'Web profesional con IA',      d: 'Chatbot, blog automático y formularios inteligentes en una sola web.' },                  { emoji: '📱', t: 'RRSS automatizadas',         d: 'Publicación diaria en Instagram, LinkedIn y TikTok sin que lo tengas que tocar.' }],
  software:     [],
}

function mergeAgents(interestArr) {
  const seen = new Set()
  const result = []
  for (const id of interestArr) {
    if (id === 'software') continue
    for (const a of (AGENT_SETS[id] || [])) {
      if (!seen.has(a.t)) { seen.add(a.t); result.push(a) }
    }
  }
  return result
}

function getConfig({ sector, interest }) {
  if (sector === 'curiosity') return null

  const interestArr = Array.isArray(interest) ? interest : (interest ? [interest] : [])
  if (interestArr.length === 0) return null

  const hasSoftware = interestArr.includes('software')
  const agents      = mergeAgents(interestArr)
  const sectorLabel = hasSoftware && interestArr.length === 1
    ? 'Tu software todo en uno'
    : 'Tu solución principal'

  if (sector !== 'otro') {
    const headlines = {
      dental:      { h: 'Para clínicas dentales',   s: 'Automatiza tu consulta: citas, recordatorios, reactivación de pacientes y más reseñas Google.' },
      deporte:     { h: 'Para centros deportivos',  s: 'Retén más socios y elimina la rotación sin contratar más personal.' },
      estetica:    { h: 'Para centros de estética', s: 'Agenda llena, clientas que vuelven y reseñas que atraen a las nuevas.' },
      autoescuela: { h: 'Para autoescuelas',        s: 'Matrículas más fáciles, seguimiento automático del alumno y menos gestión manual.' },
    }
    const hl = headlines[sector] || { h: 'Para tu negocio', s: 'Automatización IA adaptada a lo que realmente necesitas.' }
    return { headline: hl.h, subtext: hl.s, sectorPage: SECTOR_PAGES[sector], sectorLabel, agents }
  }

  // sector === 'otro': pick the best featured page based on selected interests
  let otroPage = null
  if (hasSoftware || interestArr.includes('citas'))     otroPage = SECTOR_PAGES.reservas
  else if (interestArr.includes('presencia'))           otroPage = SECTOR_PAGES.web

  const otroHL = hasSoftware
    ? { h: 'Un software que lo gestione todo', s: 'Diseñamos el sistema completo adaptado a las necesidades específicas de tu negocio.' }
    : interestArr.includes('citas')
    ? { h: 'Tu sistema de citas propio',        s: 'Sin Booksy, sin comisiones. Tu propia agenda por WhatsApp.' }
    : interestArr.includes('presencia')
    ? { h: 'Refuerza tu presencia online',      s: 'Web con IA integrada y redes sociales automatizadas.' }
    : interestArr.includes('comunicacion')
    ? { h: 'Automatiza la comunicación',        s: 'Chatbot IA, emails y seguimientos que nunca se olvidan.' }
    : { h: 'Reduce el trabajo administrativo',  s: 'Facturación, documentos y gestión sin intervención manual.' }

  return { headline: otroHL.h, subtext: otroHL.s, sectorPage: otroPage, sectorLabel, agents }
}

export default function PersonalizedHome({ profile, onNavigate, onViewFull, onReset }) {
  const config = getConfig(profile)

  if (!config) {
    onViewFull()
    return null
  }

  const { headline, subtext, sectorPage, sectorLabel, agents } = config

  return (
    <div className="ph-page">
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <div className="ph-hero">
        <div className="ph-badge">✨ Recomendado para ti</div>
        <h1>{headline}</h1>
        <p>{subtext}</p>
        <div className="ph-hero-btns">
          <button className="hb1" onClick={() => onViewFull('contacto')}>Hablar con nosotros</button>
          <button className="hb2" onClick={() => onViewFull()}>Ver la web completa</button>
        </div>
      </div>

      <div className="ph-body">
        {/* ── Featured sector card ─────────────────────────────── */}
        {sectorPage && (
          <div className="ph-section">
            <div className="ph-lbl">{sectorLabel}</div>
            <div className="ph-card" onClick={() => onNavigate(sectorPage.id)}>
              <div className="ph-card-inner">
                <div className="ph-card-tag">{sectorPage.emoji} {sectorPage.name}</div>
                <h3>{sectorPage.tagline}</h3>
                <p>{sectorPage.desc}</p>
              </div>
              <div className="ph-card-foot">
                <div className="ph-price">{sectorPage.price}</div>
                <button
                  className="hb1 hb1--sm"
                  onClick={e => { e.stopPropagation(); onNavigate(sectorPage.id) }}
                >
                  Ver oferta completa <ArrowRight size={13} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── Agent highlights ─────────────────────────────────── */}
        {agents.length > 0 && (
          <div className="ph-section">
            <div className="ph-lbl">También te puede interesar</div>
            <div className="ph-tools-grid">
              {agents.map(a => (
                <div key={a.t} className="ph-tool">
                  <div className="ph-tool-ico">{a.emoji}</div>
                  <h4>{a.t}</h4>
                  <p>{a.d}</p>
                </div>
              ))}
            </div>
            <div className="ph-agents-cta">
              <button className="hb2" onClick={() => onViewFull('agentes')}>Ver todos los agentes IA →</button>
            </div>
          </div>
        )}
      </div>

      {/* ── Footer ───────────────────────────────────────────────── */}
      <div className="ph-end">
        <button className="hb2" onClick={() => onViewFull()}>Ver la web completa →</button>
        <button className="ph-link" onClick={onReset}>Cambiar mis preferencias</button>
      </div>
    </div>
  )
}
