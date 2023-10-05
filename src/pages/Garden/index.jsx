import React, {useState, useEffect} from 'react';
import { Room, StylesComponent, BackButton } from '../../components'
import axios from 'axios';
import { Link } from 'react-router-dom'

// const gardenImages = [
//   { src: '../../src/assets/environmentMaps/garden/1.png', alt: 'Image 1' },
//   { src: '../../src/assets/environmentMaps/garden/2.jpeg', alt: 'Image 1' },
//   { src: '../../src/assets/environmentMaps/garden/3.jpeg', alt: 'Image 1' },
//   { src: '../../src/assets/environmentMaps/garden/4.jpeg', alt: 'Image 1' },
//    { src: '../../src/assets/environmentMaps/garden/5.jpeg', alt: 'Image 1' },
//   { src: '../../src/assets/environmentMaps/garden/6.jpeg', alt: 'Image 1' },
//   { src: '../../src/assets/environmentMaps/garden/7.jpeg', alt: 'Image 1' },
//   { src: '../../src/assets/environmentMaps/garden/8.webp', alt: 'Image 1' },
//   { src: '../../src/assets/environmentMaps/garden/9.webp', alt: 'Image 1' },
// //   { src: '../../src/assets/environmentMaps/garden/9.png', alt: 'Image 1' },
  
// ];

function GardenPage() {
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

useEffect(() => {
  async function callRoomImages(){
    const call = await axios.get("http://localhost:5000/rooms").then(data => {
      const rooms = data.data.rooms
      const tempArr = []
      for(let i=0;i<rooms.length;i++){
        if(rooms[i].category === "Garden"){
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
      <h1 className='room-title'>Garden Inspiration</h1>
      <BackButton backTo="/explore" label="Back to Explore" />
      </div>
    <div className={`garden-page${selectedImage ? ' dimmed' : ''}`}>
      {roomArray.map((image, index) => (
  <div className="garden__item-container" key={index} onClick={() => handleImageClick(image, index)}>
    <img className='garden__item' src={image.src} alt={image.alt} />
    <div className="garden__item-caption">{image.name}</div>
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
    </>
  );
}

export default GardenPage;
