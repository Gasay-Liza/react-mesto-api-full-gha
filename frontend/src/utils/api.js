class Api {
    constructor({baseUrl, headers}) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    //Проверка ответа
    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    //Запрос на сервер
    _request(url, options) {
        return fetch(url, options).then(this._checkResponse)
    }

    // Получение карточек с сервера
    getCards() {
        return this._request(`${this._baseUrl}/cards`, {
            headers: this._headers,
        })
    }

    // Получение данных профиля с сервера
    getUserInfo() {
        return this._request(`${this._baseUrl}/users/me`, {
            headers: this._headers,
        })
    }

    // Удаление карточки
    deleteCard(id) {
        return this._request(`${this._baseUrl}/cards/` + id, {
            method: 'DELETE',
            headers: this._headers,
        })
    }

    // Загрузка карточки на сервер
    createCard(data) {
        return this._request(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
    }

    // Загрузка информации профиля на сервер
    setUserInfo(data) {
        return this._request(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: data.username,
                about: data.info,
            })
        })
    }

    // Загрузка лайка карточки на сервер
    setLike(id) {
        return this._request(`${this._baseUrl}/cards/${id}/likes`, {
            method: 'PUT',
            headers: this._headers,
        })
    }

    // Удаление лайка карточки с сервера
    deleteLike(id) {
        return this._request(`${this._baseUrl}/cards/${id}/likes`, {
            method: 'DELETE',
            headers: this._headers,
        })
    }

    // Редактирование профиля
    setUserAvatar(data) {
        return this._request(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: data.avatar
            })
        })
    }

    changeLikeCardStatus(cardId, isLiked) {
        if (isLiked) {
            return this.deleteLike(cardId);
        } else {
            return this.setLike(cardId);
        }
    }
}

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-59',
    headers: {
        authorization: '386600a6-5fa2-49f8-ad0a-ec20da52d25b',
        'Content-Type': 'application/json'
    },
});

export default api;