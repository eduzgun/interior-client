import React from 'react';
import { Link } from 'react-router-dom';
import './style.css'; 
import { motion } from 'framer-motion'; 

const ExploreItems = () => {
  const items = [
    { image: '../../src/assets/environmentMaps/bedroom.png', title: 'Bedroom', link: '/bedroom' },
    { image: '../../src/assets/environmentMaps/studio.png', title: 'Studio', link: '/studio' },  
    { image: '../../src/assets/environmentMaps/kitchen.png', title: 'Kitchen', link: '/kitchen' },
    { image: '../../src/assets/environmentMaps/garden.png', title: 'Garden', link: '/garden' }, 
     { image: '../../src/assets/environmentMaps/bathroom.png', title: 'Bathroom', link: '/bathroom' }, 
     { image: '../../src/assets/environmentMaps/living.png', title: 'Living', link: '/living' }, 
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      style={{ minHeight: '100vh', backgroundColor: 'black' }}
    >
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
    </motion.div>
  );
};

export default ExploreItems;
