import React, { useState } from 'react';
import EnvironmentMap from '../EnvironmentMaps';
import { AuthProvider } from '../../contexts';


const Room = ( {mapSet, initialMapIndex = 0} ) => {
  const [currentMapIndex, setCurrentMapIndex] = useState(initialMapIndex);

  const mapSets = {
    bedroom: {
      id: 1, 
      maps: [
      {id: 101, images: ['../../src/assets/environmentMaps/0/px.png',
       '../../src/assets/environmentMaps/0/nx.png',
        '../../src/assets/environmentMaps/0/py.png',
        '../../src/assets/environmentMaps/0/ny.png',
      '../../src/assets/environmentMaps/0/pz.png',
        '../../src/assets/environmentMaps/0/nz.png']},
        {id: 102, images:['../../src/assets/environmentMaps/0/1/px.png',
       '../../src/assets/environmentMaps/0/1/nx.png',
        '../../src/assets/environmentMaps/0/1/py.png',
        '../../src/assets/environmentMaps/0/1/ny.png',
      '../../src/assets/environmentMaps/0/1/pz.png',
        '../../src/assets/environmentMaps/0/1/nz.png']}
    ]
  },

    studio: {
      id: 2, 
      maps:[
      {id: 201, images:['../../src/assets/environmentMaps/2/px.png',
       '../../src/assets/environmentMaps/2/nx.png',
        '../../src/assets/environmentMaps/2/py.png',
        '../../src/assets/environmentMaps/2/ny.png',
      '../../src/assets/environmentMaps/2/pz.png',
        '../../src/assets/environmentMaps/2/nz.png']}
    ]
  },

    garden: {
      id: 3, 
      maps:[
      {id: 301, images:['../../src/assets/environmentMaps/3/px.png',
       '../../src/assets/environmentMaps/3/nx.png',
        '../../src/assets/environmentMaps/3/py.png',
        '../../src/assets/environmentMaps/3/ny.png',
      '../../src/assets/environmentMaps/3/pz.png',
        '../../src/assets/environmentMaps/3/nz.png']}
    ]
  },

    kitchen: {
      id: 4, 
      maps:[
      {id: 401, images:['../../src/assets/environmentMaps/2/px.png',
       '../../src/assets/environmentMaps/2/nx.png',
        '../../src/assets/environmentMaps/2/py.png',
        '../../src/assets/environmentMaps/2/ny.png',
      '../../src/assets/environmentMaps/2/pz.png',
        '../../src/assets/environmentMaps/2/nz.png']}
    ]
  },

    bathroom: {
      id: 5, 
      maps:[
      {id: 501, images:
      ['../../src/assets/environmentMaps/5/px.png',
       '../../src/assets/environmentMaps/5/nx.png',
        '../../src/assets/environmentMaps/5/py.png',
        '../../src/assets/environmentMaps/5/ny.png',
      '../../src/assets/environmentMaps/5/pz.png',
        '../../src/assets/environmentMaps/5/nz.png']}
    ]
  },

    living: {
      id: 6, 
      maps:[
      {id: 601, images:
      ['../../src/assets/environmentMaps/6/px.png',
       '../../src/assets/environmentMaps/6/nx.png',
        '../../src/assets/environmentMaps/6/py.png',
        '../../src/assets/environmentMaps/6/ny.png',
      '../../src/assets/environmentMaps/6/pz.png',
        '../../src/assets/environmentMaps/6/nz.png']}
    ]
  },
}

  const roomId = mapSets[mapSet]?.id || mapSets.bedroom.id;
const maps = mapSets[mapSet]?.maps || mapSets.bedroom.maps;




  const prevMap = () => {
    setCurrentMapIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : maps.length - 1));
};

const nextMap = () => {
    setCurrentMapIndex((prevIndex) => (prevIndex < maps.length - 1 ? prevIndex + 1 : 0));
};


  return (
    <div className="environment-map-grid">
      <button className='left-arrow' onClick={prevMap}>←</button>  
     <EnvironmentMap mapUrls={maps[currentMapIndex].images} roomId={roomId} />

      <button className='right-arrow' onClick={nextMap}>→</button> 
    </div>
  );
};

export default Room;



  // const maps = useBedroomMaps ? [
  //   ['../../src/assets/environmentMaps/0/px.png',
  //     '../../src/assets/environmentMaps/0/nx.png',
  //     '../../src/assets/environmentMaps/0/py.png',
  //     '../../src/assets/environmentMaps/0/ny.png',
  //     '../../src/assets/environmentMaps/0/pz.png',
  //     '../../src/assets/environmentMaps/0/nz.png'],
  //   ['../../src/assets/environmentMaps/2/px.png',
  //     '../../src/assets/environmentMaps/2/nx.png',
  //     '../../src/assets/environmentMaps/2/py.png',
  //     '../../src/assets/environmentMaps/2/ny.png',
  //     '../../src/assets/environmentMaps/2/pz.png',
  //     '../../src/assets/environmentMaps/2/nz.png'],
  // ];








