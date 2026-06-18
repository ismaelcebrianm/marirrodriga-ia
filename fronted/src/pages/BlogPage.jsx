import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

const CATEGORIES = ['Todas', 'Modelos IA', 'Automatización', 'Regulación', 'Casos de uso', 'Tendencias']

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

function ArticleDetail({ article, onBack }) {
  const blocks = (article.body || '').split(/\n\n+/).filter(Boolean)

  return (
    <div className="blog-detail">
      <button className="blog-back" onClick={onBack}>← Volver al blog</button>

      {article.image_url && (
        <img className="blog-detail__img" src={article.image_url} alt={article.title} />
      )}

      <div className="blog-detail__meta">
        <span className="blog-tag">{article.category}</span>
        <span className="blog-card__source">{article.source_name}</span>
        <span className="blog-card__date">{formatDate(article.published_at)}</span>
      </div>

      <h1 className="blog-detail__title">{article.title}</h1>

      <div className="blog-detail__body">
        {blocks.map((block, i) =>
          block.startsWith('## ')
            ? <h2 key={i} className="blog-detail__section">{block.slice(3)}</h2>
            : <p key={i}>{block}</p>
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
        .select('id, title, summary, image_url, category, source_name, published_at, body')
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
          Noticias de inteligencia artificial traducidas y adaptadas para autónomos y PYMEs españolas.
          Sin humo. Sin tecnicismos.
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
