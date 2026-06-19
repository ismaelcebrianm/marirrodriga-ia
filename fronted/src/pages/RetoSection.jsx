import { useEffect, useState } from 'react'
import { Newspaper } from 'lucide-react'
import LeadFormSection from '../components/LeadFormSection'
import {
  CATEGORIES, fetchPublishedPosts, formatDate, ArticleDetail, cardKeyActivate,
} from '../lib/blogContent'

function FormCard() {
  return (
    <div className="blog-card form-card">
      <div className="blog-card__img">
        <img src="/regalo-gratuito.png" alt="Regalo gratuito — Recurso personalizado exclusivo" loading="lazy" />
      </div>
      <div className="form-card__body">
        <LeadFormSection />
      </div>
    </div>
  )
}

function ArticleCard({ post, onOpen }) {
  return (
    <article
      className="blog-card"
      role="button"
      tabIndex={0}
      onClick={() => onOpen(post)}
      onKeyDown={cardKeyActivate(() => onOpen(post))}
    >
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

export default function RetoSection() {
  const [posts,    setPosts]    = useState([])
  const [loading,  setLoading]  = useState(true)
  const [filter,   setFilter]   = useState('Todas')
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    async function fetchPosts() {
      const { data } = await fetchPublishedPosts({ limit: 9 })
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
          Noticias de inteligencia artificial contadas en español, sin tecnicismos ni humo.
          Para curiosos, profesionales y negocios que quieren entender qué está pasando de verdad.{' '}
          <strong>Actualizadas cada día.</strong>
        </p>
      </div>

      {selected ? (
        <ArticleDetail
          article={selected}
          onBack={() => setSelected(null)}
          wrapperClass="actualidad-detail"
          backLabel="← Volver a Actualidad IA"
        />
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
