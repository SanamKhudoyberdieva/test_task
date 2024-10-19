import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="ss-not-found">
      <div className="container">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>The Force is strong with this one, but we couldn't find what you're looking for.</p>
        <Link to="/" className="ss-primary-btn">Go Back Home</Link>
      </div>
    </div>
  );
};

export default NotFound;