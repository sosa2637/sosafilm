export default function AboutPage() {
  return (
    <div className="about-page">
      <h1 className="mt-3">À propos</h1>
      <p>Bienvenue sur React Films 2025. Ce projet a été imaginé pour proposer une base de films interactive permettant d'explorer les films et les acteurs référencés sur TMDb.</p>
      <h2>L'équipe</h2>
      <ul>
        <li>Cedric — Rôle (exemple : Développeur Front-End)</li>
        <li>Leslie — Rôle (exemple : Designer UI)</li>
      </ul>
      <h2>Pourquoi ce projet&nbsp;?</h2>
      <p>Découvrir les potentialités de React et vite, manipuler une vraie API Public, et s'améliorer en conception de sites responsives et dynamiques.</p>
      <h2>Crédits API</h2>
<p className="api-credit">
  Les données films proviennent de <a href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer">The Movie Database (TMDb)</a>.
  <span className="api-badge">API TMDb</span>
</p>
<p className="api-credit">
  Les données actualités proviennent de <a href="https://www.apinews.org/" target="_blank" rel="noopener noreferrer"> News API</a>.
  <span className="api-badge">API Actualités</span>
</p>
    </div>
  );
}
