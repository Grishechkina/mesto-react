import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext'

function EditProfilePopup(props) {

  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState('');
  const [activity, setActivity] = React.useState('');

  React.useEffect(() => {
    if (currentUser.name && currentUser.about) {
      setName(currentUser.name);
      setActivity(currentUser.about);
    }

  }, [currentUser]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleActivityChange(e) {
    setActivity(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name,
      about: activity,
    });
    props.onClose()
  }

  function onClose() {
    if (currentUser.name && currentUser.about) {
      setName(currentUser.name);
      setActivity(currentUser.about);
    }
    props.onClose()
  }

  return (
    <PopupWithForm
      popupHeader="Редактировать профиль"
      popupName="edit-pop-up"
      formName="profile-edit-form"
      isOpen={props.isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}>
      <label className="form__field">
        <input type="text" id="name" name="name" placeholder="Имя" className="form__input"
          required minLength="2" maxLength="40" onChange={handleNameChange} value={name} />
        <span className="name-input-error form__input-error" />
      </label>
      <label className="form__field">
        <input type="text" id="activity" name="activity" placeholder="О себе" value={activity}
          className="form__input" required minLength="2" maxLength="200" onChange={handleActivityChange} />
        <span className="activity-input-error form__input-error" />
      </label>
    </PopupWithForm>
  )
}

export default EditProfilePopup