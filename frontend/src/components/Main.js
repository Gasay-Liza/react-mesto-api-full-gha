import React from 'react';
import Card from "./Card";
import CurrentUserContext from '../contexts/CurrentUserContext';

function Main({
    cards,
    onEditProfile,
    onAddPlace,
    onEditAvatar,
    onCardClick,
    onCardLike,
    onCardDelete
    }) {

    const currentUser = React.useContext(CurrentUserContext);

        return (
        <main className="content">
            <section className="profile">
                <div className="profile__avatar-container">
                    <img
                        src={currentUser.avatar}
                        className="profile__avatar"
                        alt="Фотография профиля"
                    />
                    <button
                        aria-label="Редактирование аватара"
                        type="button"
                        className="profile__avatar-btn"
                        onClick={onEditAvatar}
                    />
                </div>
                <div className="profile__info">
                    <div className="profile__name-container">
                        <h1 className="profile__name">{currentUser.name}</h1>
                        <button
                            aria-label="Редактирование профиля"
                            type="button"
                            className="profile__edit-button"
                            onClick={onEditProfile}
                        />
                    </div>
                    <p className="profile__about">{currentUser.about}</p>
                </div>
                <button
                    aria-label="Добавление карточки с фото"
                    type="button"
                    className="profile__add-button"
                    onClick={onAddPlace}
                />
            </section>
            <section className="photo-cards">
                <ul className="photo-cards__list">
                    {cards.map((card) =>(
                        <Card
                            key={card._id}
                            card={card}
                            onCardClick={onCardClick}
                            onCardLike={onCardLike}
                            onCardDelete={onCardDelete}
                        />)
                    )}
                </ul>
            </section>
        </main>
    )
}


export default Main;