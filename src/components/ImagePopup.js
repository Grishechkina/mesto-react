import React from 'react';

function ImagePopup({card, onClose}) {
  return (
    <div className={`pop-up img-pop-up${Object.keys(card).length > 0 ? ' pop-up_opened' : ''}`} onClick={onClose}>
      <figure className="img-pop-up__container">
        <button className="pop-up__close-btn" onClick={onClose}></button>
        <img className="img-pop-up__photo" src={card.link} alt={card.name}/>
        <figcaption className="img-pop-up__title">{card.name}</figcaption>
      </figure>
    </div>
  )
}

export default ImagePopup