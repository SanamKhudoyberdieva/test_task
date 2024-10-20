import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

const Spinner: React.FC<{ loading: boolean }> = ({ loading }) => {
  return (
    <div className="ss-spinner">
      <ClipLoader color="#3498db" loading={loading} size={50} />
      <p className='ss-spinner-text'>Loading...</p>
    </div>
  );
};

export default Spinner;