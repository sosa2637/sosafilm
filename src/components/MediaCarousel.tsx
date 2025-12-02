// src/components/MediaCarousel.tsx
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

type Item = {
  id: number;
  poster_path?: string | null;
  title?: string;
  name?: string;
};

export default function MediaCarousel({
  items,
  onClick,
  slidesPerView = 5,
}: {
  items: Item[];
  onClick?: (id: number) => void;
  slidesPerView?: number;
}) {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={18}
      slidesPerView={slidesPerView}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 3000, disableOnInteraction: true }}
      breakpoints={{
        320: { slidesPerView: 1 },
        480: { slidesPerView: 2 },
        768: { slidesPerView: 3 },
        1024: { slidesPerView: 4 },
        1280: { slidesPerView: slidesPerView },
      }}
      className="media-swiper"
    >
      {items.map((it) => (
        <SwiperSlide key={it.id}>
          <div
            className="movie-card"
            onClick={() => onClick?.(it.id)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === "Enter") onClick?.(it.id); }}
          >
            <img
              src={
                it.poster_path
                  ? `https://image.tmdb.org/t/p/w300${it.poster_path}`
                  : "https://via.placeholder.com/240x360?text=No+Image"
              }
              alt={it.title || it.name || "Affiche"}
              className="movie-img"
            />
            <p className="movie-title">{it.title || it.name}</p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
