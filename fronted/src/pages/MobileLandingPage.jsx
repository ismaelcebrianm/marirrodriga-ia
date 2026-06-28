import MiniContactForm from '../components/MiniContactForm'

export default function MobileLandingPage({ onOpenOnboarding, onViewFull }) {
  return (
    <div className="ml-page">

      {/* ── Hero ─────────────────────────────────────────────── */}
      <div className="ml-hero">
        <div className="hgrid" />
        <div className="hglow" />
        <div className="ml-hero__inner">
          <p className="ml-hero__prehook">Automatización con IA para negocios que quieren crecer.</p>
          <h1 className="ml-hero__title">Tu negocio,<br />trabajando <em>solo.</em></h1>
          <p className="ml-hero__sub">
            Softwares de IA para tu sector o funciones a la carta para lo que necesitas.
            Setup en 48h, sin permanencia.
          </p>

          <div className="ml-ctas">
            <button className="ml-cta-primary" onClick={onOpenOnboarding}>
              <span className="ml-cta-primary__sparkle">✦</span>
              Personaliza la web a tu negocio
              <span className="ml-cta-primary__arrow">→</span>
            </button>
            <button className="ml-cta-secondary" onClick={onViewFull}>
              Ver la web completa
              <span className="ml-cta-secondary__note">Mejor experiencia en ordenador</span>
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

      {/* ── Contacto ─────────────────────────────────────────── */}
      <div className="ml-contact">
        <div className="ml-contact__inner">
          <div className="slbl">Contacto directo</div>
          <h2 className="ml-contact__title">¿Hablamos?</h2>
          <p className="ml-contact__sub">Cuéntanos tu caso y te respondemos en menos de 24h.</p>
          <MiniContactForm />
        </div>
      </div>

    </div>
  )
}
