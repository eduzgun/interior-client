// marker component:
import React, { forwardRef, useState } from 'react';

const Marker = forwardRef(({ label, text }, ref) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div ref={ref} 
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
});

export default Marker;
