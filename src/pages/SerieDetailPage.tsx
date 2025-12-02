import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

const apiKey = import.meta.env.VITE_TMDB_API_KEY;

export default function SerieDetailPage() {
  const { id } = useParams();
  const [serie, setSerie] = useState<any>(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}&language=fr-FR`)
      .then((r) => r.json())
      .then((d) => setSerie(d));
  }, [id]);

  if (!serie) return <p className="loading">Chargement...</p>;

  return (
    <div
      className="detail-container fade-in"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${serie.backdrop_path})`,
      }}
    >
      <div className="detail-glass">
        <img
          src={`https://image.tmdb.org/t/p/w500${serie.poster_path}`}
          className="detail-poster"
        />

        <div>
          <h1 className="detail-title">{serie.name}</h1>

          <p className="detail-overview">{serie.overview}</p>

          <div className="detail-infos">
            <span>Première : {serie.first_air_date}</span>
            <span>Saisons : {serie.number_of_seasons}</span>
            <span>Épisodes : {serie.number_of_episodes}</span>
            <span>Note : ⭐ {serie.vote_average}/10</span>
          </div>

          <Link to={`/serie/${id}/saisons`} className="detail-btn">
            Voir toutes les saisons →
          </Link>
        </div>
      </div>
    </div>
  );
}
