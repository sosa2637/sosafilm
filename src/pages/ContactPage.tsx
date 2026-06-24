export default function ContactPage() {
  return (
    <div className="content-wrapper" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
      
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '16px' }}>Contactez-nous</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>
            Une question, une suggestion ou un problème technique ? N'hésitez pas à nous écrire.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
          {/* Infos de contact */}
          <div style={{ flex: '1 1 300px', background: 'var(--bg-panel)', padding: '40px', borderRadius: '24px', border: '1px solid var(--border-glass)', boxShadow: 'var(--shadow-md)' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '24px' }}>Informations</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', color: 'var(--text-muted)' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                <div>
                  <h4 style={{ color: '#fff', margin: '0 0 4px 0', fontSize: '1rem' }}>Email</h4>
                  <a href="mailto:sosaewa26@gmail.com" style={{ color: 'inherit', textDecoration: 'none' }}>sosaewa26@gmail.com</a>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                <div>
                  <h4 style={{ color: '#fff', margin: '0 0 4px 0', fontSize: '1rem' }}>Téléphone</h4>
                  <span>+1 (418) 323-2342</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                <div>
                  <h4 style={{ color: '#fff', margin: '0 0 4px 0', fontSize: '1rem' }}>Adresse</h4>
                  <span>Québec, Canada</span>
                </div>
              </div>
            </div>
          </div>

          {/* Formulaire */}
          <div style={{ flex: '1 1 400px' }}>
            <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', gap: '20px' }}>
                <div style={{ flex: 1 }}>
                  <label htmlFor="fname" style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--text-muted)' }}>Nom complet</label>
                  <input type="text" id="fname" placeholder="Jean Dupont" style={{ width: '100%', padding: '14px 16px', background: 'var(--bg-glass)', border: '1px solid var(--border-glass)', borderRadius: '12px', color: '#fff', fontSize: '16px', boxSizing: 'border-box' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <label htmlFor="mail" style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--text-muted)' }}>Email</label>
                  <input type="email" id="mail" placeholder="jean@exemple.com" style={{ width: '100%', padding: '14px 16px', background: 'var(--bg-glass)', border: '1px solid var(--border-glass)', borderRadius: '12px', color: '#fff', fontSize: '16px', boxSizing: 'border-box' }} />
                </div>
              </div>
              
              <div>
                <label htmlFor="sujet" style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--text-muted)' }}>Sujet</label>
                <input type="text" id="sujet" placeholder="Comment pouvons-nous vous aider ?" style={{ width: '100%', padding: '14px 16px', background: 'var(--bg-glass)', border: '1px solid var(--border-glass)', borderRadius: '12px', color: '#fff', fontSize: '16px', boxSizing: 'border-box' }} />
              </div>

              <div>
                <label htmlFor="message" style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--text-muted)' }}>Message</label>
                <textarea id="message" rows={6} placeholder="Votre message détaillé ici..." style={{ width: '100%', padding: '14px 16px', background: 'var(--bg-glass)', border: '1px solid var(--border-glass)', borderRadius: '12px', color: '#fff', fontSize: '16px', boxSizing: 'border-box', resize: 'vertical' }}></textarea>
              </div>

              <button type="button" style={{ 
                background: 'var(--accent)', 
                color: '#000', 
                border: 'none', 
                padding: '16px', 
                borderRadius: '12px', 
                fontWeight: 700, 
                fontSize: '16px',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                transition: '0.2s',
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                Envoyer le message
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}