import React from 'react';
import '../index.css';
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup'
import ConfirmPopup from './ConfirmPopup'

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});


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
      <Header />
      <Main 
        onAddPlace={handleAddPlaceClick} 
        onEditProfile={handleEditProfileClick}
        onEditAvatar={handleEditAvatarClick} 
        onCardClick={handleCardClick} />
      <Footer />
      <PopupWithForm 
        popupHeader="Редактировать профиль" 
        popupName="edit-pop-up"
        formName="profile-edit-form" 
        isOpen={isEditProfilePopupOpen} 
        onClose={closeAllPopups}>
        <label className="form__field">
          <input type="text" id="name" name="name" placeholder="Имя" className="form__input" required minLength="2" maxLength="40" />
          <span className="name-input-error form__input-error"/>
        </label>
        <label className="form__field">
          <input type="text" id="activity" name="activity" placeholder="О себе" className="form__input" required minLength="2" maxLength="200" />
          <span className="activity-input-error form__input-error"/>
        </label>
      </PopupWithForm>
      <PopupWithForm 
        popupHeader="Обновить аватар" 
        popupName="edit-avatar-pop-up"
        formName="avatar-edit-form"
        isOpen={isEditAvatarPopupOpen} 
        onClose={closeAllPopups}>
        <label className="form__field">
          <input type="url" id="ava-link" name="link" placeholder="Ссылка на аву" className="form__input" required />
          <span className="link-input-error form__input-error"/>
        </label>
      </PopupWithForm>

      <PopupWithForm 
        popupHeader="Новое место" 
        popupName="add-card-pop-up"
        formName="add-card-form" 
        isOpen={isAddPlacePopupOpen} 
        onClose={closeAllPopups}>
        <label className="form__field">
          <input type="text" id="place" name="name" placeholder="Название" className="form__input" required minLength="2" maxLength="30" />
          <span className="name-input-error form__input-error"/>
        </label>
        <label className="form__field">
          <input type="url" id="link" name="link" placeholder="Ссылка на картинку" className="form__input" required />
          <span className="link-input-error form__input-error"/>
        </label>
      </PopupWithForm>
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      <ConfirmPopup title="Вы уверены?" btnText="Да" />
    </div>
  );
}

export default App;
