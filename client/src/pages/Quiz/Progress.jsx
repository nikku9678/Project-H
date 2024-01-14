import React, { useState, useEffect } from 'react';

const Progress = () => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('Processing your pdf...');

  useEffect(() => {
    const interval = setInterval(() => {
      if (progress < 100) {
        setProgress((prevProgress) => prevProgress + 1);
      } else {
        clearInterval(interval);
        setTimeout(() => {
        //   setStatusText('Processing...');
          setTimeout(() => {
            setStatusText('Completed');
          }, 3000);
        }, 5000);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [progress]);

  return (
    <div>
      <div>{statusText}</div>
      <progress value={progress} max={100} />
    </div>
  );
};

export default Progress;