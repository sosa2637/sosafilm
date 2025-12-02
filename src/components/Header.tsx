// src/components/Header.tsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../image/logo.png";

export default function Header() {
  const [searchTerm, setSearchTerm] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Theme management
  const [theme, setTheme] = useState<string>(
    (localStorage.getItem("theme") as string) || "dark"
  );
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);
  function toggleTheme() {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  }

  function handleSearch(e?: React.FormEvent) {
    e?.preventDefault();
    if (!searchTerm.trim()) return;
    navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
    setSearchTerm("");
    setMenuOpen(false);
  }

  return (
    <header className="header-bar" role="banner">
      <div className="header-bar-left">
        <Link to="/" aria-label="Accueil">
          <img src={logo} alt="La Bobine" className="header-logo" />
        </Link>
      </div>

      <button
        aria-label="Ouvrir le menu"
        className={`burger ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen((s) => !s)}
      >
        ☰
      </button>

      <nav className="header-bar-center" role="navigation" aria-label="Main">
        <Link to="/films" className="menu-btn">FILMS</Link>
        <Link to="/series" className="menu-btn">SÉRIES</Link>
        <Link to="/actors" className="menu-btn">ACTEURS</Link>
        <Link to="/actualites" className="menu-btn">ACTUALITÉS</Link>
        <Link to="/about" className="menu-btn">A PROPOS</Link>
        <Link to="/contact" className="menu-btn">CONTACT</Link>

        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label="Basculer le thème"
          title="Basculer thème"
        >
          {theme === "dark" ? "🌙" : "☀️"}
        </button>
      </nav>

      <div className="header-bar-right">
        <form className="header-search-form" onSubmit={handleSearch} role="search">
          <input
            className="search-bar"
            type="search"
            placeholder="Rechercher..."
            aria-label="Recherche"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="search-submit" type="submit" aria-label="Lancer la recherche">
            🔎
          </button>
        </form>

        <Link to="/login" className="header-login">
          <span role="img" aria-label="Utilisateur">👤</span> S'IDENTIFIER
        </Link>
      </div>

      {menuOpen && (
        <div className="mobile-menu" role="dialog" aria-label="Menu mobile">
          <Link to="/films" onClick={() => setMenuOpen(false)}>FILMS</Link>
          <Link to="/series" onClick={() => setMenuOpen(false)}>SÉRIES</Link>
          <Link to="/actors" onClick={() => setMenuOpen(false)}>ACTEURS</Link>
          <Link to="/actualites" onClick={() => setMenuOpen(false)}>ACTUALITÉS</Link>
          <Link to="/about" onClick={() => setMenuOpen(false)}>A PROPOS</Link>
          <Link to="/contact" onClick={() => setMenuOpen(false)}>CONTACT</Link>

          <button className="theme-toggle mobile" onClick={() => { toggleTheme(); setMenuOpen(false); }}>
            {theme === "dark" ? "🌙" : "☀️"}
          </button>
        </div>
      )}
    </header>
  );
}
