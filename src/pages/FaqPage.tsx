import React from "react";

export default function FaqPage() {
  const faqs = [
    {
      q: "Qu'est-ce que SOSA Ciné ?",
      a: "SOSA Ciné est une plateforme interactive et premium permettant de découvrir, rechercher et suivre l'actualité des films et séries les plus populaires à travers le monde."
    },
    {
      q: "Est-ce que je peux regarder des films complets sur SOSA Ciné ?",
      a: "Non. SOSA Ciné est une base de données d'informations cinématographiques (synopsis, casting, notes) qui vous permet de visionner les bandes-annonces officielles, mais ne propose pas de streaming de longs-métrages complets en raison des droits d'auteur."
    },
    {
      q: "D'où proviennent les informations affichées ?",
      a: "L'ensemble de nos données (films, séries, acteurs) provient directement de l'API publique de The Movie Database (TMDb), qui est mise à jour quotidiennement par sa communauté."
    },
    {
      q: "Est-ce gratuit de créer un compte ?",
      a: "Oui, la création d'un compte sur SOSA Ciné est 100% gratuite. Elle vous permet à l'avenir de sauvegarder vos films préférés et de personnaliser votre expérience."
    },
    {
      q: "Comment puis-je contacter le support technique ?",
      a: "Vous pouvez nous joindre en tout temps depuis la page 'Contact' ou en nous envoyant un email directement à sosaewa26@gmail.com."
    }
  ];

  return (
    <div className="content-wrapper" style={{ paddingTop: '80px', paddingBottom: '80px', minHeight: '60vh' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '16px' }}>Foire Aux Questions</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>
            Trouvez les réponses aux questions les plus fréquentes sur SOSA Ciné.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {faqs.map((faq, idx) => (
            <div key={idx} style={{ 
              background: 'var(--bg-panel)', 
              padding: '30px', 
              borderRadius: '20px', 
              border: '1px solid var(--border-glass)',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '12px', color: '#fff', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ color: 'var(--accent)', fontSize: '1.5rem' }}>Q.</span>
                {faq.q}
              </h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.6, margin: 0, paddingLeft: '32px' }}>
                {faq.a}
              </p>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '60px' }}>
          <p style={{ color: 'var(--text-muted)', marginBottom: '16px' }}>Vous ne trouvez pas votre réponse ?</p>
          <a href="/contact" style={{ 
            display: 'inline-flex', 
            background: 'var(--accent)', 
            color: '#000', 
            padding: '12px 24px', 
            borderRadius: '12px', 
            fontWeight: 600, 
            textDecoration: 'none' 
          }}>
            Contactez-nous
          </a>
        </div>

      </div>
    </div>
  );
}
