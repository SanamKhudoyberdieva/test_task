import React from 'react';

const NotFound = () => {
  return (
    <div className="not-found">
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>The Force is strong with this one, but we couldn't find what you're looking for.</p>
      <a href="/" className="go-home">Go Back Home</a>
    </div>
  );
};

export default NotFound;