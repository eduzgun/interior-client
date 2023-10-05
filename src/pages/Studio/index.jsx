import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Room, StylesComponent, BackButton } from '../../components'

// const studioImages = [
//   { src: '../../src/assets/environmentMaps/studio/1.png', alt: 'Image 1' },
//   { src: '../../src/assets/environmentMaps/studio/2.jpeg', alt: 'Image 1' },
//   { src: '../../src/assets/environmentMaps/studio/3.jpeg', alt: 'Image 1' },
//   { src: '../../src/assets/environmentMaps/studio/4.avif', alt: 'Image 1' },
//   { src: '../../src/assets/environmentMaps/studio/4.jpeg', alt: 'Image 1' },
//   { src: '../../src/assets/environmentMaps/studio/5.jpeg', alt: 'Image 1' },
//   { src: '../../src/assets/environmentMaps/studio/6.jpeg', alt: 'Image 1' },
//   { src: '../../src/assets/environmentMaps/studio/7.jpeg', alt: 'Image 1' },
//   { src: '../../src/assets/environmentMaps/studio/8.jpeg', alt: 'Image 1' },
// ];


function StudioPage() {
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
        if(rooms[i].category === "Studio"){
          rooms[i].src = '../../src/assets/environmentMaps/studio/1.png'
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
      <h1 className='room-title'>Studio Inspiration</h1>
      <BackButton backTo="/explore" label="Back to Explore" />
      </div>
    <div className={`studio-page${selectedImage ? ' dimmed' : ''}`}>
      {roomArray.map((image, index) => (
  <div className="studio__item-container" key={index} onClick={() => handleImageClick(image, index)}>
    <img className='studio__item' src={image.src} alt={image.alt} />
    <div className="studio__item-caption">{image.name}</div>
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
    </>
  );
}

export default StudioPage;
