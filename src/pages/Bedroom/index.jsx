import React, {useState} from 'react';
import { Comments, Room } from '../../components'

const bedroomImages = [
  { src: '../../src/assets/environmentMaps/bedroom/1.png', alt: 'Image 1', caption: "Art Decor" },
  { src: '../../src/assets/environmentMaps/0/1/pz.png', alt: 'Image 1', caption: "Minimal" },
  { src: '../../src/assets/environmentMaps/bedroom/2.jpeg', alt: 'Image 1' },
  { src: '../../src/assets/environmentMaps/bedroom/4.jpeg', alt: 'Image 1' },
   { src: '../../src/assets/environmentMaps/bedroom/5.avif', alt: 'Image 1' },
  { src: '../../src/assets/environmentMaps/bedroom/6.jpeg', alt: 'Image 1' },
  { src: '../../src/assets/environmentMaps/bedroom/7.webp', alt: 'Image 1' },
  { src: '../../src/assets/environmentMaps/bedroom/8.jpeg', alt: 'Image 1' },
  { src: '../../src/assets/environmentMaps/bedroom/1.png', alt: 'Image 1' },
  { src: '../../src/assets/environmentMaps/bedroom/2.jpeg', alt: 'Image 1' },
  { src: '../../src/assets/environmentMaps/bedroom/3.png', alt: 'Image 1' },
  { src: '../../src/assets/environmentMaps/bedroom/4.jpeg', alt: 'Image 1' },
   { src: '../../src/assets/environmentMaps/bedroom/5.avif', alt: 'Image 1' },
  { src: '../../src/assets/environmentMaps/bedroom/6.jpeg', alt: 'Image 1' },
  { src: '../../src/assets/environmentMaps/bedroom/7.webp', alt: 'Image 1' },
  { src: '../../src/assets/environmentMaps/bedroom/8.jpeg', alt: 'Image 1' },

  
];

function BedroomPage() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const handleImageClick = (image, index) => {
    setSelectedImage(image);
    setSelectedImageIndex(index);
  };

  const handleCloseClick = () => {
    setSelectedImage(null);
    setSelectedImageIndex(null)
  };

  return (
    <div className={`bedroom-page${selectedImage ? ' dimmed' : ''}`}>
      {bedroomImages.map((image, index) => (
        <div className="bedroom__item-container" key={index} onClick={() => handleImageClick(image, index)}>
          <img className='bedroom__item' src={image.src} alt={image.alt} />
          <div className="bedroom__item-caption">{image.caption}</div>
    
        </div>
      ))}

      {selectedImage && (
        <div className="fullscreen-div">
          {/* <img src={selectedImage.src} alt={selectedImage.alt} className="fullscreen-image" />
          <div className="description">{selectedImage.description}</div> */}
          <Room mapSet="bedroom" initialMapIndex={selectedImageIndex} />
          
          <button className="close-button" onClick={handleCloseClick}>Close</button>
        </div>
      )}
    </div>
  );
}

export default BedroomPage;

