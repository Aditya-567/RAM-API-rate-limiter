import React, { useEffect } from 'react';
import './globe.css'; // Make sure to import your CSS for styling

const EarthComponent = () => {
  useEffect(() => {
    // Dynamically import the Earth script when the component mounts
    import('./earth');
  }, []);

  return (
    <div id="color">
      <div className="animation">
        <div className="edge"></div>
        <canvas id="earth" className="earth"></canvas>
        <div className="halo"></div>
      </div>
    </div>
  );
};

export default EarthComponent;
