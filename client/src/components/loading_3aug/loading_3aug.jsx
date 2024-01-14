// LoadingComponent.js

import React from 'react';
import './loading_3aug.css';

const LoadingComponent = () => {
   return (
      <div className="loading-container">
         <div className="loading-icon" />
         <div className="loading-text">Waiting for Doctor to Join...</div>
      </div>
   );
};

export default LoadingComponent;
