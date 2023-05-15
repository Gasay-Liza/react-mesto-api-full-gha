import React from 'react';
import PopupWithForm from "./PopupWithForm";
import {CurrentUserContext} from "../contexts/CurrentUserContext";



function EditProfilePopup({isOpen, onClose, onUpdateUser, isLoading}) {
    const [name, setName] = React.useState("Жак-Ив Кусто");
    const [description, setDescription] = React.useState("Исследователь океана");
    const currentUser = React.useContext(CurrentUserContext);

    function handleSubmit(e) {
        e.preventDefault();

        // Передаём значения управляемых компонентов во внешний обработчик
        onUpdateUser({
            name,
            about: description,
        });
    }

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeDescription(e) {
        setDescription(e.target.value);
    }

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser,isOpen]);


    return (
        <PopupWithForm
            name={'edit-profile'}
            title={'Редактировать профиль'}
            buttonText={isLoading? 'Сохранение...' : 'Сохранить'}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <label htmlFor="username" className="popup__label">
                <input
                    placeholder="Введите ваше имя"
                    className="popup__input popup__input_field_name"
                    type="text"
                    name="username"
                    id="username"
                    minLength={2}
                    maxLength={40}
                    required=""
                    value={name || ''}
                    onChange={handleChangeName}
                />
                <span className="popup__error" id="username-error"/>
            </label>
            <label htmlFor="info" className="popup__label">
                <input
                    placeholder="Чем Вы занимаетесь?"
                    className="popup__input popup__input_field_info"
                    type="text"
                    name="info"
                    id="info"
                    minLength={2}
                    maxLength={200}
                    required=""
                    value={description  || ''}
                    onChange={handleChangeDescription}
                />
                <span className="popup__error" id="info-error"/>
            </label>
        </PopupWithForm>
    );
}

export default EditProfilePopup;