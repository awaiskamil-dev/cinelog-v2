import { Link, useNavigate } from 'react-router';
import '../Login/Login.css';
import { useState } from 'react';
import useAuth from '../../context/useAuth';
import API_URL from '../../config';

const Register = function(){
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '' 
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const {setUser} = useAuth();

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData((prev) => ({...prev, [name]: value}));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if(formData.password !== formData.confirmPassword){
      setError(`Passwords don't match`);
      return;
    }

    setIsLoading(true);

    try{
      const res = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify(formData)
      });
      
      const data = await res.json();
      if(!res.ok){
        throw new Error(data.msg || 'Registeration Failed!');
      }

      setUser(data.user);
      navigate('/verify-email', {state: {email: formData.email}});
    }catch(err){
      setError(err.message);
    }
    finally{
      setIsLoading(false);
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-card">
        <h2>Create Account</h2>
        
        {error && <p className="auth-error">{error}</p>}

        <form className="auth-form" noValidate onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            autoComplete="name"
            required
            onChange={handleChange}
            value={formData.name}
          />
  
          <input
            type="email"
            name="email"
            placeholder="Email"
            autoComplete="email"
            required
            onChange={handleChange}
            value={formData.email}
          />
  
          <input
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="new-password"
            required
            onChange={handleChange}
            value={formData.password}
          />
  
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
            autoComplete="new-password"
            required
            onChange={handleChange}
            value={formData.confirmPassword}
          />
  
          <button type="submit" className="auth-btn" disabled={isLoading}>
            {isLoading ? 'Signing up…' : 'Sign Up'}
          </button>
        </form>
  
        <p className="auth-switch">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </section>
    </main>
  );
};

export default Register;