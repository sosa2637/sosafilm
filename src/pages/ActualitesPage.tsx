import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function ActorsPage() {
  const { id } = useParams(); // Récupère l’ID depuis l’URL
  const [actor, setActor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;

  useEffect(() => {
    if (!id) {
      setError("ID de l’acteur manquant");
      setLoading(false);
      return;
    }

    const fetchActor = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/person/${id}?api_key=${apiKey}&language=fr`
        );
        if (!res.ok) throw new Error("Erreur API");
        const data = await res.json();
        setActor(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchActor();
  }, [id, apiKey]);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error}</p>;
  if (!actor) return <p>Aucun acteur trouvé.</p>;

  return (
    <div className="page-bg" style={{ maxWidth: 1100, margin: "0 auto", padding: "2em 1em" }}>
      <h2 style={{ color: "#ffd600", textAlign: "center" }}>{actor.name}</h2>
      <div style={{ display: "flex", gap: "2em", alignItems: "flex-start" }}>
        <img
          src={
            actor.profile_path
              ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
              : "https://via.placeholder.com/170x270?text=NO+IMAGE"
          }
          alt={actor.name}
          style={{ borderRadius: "1em", width: "170px" }}
        />
        <div>
          <p><strong>Date de naissance :</strong> {actor.birthday}</p>
          <p><strong>Lieu de naissance :</strong> {actor.place_of_birth}</p>
          <p><strong>Biographie :</strong> {actor.biography}</p>
        </div>
      </div>
    </div>
  );
}
