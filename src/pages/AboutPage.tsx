export default function AboutPage() {
  return (
    <div>
      <h1 className="mt-3">À propos</h1>
      <p>Bienvenue sur React Films 2025. Ce projet a été imaginé pour proposer une base de films interactive permettant d'explorer les films et les acteurs référencés sur TMDb.</p>
      <h2>L'équipe</h2>
      <ul>
        <li>Nom 1 — Rôle (exemple : Développeur Front-End)</li>
        <li>Nom 2 — Rôle (exemple : Designer UI)</li>
      </ul>
      <h2>Pourquoi ce projet&nbsp;?</h2>
      <p>Découvrir les potentialités de React, manipuler une vraie API, et s'améliorer en conception de sites responsives et dynamiques.</p>
      <h2>Crédits API</h2>
      <p>Les données proviennent de <a href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer">The Movie Database (TMDb)</a>.</p>
    </div>
  );
}
