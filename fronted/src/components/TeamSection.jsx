export default function TeamSection() {
  return (
    <section>
      <div className="stitle center">
        <div className="slbl">El equipo</div>
        <h2>Las personas detrás del sistema</h2>
        <p>Un equipo técnico especializado. Cuando nos contratas, trabajas con quienes construyen.</p>
      </div>
      <div className="teamgrid">
        <div className="tcard">
          <div className="tav-big">MM</div>
          <div className="tinfo">
            <h3>Marco Marirrodriga</h3>
            <div className="trole">Co-fundador · Full Stack Developer</div>
            <div className="tdesc">
              Especializado en desarrollo web moderno y arquitectura de sistemas. Construye
              las interfaces, integraciones y estructuras técnicas que hacen posible cada
              automatización.
            </div>
            <div className="ttags">
              <span className="tt">React / Next.js</span>
              <span className="tt">Node.js</span>
              <span className="tt">UI/UX</span>
              <span className="tt">APIs</span>
            </div>
          </div>
        </div>

        <div className="tcard">
          <div className="tav-big">IM</div>
          <div className="tinfo">
            <h3>Ismael Marirrodriga</h3>
            <div className="trole">Co-fundador · IA Engineer</div>
            <div className="tdesc">
              Graduado en Derecho reconvertido en IA Engineer. Diseña agentes de voz,
              flujos de automatización complejos y sistemas que operan sin intervención
              humana — desde la cualificación de leads hasta la gestión documental
              inteligente.
            </div>
            <div className="ttags">
              <span className="tt">Agentes IA</span>
              <span className="tt">n8n · Make</span>
              <span className="tt">Vapi · Retell</span>
              <span className="tt">LLMs</span>
              <span className="tt">Supabase</span>
              <span className="tt">Automatización</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
