import './Navbar.css';
import logo from '../assets/cl-logo.png';

function Navbar(){
 return (
  <nav>
    <div className="nav-left-section">
      <a href="index.html">
        <img className="logo" src={logo}/>
        <span className="logo-name">Cinelog</span>
      </a>
    </div>
    <div className="nav-right-section">
      <a className="home-link" href="index.html">
        Home
      </a>
      <a href="watchlist.html">
        Watchlist
      </a>
    </div>
  </nav>
 );
};

export default Navbar;