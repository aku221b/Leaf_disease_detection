import React, { useState } from 'react';

const ImageCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToPrevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div>
      <img src={images[currentIndex]} alt={`Image ${currentIndex + 1}`} />
      <button onClick={goToPrevImage}>&lt; Prev</button>
      <button onClick={goToNextImage}>Next &gt;</button>
    </div>
  );
};

export default ImageCarousel;
