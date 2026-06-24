// src/pages/FilmsPage.tsx
import React, { useEffect, useState } from "react";
import GenreFilter from "../components/GenreFilter";
import MediaCard from "../components/MediaCard";

const apiKey = import.meta.env.VITE_TMDB_API_KEY;

export default function FilmsPage() {
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
    <div className="films-page content-wrapper" style={{ paddingTop: '40px' }}>
      {/* Barre de filtres principaux */}
      <div className="main-filters" style={{ marginBottom: '32px' }}>
        <h1 className="section-title" style={{ marginTop: 0 }}>Films</h1>
        <div className="filter-buttons" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          {filters.map((filter) => (
            <button
              key={filter.id}
              className={`menu-btn ${currentFilter === filter.id ? "active" : ""} ${selectedGenre ? "disabled" : ""}`}
              style={currentFilter === filter.id ? { background: 'var(--accent)', color: '#000' } : { border: '1px solid var(--border-glass)' }}
              onClick={() => handleFilterChange(filter.id)}
              disabled={selectedGenre !== null}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Filtre par genre */}
      <div style={{ marginBottom: '32px' }}>
        <GenreFilter 
          type="movie"
          onSelectGenre={handleGenreSelect}
          selectedGenreId={selectedGenre}
        />
      </div>

      {/* Affichage des résultats */}
      {selectedGenre && (
        <div className="filter-info" style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <p style={{ margin: 0, color: 'var(--text-muted)' }}>Filtré par genre: {films.length} film(s) trouvé(s)</p>
          <button 
            className="menu-btn"
            style={{ fontSize: '13px', padding: '6px 12px', border: '1px solid var(--border-glass)' }}
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
        <div className="loading-container" style={{ textAlign: 'center', padding: '80px 0', color: 'var(--text-muted)' }}>
          <div className="loading-spinner"></div>
          <p>Chargement des films...</p>
        </div>
      ) : films.length === 0 ? (
        <div className="no-results" style={{ textAlign: 'center', padding: '80px 0', color: 'var(--text-muted)' }}>
          <h3>Aucun film trouvé</h3>
          <p>Essayez de modifier vos critères de recherche.</p>
        </div>
      ) : (
        <div className="movies-grid">
          {films.map((film) => (
            <MediaCard
              key={film.id}
              id={film.id}
              title={film.title}
              posterPath={film.poster_path}
              voteAverage={film.vote_average}
              releaseDate={film.release_date}
              type="movie"
            />
          ))}
        </div>
      )}
    </div>
  );
}