import React from 'react';
import Heart from "react-animated-heart";

function ImageBox({ image, style, onImageClick, index, isLiked, toggleLike }) {
  return (
    <div className="bedroom__item-container" onClick={() => onImageClick(image, index)}>
      <img className='bedroom__item' src={image.src} alt={image.alt} />
      <div className="bedroom__item-caption">{style}</div>
      
      <div className="heart-container" onClick={(e) => { e.stopPropagation(); toggleLike(index); }}>
        <Heart isClick={isLiked} />
      </div>
    </div>
  );
}

export default ImageBox;
