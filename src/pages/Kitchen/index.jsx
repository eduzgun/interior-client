import React, {useState, useEffect} from 'react';
import { Room, StylesComponent } from '../../components'

const kitchenImages = [
  { src: '../../src/assets/environmentMaps/kitchen/1.png', alt: 'Image 1' },
  { src: '../../src/assets/environmentMaps/kitchen/2.webp', alt: 'Image 1' },
  { src: '../../src/assets/environmentMaps/kitchen/3.jpeg', alt: 'Image 1' },
  { src: '../../src/assets/environmentMaps/kitchen/4.jpeg', alt: 'Image 1' },
   { src: '../../src/assets/environmentMaps/kitchen/5.jpeg', alt: 'Image 1' },
  { src: '../../src/assets/environmentMaps/kitchen/6.jpeg', alt: 'Image 1' },
  { src: '../../src/assets/environmentMaps/kitchen/7.jpeg', alt: 'Image 1' },
  { src: '../../src/assets/environmentMaps/kitchen/8.png', alt: 'Image 1' },
//   { src: '../../src/assets/environmentMaps/kitchen/9.png', alt: 'Image 1' },
  
];

function KitchenPage() {
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

    const newImagesWithStyles = kitchenImages.map((image, index) => ({
        ...image,
        style: <StylesComponent seed={index + 1} />,
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
    <div className={`kitchen-page${selectedImage ? ' dimmed' : ''}`}>
      {imagesWithStyles.map((image, index) => (
  <div className="kitchen__item-container" key={index} onClick={() => handleImageClick(image, index)}>
    <img className='kitchen__item' src={image.src} alt={image.alt} />
    <div className="kitchen__item-caption">{image.style}</div>
  </div>
))}

      {selectedImage && (
        <div className="fullscreen-div">
        <div className="fullscreen-content">
            {/* <img src={selectedImage.src} alt={selectedImage.alt} className="fullscreen-image" />
            <div className="description">{selectedImage.description}</div> */}
            <Room mapSet="kitchen" initialMapIndex={selectedImageIndex} />
            
            <button className="close-button" onClick={handleCloseClick}>Close</button>
        </div>
    </div>
      )}
    </div>
  );
}

export default KitchenPage;





























