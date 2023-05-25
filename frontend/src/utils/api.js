class Api {
  constructor({ baseUrl, headers, credentials }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
    this._credentials = credentials;
  }

  //Проверка ответа
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    // если ошибка, отклоняем промис
    console.log(res)
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  //Запрос на сервер
  _request(url, options) {
    return fetch(url, options).then(this._checkResponse);
  }

  // Получение карточек с сервера
  getCards() {
    return this._request(`${this._baseUrl}/cards`, {
      credentials: 'include',
      headers: this._headers,
    });
  }

  // Получение данных профиля с сервера
  getUserInfo() {
    return this._request(`${this._baseUrl}/users/me`, {
      credentials: 'include',
      headers: this._headers,
    });
  }

  // Удаление карточки
  deleteCard(id) {
    return this._request(`${this._baseUrl}/cards/` + id, {
      credentials: 'include',
      method: 'DELETE',
      headers: this._headers,
    });
  }

  // Загрузка карточки на сервер
  createCard(data) {
    return this._request(`${this._baseUrl}/cards`, {
      credentials: 'include',
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    });
  }

  // Загрузка информации профиля на сервер
  setUserInfo(data) {
    return this._request(`${this._baseUrl}/users/me`, {
      credentials: 'include',
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.username,
        about: data.info,
      }),
    });
  }

  // Загрузка лайка карточки на сервер
  setLike(id) {
    return this._request(`${this._baseUrl}/cards/${id}/likes`, {
      credentials: 'include',
      method: 'PUT',
      headers: this._headers,
    });
  }

  // Удаление лайка карточки с сервера
  deleteLike(id) {
    return this._request(`${this._baseUrl}/cards/${id}/likes`, {
      credentials: 'include',
      method: 'DELETE',
      headers: this._headers,
    });
  }

  // Редактирование профиля
  setUserAvatar(data) {
    return this._request(`${this._baseUrl}/users/me/avatar`, {
      credentials: 'include',
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    });
  }

  // Удаление или постановка лайка
  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      return this.deleteLike(cardId);
    } else {
      return this.setLike(cardId);
    }
  }
}

const api = new Api({
  baseUrl: 'http://api.gasayliza.nomoredomains.monster',
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include',
});

export default api;