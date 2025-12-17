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
  { key: "cinema", label: "Toutes" },
  { key: "actors", label: "Acteurs" },
  { key: "oscars", label: "Oscars" },
  { key: "box office", label: "Box-Office" },
  { key: "marvel", label: "Marvel" },
  { key: "disney", label: "Disney" },
  { key: "horror movies", label: "Horreur" },
  { key: "animation", label: "Animation" },
  { key: "netflix", label: "Netflix" },
  { key: "africa", label: "afrique" },
  
];

export default function ActualitesPage() {
  const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY;

  const [articles, setArticles] = useState<Article[]>([]);
  const [category, setCategory] = useState("cinema");
  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 🔥 Fonction pour charger les news
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
    <div className="news-page">

      <h1 className="news-title">📰 Actualités Cinéma</h1>

      {/* ------- CATEGORIES ------- */}
      <div className="news-categories">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.key}
            className={`news-category-btn ${
              category === cat.key ? "active" : ""
            }`}
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
      {loading && <p>Chargement...</p>}
      {error && <p>{error}</p>}

      <div className="news-grid">
        {articles.map((a, idx) => (
          <div key={idx} className="news-card">
            <img
              src={
                a.urlToImage ||
                "https://via.placeholder.com/400x250?text=Pas+d'image"
              }
              alt={a.title}
              className="news-img"
            />
            <div className="news-content">
              <h2>{a.title}</h2>
              <p>{a.description}</p>
              <small>{a.source?.name}</small> <br />
              <small>{new Date(a.publishedAt ?? "").toLocaleDateString()}</small>

              <a
                href={a.url}
                target="_blank"
                rel="noopener noreferrer"
                className="news-link"
              >
                Lire la suite →
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* ------- PAGINATION ------- */}
      <div className="news-pagination">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
        >
          ← Précédent
        </button>

        <span>Page {page}</span>

        <button onClick={() => setPage((p) => p + 1)}>Suivant →</button>
      </div>
    </div>
  );
}