import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../components/Logo";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(data?.error || "Erreur lors de l'inscription.");
      }

      // Stocker les infos
      localStorage.setItem("sosa_token", data.token);
      localStorage.setItem("sosa_user", JSON.stringify(data.user));
      
      // Rediriger et rafraichir (ou forcer le Header à lire le localstorage)
      window.location.href = "/";
    } catch (err: any) {
      if (err.message === "Failed to fetch") {
        setError("Impossible de contacter le serveur. Assurez-vous que le backend est bien lancé (npm run dev:all).");
      } else {
        setError(err.message || "Une erreur est survenue.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page" style={{ 
      minHeight: '80vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      padding: '40px 20px',
      background: 'radial-gradient(circle at 50% 50%, rgba(20,22,30,1) 0%, var(--bg-dark) 100%)'
    }}>
      <div className="login-container" style={{
        background: 'var(--bg-panel)',
        backdropFilter: 'blur(20px)',
        border: '1px solid var(--border-glass)',
        padding: '48px 40px',
        borderRadius: '24px',
        width: '100%',
        maxWidth: '440px',
        boxShadow: 'var(--shadow-lg)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '32px' }}>
          <Logo />
        </div>
        
        <h1 style={{ textAlign: 'center', fontSize: '1.8rem', marginBottom: '8px' }}>Créer un compte</h1>
        <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '16px' }}>Rejoignez SOSA Ciné dès aujourd'hui</p>

        <div style={{ background: 'rgba(255, 152, 0, 0.1)', border: '1px solid #ff9800', color: '#ff9800', padding: '12px', borderRadius: '8px', marginBottom: '24px', fontSize: '13px', textAlign: 'center', lineHeight: 1.4 }}>
          <strong>⚠️ Version Démo (Hébergement Gratuit)</strong><br />
          Les comptes créés sont temporaires et seront effacés automatiquement lors de la mise en veille du serveur.
        </div>

        {error && (
          <div style={{ 
            background: 'rgba(229, 9, 20, 0.1)', 
            border: '1px solid var(--accent-danger)', 
            color: 'var(--accent-danger)', 
            padding: '16px', 
            borderRadius: '12px', 
            marginBottom: '24px', 
            fontSize: '14px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            lineHeight: 1.4
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label htmlFor="name" style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--text-muted)' }}>Nom complet</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Jean Dupont"
              required
              style={{ width: '100%', padding: '14px 16px', background: 'var(--bg-glass)', border: '1px solid var(--border-glass)', borderRadius: '12px', color: '#fff', fontSize: '16px', boxSizing: 'border-box' }}
            />
          </div>
          <div>
            <label htmlFor="email" style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--text-muted)' }}>Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="votre@email.com"
              required
              style={{ width: '100%', padding: '14px 16px', background: 'var(--bg-glass)', border: '1px solid var(--border-glass)', borderRadius: '12px', color: '#fff', fontSize: '16px', boxSizing: 'border-box' }}
            />
          </div>
          <div>
            <label htmlFor="password" style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--text-muted)' }}>Mot de passe</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              style={{ width: '100%', padding: '14px 16px', background: 'var(--bg-glass)', border: '1px solid var(--border-glass)', borderRadius: '12px', color: '#fff', fontSize: '16px', boxSizing: 'border-box' }}
            />
          </div>
          <button type="submit" disabled={loading} style={{ 
            marginTop: '12px', 
            background: 'var(--accent)', 
            color: '#000', 
            border: 'none', 
            padding: '16px', 
            borderRadius: '12px', 
            fontWeight: 700, 
            fontSize: '16px',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.7 : 1,
            transition: '0.2s',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '8px'
          }}>
            {loading && <div className="loading-spinner" style={{ width: '16px', height: '16px', borderWidth: '2px', borderTopColor: '#000' }}></div>}
            {loading ? "Création..." : "S'inscrire"}
          </button>
        </form>
        
        <p style={{ textAlign: 'center', marginTop: '32px', color: 'var(--text-muted)', fontSize: '14px' }}>
          Vous avez déjà un compte ? <Link to="/login" style={{ color: 'var(--accent)', fontWeight: 600, textDecoration: 'none' }}>Se connecter</Link>
        </p>
      </div>
    </div>
  );
}
