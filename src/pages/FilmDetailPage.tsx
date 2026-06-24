import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const apiKey = import.meta.env.VITE_TMDB_API_KEY;

export default function FilmDetailPage() {
  const { id } = useParams();
  const [film, setFilm] = useState<any>(null);
  const [showTrailer, setShowTrailer] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    // append_to_response=videos permet de récupérer les trailers en une seule requête
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=fr-FR&append_to_response=videos`)
      .then((res) => res.json())
      .then((data) => setFilm(data));
  }, [id]);

  if (!film) return <div style={{ textAlign: 'center', padding: '100px', color: 'var(--text-muted)' }}><div className="loading-spinner"></div><p>Chargement...</p></div>;

  // Chercher un trailer officiel sur YouTube
  const videos = film.videos?.results || [];
  const trailer = videos.find((v: any) => v.site === "YouTube" && v.type === "Trailer");

  return (
    <div className="detail-container">
      {/* Background Banner */}
      <div className="hero-wrapper" style={{ height: '60vh', minHeight: '500px' }}>
        <div
          className="hero-background"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${film.backdrop_path})`,
          }}
        />
        <div className="hero-gradient" style={{ background: 'linear-gradient(to top, var(--bg-dark) 0%, rgba(10,11,16,0.8) 40%, rgba(10,11,16,0.2) 100%)' }} />
      </div>

      {/* Details Glass Overlay */}
      <div className="content-wrapper" style={{ position: 'relative', zIndex: 10, marginTop: '-180px', paddingBottom: '80px' }}>
        <div style={{
          display: 'flex',
          gap: '40px',
          background: 'var(--bg-panel)',
          backdropFilter: 'blur(24px)',
          border: '1px solid var(--border-glass)',
          borderRadius: '24px',
          padding: '40px',
          boxShadow: 'var(--shadow-lg)',
          flexWrap: 'wrap'
        }}>
          {/* Poster */}
          <div style={{ flexShrink: 0, margin: '0 auto' }}>
            {film.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w500${film.poster_path}`}
                alt={film.title}
                style={{
                  width: '300px',
                  borderRadius: '16px',
                  boxShadow: '0 12px 32px rgba(0,0,0,0.5)',
                  border: '1px solid rgba(255,255,255,0.1)'
                }}
              />
            ) : (
              <div style={{ width: '300px', height: '450px', background: '#222', borderRadius: '16px' }} />
            )}
          </div>

          {/* Info */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', flex: 1, minWidth: '300px' }}>
            <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '16px', lineHeight: 1.1 }}>{film.title}</h1>
            
            <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', color: 'var(--text-muted)', fontSize: '1.05rem', fontWeight: 500, flexWrap: 'wrap' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="var(--accent)"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                <span style={{ color: '#fff', fontWeight: 700 }}>{film.vote_average?.toFixed(1)}</span>/10
              </span>
              <span>•</span>
              <span>{film.release_date?.split('-')[0]}</span>
              <span>•</span>
              <span>{film.runtime} min</span>
            </div>

            <p style={{ fontSize: '1.15rem', lineHeight: 1.6, color: 'var(--text-muted)', marginBottom: '32px', maxWidth: '800px' }}>
              {film.overview || "Aucun synopsis disponible."}
            </p>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              {trailer ? (
                <button className="hero-btn" onClick={() => setShowTrailer(true)}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                  Voir la bande-annonce
                </button>
              ) : (
                <button className="hero-btn" disabled style={{ background: 'var(--bg-glass)', color: 'var(--text-muted)', cursor: 'not-allowed' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line></svg>
                  Bande-annonce non disponible
                </button>
              )}
              
              <button className="menu-btn" style={{ border: '1px solid var(--border-glass)', display: 'flex', alignItems: 'center', gap: '8px', padding: '14px 24px' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14m-7-7h14"/></svg>
                Ma Liste
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL TRAILER */}
      {showTrailer && trailer && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.9)', zIndex: 9999,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backdropFilter: 'blur(10px)'
        }}>
          <div style={{ position: 'relative', width: '80%', maxWidth: '1000px', aspectRatio: '16/9' }}>
            <button 
              onClick={() => setShowTrailer(false)}
              style={{ position: 'absolute', top: '-40px', right: 0, background: 'none', border: 'none', color: '#fff', fontSize: '24px', cursor: 'pointer' }}
            >
              ✕ Fermer
            </button>
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
              title="Trailer"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ borderRadius: '16px', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
}
