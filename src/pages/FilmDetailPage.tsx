import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const apiKey = import.meta.env.VITE_TMDB_API_KEY;

export default function FilmDetailPage() {
  const { id } = useParams();
  const [film, setFilm] = useState<any>(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=fr-FR`)
      .then((res) => res.json())
      .then((data) => setFilm(data));
  }, [id]);

  if (!film) return <p className="loading">Chargement...</p>;

  return (
    <div
      className="detail-container fade-in"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${film.backdrop_path})`,
      }}
    >
      <div className="detail-glass">
        <img
          src={`https://image.tmdb.org/t/p/w500${film.poster_path}`}
          className="detail-poster"
        />

        <div>
          <h1 className="detail-title">{film.title}</h1>
          <p className="detail-overview">{film.overview}</p>

          <div className="detail-infos">
            <span>Date : {film.release_date}</span>
            <span>Note : ⭐ {film.vote_average}/10</span>
            <span>Durée : {film.runtime} min</span>
          </div>
        </div>
      </div>
    </div>
  );
}
