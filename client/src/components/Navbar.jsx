import './Navbar.css';
import logo from '../assets/cl-logo.png';
import { Link, useNavigate } from 'react-router';
import useAuth from '../context/useAuth';
import defaultAvatar from '../assets/default-pfp.png';
import { useEffect, useRef, useState } from 'react';
import API_URL from '../config';

function Navbar(){
  const {user, setUser} = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const isReady = useRef(false);
  const navigate = useNavigate();

  useEffect(() => {
    isReady.current = false;
    if(user){
      const timer = setTimeout(() => {
        isReady.current = true;
      }, 10000);  
      return () => clearTimeout(timer);
    }
  }, [user]);

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
      {user? 
      ( 
        <>
          <Link to="/watchlist" className='watchlist-link'>
            Watchlist
          </Link>
          <div 
            className="nav-avatar-wrapper"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
          >
            <div className="nav-avatar">
              <img src={defaultAvatar} alt="User avatar" />
              <i className="fa-solid fa-angle-down"></i>
            </div>

            {isOpen && (
              <div className="nav-dropdown">
                <div className='nav-dropdown-inner'>
                  <div className='nav-dropdown-item' onClick={handleLogout}>
                    <i className="fa-solid fa-right-from-bracket"></i>
                    <span>Logout</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )
      :(
        <>
          <Link to="/login" className='nav-login'>
            Login
          </Link>
          <Link to="/register" className='nav-signup'>
            Sign Up
          </Link>
        </>
      )}
     
      
    </div>
  </nav>
  );
};

export default Navbar;