// src/pages/SeriesPage.tsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import GenreFilter from "../components/GenreFilter";

const apiKey = import.meta.env.VITE_TMDB_API_KEY;

export default function SeriesPage() {
  const { id } = useParams(); // genre slug optionel
  const navigate = useNavigate();
  const [series, setSeries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedGenre, setSelectedGenre] = useState<number | null>(
    id ? parseInt(id) : null
  );
  const [currentFilter, setCurrentFilter] = useState("popular");

  useEffect(() => {
    loadSeries();
  }, [selectedGenre, currentFilter]);

  async function loadSeries() {
    setLoading(true);
    
    try {
      let url;
      
      if (selectedGenre) {
        // Si un genre est sélectionné, utiliser discover
        url = `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&with_genres=${selectedGenre}&language=fr-FR`;
      } else {
        // Sinon, utiliser les filtres principaux
        url = `https://api.themoviedb.org/3/tv/${currentFilter}?api_key=${apiKey}&language=fr-FR`;
      }
      
      const res = await fetch(url);
      const data = await res.json();
      setSeries(data.results || []);
    } catch (error) {
      console.error("Erreur lors du chargement des séries:", error);
      setSeries([]);
    } finally {
      setLoading(false);
    }
  }

  const handleGenreSelect = (genreId: number | null) => {
    setSelectedGenre(genreId);
    // Si un genre est sélectionné, on désactive les filtres principaux
    if (genreId) {
      setCurrentFilter("");
    }
  };

  const handleFilterChange = (filter: string) => {
    setCurrentFilter(filter);
    setSelectedGenre(null); // Réinitialiser le filtre genre quand on change de catégorie
  };

  // Filtres principaux pour séries
  const filters = [
    { id: "popular", label: "Populaires" },
    { id: "top_rated", label: "Mieux notées" },
    { id: "on_the_air", label: "En cours" },
    { id: "airing_today", label: "Aujourd'hui" }
  ];

  return (
    <div className="series-page">
      {/* Barre de filtres principaux */}
      <div className="main-filters">
        <h1 className="page-title">Séries TV</h1>
        <div className="filter-buttons">
          {filters.map((filter) => (
            <button
              key={filter.id}
              className={`filter-btn ${currentFilter === filter.id ? "active" : ""} ${selectedGenre ? "disabled" : ""}`}
              onClick={() => handleFilterChange(filter.id)}
              disabled={selectedGenre !== null}
              title={selectedGenre ? "Désactivez le filtre par genre pour utiliser cette catégorie" : ""}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Filtre par genre */}
      <GenreFilter 
        type="tv"
        onSelectGenre={handleGenreSelect}
        selectedGenreId={selectedGenre}
      />

      {/* Affichage des informations de filtrage */}
      {selectedGenre && (
        <div className="filter-info">
          <div className="filter-info-content">
            <p>Filtré par genre: {series.length} série(s) trouvée(s)</p>
            <button 
              className="clear-all-btn"
              onClick={() => {
                setSelectedGenre(null);
                setCurrentFilter("popular");
              }}
            >
              ✕ Afficher toutes les séries
            </button>
          </div>
        </div>
      )}

      {/* État de chargement */}
      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Chargement des séries...</p>
        </div>
      ) : series.length === 0 ? (
        <div className="no-results">
          <h3>Aucune série trouvée</h3>
          <p>Essayez de sélectionner un autre genre ou catégorie.</p>
          {selectedGenre && (
            <button 
              className="reset-btn"
              onClick={() => {
                setSelectedGenre(null);
                setCurrentFilter("popular");
              }}
            >
              Réinitialiser les filtres
            </button>
          )}
        </div>
      ) : (
        <>
          {/* Compteur de résultats */}
          {!selectedGenre && (
            <div className="results-header">
              <h2>
                {currentFilter === "popular" && "Séries populaires"}
                {currentFilter === "top_rated" && "Séries les mieux notées"}
                {currentFilter === "on_the_air" && "Séries en cours de diffusion"}
                {currentFilter === "airing_today" && "Séries diffusées aujourd'hui"}
              </h2>
              <span className="total-count">{series.length} série(s)</span>
            </div>
          )}

          {/* Grille de séries */}
          <div className="movies-grid">
            {series.map((serie) => (
              <div
                key={serie.id}
                className="movie-card"
                onClick={() => navigate(`/serie/${serie.id}`)}
                role="button"
                tabIndex={0}
                onKeyPress={(e) => e.key === 'Enter' && navigate(`/serie/${serie.id}`)}
              >
                <div className="card-image">
                  <img
                    src={
                      serie.poster_path
                        ? `https://image.tmdb.org/t/p/w500${serie.poster_path}`
                        : "https://via.placeholder.com/220x330?text=No+Image"
                    }
                    alt={serie.name}
                    loading="lazy"
                    className="movie-img"
                  />
                  <div className="card-overlay">
                    <span className="rating">★ {serie.vote_average?.toFixed(1)}</span>
                    {serie.first_air_date && (
                      <span className="year">{serie.first_air_date.split("-")[0]}</span>
                    )}
                  </div>
                </div>
                <div className="card-content">
                  <h3 className="movie-title">{serie.name}</h3>
                  {serie.first_air_date && (
                    <p className="movie-date">Depuis {serie.first_air_date.split("-")[0]}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}