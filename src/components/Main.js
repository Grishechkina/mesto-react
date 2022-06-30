import React from 'react';
import api from '../utils/api'
import Card from './Card'
import { CurrentUserContext } from '../contexts/CurrentUserContext'

function Main(props) {

  const currentUser = React.useContext(CurrentUserContext);
  /*const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api.getInitialCards()
      .then((cards) => {
        setCards(cards)
      })
      .catch(err => console.log(err));
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.handleLike(card._id, isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    });
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id).then((newCard) => {
      setCards((state) => state.filter((c) => c._id !== card._id));
    });
  }*/

  return (
    <main className="content page__content">
      <section className="profile">
        <div className="profile__avatar-container" onClick={props.onEditAvatar}>
          <img alt="Аватарка пользователя" className="profile__avatar"
            src={currentUser.avatar} />
          <div className="profile__overlay"></div>
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button className="profile__edit-btn" onClick={props.onEditProfile}></button>
          <p className="profile__activity">{currentUser.about}</p>
        </div>
        <button className="profile__add-btn" onClick={props.onAddPlace}></button>
      </section>.

      <section className="cards">
        <ul className="cards__list">
          {props.cards.map(card => (
            <Card
              card={card}
              key={card._id}
              onCardClick={props.onCardClick}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete} />
          ))}
        </ul>
      </section>
    </main>
  )
}

export default Main