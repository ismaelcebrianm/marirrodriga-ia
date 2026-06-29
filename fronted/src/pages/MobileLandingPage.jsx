export default function MobileLandingPage({ onOpenOnboarding, onViewFull }) {
  return (
    <div className="ml-page">

      {/* ── Hero (pantalla completa) ──────────────────────────────── */}
      <div className="ml-hero">
        <div className="hgrid" />
        <div className="hglow" />
        <div className="ml-hero__inner">

          <div className="ml-badge">Agencia IA · Marirrodriga</div>

          <h1 className="ml-hero__title">Tu negocio,<br />trabajando <em>solo.</em></h1>

          <p className="ml-hero__sub">
            Agentes IA conversacionales, softwares a medida por sector,
            automatizaciones y webs con IA integrada.
          </p>

          <div className="ml-ctas">
            <button className="ml-cta-primary" onClick={onOpenOnboarding}>
              <span className="ml-cta-primary__sparkle">✦</span>
              Personaliza la experiencia
              <span className="ml-cta-primary__arrow">→</span>
            </button>
            <button className="ml-cta-secondary" onClick={onViewFull}>
              Ver la web completa
              <span className="ml-cta-secondary__note">Recomendado en ordenador</span>
            </button>
          </div>

          <div className="ml-trust">
            <span>Sin permanencia</span>
            <span className="ml-trust__dot">·</span>
            <span>Resultados desde el mes 1</span>
            <span className="ml-trust__dot">·</span>
            <span>Setup en 48h</span>
          </div>

        </div>
      </div>

    </div>
  )
}
