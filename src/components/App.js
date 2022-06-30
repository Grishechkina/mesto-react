import React from 'react';
import '../index.css';
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import ImagePopup from './ImagePopup'
import ConfirmPopup from './ConfirmPopup'
import EditProfilePopup from './EditProfilePopup'
import EditAvatarPopup from './EditAvatarPopup' 
import AddPlacePopup from './AddPlacePopup'
import api from '../utils/api'
import { CurrentUserContext } from '../contexts/CurrentUserContext'

function App() {

  const [currentUser, setCurrentUser] = React.useState({});

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api.getUserInfo()
      .then((userData) => {
        setCurrentUser(userData)
      })
      .catch(err => console.log(err));

    api.getInitialCards()
      .then((cards) => {
        setCards(cards)
      })
      .catch(err => console.log(err));
  }, [])

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.handleLike(card._id, isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    });
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id).then(() => {
      setCards((state) => state.filter((c) => c._id !== card._id));
    });
  }

  function handleUpdateUser(user) {
    api.editUserInfo(user)
      .then(res => setCurrentUser(res))
  }

  function handleUpdateAvatar(avatarLink) {
    api.changeAvatar(avatarLink)
      .then(res => setCurrentUser(res))
  }

  function handleAddPlace(place) {
    api.addNewCard(place)
      .then(res => setCards([res, ...cards]))
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }
  function handleCardClick(card) {
    setSelectedCard(card)
  }
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setSelectedCard({})
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Main
          onAddPlace={handleAddPlaceClick}
          onEditProfile={handleEditProfileClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete} />
        <Footer />
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlace} />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <ConfirmPopup title="Вы уверены?" btnText="Да" />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
