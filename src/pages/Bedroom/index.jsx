import React, {useState, useEffect} from 'react';
import { Room, StylesComponent, BackButton } from '../../components'
import { Link } from 'react-router-dom';
import Heart from "react-animated-heart";

const bedroomImages = [
  { src: '../../src/assets/environmentMaps/bedroom/1.png', alt: 'Image 1' },
  { src: '../../src/assets/environmentMaps/0/1/pz.png', alt: 'Image 1'},
  { src: '../../src/assets/environmentMaps/bedroom/2.jpeg', alt: 'Image 1', caption: "Modern" },
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

    const [likedImages, setLikedImages] = useState(new Array(bedroomImages.length).fill(false));

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

    const newImagesWithStyles = bedroomImages.map((image, index) => ({
        ...image,
        style: <StylesComponent seed={index} />,
    }));
    setImagesWithStyles(newImagesWithStyles);
}, []);

const toggleLike = (index) => {
    const newLikedImages = [...likedImages];
    newLikedImages[index] = !newLikedImages[index];
    setLikedImages(newLikedImages);
};


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
    <div>
        <div className='title-section'>
      <h1 className='room-title'>Bedroom Inspiration</h1>
      <BackButton backTo="/explore" label="Back to Explore" />
      </div>
    
    <div className={`bedroom-page${selectedImage ? ' dimmed' : ''}`}>
      {imagesWithStyles.map((image, index) => (
  <div className="bedroom__item-container" key={index} onClick={() => handleImageClick(image, index)}>
    <img className='bedroom__item' src={image.src} alt={image.alt} />
    <div className="bedroom__item-caption">{image.style}</div>
    <div className="heart-container" onClick={(e) => { e.stopPropagation(); toggleLike(index); }}>
      <Heart isClick={likedImages[index]} />
    </div>
  </div>
  
))}

      {selectedImage && (
        <div className="fullscreen-div">
        <div className="fullscreen-content">
          
            <Room mapSet="bedroom" initialMapIndex={selectedImageIndex} />
            
            <button className="close-button" onClick={handleCloseClick}>Close</button>
        </div>
    </div>
      )}
    </div>
    </div>
  );
}

export default BedroomPage;

