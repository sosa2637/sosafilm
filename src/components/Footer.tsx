import React from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer style={{ 
      background: 'var(--bg-panel)', 
      borderTop: '1px solid var(--border-glass)', 
      marginTop: '60px',
      paddingTop: '60px',
      paddingBottom: '30px'
    }}>
      <div className="content-wrapper">
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '40px',
          marginBottom: '60px'
        }}>
          
          {/* Colonne 1: Branding */}
          <div>
            <div style={{ marginBottom: '20px' }}>
              <Logo />
            </div>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '20px', fontSize: '15px' }}>
              La plateforme de référence pour découvrir, noter et suivre vos films et séries préférés en haute qualité.
            </p>
            <div style={{ display: 'flex', gap: '16px' }}>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" style={{ color: 'var(--text-muted)', transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = 'var(--accent)'} onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-muted)'}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" style={{ color: 'var(--text-muted)', transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = 'var(--accent)'} onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-muted)'}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" style={{ color: 'var(--text-muted)', transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = 'var(--accent)'} onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-muted)'}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
            </div>
          </div>

          {/* Colonne 2: Navigation rapide */}
          <div>
            <h4 style={{ color: 'var(--text-main)', fontSize: '18px', marginBottom: '20px', fontWeight: 600 }}>Navigation</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li><Link to="/films" style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: '0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = '#fff'} onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-muted)'}>Films</Link></li>
              <li><Link to="/series" style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: '0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = '#fff'} onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-muted)'}>Séries</Link></li>
              <li><Link to="/actualites" style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: '0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = '#fff'} onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-muted)'}>Actualités</Link></li>
              <li><Link to="/actors" style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: '0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = '#fff'} onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-muted)'}>Acteurs</Link></li>
            </ul>
          </div>

          {/* Colonne 3: Informations */}
          <div>
            <h4 style={{ color: 'var(--text-main)', fontSize: '18px', marginBottom: '20px', fontWeight: 600 }}>Informations</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li><Link to="/about" style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: '0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = '#fff'} onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-muted)'}>À propos de nous</Link></li>
              <li><Link to="/contact" style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: '0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = '#fff'} onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-muted)'}>Contact</Link></li>
              <li><Link to="/faq" style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: '0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = '#fff'} onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-muted)'}>Centre d'aide</Link></li>
              <li><Link to="/terms" style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: '0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = '#fff'} onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-muted)'}>Conditions d'utilisation</Link></li>
            </ul>
          </div>

          {/* Colonne 4: Contact */}
          <div>
            <h4 style={{ color: 'var(--text-main)', fontSize: '18px', marginBottom: '20px', fontWeight: 600 }}>Contact</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', color: 'var(--text-muted)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                <a href="mailto:sosaewa26@gmail.com" style={{ color: 'inherit', textDecoration: 'none' }}>sosaewa26@gmail.com</a>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                <span>+1 (418) 323-2342</span>
              </div>
            </div>
            
            <div style={{ marginTop: '24px' }}>
              <Link to="/register" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'var(--accent)',
                color: '#000',
                padding: '10px 20px',
                borderRadius: '8px',
                fontWeight: 600,
                textDecoration: 'none'
              }}>
                Créer un compte
              </Link>
            </div>
          </div>

        </div>

        {/* Footer Bottom */}
        <div style={{ 
          borderTop: '1px solid var(--border-glass)', 
          paddingTop: '30px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px',
          color: 'var(--text-dim)',
          fontSize: '14px'
        }}>
          <div>© {new Date().getFullYear()} SOSA Ciné. Tous droits réservés.</div>
          <div style={{ display: 'flex', gap: '20px' }}>
            <Link to="/privacy" style={{ color: 'inherit', textDecoration: 'none' }}>Politique de confidentialité</Link>
            <Link to="/terms" style={{ color: 'inherit', textDecoration: 'none' }}>Mentions légales</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
