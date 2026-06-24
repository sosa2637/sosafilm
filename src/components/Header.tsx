// src/components/Header.tsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "./Logo";

export default function Header() {
  const [searchTerm, setSearchTerm] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState<{name: string} | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem("sosa_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("sosa_token");
    localStorage.removeItem("sosa_user");
    setUser(null);
    navigate("/");
  };

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
        <Link to="/" aria-label="Accueil" style={{ display: 'block', textDecoration: 'none' }}>
          <Logo />
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
        <Link to="/about" className="menu-btn">À PROPOS</Link>
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
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
        </form>

        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontWeight: 600, fontSize: '14px', color: 'var(--text-main)' }}>{user.name}</span>
            <button onClick={handleLogout} className="menu-btn" style={{ padding: '6px 12px', border: '1px solid var(--border-glass)' }}>
              Déconnexion
            </button>
          </div>
        ) : (
          <Link to="/login" className="header-login">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            S'IDENTIFIER
          </Link>
        )}
      </div>

      {menuOpen && (
        <div className="mobile-menu" role="dialog" aria-label="Menu mobile">
          <Link to="/films" onClick={() => setMenuOpen(false)}>FILMS</Link>
          <Link to="/series" onClick={() => setMenuOpen(false)}>SÉRIES</Link>
          <Link to="/actors" onClick={() => setMenuOpen(false)}>ACTEURS</Link>
          <Link to="/actualites" onClick={() => setMenuOpen(false)}>ACTUALITÉS</Link>
          <Link to="/about" onClick={() => setMenuOpen(false)}>À PROPOS</Link>
          <Link to="/contact" onClick={() => setMenuOpen(false)}>CONTACT</Link>

          {user ? (
            <button onClick={() => { handleLogout(); setMenuOpen(false); }} className="menu-btn">Déconnexion</button>
          ) : (
            <Link to="/login" onClick={() => setMenuOpen(false)} className="menu-btn">S'identifier</Link>
          )}

          <button className="theme-toggle mobile" onClick={() => { toggleTheme(); setMenuOpen(false); }}>
            {theme === "dark" ? "🌙" : "☀️"}
          </button>
        </div>
      )}
    </header>
  );
}
