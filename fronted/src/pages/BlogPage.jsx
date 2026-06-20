import { useEffect, useState } from 'react'
import {
  CATEGORIES, fetchPublishedPosts, formatDate, ArticleDetail, cardKeyActivate,
} from '../lib/blogContent'

function ArticleCard({ article, onOpen }) {
  return (
    <article
      className="blog-card"
      role="button"
      tabIndex={0}
      onClick={() => onOpen(article)}
      onKeyDown={cardKeyActivate(() => onOpen(article))}
    >
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

export default function BlogPage() {
  const [posts, setPosts]       = useState([])
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState(null)
  const [filter, setFilter]     = useState('Todas')
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    async function fetchPosts() {
      setLoading(true)
      const { data, error } = await fetchPublishedPosts()
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
