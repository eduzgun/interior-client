import React, {useState, useEffect,useRef } from 'react';
import { Room, StylesComponent, BackButton,BlobToImage } from '../../components'
import { Link } from 'react-router-dom';
import Heart from "react-animated-heart";
import { AiFillEye } from 'react-icons/ai'
import './explore.css'
import { useAuth } from '../../contexts';
import axios from 'axios';
import {GrClose} from 'react-icons/gr'

 const bedroomImages = [
   { id: 1, src: '../../src/assets/environmentMaps/bedroom/1.png', alt: 'Image 1', clickCount: 0 },
   { id: 2, src: '../../src/assets/environmentMaps/0/1/pz.png', alt: 'Image 1', clickCount: 0},
  { id: 3, src: '../../src/assets/environmentMaps/bedroom/2.jpeg', alt: 'Image 1', caption: "Modern", clickCount: 0 },
  { id: 4, src: '../../src/assets/environmentMaps/bedroom/3.jpeg', alt: 'Image 1', clickCount: 0 },
  { id: 5, src: '../../src/assets/environmentMaps/bedroom/4.jpeg', alt: 'Image 1', clickCount: 0 },
  { id: 6, src: '../../src/assets/environmentMaps/bedroom/5.avif', alt: 'Image 1', clickCount: 0 },
  { id: 7, src: '../../src/assets/environmentMaps/bedroom/6.jpeg', alt: 'Image 1', clickCount: 0 },
  // { id: 8, src: '../../src/assets/environmentMaps/bedroom/7.jpeg', alt: 'Image 1', clickCount: 0 },
  // { id: 9, src: '../../src/assets/environmentMaps/bedroom/8.webp', alt: 'Image 1', clickCount: 0 },
  // { id: 10, src: '../../src/assets/environmentMaps/bedroom/1.png', alt: 'Image 1', clickCount: 0 },
  // { id: 11, src: '../../src/assets/environmentMaps/bedroom/2.jpeg', alt: 'Image 1', clickCount: 0 },
  // { id: 12, src: '../../src/assets/environmentMaps/bedroom/4.jpeg', alt: 'Image 1', clickCount: 0 },
  // { id: 13, src: '../../src/assets/environmentMaps/bedroom/5.avif', alt: 'Image 1', clickCount: 0 },
  // { id: 14, src: '../../src/assets/environmentMaps/bedroom/6.jpeg', alt: 'Image 1', clickCount: 0 },
  // { id: 15, src: '../../src/assets/environmentMaps/bedroom/7.jpeg', alt: 'Image 1', clickCount: 0 },
  // { id: 16, src: '../../src/assets/environmentMaps/bedroom/8.webp', alt: 'Image 1', clickCount: 0 },
 ];


function BedroomPage() {
  const { user } = useAuth();
  const [hoveredImageIndex, setHoveredImageIndex] = useState(null);
  const [roomArray,setRoomArray] = useState([])
  const [likedImages, setLikedImages] = useState(new Array(roomArray.length).fill(false));
  const [imagesWithStyles, setImagesWithStyles] = useState([])
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const handleImageClick = (image, index) => {
    document.body.style.overflow = 'hidden';
    const updatedImages = [...imagesWithStyles];
    //updatedImages[index].clickCount += 1;
    setImagesWithStyles(updatedImages);
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
        clickCount: image.clickCount || 0,  
        style: <StylesComponent seed={index} />,
    }));
    setImagesWithStyles(newImagesWithStyles);
}, []);

const toggleLike = async (index) => {
  const newLikedImages = [...likedImages];
  newLikedImages[index] = !newLikedImages[index];
  setLikedImages(newLikedImages);

  if (newLikedImages[index]) {
    const roomId = imagesWithStyles[index].id;
    await sendLikeData(user, roomId);
  }
};

const sendLikeData = async (user, roomId) => {
  try {
    const response = await axios.post('http://localhost:5000/likes', { user_id: user, room_id: roomId });

    if (!response.data) {
      throw new Error('Failed to send data');
    }

    console.log('Like created', response.data);
  } catch (error) {
    console.error("There was an error sending data:", error);
  }
};

useEffect(() => {
  async function callRoomImages(){
    const call = await axios.get("http://localhost:5000/rooms").then(data => {
      const rooms = data.data.rooms
      const tempArr = []
      let counter = 0
      for(let i=0;i<rooms.length;i++){
        if(rooms[i].category === "Bedroom"){
            // rooms[i].src = rooms[i].cover_image
          rooms[i].src = bedroomImages[counter].src
          rooms[i].alt = 'Image 1'
          tempArr.push(rooms[i])
          counter += 1
        }
      }
      setRoomArray(tempArr)
    })

  }
  callRoomImages()
},[])


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

  // for(let img of pageRefs.current){
  //   console.log(img.current.src);
  // }

  return () => {
    window.removeEventListener('wheel', handleScroll);
  };
}, [selectedImage]);



  return (
    <div className='overflow-hiding'>
        <div className='title-section'>
      <h1 className='room-title'>Bedroom Inspiration</h1>
      <BackButton backTo="/explore" label="Back to Explore" />
      </div>
    
    <div className={`bedroom-page${selectedImage ? ' dimmed' : ''}`}>
      {roomArray.map((image, index) => (
    <div className="bedroom__item-container" 
      key={index} 
      onClick={() => handleImageClick(image, index)}
      onMouseEnter={() => setHoveredImageIndex(image.id)}
      onMouseLeave={() => setHoveredImageIndex(null)}
    >
    <img className='bedroom__item' src={image.src} alt={image.alt} />
    <div className="bedroom__item-caption">{image.name}
    {hoveredImageIndex == image.id && (
      <div className="icon-container">
    
        <div className="heart-container" onClick={(e) => { e.stopPropagation(); toggleLike(image.id); }}>
          <Heart isClick={likedImages[image.id]} />
        </div>
        
        <div className="click-count">
          <AiFillEye />
          <span> {image.clickCount}</span>
        </div>
      </div>
    )}</div>
    
    
  </div>
))}


      {selectedImage && (
        <div className="fullscreen-div">
        <div className="fullscreen-content">
            <Room mapSet="bedroom" initialMapIndex={selectedImageIndex} />
            <button className="close-button" onClick={handleCloseClick}><GrClose /></button>
        </div>
    </div>
      )}
    </div>
    </div>
  );
}

export default BedroomPage;
