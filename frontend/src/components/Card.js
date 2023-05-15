import React from 'react';
import CurrentUserContext from "../contexts/CurrentUserContext";


function Card({card, onCardClick, onCardLike, onCardDelete}) {
    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = card.owner._id === currentUser._id;
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = (
        `photo-card__like ${isLiked && 'photo-card__like_active'}`
    );

    function handleCardClick() {
        onCardClick(card);
    }

    function handleDeleteClick() {
        onCardDelete(card);
    }

    function handleLikeClick() {
        onCardLike(card);
    }

    return (
        <li className="photo-card">
            <img className="photo-card__image"
                 src={card.link}
                 alt={card.name}
                 onClick={handleCardClick}
            />
            {isOwn &&
                <button aria-label="Мусорка" type="button" className="photo-card__trash" onClick={handleDeleteClick}/>}
            <div className="photo-card__description">
                <h2 className="photo-card__name">{card.name}</h2>
                <div className="photo-card__like-container">
                    <button onClick={handleLikeClick} aria-label="Лайк" type="button"
                            className={cardLikeButtonClassName}/>
                    <p className="photo-card__likes-counter">{card.likes.length}</p>
                </div>
            </div>
        </li>
    )
}

export default Card;