const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE = "https://api.themoviedb.org/3";

export async function getTop10() {
  const res = await fetch(`${BASE}/trending/movie/week?api_key=${API_KEY}&language=fr-FR`);
  const data = await res.json();
  return (data.results || []).slice(0, 10);
}

export async function searchMulti(query: string) {
  const res = await fetch(
    `${BASE}/search/multi?api_key=${API_KEY}&language=fr&query=${encodeURIComponent(query)}`
  );
  const data = await res.json();
  return data.results || [];
}

export async function getMovieDetails(id: string) {
  const res = await fetch(
    `${BASE}/movie/${id}?api_key=${API_KEY}&language=fr-FR&append_to_response=videos,credits`
  );
  return res.json();
}
export async function getPopularMovies() {
  const res = await fetch(`${BASE}/movie/popular?api_key=${API_KEY}&language=fr-FR`);
  const data = await res.json();
  return data.results || [];
}

export async function getTrendingSeries() {
  const res = await fetch(`${BASE}/trending/tv/week?api_key=${API_KEY}&language=fr-FR`);
  const data = await res.json();
  return data.results || [];
}
export async function getHeroMovie() {
  const res = await fetch(`${BASE}/movie/popular?api_key=${API_KEY}&language=fr-FR`);
  const data = await res.json();
  return data.results?.[0]; // Le film le plus populaire
}

