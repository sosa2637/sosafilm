// src/pages/FilmsPage.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GenreFilter from "../components/GenreFilter";

const apiKey = import.meta.env.VITE_TMDB_API_KEY;

export default function FilmsPage() {
  const navigate = useNavigate();
  const [films, setFilms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [currentFilter, setCurrentFilter] = useState("popular");

  useEffect(() => {
    loadFilms();
  }, [selectedGenre, currentFilter]);

  async function loadFilms() {
    setLoading(true);
    
    try {
      let url = `https://api.themoviedb.org/3/movie/${currentFilter}?api_key=${apiKey}&language=fr-FR`;
      
      // Si un genre est sélectionné, utiliser l'endpoint discover avec filtrage par genre
      if (selectedGenre) {
        url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=fr-FR&with_genres=${selectedGenre}`;
      }
      
      const res = await fetch(url);
      const data = await res.json();
      setFilms(data.results || []);
    } catch (error) {
      console.error("Erreur lors du chargement des films:", error);
      setFilms([]);
    } finally {
      setLoading(false);
    }
  }

  const handleGenreSelect = (genreId: number | null) => {
    setSelectedGenre(genreId);
  };

  const handleFilterChange = (filter: string) => {
    setCurrentFilter(filter);
    setSelectedGenre(null); // Réinitialiser le filtre genre quand on change de catégorie
  };

  // Filtres principaux
  const filters = [
    { id: "popular", label: "Populaires" },
    { id: "top_rated", label: "Mieux notés" },
    { id: "upcoming", label: "À venir" },
    { id: "now_playing", label: "Au cinéma" }
  ];

  return (
    <div className="films-page">
      {/* Barre de filtres principaux */}
      <div className="main-filters">
        <h1 className="page-title">Films</h1>
        <div className="filter-buttons">
          {filters.map((filter) => (
            <button
              key={filter.id}
              className={`filter-btn ${currentFilter === filter.id ? "active" : ""} ${selectedGenre ? "disabled" : ""}`}
              onClick={() => handleFilterChange(filter.id)}
              disabled={selectedGenre !== null}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Filtre par genre */}
      <GenreFilter 
        type="movie"
        onSelectGenre={handleGenreSelect}
        selectedGenreId={selectedGenre}
      />

      {/* Affichage des résultats */}
      {selectedGenre && (
        <div className="filter-info">
          <p>Filtré par genre: {films.length} film(s) trouvé(s)</p>
          <button 
            className="clear-all-btn"
            onClick={() => {
              setSelectedGenre(null);
              setCurrentFilter("popular");
            }}
          >
            ✕ Afficher tous les films
          </button>
        </div>
      )}

      {/* Grille de films */}
      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Chargement des films...</p>
        </div>
      ) : films.length === 0 ? (
        <div className="no-results">
          <h3>Aucun film trouvé</h3>
          <p>Essayez de modifier vos critères de recherche.</p>
        </div>
      ) : (
        <div className="movies-grid">
          {films.map((film) => (
            <div
              key={film.id}
              className="movie-card"
              onClick={() => navigate(`/film/${film.id}`)}
            >
              <div className="card-image">
                <img
                  src={
                    film.poster_path
                      ? `https://image.tmdb.org/t/p/w500${film.poster_path}`
                      : "https://via.placeholder.com/220x330?text=No+Image"
                  }
                  alt={film.title}
                  loading="lazy"
                />
                <div className="card-overlay">
                  <span className="rating">★ {film.vote_average?.toFixed(1)}</span>
                </div>
              </div>
              <div className="card-content">
                <h3 className="movie-title">{film.title}</h3>
                <p className="movie-date">{film.release_date?.split("-")[0]}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}