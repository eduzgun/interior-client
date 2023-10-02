import React from 'react';


function Gallery() {
  return (
    <div className="gallery">
      {images.map((image, index) => (
        <img
          key={index}
          className="gallery__item"
          src={image.src}
          alt={image.alt}
        />
      ))}
    </div>
  );
}

export default Gallery;
