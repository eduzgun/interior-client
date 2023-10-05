import React, {useState, useEffect,useRef } from 'react';
import { Room, StylesComponent, BackButton,BlobToImage } from '../../components'
import { Link } from 'react-router-dom';
import Heart from "react-animated-heart";
import { AiFillEye } from 'react-icons/ai'
import './explore.css'
import { useAuth } from '../../contexts';
import axios from 'axios';
import {GrClose} from 'react-icons/gr'

const kitchenImages = [
  { src: '../../src/assets/environmentMaps/kitchen/1.png', alt: 'Image 1' },
  { src: '../../src/assets/environmentMaps/kitchen/2.webp', alt: 'Image 1' },
  { src: '../../src/assets/environmentMaps/kitchen/3.jpeg', alt: 'Image 1' },
  { src: '../../src/assets/environmentMaps/kitchen/4.jpeg', alt: 'Image 1' },
   { src: '../../src/assets/environmentMaps/kitchen/5.jpeg', alt: 'Image 1' },
//   { src: '../../src/assets/environmentMaps/kitchen/6.jpeg', alt: 'Image 1' },
//   { src: '../../src/assets/environmentMaps/kitchen/7.jpeg', alt: 'Image 1' },
//   { src: '../../src/assets/environmentMaps/kitchen/8.png', alt: 'Image 1' },
// //   { src: '../../src/assets/environmentMaps/kitchen/9.png', alt: 'Image 1' },
  
];

function KitchenPage() {
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

    const newImagesWithStyles = roomArray.map((image, index) => ({
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

useEffect(() => {
  async function callRoomImages(){
    const call = await axios.get("http://localhost:5000/rooms").then(data => {
      const rooms = data.data.rooms
      const tempArr = []
      let counter = 0
      for(let i=0;i<rooms.length;i++){
        if(rooms[i].category === "Kitchen"){
            // rooms[i].src = rooms[i].cover_image
          rooms[i].src = kitchenImages[counter].src
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

return (
  <div className='overflow-hiding'>
      <div className='title-section'>
    <h1 className='room-title'>Bedroom Inspiration</h1>
    <BackButton backTo="/explore" label="Back to Explore" />
    </div>
  
  <div className={`kitchen-page${selectedImage ? ' dimmed' : ''}`}>
    {roomArray.map((image, index) => (
  <div className="kitchen__item-container" 
    key={index} 
    onClick={() => handleImageClick(image, index)}
    onMouseEnter={() => setHoveredImageIndex(image.id)}
    onMouseLeave={() => setHoveredImageIndex(null)}
  >
  <img className='kitchen__item' src={image.src} alt={image.alt} />
  <div className="kitchen__item-caption">{image.name}
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

export default KitchenPage;





























