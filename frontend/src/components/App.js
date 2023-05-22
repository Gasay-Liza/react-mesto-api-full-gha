import React, {useCallback, useState} from "react";
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from "./PopupWithForm";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import InfoToolTip from "./InfoToolTipPopup";
import * as auth from '../utils/auth.js';
import ProtectedRouteElement from "./ProtectedRoute";

import {Route, Routes, Navigate, useNavigate} from 'react-router-dom';

import api from "../utils/api";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import Register from "./Register";
import Login from "./Login";


function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [isInfoToolTipPopupOpen, setIsInfoToolTipPopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState(null);
    const [currentUser, setCurrentUser] = React.useState({});
    const [cards, setCards] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || selectedCard || isInfoToolTipPopupOpen
    const [loggedIn, setLoggedIn] = useState(false);
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(true);
    const [isSuccess, setIsSuccess] = useState(false);
    const navigate = useNavigate();
    const [infoToolTipText, setInfoToolTipText] = React.useState('');

    const cbLogin = useCallback(async (email, password) => {
        try {
            const data = await auth.authorize(email, password)
            if (data.message) {
                console.log('email', email);
              setEmail(email);
              setLoggedIn(true);
              localStorage.setItem("authorized", "true");
              navigate("/", { replace: true });
            }
        } catch (err) {
            console.log(err);
            setInfoToolTipText(err)
            setIsSuccess(false);
            setIsInfoToolTipPopupOpen(true);
        } finally {
            setLoading(false)
        }
    },[])

    const cbRegister = useCallback(async (email, password) => {
        try {
            await auth.register(email, password);
            setIsSuccess(true);
            setIsInfoToolTipPopupOpen(true);
            navigate('/sign-in', {replace: true});
            setInfoToolTipText('Вы успешно зарегистрировались!')
        } catch (err) {
            console.log(err)
            setInfoToolTipText(err)
            setIsSuccess(false);
            setIsInfoToolTipPopupOpen(true);
        } finally {
            setLoading(false)
        }
    },[])

    const cbTokenCheck = useCallback(async () => {
        try {
            const authorized = localStorage.getItem("authorized");
            await auth.checkToken(authorized);
            setLoggedIn(true);
        } catch (err){
            console.log(err)
        } finally {
            setLoading(false)
        }
    },[])

    
    const cbLogOut = useCallback(async () => {
        try {
            await auth.signout();
            setLoggedIn(false);
            localStorage.removeItem("authorized");
            navigate("/sign-in", { replace: true });
        } catch (err) {
            console.log(err);
        }
    },[]);
    
    
    //При загрузке страницы получаем данные токена юзера
    React.useEffect(() => {
        cbTokenCheck();
    }, [])

    //При загрузке страницы и успешной авторизации получаем данные карточек и профиля
    React.useEffect(() => {
        if (!loggedIn) return;
        api
            .getUserInfo()
            .then(data => {
                setCurrentUser(data);
                setEmail(data.email);
            })
            .catch((err) => {
                console.log(err);
            })
        api
            .getCards()
            .then(cards => {
                setCards(cards.reverse());
            })
            .catch((err) => {
                console.log(err);
            })
    }, [loggedIn])


    function handleUpdateUser(data) {
        setIsLoading(true)
        api.setUserInfo({
            username: data.name,
            info: data.about
        })
            .then(data => {
                setCurrentUser(data);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setIsLoading(false)
            });
    }

    function handleUpdateCards(data) {
        setIsLoading(true)
        api.createCard({
            name: data.name,
            link: data.link
        })
            .then(newCard => {
                setCards([newCard, ...cards]);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setIsLoading(false)
            });
    }

    function handleUpdateAvatar(data) {
        setIsLoading(true)
        api.setUserAvatar({
            avatar: data.avatar
        })
            .then(data => {
                setCurrentUser(data);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setIsLoading(false)
            });
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }
    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function closeAllPopups() {
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setSelectedCard(null)
        setIsInfoToolTipPopupOpen(false)
    }

    React.useEffect(() => {
        function closeByEscape(evt) {
            if (evt.key === 'Escape') {
                closeAllPopups();
            }
        }

        if (isOpen) { // навешиваем только при открытии
            document.addEventListener('keydown', closeByEscape);
            return () => {
                document.removeEventListener('keydown', closeByEscape);
            }
        }
    }, [isOpen])

    function handleCardClick(card) {
        setSelectedCard(card);
    }

    function handleCardLike(card) {
        // Есть ли уже лайк на этой карточке
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        // Отправляем запрос в API и получаем обновлённые данные карточки
        api.changeLikeCardStatus(card._id, isLiked).then((newCard) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleCardDelete(card) {
        // Тот ли владелец
        const isOwn = card.owner._id === currentUser._id;
        if (isOwn) {
            // Отправляем запрос в API и получаем обновлённые данные карточек
            api.deleteCard(card._id, isOwn).then(() => {
                setCards(cards => cards.filter((c) => c._id !== card._id));
            })
                .catch((err) => {
                    console.log(err);
                });
        }
    }

    return (
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          <div className="page__container">
            <Header
              onLogOut={cbLogOut}
              isLoggedIn={loggedIn}
              userEmail={email}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <ProtectedRouteElement
                    element={Main}
                    loggedIn={loggedIn}
                    cards={cards}
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onEditAvatar={handleEditAvatarClick}
                    onCardClick={handleCardClick}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                  />
                }
              />
              <Route
                path="/sign-up"
                element={
                  <Register onRegister={cbRegister} isLoggedIn={loggedIn} />
                }
              />
              <Route
                path="/sign-in"
                element={<Login onLogin={cbLogin} isLoggedIn={loggedIn} />}
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            <Footer />

            {/*Форма редактирования профиля*/}
            <EditProfilePopup
              isOpen={isEditProfilePopupOpen}
              onClose={closeAllPopups}
              onUpdateUser={handleUpdateUser}
              isLoading={isLoading}
            />

            {/*Форма обновления аватара*/}
            <EditAvatarPopup
              isOpen={isEditAvatarPopupOpen}
              onClose={closeAllPopups}
              onUpdateAvatar={handleUpdateAvatar}
              isLoading={isLoading}
            />

            {/*Форма обновления карточек*/}
            <AddPlacePopup
              isOpen={isAddPlacePopupOpen}
              onClose={closeAllPopups}
              onAddPlace={handleUpdateCards}
              isLoading={isLoading}
            />

            {/*Форма согласия*/}
            <PopupWithForm
              name={"confirm"}
              title={"Вы уверены?"}
              buttonText={"Да"}
              // isOpen={isConfirmPopupOpen}
            ></PopupWithForm>

            <ImagePopup card={selectedCard} onClose={closeAllPopups} />

            <InfoToolTip
              isOpen={isInfoToolTipPopupOpen}
              isSuccess={isSuccess}
              onClose={closeAllPopups}
              infoToolTipText={infoToolTipText}
            />
          </div>
        </div>
      </CurrentUserContext.Provider>
    );
}


export default App;
