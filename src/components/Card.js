import React from 'react';

function Card({ card, onCardClick }) {

  function handleClick() {
    onCardClick(card);
  }
  return (
    <li className="card" onClick={handleClick}>
      <button className="card__delete-btn"></button>
      <img className="card__photo" src={card.link} alt={card.name}/>
      <div className="card__place">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__like">
          <button className="card__like-btn"></button>
          <span className="card__like-counter">{card.likes.length ? card.likes.length : ''}</span>
        </div>
      </div>
    </li>
  )
}

export default Card