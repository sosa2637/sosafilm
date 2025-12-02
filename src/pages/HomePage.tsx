import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getTop10,
  getPopularMovies,
  getTrendingSeries,
  getHeroMovie
} from "../api/tmdb";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function HomePage() {
  const navigate = useNavigate();

  const [hero, setHero] = useState<any>(null);
  const [topFilms, setTopFilms] = useState<any[]>([]);
  const [popularMovies, setPopularMovies] = useState<any[]>([]);
  const [trendingSeries, setTrendingSeries] = useState<any[]>([]);

  // 📌 Charger toutes les données TMDB (y compris le HERO)
  useEffect(() => {
    async function loadAll() {
      const heroMovie = await getHeroMovie();
      const top = await getTop10();
      const popular = await getPopularMovies();
      const series = await getTrendingSeries();

      setHero(heroMovie);
      setTopFilms(top);
      setPopularMovies(popular);
      setTrendingSeries(series);
    }

    loadAll();
  }, []);

  const filmsToShow =
    Array.isArray(topFilms) && topFilms.length > 0
      ? topFilms
      : [
          { id: 1, title: "John Wick", poster_path: "/some_path.jpg" },
          { id: 2, title: "Empathie", poster_path: "/some_path.jpg" }
        ];

  return (
    <div className="home-container">
      
      {/* 🟥 HERO BANNER */}
      {hero && (
        <div
          className="hero-banner"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${hero.backdrop_path})`,
          }}
        >
          <div className="hero-overlay">
            <h1 className="hero-title">{hero.title}</h1>
            <p className="hero-overview">{hero.overview}</p>

            <button
              className="hero-btn"
              onClick={() => navigate(`/film/${hero.id}`)}
            >
              Voir le film →
            </button>
          </div>
        </div>
      )}

      {/* 🟦 TOP 10 */}
      <h2>TOP 10 DES FILMS CETTE SEMAINE</h2>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={5}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 2500 }}
        breakpoints={{
          320: { slidesPerView: 1 },
          480: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1200: { slidesPerView: 5 },
        }}
        className="swiper-top10"
      >
        {filmsToShow.map((film, index) => (
          <SwiperSlide key={film.id}>
            <div
              className="movie-card"
              onClick={() => navigate(`/film/${film.id}`)}
            >
              <div className="rank-badge">{index + 1}</div>

              <img
                src={
                  film.poster_path
                    ? `https://image.tmdb.org/t/p/w500${film.poster_path}`
                    : "https://via.placeholder.com/220x330"
                }
                alt={film.title}
              />

              <p>{film.title}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* 🟩 SECTION 1 - À LA UNE */}
      <h2 style={{ marginTop: "40px" }}>À LA UNE</h2>
      <div className="movies-grid">
        {popularMovies.slice(0, 12).map((film) => (
          <div
            key={film.id}
            className="movie-card"
            onClick={() => navigate(`/film/${film.id}`)}
          >
            <img
              src={
                film.poster_path
                  ? `https://image.tmdb.org/t/p/w500${film.poster_path}`
                  : "https://via.placeholder.com/220x330"
              }
              alt={film.title}
            />
            <p>{film.title}</p>
          </div>
        ))}
      </div>

      {/* 🟧 SECTION 2 - Films populaires */}
      <h2 style={{ marginTop: "40px" }}>FILMS POPULAIRES</h2>
      <div className="movies-grid">
        {popularMovies.slice(12, 24).map((film) => (
          <div
            key={film.id}
            className="movie-card"
            onClick={() => navigate(`/film/${film.id}`)}
          >
            <img
              src={
                film.poster_path
                  ? `https://image.tmdb.org/t/p/w500${film.poster_path}`
                  : "https://via.placeholder.com/220x330"
              }
              alt={film.title}
            />
            <p>{film.title}</p>
          </div>
        ))}
      </div>

      {/* 🟪 SECTION 3 - Séries tendances */}
      <h2 style={{ marginTop: "40px" }}>SÉRIES TENDANCES</h2>
      <div className="movies-grid">
        {trendingSeries.slice(0, 12).map((serie) => (
          <div
            key={serie.id}
            className="movie-card"
            onClick={() => navigate(`/film/${serie.id}`)}
          >
            <img
              src={
                serie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${serie.poster_path}`
                  : "https://via.placeholder.com/220x330"
              }
              alt={serie.name}
            />
            <p>{serie.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
