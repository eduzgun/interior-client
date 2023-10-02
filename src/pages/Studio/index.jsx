import React, {useState, useEffect} from 'react';
import { Room, StylesComponent } from '../../components'

const studioImages = [
  { src: '../../src/assets/environmentMaps/studio/1.png', alt: 'Image 1' },
  { src: '../../src/assets/environmentMaps/studio/2.jpeg', alt: 'Image 1' },
  { src: '../../src/assets/environmentMaps/studio/3.jpeg', alt: 'Image 1' },
  { src: '../../src/assets/environmentMaps/studio/4.avif', alt: 'Image 1' },
  { src: '../../src/assets/environmentMaps/studio/4.jpeg', alt: 'Image 1' },
  { src: '../../src/assets/environmentMaps/studio/5.jpeg', alt: 'Image 1' },
  { src: '../../src/assets/environmentMaps/studio/6.jpeg', alt: 'Image 1' },
  { src: '../../src/assets/environmentMaps/studio/7.jpeg', alt: 'Image 1' },
  { src: '../../src/assets/environmentMaps/studio/8.jpeg', alt: 'Image 1' },
];


function StudioPage() {
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

    const newImagesWithStyles = studioImages.map((image, index) => ({
        ...image,
        style: <StylesComponent seed={index + 3} />,
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
    <div className={`studio-page${selectedImage ? ' dimmed' : ''}`}>
      {imagesWithStyles.map((image, index) => (
  <div className="studio__item-container" key={index} onClick={() => handleImageClick(image, index)}>
    <img className='studio__item' src={image.src} alt={image.alt} />
    <div className="studio__item-caption">{image.style}</div>
  </div>
))}

      {selectedImage && (
        <div className="fullscreen-div">
        <div className="fullscreen-content">
            
            <Room mapSet="studio" initialMapIndex={selectedImageIndex} />
            
            <button className="close-button" onClick={handleCloseClick}>Close</button>
        </div>
    </div>
      )}
    </div>
  );
}

export default StudioPage;
