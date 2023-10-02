import React, {useState} from 'react';
import { Room } from '../../components'

const kitchenImages = [
  { src: '../../src/assets/environmentMaps/kitchen/1.png', alt: 'Image 1' },
  { src: '../../src/assets/environmentMaps/kitchen/2.webp', alt: 'Image 1' },
  { src: '../../src/assets/environmentMaps/kitchen/3.jpeg', alt: 'Image 1' },
  { src: '../../src/assets/environmentMaps/kitchen/4.jpeg', alt: 'Image 1' },
   { src: '../../src/assets/environmentMaps/kitchen/5.jpeg', alt: 'Image 1' },
  { src: '../../src/assets/environmentMaps/kitchen/6.jpeg', alt: 'Image 1' },
  { src: '../../src/assets/environmentMaps/kitchen/7.jpeg', alt: 'Image 1' },
  { src: '../../src/assets/environmentMaps/kitchen/8.png', alt: 'Image 1' },
  { src: '../../src/assets/environmentMaps/kitchen/9.png', alt: 'Image 1' },
  
];

function KitchenPage() {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleCloseClick = () => {
    setSelectedImage(null);
  };

  return (
    <div className="kitchen-page">
        {kitchenImages.map((image, index) => (
            <img key={index} className='kitchen__item' src={image.src} alt={image.alt} onClick={() => handleImageClick(image)} />
        ))}

        {selectedImage && (
            <div className="fullscreen-div">
                {/* <img src={selectedImage.src} alt={selectedImage.alt} className="fullscreen-image" />
                <div className="description">{selectedImage.description}</div> */}
                <Room mapSet="kitchen" />
                <button className="close-button" onClick={handleCloseClick}>Close</button>
            </div>
        )}
    </div>
);

}

export default KitchenPage;
