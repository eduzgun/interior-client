import React, { useState } from 'react';
import EnvironmentMap from '../EnvironmentMaps';


const Room = ( {mapSet} ) => {
  const [currentMapIndex, setCurrentMapIndex] = useState(0);

  const mapSets = {
    bedroom: [
      ['../../src/assets/environmentMaps/0/px.png',
       '../../src/assets/environmentMaps/0/nx.png',
        '../../src/assets/environmentMaps/0/py.png',
        '../../src/assets/environmentMaps/0/ny.png',
      '../../src/assets/environmentMaps/0/pz.png',
        '../../src/assets/environmentMaps/0/nz.png']
    ],
    kitchen: [
      ['../../src/assets/environmentMaps/2/px.png',
       '../../src/assets/environmentMaps/2/nx.png',
        '../../src/assets/environmentMaps/2/py.png',
        '../../src/assets/environmentMaps/2/ny.png',
      '../../src/assets/environmentMaps/2/pz.png',
        '../../src/assets/environmentMaps/2/nz.png'],
    ]
  }

  const maps = mapSets[mapSet] || mapSets.bedroom;

  const prevMap = () => {
    setCurrentMapIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : maps.length - 1));
  };

  const nextMap = () => {
    setCurrentMapIndex((prevIndex) => (prevIndex < maps.length - 1 ? prevIndex + 1 : 0));
  };

  return (
    <div className="environment-map-grid">
      <button className='left-arrow' onClick={prevMap}>←</button>  
      <EnvironmentMap mapUrls={maps[currentMapIndex]} />
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








