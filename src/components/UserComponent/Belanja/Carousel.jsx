import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const Carousel = () => {
  const images = [
    "https://via.placeholder.com/1920x1080?text=Banner+1",
    "https://via.placeholder.com/1920x1080?text=Banner+2",
    "https://via.placeholder.com/1920x1080?text=Banner+3",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  // Menunggu gambar dimuat
  const handleImageLoad = () => {
    setLoading(false);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000); // Slide every 5 seconds
    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);

  return (
    <div className="relative w-full h-screen mx-auto overflow-hidden">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
          Loading...
        </div>
      )}

      {/* Carousel Images */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`carousel image ${index + 1}`}
            className="w-full sm:h-full h-screen object-cover"
            onLoad={handleImageLoad}
          />
        ))}
      </div>

      {/* Previous Button */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white p-2 rounded-full bg-opacity-50 hover:bg-opacity-75 transition-all"
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>

      {/* Next Button */}
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white p-2 rounded-full bg-opacity-50 hover:bg-opacity-75 transition-all"
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </button>

      {/* Indicators (Dots) */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <span
            key={index}
            className={`block w-2.5 h-2.5 rounded-full cursor-pointer ${
              index === currentIndex ? "bg-white" : "bg-gray-400"
            }`}
            onClick={() => setCurrentIndex(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
