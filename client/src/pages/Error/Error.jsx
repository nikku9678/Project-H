import React, { useState, useEffect } from 'react';
import './Error.css';
import errorImg from './error.avif';
const Error = () => {
  const [timeLeft, setTimeLeft] = useState(7200); // 2 hours in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      if (timeLeft > 0) {
        setTimeLeft(timeLeft - 1);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="maintenance-page">
      <img src={errorImg} alt="Under Maintenance" />
      <div className="timer">
        <h2>Website is under maintenance</h2>
        <p>Time left: {hours}h {minutes}m {seconds}s</p>
      </div>
    </div>
  );
};

export default Error;
