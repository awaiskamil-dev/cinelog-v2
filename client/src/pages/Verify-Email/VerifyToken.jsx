import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router';
import API_URL from '../../config';
import '../Login/Login.css';

const VerifyToken = () => {
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email');
  const token = searchParams.get('token');
  const [status, setStatus] = useState('verifying'); // 'verifying' | 'success' | 'error'
  const [message, setMessage] = useState('');

  useEffect(() => {
    const verify = async () => {
      try {
        const res = await fetch(`${API_URL}/auth/verify-email`, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            email,
            verificationToken: token
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.msg || 'Verification failed');
        }

        setStatus('success');
        setMessage(data.msg || 'Your account has been verified!');
      } catch (err) {
        setStatus('error');
        setMessage(err.message);
      }
    };

    verify();
  }, [token, email]);

  return (
    <main className="auth-page">
      <section className="auth-card">
        <h2>
          {status === 'verifying' && 'Verifying…'}
          {status === 'success' && 'Verified!'}
          {status === 'error' && 'Verification failed'}
        </h2>

        <p className="auth-message">{message}</p>

        {status !== 'verifying' && (
          <p className="auth-switch">
            <Link to="/login">Go to login</Link>
          </p>
        )}
      </section>
    </main>
  );
};

export default VerifyToken;