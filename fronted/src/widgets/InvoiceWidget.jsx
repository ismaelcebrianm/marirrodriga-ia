import { useState } from 'react'
import { callClaude } from '../api'

const SYSTEM = `Eres un sistema experto en generación de facturas profesionales españolas conforme al RD 1619/2012 y la legislación fiscal vigente en 2026. Genera la factura en HTML con estilos inline completos. La factura debe incluir: número FAC-2026-XXX, fecha de hoy, emisor Marirrodriga.IA (NIF: B-XXXXXXXX, C/ Ejemplo 1, 47001 Valladolid), datos del cliente, tabla de servicios con columnas Descripción / Uds. / Precio unit. / Importe, y sección de totales.

REGLAS FISCALES OBLIGATORIAS:
- IVA 21% (general): tecnología, software, consultoría, automatización, marketing, diseño
- IVA 10% (reducido): restauración, transporte viajeros, obras en vivienda habitual
- IVA 4% (superreducido): alimentos básicos, libros, medicamentos
- IVA 0% o EXENTO con cita legal cuando aplique: servicios sanitarios (Art. 20.Uno.3 Ley 37/1992), educación reglada (Art. 20.Uno.9), servicios financieros (Art. 20.Uno.16)
- ISP (Inversión Sujeto Pasivo Art. 84.Uno.2 LIVA): obras construcción B2B, venta tech >10.000 euros a empresa — NO calcular cuota IVA, solo base imponible + nota legal obligatoria
- IRPF 0%: si el cliente es SL/SA/Ltd. o es B2C
- IRPF 15%: si se indica que el proveedor es autónomo profesional
- IRPF 7%: si se indica "nuevo autónomo" o "primer año de actividad"

CÁLCULO: precio_unitario x unidades con 5 decimales internos, redondear base a 2 decimales. Cuota IVA = base x tipo/100 redondeada a 2 decimales. Si IRPF: retención = base x tipo_irpf/100. Total = base + IVA - retención IRPF.

DISEÑO: fondo crema #F5F0E8, tipografía serif (Georgia o similar), barra lateral izquierda oscura #1a1a2e de 6px, cabecera con logo MARIRRODRIGA I.A. a la izquierda y número de factura a la derecha, tabla de conceptos con línea separadora sutil, bloque de totales alineado a la derecha, pie con nota legal y datos de pago. Aspecto premium, sin colores llamativos.

DEVUELVE SOLO EL HTML COMPLETO sin explicaciones ni bloques markdown.`

const PRESETS = [
  {
    label: 'Automatización básica',
    client: 'Talleres García S.L.',
    nif: 'B12345678',
    lines: [{ desc: 'Implementación chatbot WhatsApp para gestión de citas', qty: '1', price: '1200' }],
    note: ''
  },
  {
    label: 'Consultoría + IRPF 15%',
    client: 'Juan Martínez López',
    nif: '12345678A',
    lines: [
      { desc: 'Consultoría estratégica en automatización de procesos', qty: '8', price: '120' },
      { desc: 'Documentación técnica y entrega de informes', qty: '1', price: '250' }
    ],
    note: 'Proveedor autónomo profesional — retención IRPF 15%'
  },
  {
    label: 'Fisioterapia exenta IVA',
    client: 'Clínica Bienestar S.L.',
    nif: 'B87654321',
    lines: [{ desc: 'Sesiones de fisioterapia domiciliaria — 10 sesiones', qty: '10', price: '55' }],
    note: 'Servicio sanitario exento. Art. 20.Uno.3 Ley 37/1992'
  },
  {
    label: 'Obra con ISP',
    client: 'Promotora Norte S.A.',
    nif: 'A11223344',
    lines: [{ desc: 'Ejecución de obra de rehabilitación — contrato de construcción', qty: '1', price: '18500' }],
    note: 'Inversión del sujeto pasivo. Art. 84.Uno.2 Ley 37/1992 del IVA'
  },
  {
    label: 'Nuevo autónomo IRPF 7%',
    client: 'Startup Digital Ideas S.L.',
    nif: 'B55667788',
    lines: [
      { desc: 'Diseño UX y prototipado de aplicación móvil', qty: '1', price: '2800' },
      { desc: 'Revisión de diseño — 3 iteraciones incluidas', qty: '3', price: '180' }
    ],
    note: 'Proveedor autónomo en primer año de actividad — IRPF 7%'
  }
]

function newLine() {
  return { desc: '', qty: '1', price: '' }
}

