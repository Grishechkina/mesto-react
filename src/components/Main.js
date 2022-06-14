import React from 'react';
import api from '../utils/api'
import Card from './Card'

function Main(props) {
  const [userName, setUserName] = React.useState('');
  const [userDescription, setUserDescription] = React.useState('');
  const [userAvatar, setUserAvatar] = React.useState('');
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, cards]) => {
        setUserName(userData.name)
        setUserDescription(userData.about)
        setUserAvatar(userData.avatar)

        setCards(cards)
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <main className="content page__content">
      <section className="profile">
        <div className="profile__avatar-container">
          <img alt="Аватарка пользователя" className="profile__avatar" src={userAvatar} />
          <div className="profile__overlay" onClick={props.onEditAvatar}></div>
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{userName}</h1>
          <button className="profile__edit-btn" onClick={props.onEditProfile}></button>
          <p className="profile__activity">{userDescription}</p>
        </div>
        <button className="profile__add-btn" onClick={props.onAddPlace}></button>
      </section>.

      <section className="cards">
        <ul className="cards__list">
          {cards.map(card => (
            <Card card={card} key={card._id} onCardClick={props.onCardClick} />
          ))}
        </ul>
      </section>
    </main>
  )
}

export default Main