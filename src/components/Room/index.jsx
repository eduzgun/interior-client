import React, { useState,useRef } from 'react';
import EnvironmentMap from '../EnvironmentMaps';
import { AuthProvider } from '../../contexts';


const Room = ( {mapSet, initialMapIndex = 0} ) => {
  const [currentMapIndex, setCurrentMapIndex] = useState(initialMapIndex);


  const mapSets = {
    bedroom: [
      ['../../src/assets/environmentMaps/0/px.png',
       '../../src/assets/environmentMaps/0/nx.png',
        '../../src/assets/environmentMaps/0/py.png',
        '../../src/assets/environmentMaps/0/ny.png',
      '../../src/assets/environmentMaps/0/pz.png',
        '../../src/assets/environmentMaps/0/nz.png'],
        ['../../src/assets/environmentMaps/0/1/px.png',
       '../../src/assets/environmentMaps/0/1/nx.png',
        '../../src/assets/environmentMaps/0/1/py.png',
        '../../src/assets/environmentMaps/0/1/ny.png',
      '../../src/assets/environmentMaps/0/1/pz.png',
        '../../src/assets/environmentMaps/0/1/nz.png']
    ],
    studio: [
      ['../../src/assets/environmentMaps/2/px.png',
       '../../src/assets/environmentMaps/2/nx.png',
        '../../src/assets/environmentMaps/2/py.png',
        '../../src/assets/environmentMaps/2/ny.png',
      '../../src/assets/environmentMaps/2/pz.png',
        '../../src/assets/environmentMaps/2/nz.png'],
    ],

    garden: [
      ['../../src/assets/environmentMaps/3/px.png',
       '../../src/assets/environmentMaps/3/nx.png',
        '../../src/assets/environmentMaps/3/py.png',
        '../../src/assets/environmentMaps/3/ny.png',
      '../../src/assets/environmentMaps/3/pz.png',
        '../../src/assets/environmentMaps/3/nz.png'],
    ],

    kitchen: [
      ['../../src/assets/environmentMaps/2/px.png',
       '../../src/assets/environmentMaps/2/nx.png',
        '../../src/assets/environmentMaps/2/py.png',
        '../../src/assets/environmentMaps/2/ny.png',
      '../../src/assets/environmentMaps/2/pz.png',
        '../../src/assets/environmentMaps/2/nz.png'],
    ],

    bathroom: [
      ['../../src/assets/environmentMaps/5/px.png',
       '../../src/assets/environmentMaps/5/nx.png',
        '../../src/assets/environmentMaps/5/py.png',
        '../../src/assets/environmentMaps/5/ny.png',
      '../../src/assets/environmentMaps/5/pz.png',
        '../../src/assets/environmentMaps/5/nz.png'],
    ],

    living: [
      ['../../src/assets/environmentMaps/6/px.png',
       '../../src/assets/environmentMaps/6/nx.png',
        '../../src/assets/environmentMaps/6/py.png',
        '../../src/assets/environmentMaps/6/ny.png',
      '../../src/assets/environmentMaps/6/pz.png',
        '../../src/assets/environmentMaps/6/nz.png'],
    ],
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
      <AuthProvider>
        <EnvironmentMap mapUrls={maps[currentMapIndex]} />
      </AuthProvider>
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








