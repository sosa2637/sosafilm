import cam from "../assets/cam.png";
import clap from "../assets/clap.png";
import thread from "../assets/thread.png";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">

        <div className="footer-left">
          <img src={clap} className="clap" alt="Clap" width="155" height="140" />
          <img src={thread} className="thread" alt="Thread" width="138" height="100" />
        </div>

        <div className="footer-links">
          <ul className="footer-links-top">
            <li><a href="#">Conditions d'utilisation</a></li>
            <li><a href="#">Politique de confidentialité</a></li>
            <li><a href="#">Index du site</a></li>
            <li><a href="#">Aide</a></li>
          </ul>

          <ul className="footer-links-bottom">
            <li><a href="#">Salle de presse</a></li>
            <li><a href="#">Annonces</a></li>
            <li><a href="#">Emplois</a></li>
          </ul>
        </div>

        <div className="footer-right">
          <img src={cam} alt="Caméra" width="205" height="170" />
        </div>

      </div>

      <div className="footer-bottom">
        <div className="footer-left-bottom">
          <p>© 2025 La Bobine. Tous droits réservés.</p>
        </div>

        <div className="footer-socials">
          <a href="#" className="social-link"><i className="fa-brands fa-square-facebook"></i></a>
          <a href="#" className="social-link"><i className="fa-brands fa-linkedin"></i></a>
          <a href="#" className="social-link"><i className="fa-brands fa-instagram"></i></a>
          <a href="#" className="social-link"><i className="fa-brands fa-youtube"></i></a>
        </div>

        <div className="footer-contact">
          <p>Email : <a href="mailto:infoLB@gmail.com">infoLB@gmail.com</a></p>
          <p>Téléphone : +1 (418) 323-2342</p>
        </div>
      </div>
    </footer>
  );
}
