import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const apiKey = import.meta.env.VITE_TMDB_API_KEY;

export default function ActorsPage() {
  const navigate = useNavigate();
  const [actors, setActors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadActors() {
      const res = await fetch(
        `https://api.themoviedb.org/3/person/popular?api_key=${apiKey}&language=fr-FR`
      );
      const data = await res.json();
      setActors(data.results || []);
      setLoading(false);
    }
    loadActors();
  }, []);

  if (loading) return <p>Chargement...</p>;

  return (
    <div className="actors-page">
      <h2>Acteurs Populaires</h2>

      <div className="movies-grid">
        {actors.map((actor) => (
          <div
            key={actor.id}
            className="movie-card"
            onClick={() => navigate(`/actor/${actor.id}`)}  // 👈 ID ENVOYÉ ICI
          >
            <img
              src={
                actor.profile_path
                  ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
                  : "https://via.placeholder.com/200x300?text=No+Image"
              }
            />
            <p>{actor.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
