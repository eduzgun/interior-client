import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';  

const ExploreItems = () => {
  const items = [
    { image: '../../src/assets/environmentMaps/bedroom/1.png', title: 'Bedroom', link: '/bedroom' },
    { image: '../../src/assets/environmentMaps/studio.png', title: 'Studio', link: '/studio' },  
    { image: '../../src/assets/environmentMaps/kitchen/1.png', title: 'Kitchen', link: '/kitchen' },
    { image: '../../src/assets/environmentMaps/garden.png', title: 'Garden', link: '/garden' }, 
     { image: '../../src/assets/environmentMaps/bathroom.png', title: 'Bathroom', link: '/bathroom' }, 
     { image: '../../src/assets/environmentMaps/living.png', title: 'Living', link: '/living' }, 
  ];

  return (
    <div className="explore-container">
      {items.map((item, index) => (
        <Link key={index} to={item.link} className="explore-item">
          <img src={item.image} alt={item.title} className="explore-image" />
          <div className="overlay">
            <div className="title">{item.title}</div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ExploreItems;
