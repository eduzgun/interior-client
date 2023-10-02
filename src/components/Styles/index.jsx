import React, { useState } from 'react'

const stylesList = [
    'Minimalist',
    'Art Deco',
    'Modern',
    'Contemporary',
    'Industrial',
    'Mid-Century Modern',
    'Traditional',
    'Transitional',
    'Bohemian',
    'Rustic',
    'Shabby Chic',
    'Scandinavian',
    'Farmhouse',
    'Hollywood Glam',
    'Coastal',
    'French Country',
    'Victorian',
    'Mediterranean'
];

function getRandomStyle() {
  const randomIndex = Math.floor(Math.random() * stylesList.length);
  return stylesList[randomIndex];
}

const StylesComponent = () => {
  
    const [currentStyle, setCurrentStyle] = useState(getRandomStyle());

    const pickRandomStyle = () => {
    setCurrentStyle(getRandomStyle());
  };

  return (
    
    <div>{currentStyle}</div>
   
  )
}

export default StylesComponent;
