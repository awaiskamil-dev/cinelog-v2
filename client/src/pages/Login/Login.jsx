import { useState } from 'react';
import './Login.css';
import { Link, useNavigate, useLocation } from 'react-router';
import API_URL from '../../config';
import useAuth from '../../context/AuthContext/useAuth';

const Login = function(){
  const [formData, setFormData] = useState({email: '', password: ''});
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/';
  const {setUser} = useAuth();

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData((prev) => ({...prev, [name]: value}))
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try{
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if(!res.ok){
        throw new Error(data.msg || 'Login Failed!');
      }
      
      setUser(data.user);
      if
      (
        from === '/register' ||
        from == '/verify-email' ||
        from == '/user/verify-email' ||
        from === '/forgot' ||
        from === '/user/reset-password'
      ){
        navigate('/');
      }
      else{
        navigate(from);
      }
    }catch(err){
      setError(err.message);
    }
    finally{
      setIsLoading(false);
    }
  };

  return (
    <>
      <title>Log in · Cinelog</title>
      <main className="auth-page">
        <section className="auth-card">
          <h2>Login</h2>

          {error && <p className="auth-error">{error}</p>}

          <form className="auth-form" noValidate onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              autoComplete="email"
              required
              value={formData.email}
              onChange={handleChange}
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              autoComplete="current-password"
              required
              value={formData.password}
              onChange={handleChange}
            />

            <button type="submit" className="auth-btn" disabled={isLoading}>
              {isLoading ? 'Logging in…' : 'Login'}
            </button>

            <Link to="/forgot" className="auth-forgot">Forgot password?</Link>
          </form>

          <p className="auth-switch">
            Not registered? <Link to="/register">Create an account</Link>
          </p>
        </section>
      </main>
    </>
  );
}

export default Login;