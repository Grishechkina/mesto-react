import React from 'react';

function PopupWithForm(props) {
  return (
    <div className={`pop-up ${props.popupName}${props.isOpen ? ' pop-up_opened' : ''}`} onClick={props.onClose}>
      <div className="pop-up__container" >
        <button className="pop-up__close-btn" onClick={props.onClose}></button>
        <h2 className="pop-up__title">{props.popupHeader}</h2>
        <form className={`pop-up__${props.formName} form`} name={props.formName} noValidate>
          {props.children}
          <button className="form__save-btn classic-btn" type="submit">
            Сохранить
          </button>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm