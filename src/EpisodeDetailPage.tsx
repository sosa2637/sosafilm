// src/pages/EpisodeDetailPage.tsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
const apiKey = import.meta.env.VITE_TMDB_API_KEY;

export default function EpisodeDetailPage() {
  const { id, saison, episode } = useParams<{ id: string; saison: string; episode: string }>();
  const navigate = useNavigate();
  const [ep, setEp] = useState<any>(null);
  useEffect(() => {
    if (!id || !saison || !episode) return;
    fetch(`https://api.themoviedb.org/3/tv/${id}/season/${saison}/episode/${episode}?api_key=${apiKey}&language=fr-FR`)
      .then(r => r.json())
      .then(d => setEp(d));
  }, [id, saison, episode]);

  if (!ep) return <p>Chargement...</p>;

  return (
    <div className="detail-container fade-in" style={{background: "var(--card-bg)"}}>
      <div className="detail-glass">
        <img src={ep.still_path ? `https://image.tmdb.org/t/p/w500${ep.still_path}` : "https://via.placeholder.com/420x240?text=No+Image"} className="detail-poster" alt={ep.name}/>
        <div>
          <h1 className="detail-title">{ep.name}</h1>
          <p>{ep.overview || "Pas de description."}</p>
          <p>Durée : {ep.runtime ?? "?"} min</p>
          <button onClick={()=>navigate(-1)} className="detail-btn">← Retour</button>
        </div>
      </div>
    </div>
  );
}
