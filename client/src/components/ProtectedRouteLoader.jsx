import './ProtectedRouteLoader.css';

const ProtectedRouteLoader = () => {
  return (
    <div className="protected-route-loader">
      <div className="protected-route-spinner"></div>
      <p>Loading your account...</p>
    </div>
  );
};

export default ProtectedRouteLoader;