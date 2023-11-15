import React, { useState } from 'react';
import "./styles.css"

const ImageCarousel = ({ images, setResultImage}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const carouselImageClickHandler = () => {
    setResultImage(images[currentIndex])
  }

  const goToNextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToPrevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className='main_container' style={{ display: "flex", justifyContent: "space-around", width: "100%", marginBottom: "5rem", alignItems: "center"}}>
      <button onClick={goToPrevImage} className='button-styles' style={{height: "30px"}}>
        <span className='button-text' style={{padding: "1rem",fontSize: "18px"}}>
            &lt; Prev
        </span> 
      </button>
      <img src={images[currentIndex]} alt={`Image ${currentIndex + 1}`} style={{
        width: "100px", height: "100px", cursor: "pointer" 
      }} onClick={(e) => carouselImageClickHandler(e)}/>
      <button onClick={goToNextImage} className='button-styles' style={{height: "30px"}}>
        <span className='button-text' style={{padding: "1rem",fontSize: "18px"}}>
            Next &gt;
        </span> 
     </button>
    </div>
  );
};

export default ImageCarousel;
