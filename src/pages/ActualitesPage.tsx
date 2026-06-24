// src/pages/ActualitesPage.tsx
import React, { useEffect, useState } from "react";

type Article = {
  title: string;
  description: string;
  url: string;
  urlToImage?: string;
  publishedAt?: string;
  source?: { name: string };
};

const CATEGORIES = [
  { key: "cinema", label: "À la une" },
  { key: "actors", label: "Acteurs" },
  { key: "oscars", label: "Oscars" },
  { key: "box office", label: "Box-Office" },
  { key: "marvel", label: "Marvel" },
  { key: "netflix", label: "Netflix" },
];

export default function ActualitesPage() {
  const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY;

  const [articles, setArticles] = useState<Article[]>([]);
  const [category, setCategory] = useState("cinema");
  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNews = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `https://newsapi.org/v2/everything?q=${encodeURIComponent(
          category
        )}&language=fr&pageSize=9&page=${page}&apiKey=${NEWS_API_KEY}`
      );

      if (!res.ok) throw new Error("Erreur API NewsAPI");

      const data = await res.json();
      setArticles(data.articles);
    } catch (e) {
      setError("Impossible de charger les actualités.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchNews();
  }, [category, page]);

  return (
    <div className="news-page content-wrapper" style={{ paddingTop: '40px', paddingBottom: '80px' }}>

      <h1 className="section-title" style={{ marginTop: 0 }}>Actualités Cinéma</h1>

      {/* ------- CATEGORIES ------- */}
      <div className="news-categories" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '40px' }}>
        {CATEGORIES.map((cat) => (
          <button
            key={cat.key}
            className="menu-btn"
            style={category === cat.key ? { background: 'var(--accent)', color: '#000', padding: '10px 20px', borderRadius: '30px' } : { border: '1px solid var(--border-glass)', padding: '10px 20px', borderRadius: '30px' }}
            onClick={() => {
              setCategory(cat.key);
              setPage(1); // reset pagination
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* ------- CONTENU ------- */}
      {loading && (
        <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--text-muted)' }}>
          <div className="loading-spinner"></div>
          <p>Chargement des articles...</p>
        </div>
      )}
      {error && (
        <div style={{ textAlign: 'center', padding: '40px', background: 'rgba(229, 9, 20, 0.1)', border: '1px solid var(--accent-danger)', borderRadius: '12px', color: 'var(--accent-danger)' }}>
          {error}
        </div>
      )}

      {!loading && !error && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
          {articles.map((a, idx) => (
            <div key={idx} style={{ 
              background: 'var(--bg-panel)', 
              borderRadius: '20px', 
              overflow: 'hidden', 
              border: '1px solid var(--border-glass)',
              display: 'flex',
              flexDirection: 'column',
              transition: 'transform 0.3s, box-shadow 0.3s'
            }}
            onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = 'var(--shadow-lg)'; }}
            onMouseOut={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              <div style={{ height: '200px', overflow: 'hidden' }}>
                <img
                  src={
                    a.urlToImage ||
                    "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  }
                  alt={a.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', fontSize: '13px', color: 'var(--text-dim)' }}>
                  <span>{a.source?.name || 'Source Inconnue'}</span>
                  <span>{new Date(a.publishedAt ?? "").toLocaleDateString('fr-FR')}</span>
                </div>
                <h2 style={{ fontSize: '1.25rem', marginBottom: '12px', lineHeight: 1.4, flex: 1 }}>{a.title}</h2>
                <a
                  href={a.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--accent)', textDecoration: 'none', fontWeight: 600, marginTop: 'auto' }}
                >
                  Lire la suite <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ------- PAGINATION ------- */}
      {!loading && !error && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', marginTop: '60px' }}>
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            style={{ padding: '12px 24px', background: page === 1 ? 'var(--bg-glass)' : 'var(--bg-panel)', color: page === 1 ? 'var(--text-dim)' : '#fff', border: '1px solid var(--border-glass)', borderRadius: '12px', cursor: page === 1 ? 'not-allowed' : 'pointer' }}
          >
            ← Précédent
          </button>

          <span style={{ fontWeight: 600 }}>Page {page}</span>

          <button 
            onClick={() => setPage((p) => p + 1)}
            style={{ padding: '12px 24px', background: 'var(--bg-panel)', color: '#fff', border: '1px solid var(--border-glass)', borderRadius: '12px', cursor: 'pointer' }}
          >
            Suivant →
          </button>
        </div>
      )}
    </div>
  );
}