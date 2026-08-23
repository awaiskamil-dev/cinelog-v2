import { useLocation, Link } from 'react-router';
import '../Login/Login.css';

const CheckEmail = () => {
  const location = useLocation();
  const email = location.state?.email;

  return (
    <>
      <title>Verify your email · Cinelog</title>
      <main className="auth-page">
        <section className="auth-card">
          <h2>Check your email</h2>
          <p className="auth-message">
            {email
              ? `We sent a verification link to ${email}.`
              : 'We sent you a verification link.'}{' '}
            Click it to activate your account.
          </p>
          <p className="auth-switch">
            Already verified? <Link to="/login">Login</Link>
          </p>
        </section>
      </main>
    </>
  );
};

export default CheckEmail;