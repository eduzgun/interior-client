import React, { useState, useEffect, useRef } from 'react';
import EnvironmentMap from '../EnvironmentMaps';
import { AuthProvider } from '../../contexts';
import { BlobToImage } from "../../components"


const Room = ( {mapSet, initialMapIndex = 0, room_id} ) => {
  const [currentMapIndex, setCurrentMapIndex] = useState(initialMapIndex);

  const pageRefs = useRef([React.createRef(),React.createRef(),React.createRef(),React.createRef(),React.createRef(),React.createRef(),])

  const [mapset,setMapSet] = useState([])

  const [loadedVar,setLoadedVar] = useState(false)


  const loading = [
    "../../src/assets/environmentMaps/loading/px.png",
    "../../src/assets/environmentMaps/loading/nx.png",
    "../../src/assets/environmentMaps/loading/py.png",
    "../../src/assets/environmentMaps/loading/ny.png",
    "../../src/assets/environmentMaps/loading/pz.png",
    "../../src/assets/environmentMaps/loading/nz.png",
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
    } catch (error) {
      console.log("Damn it",error);
    }
  },[loadedVar])

  return (
    <div className="environment-map-grid">
      {  }
      <BlobToImage image_id={initialMapIndex} refs={pageRefs} loadedFunc={setLoadedVar}/>
      <button className='left-arrow' onClick={prevMap}>←</button>  
        {/* <EnvironmentMap roomId={13} mapUrls={mapset.length == 6 ? mapset : maps[currentMapIndex]} /> */}
        <EnvironmentMap roomId={initialMapIndex} mapUrls={mapset.length == 6 ? mapset : loading} />
        {/* <EnvironmentMap mapUrls={maps[currentMapIndex]} /> */}
      <button className='right-arrow' onClick={nextMap}>→</button> 
    </div>
  );
};

export default Room;



 








