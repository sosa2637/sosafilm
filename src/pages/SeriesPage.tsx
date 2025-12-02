// src/pages/SeriesPage.tsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const apiKey = import.meta.env.VITE_TMDB_API_KEY;

export default function SeriesPage() {
  const { id } = useParams(); // genre slug optionel
  const navigate = useNavigate();
  const [series, setSeries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const url = id
      ? `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&with_genres=${id}&language=fr-FR`
      : `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&language=fr-FR`;

    setLoading(true);
    fetch(url)
      .then(r => r.json())
      .then(d => setSeries(d.results || []))
      .catch(() => setSeries([]))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Chargement...</p>;
  if (!series.length) return <p>Pas de séries trouvées.</p>;

  return (
    <div className="page-pad">
      <h2>Séries</h2>
      <div className="movies-grid">
        {series.map((s:any) => (
          <div key={s.id} className="movie-card" onClick={()=>navigate(`/serie/${s.id}`)}>
            <img className="movie-img" src={s.poster_path ? `https://image.tmdb.org/t/p/w300${s.poster_path}` : "https://via.placeholder.com/180x270?text=No+Image"} />
            <div className="movie-title">{s.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
