import React, {useState, useEffect} from 'react';
import { Room, StylesComponent, BackButton } from '../../components'
import axios from 'axios';


// const livingImages = [
//   { src: '../../src/assets/environmentMaps/living/1.png', alt: 'Image 1' },
//   { src: '../../src/assets/environmentMaps/living/2.avif', alt: 'Image 1' },
//   { src: '../../src/assets/environmentMaps/living/2.jpeg', alt: 'Image 1' },
//   { src: '../../src/assets/environmentMaps/living/3.jpeg', alt: 'Image 1' },
//   { src: '../../src/assets/environmentMaps/living/4.jpeg', alt: 'Image 1' },
//   { src: '../../src/assets/environmentMaps/living/5.jpeg', alt: 'Image 1' },
//   { src: '../../src/assets/environmentMaps/living/6.jpeg', alt: 'Image 1' },
//   { src: '../../src/assets/environmentMaps/living/7.webp', alt: 'Image 1' },
//   { src: '../../src/assets/environmentMaps/living/8.webp', alt: 'Image 1' },
 
// ];

function LivingPage() {
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


  useEffect(() => {
    async function callRoomImages(){
      const call = await axios.get("http://localhost:5000/rooms").then(data => {
        const rooms = data.data.rooms
        const tempArr = []
        for(let i=0;i<rooms.length;i++){
          if(rooms[i].category === "Living Room"){
            rooms[i].src = '../../src/assets/environmentMaps/living/1.png'
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
      <h1 className='room-title'>Living Inspiration</h1>
      <BackButton backTo="/explore" label="Back to Explore" />
      </div>
    <div className={`living-page${selectedImage ? ' dimmed' : ''}`}>
      {roomArray.map((image, index) => (
    <div className="living__item-container" 
    key={index} 
    onClick={() => handleImageClick(image, index)}>
    <img className='living__item' src={image.src} alt={image.alt} />
    <div className="living__item-caption">{image.name}</div>
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
    </>
  );
}

export default LivingPage;

