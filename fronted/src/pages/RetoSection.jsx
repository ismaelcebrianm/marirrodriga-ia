import { useEffect, useState } from 'react'
import { Newspaper } from 'lucide-react'
import LeadFormSection from '../components/LeadFormSection'
import { supabase } from '../lib/supabase'

const CATEGORIES = ['Todas', 'Modelos IA', 'Automatización', 'Regulación', 'Casos de uso', 'Tendencias']

function formatDate(iso) {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })
}

function FormCard() {
  return (
    <div className="blog-card form-card">
      <div className="blog-card__img">
        <img src="/regalo-gratuito.png" alt="Regalo gratuito — Recurso personalizado exclusivo" />
      </div>
      <div className="form-card__body">
        <LeadFormSection />
      </div>
    </div>
  )
}

function ArticleCard({ post, onOpen }) {
  return (
    <article className="blog-card" onClick={() => onOpen(post)}>
      {post.image_url && (
        <div className="blog-card__img">
          <img src={post.image_url} alt={post.title} loading="lazy" />
        </div>
      )}
      <div className="blog-card__body">
        <span className="blog-tag">{post.category}</span>
        <h3 className="blog-card__title">{post.title}</h3>
        <p className="blog-card__summary">{post.summary}</p>
        <div className="blog-card__footer">
          <span className="blog-card__date">{formatDate(post.published_at)}</span>
          <span className="blog-card__read-more">Leer artículo →</span>
        </div>
      </div>
    </article>
  )
}

function ArticleDetail({ article, onBack }) {
  const blocks = (article.body || '').split(/\n\n+/).filter(Boolean)
  return (
    <div className="actualidad-detail">
      <button className="blog-back" onClick={onBack}>← Volver a Actualidad IA</button>
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

      {(article.source_name || article.source_url) && (
        <div className="blog-detail__source-ref">
          <span className="blog-detail__source-label">Fuente original:</span>
          {article.source_url
            ? <a href={article.source_url} target="_blank" rel="noopener noreferrer" className="blog-detail__source-link">
                {article.source_name || article.source_url}
              </a>
            : <span className="blog-detail__source-name">{article.source_name}</span>
          }
        </div>
      )}
    </div>
  )
}

export default function RetoSection() {
  const [posts,    setPosts]    = useState([])
  const [loading,  setLoading]  = useState(true)
  const [filter,   setFilter]   = useState('Todas')
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    async function fetchPosts() {
      const { data } = await supabase
        .from('blog_posts')
        .select('id, title, summary, image_url, category, source_name, source_url, published_at, body')
        .eq('status', 'published')
        .order('published_at', { ascending: false })
        .limit(9)
      setPosts(data || [])
      setLoading(false)
    }
    fetchPosts()
  }, [])

  const filtered = filter === 'Todas' ? posts : posts.filter(p => p.category === filter)

  return (
    <section className="reto-section" id="reto-diario">
      <div className="reto-section__header">
        <div className="slbl">Actualidad IA</div>
        <h2 className="reto-section__title">
          <Newspaper size={22} className="reto-section__icon" />
          Lo que está pasando en IA
        </h2>
        <p className="reto-section__sub">
          Noticias de inteligencia artificial traducidas y adaptadas para autónomos y PYMEs españolas.
          Sin humo. Sin tecnicismos. <strong>Actualizadas cada día.</strong>
        </p>
      </div>

      {selected ? (
        <ArticleDetail article={selected} onBack={() => setSelected(null)} />
      ) : (
        <>
          <div className="blog-filters blog-filters--left">
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

          {loading && <div className="blog-state"><div className="blog-spinner" /></div>}

          {!loading && filtered.length === 0 && (
            <div className="blog-state">
              <p>Aún no hay artículos en esta categoría.</p>
              <p className="blog-state__hint">El sistema publica automáticamente varias veces al día.</p>
            </div>
          )}

          {!loading && (
            <div className="blog-grid">
              <FormCard />
              {filtered.map(post => (
                <ArticleCard key={post.id} post={post} onOpen={setSelected} />
              ))}
            </div>
          )}
        </>
      )}
    </section>
  )
}
