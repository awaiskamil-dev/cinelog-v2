import './Footer.css';
import logo from '../assets/cl-logo.png';
import { Link } from 'react-router';

const Footer = function(){
  return(
    <footer className="site-footer">
      <div className="footer-top">
  
        <div className="footer-brand">
          <div className="footer-logo">
            <img className="footer-logo__img" src={logo}/>
            <span className="footer-logo__text">CINELOG</span>
          </div>
          <p className="footer-tagline">Track what you watch.</p>
        </div>
  
        <div className="footer-links">
          <span className="footer-heading">Navigate</span>
          <Link to="/">Home</Link>
          <Link to="/watchlist">Watchlist</Link>
        </div>
  
        <div className="footer-links">
          <span className="footer-heading">Project</span>
          <a href="https://github.com/awaiskamil-dev/cinelog-v2" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href="https://github.com/awaiskamil-dev" target="_blank" rel="noopener noreferrer">
            Awais Kamil
          </a>
        </div>
  
      </div>
  
      <div className="footer-bottom">
        <p className="footer-copy">© 2026 CineLog. Built by Awais Kamil.</p>
        <p className="footer-attribution">
          This product uses the TMDB API but is not endorsed or certified by TMDB.
        </p>
      </div>
    </footer>
  );
};

export default Footer;