export default function InvoiceWidget({ triggerPopup }) {
  const [client,  setClient]  = useState('Clínica Bienestar S.L.')
  const [nif,     setNif]     = useState('B87654321')
  const [note,    setNote]    = useState('Servicio sanitario exento IVA. Art. 20.Uno.3 Ley 37/1992')
  const [lines,   setLines]   = useState([
    { desc: 'Sesiones de fisioterapia domiciliaria — pack 10 sesiones', qty: '10', price: '55' },
    { desc: 'Informe de evaluación funcional y plan de rehabilitación',  qty: '1',  price: '120' }
  ])
  const [loading, setLoading] = useState(false)
  const [html,    setHtml]    = useState(null)

  function loadPreset(p) {
    setClient(p.client)
    setNif(p.nif)
    setNote(p.note)
    setLines(p.lines)
  }

  function updateLine(i, field, value) {
    setLines((prev) => prev.map((l, idx) => idx === i ? { ...l, [field]: value } : l))
  }

  async function generate() {
    if (!client.trim()) { alert('Añade el nombre del cliente'); return }
    const services = lines.map((l) => `- ${l.desc || 'Servicio'}: ${l.qty || 1} ud. x ${l.price || 0} euros`).join('\n')
    const noteText = note.trim() ? `\nNotas fiscales: ${note}` : ''
    const data = `Fecha: ${new Date().toLocaleDateString('es-ES')}\nCliente: ${client}${nif ? ' | NIF/CIF: ' + nif : ''}\nServicios:\n${services}${noteText}`
    setLoading(true)
    try {
      const raw   = await callClaude(SYSTEM, [{ role: 'user', content: data }], 2000)
      const clean = raw.replace(/```html\n?/g, '').replace(/```\n?/g, '').trim()
      setHtml(clean)
      triggerPopup('invoice')
    } catch {
      // silently fail
    } finally {
      setLoading(false)
    }
  }

  if (html) {
    return (
      <div className="scdemo">
        <div className="sdtop"><div className="sdlive" /><span>IA en vivo · Claude</span></div>
        <div className="widget-body">
          <div className="result-box">
            <div className="result-hdr">Factura generada por IA</div>
            <iframe
              className="invoice-frame"
              srcDoc={html}
              title="Factura"
            />
          </div>
          <button className="btn-back" onClick={() => setHtml(null)}>← Nueva factura</button>
        </div>
        <div className="widget-cta-bar">
          <span>¿Quieres facturación automática para tu negocio?</span>
          <button className="widget-cta-btn" onClick={() => triggerPopup('invoice', true)}>Prueba gratis →</button>
        </div>
      </div>
    )
  }

  return (
    <div className="scdemo">
      <div className="sdtop"><div className="sdlive" /><span>IA en vivo · Claude</span></div>
      <div className="widget-body">

        <label className="widget-label" style={{ marginBottom: '6px', display: 'block' }}>Ejemplos rápidos</label>
        <div className="inv-presets">
          {PRESETS.map((p, i) => (
            <button key={i} className="inv-preset-btn" onClick={() => loadPreset(p)}>{p.label}</button>
          ))}
        </div>

        <div className="widget-field-grid" style={{ marginTop: '14px' }}>
          <div>
            <label className="widget-label">Cliente *</label>
            <input className="widget-input" placeholder="Nombre o razón social" value={client} onChange={(e) => setClient(e.target.value)} />
          </div>
          <div>
            <label className="widget-label">NIF / CIF</label>
            <input className="widget-input" placeholder="B12345678" value={nif} onChange={(e) => setNif(e.target.value)} />
          </div>
        </div>

        <label className="inv-lines-label">Servicios</label>
        {lines.map((l, i) => (
          <div key={i} className="inv-line">
            <input placeholder="Descripción del servicio" value={l.desc}  onChange={(e) => updateLine(i, 'desc',  e.target.value)} />
            <input type="number" placeholder="Ud." min="1" value={l.qty}   onChange={(e) => updateLine(i, 'qty',   e.target.value)} />
            <input placeholder="€/ud" value={l.price} onChange={(e) => updateLine(i, 'price', e.target.value)} />
          </div>
        ))}
        <button className="inv-add-btn" onClick={() => setLines((prev) => [...prev, newLine()])}>+ Añadir línea</button>

        <div style={{ marginTop: '12px' }}>
          <label className="widget-label">Notas fiscales <span style={{ opacity: 0.5, fontWeight: 400 }}>(opcional — p.ej. "autónomo IRPF 7%", "exento sanitario", "ISP obra")</span></label>
          <input className="widget-input" placeholder="Indica el régimen especial si aplica" value={note} onChange={(e) => setNote(e.target.value)} />
        </div>

        <button className="widget-action-btn" onClick={generate} disabled={loading}>
          {loading ? '✦ Generando factura...' : 'Generar factura'}
        </button>
      </div>
      <div className="widget-cta-bar">
        <span>¿Quieres facturación automática para tu negocio?</span>
        <button className="widget-cta-btn" onClick={() => triggerPopup('invoice', true)}>Prueba gratis →</button>
      </div>
    </div>
  )
}
