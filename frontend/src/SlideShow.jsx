import React, { useState, useEffect } from 'react';
import TypingEffect from './TypingEffect';
const SlideShow = ({ images, interval = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    }, interval);

    return () => {
      clearInterval(timer);
    };
  }, [images.length, interval]);

  return (
    <div className="slideshow-wrapper">
 <div className="slideshow-text">
      
        <h2>
          <TypingEffect text="Providing compassionate
support services to families
of Slum areas!" speed={60} />
        </h2>
      </div>

    <div className="slideshow-container">
      <img className="slideshow-image" src={images[currentIndex]} alt="Slideshow" />
    </div>
    </div>
  );
};

export default SlideShow;
