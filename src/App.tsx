import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import FilmsPage from "./pages/FilmsPage";
import FilmDetailPage from "./pages/FilmDetailPage";

import SeriesPage from "./pages/SeriesPage";
import SerieDetailPage from "./pages/SerieDetailPage";
import SaisonsPage from "./pages/SaisonsPage";

import ActorsPage from "./pages/ActorsPage";
import ActorDetailPage from "./pages/ActorDetailPage";

import ActualitesPage from "./pages/ActualitesPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import LoginPage from "./pages/LoginPage";
import SearchPage from "./pages/SearchPage";

import Header from "./components/Header";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="page-bg">
      <Header />

      <Routes>

        {/* HOME */}
        <Route path="/" element={<HomePage />} />

        {/* FILMS */}
        <Route path="/films" element={<FilmsPage />} />
        <Route path="/film/:id" element={<FilmDetailPage />} />

        {/* SERIES */}
        <Route path="/series" element={<SeriesPage />} />
        <Route path="/series/:id" element={<SeriesPage />} />
        <Route path="/series/genre/:id" element={<SeriesPage />} />

        {/* DETAILS SERIES */}
        <Route path="/serie/:id" element={<SerieDetailPage />} />
        <Route path="/serie/:id/saisons" element={<SaisonsPage />} />

        {/* ACTEURS */}
        <Route path="/actors" element={<ActorsPage />} />
        <Route path="/actor/:id" element={<ActorDetailPage />} />

        {/* ACTUALITÉS */}
        <Route path="/actualites" element={<ActualitesPage />} />

        {/* FIXED PAGES */}
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />

        {/* LOGIN */}
        <Route path="/login" element={<LoginPage />} />

        {/* SEARCH */}
        <Route path="/search" element={<SearchPage />} />

        {/* 404 → HOME */}
        <Route path="*" element={<HomePage />} />

      </Routes>

      <Footer />
    </div>
  );
}
