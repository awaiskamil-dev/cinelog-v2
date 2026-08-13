import './Navbar.css';
import logo from '../assets/cl-logo.png';
import { Link } from 'react-router';

function Navbar(){
 return (
  <nav>
    <div className="nav-left-section">
      <Link to="/">
        <img className="logo" src={logo}/>
        <span className="logo-name">Cinelog</span>
      </Link>
    </div>
    <div className="nav-right-section">
      <Link className="home-link" to="/">
        Home
      </Link>
      <Link to="/watchlist">
        Watchlist
      </Link>
    </div>
  </nav>
 );
};

export default Navbar;