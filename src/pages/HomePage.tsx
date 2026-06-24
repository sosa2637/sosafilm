import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MediaCard from "../components/MediaCard";

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
      : [];

  return (
    <div className="home-container">
      {/* 🟥 HERO BANNER */}
      {hero && (
        <div className="hero-wrapper">
          <div
            className="hero-background"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/original${hero.backdrop_path})`,
            }}
          />
          <div className="hero-gradient" />
          
          <div className="hero-content">
            <h1 className="hero-title">{hero.title}</h1>
            <p className="hero-overview">{hero.overview}</p>

            <button
              className="hero-btn"
              onClick={() => navigate(`/film/${hero.id}`)}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
              Regarder le film
            </button>
          </div>
        </div>
      )}

      <div className="content-wrapper">
        {/* 🟦 TOP 10 */}
        <h2 className="section-title">Top 10 des films cette semaine</h2>
        
        {filmsToShow.length > 0 && (
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={24}
            slidesPerView={5}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            breakpoints={{
              320: { slidesPerView: 1 },
              480: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
              1280: { slidesPerView: 5 },
            }}
            className="swiper-top10"
          >
            {filmsToShow.map((film) => (
              <SwiperSlide key={`top10-${film.id}`}>
                <MediaCard
                  id={film.id}
                  title={film.title}
                  posterPath={film.poster_path}
                  voteAverage={film.vote_average}
                  releaseDate={film.release_date}
                  type="movie"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        {/* 🟩 SECTION 1 - À LA UNE */}
        <h2 className="section-title">À la une</h2>
        <div className="movies-grid">
          {popularMovies.slice(0, 10).map((film) => (
            <MediaCard
              key={`popular1-${film.id}`}
              id={film.id}
              title={film.title}
              posterPath={film.poster_path}
              voteAverage={film.vote_average}
              releaseDate={film.release_date}
              type="movie"
            />
          ))}
        </div>

        {/* 🟧 SECTION 2 - Films populaires */}
        <h2 className="section-title">Films populaires</h2>
        <div className="movies-grid">
          {popularMovies.slice(10, 20).map((film) => (
            <MediaCard
              key={`popular2-${film.id}`}
              id={film.id}
              title={film.title}
              posterPath={film.poster_path}
              voteAverage={film.vote_average}
              releaseDate={film.release_date}
              type="movie"
            />
          ))}
        </div>

        {/* 🟪 SECTION 3 - Séries tendances */}
        <h2 className="section-title">Séries tendances</h2>
        <div className="movies-grid">
          {trendingSeries.slice(0, 10).map((serie) => (
            <MediaCard
              key={`trending-${serie.id}`}
              id={serie.id}
              title={serie.name}
              posterPath={serie.poster_path}
              voteAverage={serie.vote_average}
              releaseDate={serie.first_air_date}
              type="tv"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
