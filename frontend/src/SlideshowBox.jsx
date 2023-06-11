import React from 'react';
import SlideShow from './SlideShow';
import image1 from './assets/image1.jpg'
import image2 from './assets/image2.jpg'
import image3 from './assets/image3.jpg'
import image4 from './assets/image4.jpg'
import './slideshow.css'
const SlideshowBox = () => {
  const images = [
    image1,
    image2,
    image3,
    image4,
  ];

  return (
    <div>
      <SlideShow images={images} interval={5000} />
    </div>
  );
};

export default SlideshowBox;
