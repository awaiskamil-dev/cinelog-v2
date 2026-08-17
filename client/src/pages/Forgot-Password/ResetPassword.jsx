import '../Login/Login.css';
import { Link, useSearchParams } from 'react-router';
import { useState } from 'react';
import API_URL from '../../config';

const ResetPassword = function(){
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email');
  const token = searchParams.get('token');
  
  const [formData, setFormData] = useState({newPassword: '', confirmPassword: ''});
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  
  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData((prev) => ({...prev, [name]: value}))
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if(formData.newPassword !== formData.confirmPassword){
      setError(`Passwords don't match`);
      return;
    }

    setIsLoading(true);

    try{
      const res = await fetch(`${API_URL}/auth/reset-password`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          email,
          token,
          password: formData.newPassword
        })
      });
      
      const data = await res.json();
      if(!res.ok){
        throw new Error(data.msg || 'Request Failed!');
      }
      setMessage(data.msg);
    }catch(err){
      setError(err.message);
    }
    finally{
      setIsLoading(false);
    }
  };

  const isValidLink = !token || !email;

  return (
    <main className="auth-page">
      <section className="auth-card">
        <h2>Set New Password</h2>

        {isValidLink? (
            <p className="auth-error">This reset link is invalid or has expired.</p>
          ): (message ? (
          <>
            <p className="auth-message">{message}</p>
            <p className="auth-switch">
              <Link to="/login">Go to login</Link>
            </p>
          </>
          ) : (
          <>
            {error && <p className="auth-error">{error}</p>}
            <form className="auth-form" noValidate onSubmit={handleSubmit}>
               <input
                  type="password"
                  name="newPassword"
                  placeholder="New password"
                  autoComplete="new-password"
                  required
                  value={formData.newPassword}
                  onChange={handleChange}
                />
        
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm new password"
                  autoComplete="new-password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
        
                <button type="submit" className="auth-btn" disabled={isLoading}>
                  {isLoading? 'Resetting...': 'Reset Password'}
                </button>
            </form>
            <p className="auth-switch">
              <Link to="/login">Login</Link>
            </p>
          </>
        ))}
      </section>
    </main>
  );
}

export default ResetPassword;