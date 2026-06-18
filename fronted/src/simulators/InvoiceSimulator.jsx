import { useState } from 'react'
import { Sparkles, RotateCcw } from 'lucide-react'

const N8N_FACTURA = import.meta.env.VITE_N8N_FACTURA || ''

const EXAMPLES = [
  { label: 'Fisioterapia exenta', text: 'He dado 10 sesiones de fisioterapia domiciliaria a la clínica Bienestar S.L. (B87654321) a 55€ la sesión. Es servicio sanitario, exento de IVA.' },
  { label: 'Autónomo IRPF 7%',    text: 'Consultoría de automatización de procesos a Startup Digital Ideas S.L. por 2.800€. Soy autónomo en mi primer año de actividad, aplica retención IRPF del 7%.' },
  { label: 'Obra con ISP',        text: 'Ejecución de obra de rehabilitación para Promotora Norte S.A. (A11223344) por 18.500€. Aplica inversión del sujeto pasivo.' },
]

function buildLocalInvoiceHtml(inputText) {
  const amountMatch  = inputText.match(/(\d+(?:[.,]\d+)?)\s*(?:€|euros?)/i)
  const baseAmount   = amountMatch ? parseFloat(amountMatch[1].replace(',', '.')) : 300
  const taxAmount    = baseAmount * 0.21
  const totalAmount  = baseAmount + taxAmount
  const numFactura   = `FAC-2026-${Math.floor(1000 + Math.random() * 9000)}`
  const fecha        = new Date().toLocaleDateString('es-ES')
  const vencimiento  = new Date(Date.now() + 30 * 86400000).toLocaleDateString('es-ES')

  let client = 'Cliente Simulado'
  const clientMatches = [
    [/maderas paco/i, 'Maderas Paco'],
    [/pedro gómez/i, 'Pedro Gómez'],
    [/inmobiliaria/i, 'SL Inmobiliaria'],
    [/(?:a la empresa|para|a)\s+([A-ZÀ-Ú][A-Za-zÀ-úà-ú\s]+)/i, null],
  ]
  for (const [re, name] of clientMatches) {
    const m = inputText.match(re)
    if (m) { client = name || m[1].trim(); break }
  }

  let concept = 'Servicio de automatización'
  if (/fontaner/i.test(inputText))          concept = 'Reparación de fontanería'
  else if (/eléctric/i.test(inputText))     concept = 'Reparación eléctrica'
  else if (/consultor/i.test(inputText))    concept = 'Consultoría de marketing'
  else if (/web|landing/i.test(inputText))  concept = 'Desarrollo web'

  return `<html><head><style>
    body{font-family:Arial,sans-serif;color:#1E1B4B;margin:32px;background:#fff}
    .header{display:flex;justify-content:space-between;border-bottom:2px solid #6D28D9;padding-bottom:20px;margin-bottom:30px}
    .brand{font-size:22px;font-weight:bold;color:#6D28D9}
    .invoice-title{font-size:26px;font-weight:bold;text-align:right}
    table{width:100%;border-collapse:collapse;margin-bottom:20px;margin-top:20px}
    th{background:#6D28D9;color:#fff;padding:10px;text-align:left;font-size:12px}
    td{padding:10px;border-bottom:1px solid #E2E8F0;font-size:12px;color:#475569}
    .totals{width:260px;margin-left:auto;border-collapse:collapse}
    .totals td{padding:7px 10px;font-size:12px}
    .total-row td{background:#EDE9FE;font-weight:bold;color:#6D28D9;font-size:14px}
    .footer{margin-top:40px;text-align:center;font-size:11px;color:#94A3B8;border-top:1px solid #E2E8F0;padding-top:16px}
    .print-btn{background:#6D28D9;color:#fff;border:none;padding:7px 14px;border-radius:5px;cursor:pointer;font-weight:bold;font-size:12px;margin-bottom:16px}
    @media print{.print-btn{display:none}}
  </style></head><body>
    <div style="text-align:right;margin-bottom:10px"><button class="print-btn" onclick="window.print()">Imprimir / Guardar PDF</button></div>
    <div class="header">
      <div>
        <div class="brand">MARIRRODRIGA I.A</div>
        <div style="font-size:11px;color:#475569;margin-top:5px;line-height:1.5">NIF: B-82914109<br>Gran Canaria, España<br>contacto@marirrodriga.ia</div>
      </div>
      <div style="text-align:right">
        <div class="invoice-title">FACTURA</div>
        <div style="font-size:11px;color:#1E1B4B;margin-top:8px;line-height:1.5">
          <strong>Número:</strong> ${numFactura}<br>
          <strong>Fecha:</strong> ${fecha}<br>
          <strong>Vencimiento:</strong> ${vencimiento}
        </div>
      </div>
    </div>
    <div style="background:#F5F3FF;border-left:4px solid #6D28D9;padding:12px 16px;border-radius:4px;margin-bottom:20px;font-size:12px">
      <strong>Facturado a:</strong> ${client}
    </div>
    <table>
      <thead><tr><th>Descripción</th><th style="text-align:right">Cant.</th><th style="text-align:right">P.Unit.</th><th style="text-align:right">Total</th></tr></thead>
      <tbody><tr><td>${concept}<br><span style="font-size:10px;color:#94A3B8">Servicio a medida — MARIRRODRIGA I.A</span></td><td style="text-align:right">1</td><td style="text-align:right">${baseAmount.toFixed(2)} €</td><td style="text-align:right">${baseAmount.toFixed(2)} €</td></tr></tbody>
    </table>
    <table class="totals">
      <tr><td>Base imponible:</td><td style="text-align:right">${baseAmount.toFixed(2)} €</td></tr>
      <tr><td>IVA (21%):</td><td style="text-align:right">${taxAmount.toFixed(2)} €</td></tr>
      <tr class="total-row"><td>TOTAL:</td><td style="text-align:right">${totalAmount.toFixed(2)} €</td></tr>
    </table>
    <div class="footer">Factura generada automáticamente por MARIRRODRIGA I.A · ¡Gracias por confiar en nosotros!</div>
  </body></html>`
}

