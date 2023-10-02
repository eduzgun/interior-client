import React, {useState, useEffect} from 'react';
import { Room, StylesComponent } from '../../components'

const livingImages = [
  { src: '../../src/assets/environmentMaps/living/1.png', alt: 'Image 1' },
  { src: '../../src/assets/environmentMaps/living/2.avif', alt: 'Image 1' },
  { src: '../../src/assets/environmentMaps/living/2.jpeg', alt: 'Image 1' },
  { src: '../../src/assets/environmentMaps/living/3.jpeg', alt: 'Image 1' },
  { src: '../../src/assets/environmentMaps/living/4.jpeg', alt: 'Image 1' },
  { src: '../../src/assets/environmentMaps/living/5.jpeg', alt: 'Image 1' },
  { src: '../../src/assets/environmentMaps/living/6.jpeg', alt: 'Image 1' },
  { src: '../../src/assets/environmentMaps/living/7.webp', alt: 'Image 1' },
  { src: '../../src/assets/environmentMaps/living/8.webp', alt: 'Image 1' },
 
];

function LivingPage() {
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

    const newImagesWithStyles = livingImages.map((image, index) => ({
        ...image,
        style: <StylesComponent seed={index} />,
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
    <div className={`living-page${selectedImage ? ' dimmed' : ''}`}>
      {imagesWithStyles.map((image, index) => (
  <div className="living__item-container" key={index} onClick={() => handleImageClick(image, index)}>
    <img className='living__item' src={image.src} alt={image.alt} />
    <div className="living__item-caption">{image.style}</div>
  </div>
))}

      {selectedImage && (
        <div className="fullscreen-div">
        <div className="fullscreen-content">
            
            <Room mapSet="living" initialMapIndex={selectedImageIndex} />
            
            <button className="close-button" onClick={handleCloseClick}>Close</button>
        </div>
    </div>
      )}
    </div>
  );
}

export default LivingPage;

