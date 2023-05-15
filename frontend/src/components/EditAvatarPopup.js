import React from 'react';
import PopupWithForm from "./PopupWithForm";



function EditProfilePopup({isOpen, onClose, onUpdateAvatar, isLoading}) {
    const linkRef = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();

        onUpdateAvatar({
            avatar: linkRef.current.value,
        });
    }

    return (
        <PopupWithForm
            name={'update-avatar'}
            title={'Обновить аватар'}
            buttonText={isLoading? 'Сохранение...' : 'Сохранить'}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <label htmlFor="avatar" className="popup__label">
                <input
                    ref={linkRef}
                    placeholder="Ссылка на новый аватар"
                    className="popup__input popup__input_update-avatar"
                    type="url"
                    name="avatar"
                    id="avatar"
                    required=""
                />
                <span className="popup__error" id="avatar-error"/>
            </label>
        </PopupWithForm>
    );
}

export default EditProfilePopup;