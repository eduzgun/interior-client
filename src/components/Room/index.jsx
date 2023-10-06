import React, { useState, useEffect, useRef } from 'react';
import EnvironmentMap from '../EnvironmentMaps';
import { AuthProvider } from '../../contexts';
import { BlobToImage } from "../../components"


const Room = ( {mapSet, initialMapIndex = 0, room_id} ) => {
  const [currentMapIndex, setCurrentMapIndex] = useState(initialMapIndex);

  const pageRefs = useRef([React.createRef(),React.createRef(),React.createRef(),React.createRef(),React.createRef(),React.createRef(),])

  const [mapset,setMapSet] = useState([])

  const [loadedVar,setLoadedVar] = useState(false)


  const [arr, setArr] = useState([]);
const [sortedArray, setSortedArray] = useState([]);
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
  setMapSet([]);
  const posPositions = ["px", "nx", "py", "ny", "pz", "nz"];
  const imgs = pageRefs.current;
  const arr = new Set(); // Use a Set to ensure unique values
  let sortedArray = posPositions.map((position) => "");

  try {
    if (!loadedVar) {
      console.log("LOADING...");
    } else {
      console.log("LOADED");

      imgs.forEach((img) => {
        const altValue = img.current.alt;
        const order = altValue.split("/").pop().split(".")[0];
        const index = posPositions.indexOf(order);

        if (index !== -1 && !arr.has(altValue)) {
          console.log("MATCHING IMG CURRENT", img.current);
          sortedArray[index] = img.current.src;
          arr.add(altValue);
        }
      });

      console.log("arr:", Array.from(arr)); // Convert Set to Array for logging
      console.log("sortedArray:", sortedArray);
      setMapSet(sortedArray);
    }
  } catch (error) {
    console.log("Damn it", error);
  }
}, [loadedVar]);


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



 








