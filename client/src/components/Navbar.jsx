import './Navbar.css';
import logo from '../assets/cl-logo.png';
import { Link, useLocation, useNavigate } from 'react-router';
import useAuth from '../context/AuthContext/useAuth';
import defaultAvatar from '../assets/default-pfp.png';
import API_URL from '../config';
import { useState } from 'react';

function Navbar(){
  const {user, setUser, isLoading} = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isOverviewPage = 
    location.pathname.startsWith('/movie/') ||
    location.pathname.startsWith('/tv/');

  const handleLogout = async () => {
    try{
      await fetch(`${API_URL}/auth/logout`, {
        method: 'DELETE',
        credentials: 'include'
      });
      setUser(null);
      setIsOpen(false);
      navigate('/');
    }catch(err){
      console.log(err);
    }
  };

  return (
  <nav>
    <div className={`nav-container ${isOverviewPage? 'navbar--transparent' : ''}`}>
      <div className="nav-left-section">
        <Link to="/">
          <img className="logo" src={logo}/>
          <span className="logo-name">Cinelog</span>
        </Link>
      </div>
      <div className="nav-right-section">
        {isLoading ? (
          <div className="nav-loading-skeleton">
            <div className="nav-link-skeleton"></div>
            <div className="nav-link-skeleton nav-link-skeleton--wide"></div>
            <div className="nav-avatar-skeleton"></div>
            <div className="nav-chevron-skeleton"></div>
          </div>
        ) : (
          <>
            <Link className="home-link" to="/">
              Home
            </Link>

            {user ? (
              <>
                <Link to="/watchlist" className="watchlist-link">
                  Watchlist
                </Link>

                <div
                  className="nav-avatar-wrapper"
                  onMouseEnter={() => setIsOpen(true)}
                  onMouseLeave={() => setIsOpen(false)}
                  onClick={() => setIsOpen(prev => !prev)}
                >
                  <div className="nav-avatar">
                    <img src={defaultAvatar} alt="User avatar" />
                    <i className="fa-solid fa-angle-down"></i>
                  </div>

                  {isOpen && (
                    <div className="nav-dropdown">
                      <div className="nav-dropdown-inner">
                        <div
                          className="nav-dropdown-item dropdown-sm-screen"
                          onClick={() => navigate('/')}
                        >
                          <i className="fa-solid fa-house"></i>
                          <span>Home</span>
                        </div>

                        <div
                          className="nav-dropdown-item dropdown-sm-screen"
                          onClick={() => navigate('/watchlist')}
                        >
                          <i className="fa-solid fa-clapperboard"></i>
                          <span>Watchlist</span>
                        </div>

                        <div className="nav-dropdown-item" onClick={handleLogout}>
                          <i className="fa-solid fa-right-from-bracket"></i>
                          <span>Logout</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="nav-login"
                  state={{ from: location.pathname }}
                >
                  Login
                </Link>

                <Link to="/register" className="nav-signup">
                  Sign Up
                </Link>
              </>
            )}
          </>
        )}
      </div>
    </div>
  </nav>
  );
};

export default Navbar;