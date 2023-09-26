import React from 'react';
import EnvironmentMap from '../EnvironmentMaps';

const Room = () => {
  
  const maps = [
 ['../../src/assets/environmentMaps/0/px.png',
    '../../src/assets/environmentMaps/0/nx.png',
    '../../src/assets/environmentMaps/0/py.png',
    '../../src/assets/environmentMaps/0/ny.png',
    '../../src/assets/environmentMaps/0/pz.png',
    '../../src/assets/environmentMaps/0/nz.png'],
    ['../../src/assets/environmentMaps/2/px.png',
    '../../src/assets/environmentMaps/2/nx.png',
    '../../src/assets/environmentMaps/2/py.png',
    '../../src/assets/environmentMaps/2/ny.png',
    '../../src/assets/environmentMaps/2/pz.png',
    '../../src/assets/environmentMaps/2/nz.png'],
]

  return (
    <div className="environment-map-grid">
      {maps.map((mapUrls, index) => (
        <EnvironmentMap key={index} mapUrls={mapUrls} />
      ))}
      
    </div>
  );
};

export default Room;






