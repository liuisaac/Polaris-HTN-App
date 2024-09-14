import React from 'react';

const Map = () => {
  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <iframe
        src="https://app.mappedin.com/map/66ce20fdf42a3e000b1b0545?floor=m_e6c96a31fba4ef51"
        width="100%"
        height="100%"
        style={{ border: 'none' }}
        allowFullScreen
      />
    </div>
  );
};

export default Map;
