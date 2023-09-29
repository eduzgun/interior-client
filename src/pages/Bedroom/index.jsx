import React, {useState} from 'react';
import { Room } from '../../components'

const bedroomImages = [
  { src: '../../src/assets/environmentMaps/bedroom/1.png', alt: 'Image 1' },
  { src: '../../src/assets/environmentMaps/bedroom/2.jpeg', alt: 'Image 1' },
  { src: '../../src/assets/environmentMaps/bedroom/3.png', alt: 'Image 1' },
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

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleCloseClick = () => {
    setSelectedImage(null);
  };

  return (
    <div className="bedroom-page">
      {bedroomImages.map((image, index) => (
        <img key={index} className='bedroom__item' src={image.src} alt={image.alt} onClick={() => handleImageClick(image)} />
      ))}

      {selectedImage && (
        <div className="fullscreen-div">
          {/* <img src={selectedImage.src} alt={selectedImage.alt} className="fullscreen-image" />
          <div className="description">{selectedImage.description}</div> */} <Room mapSet="bedroom"/>
          <button className="close-button" onClick={handleCloseClick}>Close</button>
        </div>
      )}
    </div>
  );
}


export default BedroomPage;






// import React from 'react';
// import { Room } from '../../components'

// const Bedroom = () => {
//   return (
//     <div>
//         <div className='center-page-room'>
//       <Room />
//       </div>
      
//     </div>
//   );
// };

// export default Bedroom;
