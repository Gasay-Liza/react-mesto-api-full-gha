import React from 'react';
import errorIcon from "../images/error.svg";
import okIcon from "../images/ok.svg";

function InfoToolTipPopup({isOpen, onClose, isSuccess, infoToolTipText}) {
        return (

            <div className={`popup popup_type_info-tool-tip ${isOpen ? 'popup_is-opened' : ''}`}>
                <div className="popup__container popup__container_type_tool-tip">
                    <button className="popup__close-icon" type="button"
                            onClick = {onClose}/>
                        <>
                            <img className="popup__tip-icon"
                                 src={isSuccess ? okIcon : errorIcon}
                                 alt={isSuccess ? "Успешная регистрация" : "Ошибка регистрации"}
                                />
                            <h2 className="popup__tip">
                                {infoToolTipText}
                            </h2>
                        </>
                </div>
            </div>
        )
}


export default InfoToolTipPopup;