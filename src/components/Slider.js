import React, { useState } from 'react';
import './Slider.css'; // Create a CSS file for styling

const Slider = ({image1, image2}) => {
  const [sliderValue, setSliderValue] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (event) => {
    if (isDragging) {
      const container = document.getElementById('slider-container');
      const containerRect = container.getBoundingClientRect();
      const mouseX = event.clientX - containerRect.left;
      const percentage = (mouseX / containerRect.width) * 100;

      // Ensure the percentage is within the valid range (0 to 100)
      const newSliderValue = Math.max(0, Math.min(100, percentage));
      setSliderValue(newSliderValue);
    }
  };

  return (
    <div
      id="slider-container"
      className="slider-container"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      style={{
        display: "flex"
      }}
    >
      <img src={image1} alt="Left" style={{ width: `${sliderValue}%` ,height: "100px" }} />
      <div className="slider" style={{ left: `${sliderValue}%` }} />
      <img src={image2} alt="Right" style={{ width: `${100 - sliderValue}%`, height: "100px" }} />
    </div>
  );
};

export default Slider;
