import { supabase } from './supabase'

export const CATEGORIES = ['Todas', 'Modelos IA', 'Automatización', 'Regulación', 'Casos de uso', 'Tendencias']

const POST_FIELDS = 'id, title, summary, image_url, category, source_name, source_url, published_at, body'

export async function fetchPublishedPosts({ limit } = {}) {
  if (!supabase) return { data: [], error: null }
  let query = supabase
    .from('blog_posts')
    .select(POST_FIELDS)
    .eq('status', 'published')
    .order('published_at', { ascending: false })
  if (limit) query = query.limit(limit)
  return query
}

export function formatDate(iso) {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })
}

export function parseInline(text) {
  if (!text.includes('**')) return text
  return text.split(/(\*\*[^*]+\*\*)/).map((part, j) =>
    part.startsWith('**') && part.endsWith('**')
      ? <strong key={j}>{part.slice(2, -2)}</strong>
      : part
  )
}

export function parseBody(body) {
  return (body || '').split(/\n\n+/).filter(Boolean).map((block, i) => {
    if (block.match(/^#{1,2}\s/))
      return <h2 key={i} className="art-h2">{parseInline(block.replace(/^#{1,2}\s/, ''))}</h2>
    if (block.startsWith('### '))
      return <h3 key={i} className="art-h3">{parseInline(block.slice(4))}</h3>
    if (block.startsWith('> '))
      return <blockquote key={i} className="art-quote">{parseInline(block.slice(2))}</blockquote>
    const lines = block.split('\n')
    const bulletLines = lines.filter(l => l.match(/^[-*•]\s/))
    if (bulletLines.length > 0 && bulletLines.length >= lines.filter(Boolean).length / 2) {
      const items = bulletLines.map(l => l.replace(/^[-*•]\s+/, ''))
      return <ul key={i} className="art-list">{items.map((it, j) => <li key={j}>{parseInline(it)}</li>)}</ul>
    }
    return <p key={i} className={i === 0 ? 'art-lead' : 'art-p'}>{parseInline(block)}</p>
  })
}

const ART_BOT_URL = 'https://t.me/Marirrodrigabot'

export function ArticleDetail({ article, onBack, wrapperClass = 'blog-detail', backLabel = '← Volver al blog' }) {
  const words    = (article.body || '').split(/\s+/).filter(Boolean).length
  const readTime = Math.max(1, Math.round(words / 200))

  return (
    <div className={wrapperClass}>
      <button className="blog-back" onClick={onBack}>{backLabel}</button>

      <div className="art-reader">
        {article.image_url && (
          <img className="art-hero-img" src={article.image_url} alt={article.title} />
        )}

        <div className="art-meta">
          <span className="blog-tag">{article.category}</span>
          {article.source_name && <><span className="art-dot">·</span><span className="art-source-name">{article.source_name}</span></>}
          <span className="art-dot">·</span>
          <span className="art-date">{formatDate(article.published_at)}</span>
          <span className="art-dot">·</span>
          <span className="art-readtime">📖 {readTime} min</span>
        </div>

        <h1 className="art-title">{article.title}</h1>

        <div className="art-body">{parseBody(article.body)}</div>

        <div className="art-cta-box">
          <div className="art-cta-box__title">¿Esto podría aplicarse a tu negocio?</div>
          <p className="art-cta-box__desc">ISMABOT analiza tu caso concreto y te explica qué automatizaciones tendrían más impacto para ti. Sin tecnicismos, sin compromiso.</p>
          <a className="art-cta-box__btn" href={ART_BOT_URL} target="_blank" rel="noopener noreferrer">
            Hablar con ISMABOT →
          </a>
        </div>

        {(article.source_name || article.source_url) && (
          <div className="art-source-ref">
            <span>Fuente original:</span>
            {article.source_url
              ? <a href={article.source_url} target="_blank" rel="noopener noreferrer">{article.source_name || article.source_url}</a>
              : <span>{article.source_name}</span>
            }
          </div>
        )}
      </div>
    </div>
  )
}

export function cardKeyActivate(handler) {
  return (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handler()
    }
  }
}
