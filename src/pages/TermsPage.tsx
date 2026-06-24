import React from "react";

export default function TermsPage() {
  return (
    <div className="content-wrapper" style={{ paddingTop: '80px', paddingBottom: '80px', minHeight: '60vh' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', background: 'var(--bg-panel)', padding: '50px', borderRadius: '24px', border: '1px solid var(--border-glass)' }}>
        
        <div style={{ marginBottom: '40px' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '12px' }}>Mentions Légales & Conditions</h1>
          <p style={{ color: 'var(--text-muted)' }}>Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', color: 'var(--text-dim)', lineHeight: 1.7 }}>
          <section>
            <h2 style={{ color: '#fff', fontSize: '1.4rem', marginBottom: '16px' }}>1. Présentation de la plateforme</h2>
            <p>
              SOSA Ciné est un projet de plateforme web à but informatif. Son objectif est de cataloguer des œuvres cinématographiques, de présenter leurs synopsis, affiches, et de diffuser les bandes-annonces officielles mises à disposition par The Movie Database (TMDb).
            </p>
          </section>

          <section>
            <h2 style={{ color: '#fff', fontSize: '1.4rem', marginBottom: '16px' }}>2. Propriété intellectuelle</h2>
            <p>
              Toutes les affiches, titres, et bandes-annonces de films et séries affichés sur SOSA Ciné demeurent la propriété intellectuelle de leurs studios et créateurs respectifs. SOSA Ciné n'héberge aucun fichier vidéo protégé par le droit d'auteur sur ses serveurs.
            </p>
            <p style={{ marginTop: '12px' }}>
              Le site utilise l'API publique de TMDb mais n'est ni certifié ni approuvé par TMDb.
            </p>
          </section>

          <section>
            <h2 style={{ color: '#fff', fontSize: '1.4rem', marginBottom: '16px' }}>3. Données personnelles</h2>
            <p>
              Dans le cadre de la création d'un compte utilisateur, nous recueillons une adresse email et un mot de passe (haché de manière sécurisée). Ces données ne sont utilisées que pour la gestion de l'authentification et ne sont en aucun cas revendues à des tiers.
            </p>
          </section>

          <section>
            <h2 style={{ color: '#fff', fontSize: '1.4rem', marginBottom: '16px' }}>4. Contact</h2>
            <p>
              Pour toute réclamation, demande de retrait de contenu, ou question relative aux présentes conditions, vous pouvez nous joindre par email à l'adresse suivante : <strong>sosaewa26@gmail.com</strong>.
            </p>
          </section>
        </div>

      </div>
    </div>
  );
}
