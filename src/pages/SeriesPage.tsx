// src/pages/SeriesPage.tsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GenreFilter from "../components/GenreFilter";
import MediaCard from "../components/MediaCard";

const apiKey = import.meta.env.VITE_TMDB_API_KEY;

export default function SeriesPage() {
  const { id } = useParams(); // genre slug optionel
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
    if (genreId) setCurrentFilter("");
  };

  const handleFilterChange = (filter: string) => {
    setCurrentFilter(filter);
    setSelectedGenre(null); // Overrides genre selection immediately
  };

  // Filtres principaux pour séries
  const filters = [
    { id: "popular", label: "Populaires" },
    { id: "top_rated", label: "Mieux notées" },
    { id: "on_the_air", label: "En cours de diffusion" },
    { id: "airing_today", label: "Diffusées aujourd'hui" }
  ];

  return (
    <div className="series-page content-wrapper" style={{ paddingTop: '40px' }}>
      {/* Barre de filtres principaux */}
      <div className="main-filters" style={{ marginBottom: '32px' }}>
        <h1 className="section-title" style={{ marginTop: 0 }}>Séries TV</h1>
        <div className="filter-buttons" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          {filters.map((filter) => (
            <button
              key={filter.id}
              className={`menu-btn ${currentFilter === filter.id && !selectedGenre ? "active" : ""}`}
              style={(currentFilter === filter.id && !selectedGenre) ? { background: 'var(--accent)', color: '#000', fontWeight: 'bold', border: '1px solid var(--accent)' } : { border: '1px solid var(--border-glass)' }}
              onClick={() => handleFilterChange(filter.id)}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Filtre par genre */}
      <div style={{ marginBottom: '32px' }}>
        <GenreFilter 
          type="tv"
          onSelectGenre={handleGenreSelect}
          selectedGenreId={selectedGenre}
        />
      </div>

      {/* Affichage des résultats */}
      {selectedGenre && (
        <div className="filter-info" style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <p style={{ margin: 0, color: 'var(--text-muted)' }}>Filtré par genre: {series.length} série(s) trouvée(s)</p>
          <button 
            className="menu-btn"
            style={{ fontSize: '13px', padding: '6px 12px', border: '1px solid var(--border-glass)' }}
            onClick={() => {
              setSelectedGenre(null);
              setCurrentFilter("popular");
            }}
          >
            ✕ Afficher toutes les séries
          </button>
        </div>
      )}

      {/* État de chargement */}
      {loading ? (
        <div className="loading-container" style={{ textAlign: 'center', padding: '80px 0', color: 'var(--text-muted)' }}>
          <div className="loading-spinner"></div>
          <p>Chargement des séries...</p>
        </div>
      ) : series.length === 0 ? (
        <div className="no-results" style={{ textAlign: 'center', padding: '80px 0', color: 'var(--text-muted)' }}>
          <h3>Aucune série trouvée</h3>
          <p>Essayez de sélectionner un autre genre ou catégorie.</p>
        </div>
      ) : (
        <div className="movies-grid">
          {series.map((serie) => (
            <MediaCard
              key={serie.id}
              id={serie.id}
              title={serie.name}
              posterPath={serie.poster_path}
              voteAverage={serie.vote_average}
              releaseDate={serie.first_air_date}
              type="tv"
            />
          ))}
        </div>
      )}
    </div>
  );
}