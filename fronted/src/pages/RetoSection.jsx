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

const ART_BOT_URL = 'https://t.me/marirrodrigaIA_bot'

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
    <div className="actualidad-detail">
      <button className="blog-back" onClick={onBack}>← Volver a Actualidad IA</button>

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
          Noticias de inteligencia artificial contadas en español, sin tecnicismos ni humo.
          Para curiosos, profesionales y negocios que quieren entender qué está pasando de verdad.{' '}
          <strong>Actualizadas cada día.</strong>
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
