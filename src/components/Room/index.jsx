import React, { useState, useEffect, useRef } from 'react';
import EnvironmentMap from '../EnvironmentMaps';
import { AuthProvider } from '../../contexts';
import { BlobToImage } from "../../components"

const Room = ( {mapSet, initialMapIndex = 0, user_id, room_name, roomType} ) => {
  const [currentMapIndex, setCurrentMapIndex] = useState(initialMapIndex);
  const pageRefs = useRef([React.createRef(),React.createRef(),React.createRef(),React.createRef(),React.createRef(),React.createRef(),])
  const imageURLs = [
    `https://res.cloudinary.com/de2nposrf/image/upload/v1697033232/${roomType}/${user_id}/${room_name}/px.png`,
    `https://res.cloudinary.com/de2nposrf/image/upload/v1697033232/${roomType}/${user_id}/${room_name}/nx.png`,
    `https://res.cloudinary.com/de2nposrf/image/upload/v1697033232/${roomType}/${user_id}/${room_name}/py.png`,
    `https://res.cloudinary.com/de2nposrf/image/upload/v1697033232/${roomType}/${user_id}/${room_name}/ny.png`,
    `https://res.cloudinary.com/de2nposrf/image/upload/v1697033232/${roomType}/${user_id}/${room_name}/pz.png`,
    `https://res.cloudinary.com/de2nposrf/image/upload/v1697033232/${roomType}/${user_id}/${room_name}/nz.png`,
]

  const [mapset,setMapSet] = useState([])

  const [loadedVar,setLoadedVar] = useState(false)


  const loading = [
    "https://res.cloudinary.com/de2nposrf/image/upload/v1697042090/static/loading/loading.png",
    "https://res.cloudinary.com/de2nposrf/image/upload/v1697042090/static/loading/loading.png",
    "https://res.cloudinary.com/de2nposrf/image/upload/v1697042090/static/loading/loading.png",
    "https://res.cloudinary.com/de2nposrf/image/upload/v1697042090/static/loading/loading.png",
    "https://res.cloudinary.com/de2nposrf/image/upload/v1697042090/static/loading/loading.png",
    "https://res.cloudinary.com/de2nposrf/image/upload/v1697042090/static/loading/loading.png",
  ]

  const prevMap = () => {
    setCurrentMapIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : maps.length - 1));
};

const nextMap = () => {
    setCurrentMapIndex((prevIndex) => (prevIndex < maps.length - 1 ? prevIndex + 1 : 0));
};


  useEffect(() => {
    setMapSet([])
    const sortedArray = []

    const posPositions = ["px","nx","py","ny","pz","nz"]
    const imgs = pageRefs.current
    const arr = []
    try {
      if(!loadedVar){
        console.log("LOADING...");
      }else{
        console.log("LOADED")

        posPositions.forEach(order => {
          let matchingImg;
          for(let img of imgs){
            if(img.current.alt.split("/")[1] === order){
              matchingImg = img              
            }
            
          }
          if(matchingImg && !arr.includes(matchingImg.current.alt)){
            sortedArray.push(matchingImg.current.src)
            arr.push(matchingImg.current.alt)
          }
        })
        setMapSet(sortedArray)
      }
      console.log(arr);
    } catch (error) {
      console.log("Damn it",error);
    }
  },[loadedVar])

  return (
    <div className="environment-map-grid">
      {}
      {/* <BlobToImage image_id={initialMapIndex} refs={pageRefs} loadedFunc={setLoadedVar} room_name={room_name} roomType={roomType}/> */}
      <button className='left-arrow' onClick={prevMap}>←</button>  
        <EnvironmentMap roomId={initialMapIndex} mapUrls={mapset ? imageURLs : loading} />
      <button className='right-arrow' onClick={nextMap}>→</button> 
    </div>
  );
};

export default Room;



 








