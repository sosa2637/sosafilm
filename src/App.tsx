import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import FilmsPage from "./pages/FilmsPage";
import FilmDetailPage from "./pages/FilmDetailPage";

import SeriesPage from "./pages/SeriesPage";
import SerieDetailPage from "./pages/SerieDetailPage";
import SaisonsPage from "./pages/SaisonsPage";
import EpisodesPage from "./pages/EpisodesPage";
import EpisodeDetailPage from "./pages/EpisodeDetailPage";

import ActorsPage from "./pages/ActorsPage";
import ActorDetailPage from "./pages/ActorDetailPage";

import ActualitesPage from "./pages/ActualitesPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import SearchPage from "./pages/SearchPage";
import FaqPage from "./pages/FaqPage";
import TermsPage from "./pages/TermsPage";

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
        <Route path="/serie/:id/saison/:saison" element={<EpisodesPage />} />
        <Route path="/serie/:id/saison/:saison/episode/:episode" element={<EpisodeDetailPage />} />

        {/* ACTEURS */}
        <Route path="/actors" element={<ActorsPage />} />
        <Route path="/actor/:id" element={<ActorDetailPage />} />

        {/* ACTUALITÉS */}
        <Route path="/actualites" element={<ActualitesPage />} />

        {/* FIXED PAGES */}
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/privacy" element={<TermsPage />} />

        {/* LOGIN & REGISTER */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* SEARCH */}
        <Route path="/search" element={<SearchPage />} />

        {/* 404 → HOME */}
        <Route path="*" element={<HomePage />} />

      </Routes>

      <Footer />
    </div>
  );
}