import React, {useState, useEffect} from 'react';
import { Room, StylesComponent, BackButton } from '../../components'
import { Link } from 'react-router-dom';
import axios from 'axios';

// const bathroomImages = [
//   { src: '../../src/assets/environmentMaps/5/px.png', alt: 'Image 1' },
//   { src: '../../src/assets/environmentMaps/5/px.png', alt: 'Image 1' },
//   { src: '../../src/assets/environmentMaps/5/px.png', alt: 'Image 1' },
//   { src: '../../src/assets/environmentMaps/5/px.png', alt: 'Image 1' },
//    { src: '../../src/assets/environmentMaps/5/px.png', alt: 'Image 1' },
//   { src: '../../src/assets/environmentMaps/5/px.png', alt: 'Image 1' },
//   { src: '../../src/assets/environmentMaps/bedroom/7.webp', alt: 'Image 1' },
//   { src: '../../src/assets/environmentMaps/bedroom/8.jpeg', alt: 'Image 1' },
//   { src: '../../src/assets/environmentMaps/bedroom/1.png', alt: 'Image 1' },
//   { src: '../../src/assets/environmentMaps/bedroom/2.jpeg', alt: 'Image 1' },
//   { src: '../../src/assets/environmentMaps/bedroom/3.png', alt: 'Image 1' },
//   { src: '../../src/assets/environmentMaps/bedroom/4.jpeg', alt: 'Image 1' },
//    { src: '../../src/assets/environmentMaps/bedroom/5.avif', alt: 'Image 1' },
//   { src: '../../src/assets/environmentMaps/bedroom/6.jpeg', alt: 'Image 1' },
//   { src: '../../src/assets/environmentMaps/bedroom/7.webp', alt: 'Image 1' },
//   { src: '../../src/assets/environmentMaps/bedroom/8.jpeg', alt: 'Image 1' },

  
// ];


function BathroomPage() {
    const [imagesWithStyles, setImagesWithStyles] = useState([])
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [roomArray,setRoomArray] = useState([])


  const handleImageClick = (image, index) => {
    setSelectedImage(image);
    setSelectedImageIndex(image.id);
  };

  const handleCloseClick = () => {
    setSelectedImage(null);
    setSelectedImageIndex(null)
  };

 useEffect(() => {

    const newImagesWithStyles = roomArray.map((image, index) => ({
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

useEffect(() => {
  async function callRoomImages(){
    const call = await axios.get("http://localhost:5000/rooms").then(data => {
      const rooms = data.data.rooms
      const tempArr = []
      for(let i=0;i<rooms.length;i++){
        if(rooms[i].category === "Bathroom"){
          rooms[i].src = rooms[i].cover_image
          rooms[i].alt = 'Image 1'
          tempArr.push(rooms[i])
        }
      }
      setRoomArray(tempArr)
    })

  }
  callRoomImages()
},[])

  return (
    <>
    <div className='title-section'>
      <h1 className='room-title'>Bathroom Inspiration</h1>
      <BackButton backTo="/explore" label="Back to Explore" />
      </div>
    <div className={`bathroom-page${selectedImage ? ' dimmed' : ''}`}>
      {roomArray.map((image, index) => (
  <div className="bathroom__item-container" key={index} onClick={() => handleImageClick(image, index)}>
    <img className='bathroom__item' src={image.src} alt={image.alt} />
    <div className="bathroom__item-caption">{image.name}</div>
  </div>
))}

      {selectedImage && (
        <div className="fullscreen-div">
        <div className="fullscreen-content">
            
            <Room mapSet="bathroom" initialMapIndex={selectedImageIndex} />
            
            <button className="close-button" onClick={handleCloseClick}>Close</button>
        </div>
    </div>
      )}
    </div>
    </>
  );
}

export default BathroomPage;
