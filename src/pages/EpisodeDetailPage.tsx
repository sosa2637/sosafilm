// EpisodeDetailPage.tsx
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const apiKey = import.meta.env.VITE_TMDB_API_KEY;

export default function EpisodeDetailPage() {
  const { id, saison, episode } = useParams();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id || !saison || !episode) return;
    
    fetch(
      `https://api.themoviedb.org/3/tv/${id}/season/${saison}/episode/${episode}?api_key=${apiKey}&language=fr-FR`
    )
      .then((r) => r.json())
      .then((d) => {
        setData(d);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [id, saison, episode]);

  if (loading) return <p>Chargement...</p>;
  if (!data) return <p>Épisode non trouvé</p>;

  return (
    <div className="episode-detail">
      <h1>{data.name}</h1>
      <p>Saison {saison} - Épisode {episode}</p>
      {data.still_path && (
        <img 
          src={`https://image.tmdb.org/t/p/w500${data.still_path}`} 
          alt={data.name} 
        />
      )}
      <p>{data.overview}</p>
      <p>Note: {data.vote_average}/10</p>
    </div>
  );
}