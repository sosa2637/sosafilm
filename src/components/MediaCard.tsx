import React from "react";
import { useNavigate } from "react-router-dom";

interface MediaCardProps {
  id: number;
  title: string;
  posterPath: string | null;
  voteAverage?: number;
  releaseDate?: string;
  type?: "movie" | "tv";
}

export default function MediaCard({
  id,
  title,
  posterPath,
  voteAverage,
  releaseDate,
  type = "movie",
}: MediaCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    // Navigate to film or serie detail page based on type
    if (type === "movie") {
      navigate(`/film/${id}`);
    } else {
      navigate(`/serie/${id}`);
    }
  };

  const year = releaseDate ? releaseDate.split("-")[0] : "";

  return (
    <div className="media-card" onClick={handleClick}>
      {voteAverage !== undefined && (
        <div className="media-badge">
          ★ {voteAverage.toFixed(1)}
        </div>
      )}
      
      <div className="media-image-container">
        {posterPath ? (
          <img
            src={`https://image.tmdb.org/t/p/w500${posterPath}`}
            alt={title}
            loading="lazy"
          />
        ) : (
          <div className="media-placeholder">
            {title.charAt(0).toUpperCase()}
          </div>
        )}
      </div>

      <div className="media-overlay">
        <h3 className="media-title">{title}</h3>
        {(voteAverage || year) && (
          <div className="media-meta">
            {year && <span className="media-date">{year}</span>}
          </div>
        )}
      </div>
    </div>
  );
}
