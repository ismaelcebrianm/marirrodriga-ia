import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

const CATEGORIES = ['Todas', 'Modelos IA', 'Automatización', 'Regulación', 'Casos de uso', 'Tendencias']
const ART_BOT_URL = 'https://t.me/marirrodrigaIA_bot'

function formatDate(iso) {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })
}

function ArticleCard({ article, onOpen }) {
  return (
    <article className="blog-card" onClick={() => onOpen(article)}>
      {article.image_url && (
        <div className="blog-card__img">
          <img src={article.image_url} alt={article.title} loading="lazy" />
        </div>
      )}
      <div className="blog-card__body">
        <span className="blog-tag">{article.category}</span>
        <h3 className="blog-card__title">{article.title}</h3>
        <p className="blog-card__summary">{article.summary}</p>
        <div className="blog-card__footer">
          <span className="blog-card__source">{article.source_name}</span>
          <span className="blog-card__date">{formatDate(article.published_at)}</span>
        </div>
      </div>
    </article>
  )
}

function parseInline(text) {
  if (!text.includes('**')) return text
  return text.split(/(\*\*[^*]+\*\*)/).map((part, j) =>
    part.startsWith('**') && part.endsWith('**')
      ? <strong key={j}>{part.slice(2, -2)}</strong>
      : part
  )
}

function parseBody(body) {
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

function ArticleDetail({ article, onBack }) {
  const words    = (article.body || '').split(/\s+/).filter(Boolean).length
  const readTime = Math.max(1, Math.round(words / 200))

  return (
    <div className="blog-detail">
      <button className="blog-back" onClick={onBack}>← Volver al blog</button>

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

export default function BlogPage({ onNavigateHome }) {
  const [posts, setPosts]       = useState([])
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState(null)
  const [filter, setFilter]     = useState('Todas')
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    async function fetchPosts() {
      setLoading(true)
      const { data, error } = await supabase
        .from('blog_posts')
        .select('id, title, summary, image_url, category, source_name, source_url, published_at, body')
        .eq('status', 'published')
        .order('published_at', { ascending: false })

      if (error) setError(error.message)
      else setPosts(data || [])
      setLoading(false)
    }
    fetchPosts()
  }, [])

  const filtered = filter === 'Todas' ? posts : posts.filter(p => p.category === filter)

  if (selected) {
    return (
      <div className="blog-page">
        <ArticleDetail article={selected} onBack={() => setSelected(null)} />
      </div>
    )
  }

  return (
    <div className="blog-page">
      <div className="blog-hero">
        <span className="blog-hero__label">Actualidad IA</span>
        <h1 className="blog-hero__title">Blog <span className="accent">IA</span></h1>
        <p className="blog-hero__sub">
          Noticias de inteligencia artificial contadas en español, sin tecnicismos ni humo.
          Para curiosos, profesionales y negocios que quieren entender qué está pasando de verdad.
        </p>
      </div>

      <div className="blog-filters">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            className={`blog-filter-btn${filter === cat ? ' active' : ''}`}
            onClick={() => setFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading && (
        <div className="blog-state">
          <div className="blog-spinner" />
          <p>Cargando artículos…</p>
        </div>
      )}

      {error && (
        <div className="blog-state blog-state--error">
          <p>Error al cargar: {error}</p>
        </div>
      )}

      {!loading && !error && filtered.length === 0 && (
        <div className="blog-state">
          <p>Aún no hay artículos publicados en esta categoría.</p>
          <p className="blog-state__hint">
            El sistema publica automáticamente varias veces al día.
          </p>
        </div>
      )}

      {!loading && !error && filtered.length > 0 && (
        <div className="blog-grid">
          {filtered.map(post => (
            <ArticleCard key={post.id} article={post} onOpen={setSelected} />
          ))}
        </div>
      )}
    </div>
  )
}
