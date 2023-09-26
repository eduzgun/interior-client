import React, { useState } from 'react';

function Marker({ label, text }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
        className="point" 
        onMouseEnter={() => setIsHovered(true)} 
        onMouseLeave={() => setIsHovered(false)}
    >
        <div className="label">{label}</div>
        <div className={`text ${isHovered ? 'visible' : ''}`}>
            {text}
            {isHovered && (
                <button className="like-button">
                    Like
                </button>
            )}
        </div>
    </div>
  );
}

export default Marker;
