import { useState, useEffect } from 'react';
import '../Login/Login.css';
import { Link } from 'react-router';
import API_URL from '../../config';

const ForgotPassword = function(){
  const [formData, setFormData] = useState({email: ''});
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(`Enter your email and we'll send you a link to reset your password.`);
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    if (cooldown === 0) return;
    
    const timer = setInterval(() => {
      setCooldown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [cooldown]);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData((prev) => ({...prev, [name]: value}))
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try{
      const res = await fetch(`${API_URL}/auth/forgot-password`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({email: formData.email})
    });

    const data = await res.json();
    if(!res.ok){
      throw new Error(data.msg || 'Request Failed!')
    }
    setMessage(data.msg);
    setCooldown(10);
    }catch(err){
      setError(err.message);
    }finally{
      setIsLoading(false);
    }
  };

  return (
     <main className="auth-page">
        <section className="auth-card">
          <h2>Reset Password</h2>
          
          {error ? 
            (<p className="auth-error">{error}</p>)
            :(
              <p className="auth-message">
                {message}
              </p>
              )
          }
          
    
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
    
            <button type="submit" className="auth-btn" disabled={isLoading || cooldown > 0}>
              {isLoading ? 'Sending…' : cooldown > 0 ? `Resend in ${cooldown}s` : 'Reset Password'}
            </button>
          </form>
    
          <p className="auth-switch">
            <Link to="/login">Login</Link>
          </p>
        </section>
      </main>
  );
}

export default ForgotPassword;