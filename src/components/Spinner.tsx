import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

const Spinner: React.FC<{ loading: boolean }> = ({ loading }) => {
  return (
    <div className="spinner">
      <ClipLoader color="#3498db" loading={loading} size={50} />
      <p>Loading...</p>
    </div>
  );
};

export default Spinner;