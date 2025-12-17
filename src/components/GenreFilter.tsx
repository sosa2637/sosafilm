// src/components/GenreFilter.tsx
import React, { useState, useEffect } from "react";

interface Genre {
  id: number;
  name: string;
}

interface GenreFilterProps {
  type: "movie" | "tv";
  onSelectGenre: (genreId: number | null) => void;
  selectedGenreId?: number | null;
}

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export default function GenreFilter({ 
  type, 
  onSelectGenre,
  selectedGenreId = null
}: GenreFilterProps) {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedGenre, setSelectedGenre] = useState<number | null>(selectedGenreId);

  useEffect(() => {
    const fetchGenres = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/genre/${type}/list?api_key=${API_KEY}&language=fr-FR`
        );
        
        if (!response.ok) {
          throw new Error("Erreur lors du chargement des genres");
        }
        
        const data = await response.json();
        setGenres(data.genres || []);
      } catch (err) {
        console.error("Erreur API:", err);
        setError("Impossible de charger les genres");
      } finally {
        setLoading(false);
      }
    };

    fetchGenres();
  }, [type]);

  useEffect(() => {
    setSelectedGenre(selectedGenreId);
  }, [selectedGenreId]);

  const handleSelect = (genreId: number) => {
    const newSelection = selectedGenre === genreId ? null : genreId;
    setSelectedGenre(newSelection);
    onSelectGenre(newSelection);
  };

  const clearFilter = () => {
    setSelectedGenre(null);
    onSelectGenre(null);
  };

  if (loading) {
    return (
      <div className="genre-filter">
        <h3>Filtrer par genre</h3>
        <div className="loading-skeleton">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="skeleton-genre"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="genre-filter">
        <h3>Filtrer par genre</h3>
        <div className="error-message">
          {error}
          <button 
            className="retry-btn"
            onClick={() => window.location.reload()}
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  if (genres.length === 0 && !loading) {
    return (
      <div className="genre-filter">
        <h3>Filtrer par genre</h3>
        <div className="no-genres">Aucun genre disponible pour le moment.</div>
      </div>
    );
  }

  return (
    <div className="genre-filter">
      <div className="filter-header">
        <h3>Filtrer par genre</h3>
        {selectedGenre !== null && (
          <button 
            className="clear-filter"
            onClick={clearFilter}
            aria-label="Effacer le filtre"
            title="Effacer le filtre"
          >
            ✕ Effacer
          </button>
        )}
      </div>
      
      <div className="genres-grid">
        {genres.map((genre) => (
          <button
            key={genre.id}
            className={`genre-btn ${selectedGenre === genre.id ? "active" : ""}`}
            onClick={() => handleSelect(genre.id)}
            aria-pressed={selectedGenre === genre.id}
            title={`Filtrer par ${genre.name}`}
          >
            {genre.name}
            {selectedGenre === genre.id && (
              <span className="selected-indicator" aria-hidden="true">✓</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}