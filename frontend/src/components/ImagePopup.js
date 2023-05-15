import React from 'react';
function ImagePopup({ card, onClose}) {
    return (
            <div className={'popup popup_type_image' +(card && " popup_is-opened")}>
                <div className="popup__image-container">
                    <button className="popup__close-icon" type="button"
                            onClick = {onClose}/>
                    <img className="popup__image"
                         src={card?.link}
                         alt={card?.name}/>
                    <h2 className="popup__title-image">{card?.name}</h2>
                </div>
            </div>
    )
}

export default ImagePopup;