export default function InvoiceSimulator() {
  const [text,       setText]       = useState('')
  const [status,     setStatus]     = useState('idle')
  const [invoiceHtml, setInvoiceHtml] = useState('')
  const [pdfUrl,     setPdfUrl]     = useState('')

  async function generate() {
    const inputText = text.trim() || EXAMPLES[0].text
    if (!text.trim()) setText(inputText)
    setStatus('loading')

    if (N8N_FACTURA) {
      try {
        const res  = await fetch(N8N_FACTURA, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ inputText }) })
        const data = await res.json()

        if (data.pdfBase64) {
          const bytes = atob(data.pdfBase64)
          const arr   = new Uint8Array(bytes.length)
          for (let i = 0; i < bytes.length; i++) arr[i] = bytes.charCodeAt(i)
          setPdfUrl(URL.createObjectURL(new Blob([arr], { type: 'application/pdf' })))
        } else if (data.pdfUrl) {
          setPdfUrl(data.pdfUrl)
        }
        setStatus('success')
      } catch {
        setStatus('idle')
      }
      return
    }

    // Modo local: renderiza inline sin window.open
    setTimeout(() => {
      setInvoiceHtml(buildLocalInvoiceHtml(inputText))
      setStatus('success')
    }, 1800)
  }

  function reset() {
    setStatus('idle')
    setText('')
    setInvoiceHtml('')
    setPdfUrl('')
  }

  if (status === 'success') {
    return (
      <div className="invoice-sim">
        {/* PDF externo (flujo n8n real) */}
        {pdfUrl && (
          <iframe src={pdfUrl} className="invoice-frame" title="Factura PDF" />
        )}

        {/* HTML local — renderizado inline */}
        {invoiceHtml && (
          <iframe srcDoc={invoiceHtml} className="invoice-frame" title="Factura generada" />
        )}

        <button className="invoice-reset-btn" onClick={reset}>
          <RotateCcw size={13} /> Nueva factura
        </button>
      </div>
    )
  }

  return (
    <div className="invoice-sim">
      <p className="invoice-sim-desc">
        <Sparkles size={14} />
        <span>Escribe en lenguaje natural qué servicio has prestado, a qué cliente y por cuánto. La IA rellenará la plantilla al instante.</span>
      </p>

      <div className="invoice-sim-box">
        <textarea
          className="invoice-sim-textarea"
          rows={3}
          placeholder="Ej: Consultoría de marketing a la empresa Maderas Paco por 500€"
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <div className="invoice-sim-row">
          <div className="invoice-examples">
            <span className="example-label">O prueba con:</span>
            {EXAMPLES.map(ex => (
              <button key={ex.label} className="badge-example" onClick={() => setText(ex.text)}>
                {ex.label}
              </button>
            ))}
          </div>
          <button className="btn-primary-sm" onClick={generate} disabled={status === 'loading'}>
            {status === 'loading'
              ? <><span className="spinner spinner--sm" /> Procesando…</>
              : <><Sparkles size={13} /> Generar con IA</>
            }
          </button>
        </div>
      </div>

      {status === 'loading' && (
        <div className="invoice-result">
          <div className="invoice-loading">
            <div className="spinner" />
            <span>Procesando con n8n…</span>
          </div>
        </div>
      )}
    </div>
  )
}
