import React, {useState, useEffect} from 'react';
import { Room, StylesComponent } from '../../components'

const gardenImages = [
  { src: '../../src/assets/environmentMaps/garden/1.png', alt: 'Image 1' },
  { src: '../../src/assets/environmentMaps/garden/2.jpeg', alt: 'Image 1' },
  { src: '../../src/assets/environmentMaps/garden/3.jpeg', alt: 'Image 1' },
  { src: '../../src/assets/environmentMaps/garden/4.jpeg', alt: 'Image 1' },
   { src: '../../src/assets/environmentMaps/garden/5.jpeg', alt: 'Image 1' },
  { src: '../../src/assets/environmentMaps/garden/6.jpeg', alt: 'Image 1' },
  { src: '../../src/assets/environmentMaps/garden/7.jpeg', alt: 'Image 1' },
  { src: '../../src/assets/environmentMaps/garden/8.webp', alt: 'Image 1' },
  { src: '../../src/assets/environmentMaps/garden/9.webp', alt: 'Image 1' },
//   { src: '../../src/assets/environmentMaps/garden/9.png', alt: 'Image 1' },
  
];

function GardenPage() {
    const [imagesWithStyles, setImagesWithStyles] = useState([])
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

 useEffect(() => {

    const newImagesWithStyles = gardenImages.map((image, index) => ({
        ...image,
        style: <StylesComponent seed={index + 2} />,
    }));
    setImagesWithStyles(newImagesWithStyles);
}, []);


  useEffect(() => {
  const handleScroll = (e) => {
    const fullscreenDiv = document.querySelector('.fullscreen-div');
    if (fullscreenDiv) {
      fullscreenDiv.scrollTop += e.deltaY;
      e.preventDefault();
    }
  };

  if (selectedImage) {
    window.addEventListener('wheel', handleScroll);
  } else {
    window.removeEventListener('wheel', handleScroll);
  }

  return () => {
    window.removeEventListener('wheel', handleScroll);
  };
}, [selectedImage]);

  return (
    <div className={`garden-page${selectedImage ? ' dimmed' : ''}`}>
      {imagesWithStyles.map((image, index) => (
  <div className="garden__item-container" key={index} onClick={() => handleImageClick(image, index)}>
    <img className='garden__item' src={image.src} alt={image.alt} />
    <div className="garden__item-caption">{image.style}</div>
  </div>
))}

      {selectedImage && (
        <div className="fullscreen-div">
        <div className="fullscreen-content">
            
            <Room mapSet="garden" initialMapIndex={selectedImageIndex} />
            
            <button className="close-button" onClick={handleCloseClick}>Close</button>
        </div>
    </div>
      )}
    </div>
  );
}

export default GardenPage;
