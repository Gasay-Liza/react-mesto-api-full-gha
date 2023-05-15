import React from 'react';
import PopupWithForm from "./PopupWithForm";


function AddPlacePopup({isOpen, onClose, onAddPlace, isLoading}) {
    const [link, setLink] = React.useState("");
    const [name, setName] = React.useState("");
    function handleAddPlaceSubmit(e) {
        e.preventDefault();

        onAddPlace({
            name,
            link
        });
    }
    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeLink(e) {
        setLink(e.target.value);
    }
    return (
        <PopupWithForm
            name={'add-card'}
            title={'Новое место'}
            buttonText={isLoading? 'Сохранение...' : 'Сохранить'}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleAddPlaceSubmit}
        >
            <label htmlFor="name" className="popup__label">
                <input
                    placeholder="Название"
                    className="popup__input popup__input_field_card-name"
                    type="text"
                    name="name"
                    id="name"
                    minLength={2}
                    maxLength={30}
                    required
                    value={name || ''}
                    onChange={handleChangeName}
                />
                <span className="popup__error" id="name-error"/>
            </label>
            <label htmlFor="link" className="popup__label">
                <input
                    placeholder="Ссылка на картинку"
                    className="popup__input popup__input_field_card-image"
                    type="url"
                    name="link"
                    id="link"
                    required
                    value={link || ''}
                    onChange={handleChangeLink}
                />
                <span className="popup__error" id="link-error"/>
            </label>
        </PopupWithForm>
    );
}

export default AddPlacePopup;