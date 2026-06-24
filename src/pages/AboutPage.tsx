export default function AboutPage() {
  return (
    <div className="content-wrapper" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h1 style={{ fontSize: '3.5rem', fontWeight: 800, marginBottom: '24px' }}>À propos de SOSA Ciné</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.25rem', lineHeight: 1.6 }}>
            Découvrez notre vision, notre équipe et les technologies qui propulsent votre expérience cinématographique.
          </p>
        </div>

        <div style={{ background: 'var(--bg-panel)', padding: '40px', borderRadius: '24px', border: '1px solid var(--border-glass)', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '1.75rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ color: 'var(--accent)' }}>✦</span> Le Projet
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: 1.7, marginBottom: '0' }}>
            SOSA Ciné a été imaginé pour proposer une base de données interactive permettant d'explorer les films et les séries les plus populaires au monde. 
            Notre objectif est de fournir une interface premium, ultra-rapide et intuitive, digne des plus grandes plateformes de VOD, tout en restant accessible à tous.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '40px' }}>
          <div style={{ background: 'var(--bg-panel)', padding: '32px', borderRadius: '24px', border: '1px solid var(--border-glass)' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '24px' }}>L'équipe</h2>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent), #ff9800)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', fontWeight: 700, fontSize: '1.2rem' }}>C</div>
                <div>
                  <h4 style={{ margin: 0, fontSize: '1.1rem' }}>Cedric</h4>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Développeur Front-End</span>
                </div>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'linear-gradient(135deg, #e50914, #ff5252)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: '1.2rem' }}>L</div>
                <div>
                  <h4 style={{ margin: 0, fontSize: '1.1rem' }}>Leslie</h4>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Designer UI</span>
                </div>
              </li>
            </ul>
          </div>

          <div style={{ background: 'var(--bg-panel)', padding: '32px', borderRadius: '24px', border: '1px solid var(--border-glass)' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '24px' }}>Technologies & API</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <h4 style={{ margin: '0 0 8px 0', fontSize: '1.1rem' }}>TMDb API</h4>
                <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.5 }}>
                  Toutes nos données cinématographiques proviennent de <a href="https://www.themoviedb.org/" target="_blank" rel="noreferrer" style={{ color: 'var(--accent)' }}>The Movie Database</a>.
                </p>
              </div>
              <div style={{ height: '1px', background: 'var(--border-glass)' }}></div>
              <div>
                <h4 style={{ margin: '0 0 8px 0', fontSize: '1.1rem' }}>News API</h4>
                <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.5 }}>
                  L'actualité en temps réel est fournie par <a href="https://newsapi.org/" target="_blank" rel="noreferrer" style={{ color: 'var(--accent)' }}>News API</a>.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
