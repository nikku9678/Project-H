import React, { useState, useEffect } from 'react';
import './ScrollToTopButton.css';
import arrow from "../../assets/arrow.png"

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    const yOffset = window.pageYOffset;
    if (yOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    const scrollStep = -window.scrollY / (500 / 15); // Adjust the scroll speed here
    const scrollAnimation = () => {
      if (window.scrollY !== 0) {
        window.scrollBy(0, scrollStep);
        requestAnimationFrame(scrollAnimation);
      }
    };
    requestAnimationFrame(scrollAnimation);
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <div className={`scroll-to-top ${isVisible ? 'visible' : 'hidden'}`} onClick={scrollToTop}>
        <img className='arrow' src={arrow} /> 
    </div>
  );
};

export default ScrollToTopButton;
