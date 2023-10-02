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

function getSeededRandom(seed) {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

function getRandomStyle(seed) {
  const randomIndex = Math.floor(getSeededRandom(seed) * stylesList.length);
  return stylesList[randomIndex];
}

const StylesComponent = ({ seed }) => {
  
    const [currentStyle, setCurrentStyle] = useState(() => getRandomStyle(seed));

    return (
        <div>
            {currentStyle}
        </div>
    );
}

export default StylesComponent;
