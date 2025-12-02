// src/pages/ActorDetailPage.tsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const apiKey = import.meta.env.VITE_TMDB_API_KEY;

export default function ActorDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [actor, setActor] = useState<any>(null);
  const [credits, setCredits] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    Promise.all([
      fetch(`https://api.themoviedb.org/3/person/${id}?api_key=${apiKey}&language=fr-FR`).then(r => r.json()),
      fetch(`https://api.themoviedb.org/3/person/${id}/combined_credits?api_key=${apiKey}&language=fr-FR`).then(r => r.json()),
    ]).then(([actorData, creditsData]) => {
      setActor(actorData);
      setCredits((creditsData.cast || []).sort((a:any,b:any) => (b.popularity||0) - (a.popularity||0)));
    }).catch(() => {
      setActor(null);
      setCredits([]);
    }).finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Chargement...</p>;
  if (!actor) return <p>Acteur introuvable.</p>;

  return (
    <div className="actor-page page-pad fade-in">
      <div className="actor-header detail-glass">
        <img
          src={
            actor.profile_path
              ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
              : "https://via.placeholder.com/300x450?text=No+Image"
          }
          alt={actor.name}
          className="actor-photo detail-poster"
        />

        <div className="actor-info">
          <h1>{actor.name}</h1>
          <p><strong>Naissance :</strong> {actor.birthday || "Inconnue"}</p>
          {actor.place_of_birth && <p><strong>Lieu :</strong> {actor.place_of_birth}</p>}
          <p className="bio">{actor.biography || "Biographie indisponible."}</p>
        </div>
      </div>

      <h2 style={{marginTop: "28px"}}>Filmographie (sélection)</h2>
      <div className="movies-grid">
        {credits.slice(0, 36).map((it:any) => (
          <div
            key={`${it.media_type}-${it.id}`}
            className="movie-card"
            onClick={() => navigate(it.media_type === "movie" ? `/film/${it.id}` : `/serie/${it.id}`)}
          >
            <img
              src={it.poster_path ? `https://image.tmdb.org/t/p/w300${it.poster_path}` : "https://via.placeholder.com/180x270?text=No+Image"}
              alt={it.title || it.name}
              className="movie-img"
            />
            <p className="movie-title">{it.title || it.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
