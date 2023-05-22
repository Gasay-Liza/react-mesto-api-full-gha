export const BASE_URL = "http://localhost:3000";

function getResponse(res) {
  if (!res.ok) {
      
    return res.json().then((err) => {
      return Promise.reject(`Error ${res.status}: ${err.message || err.error}`);
  })
  }
  return res.json();
}

export const register = (email, password) => {
    return fetch(`${BASE_URL}/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password,
        email,
      }),
    }).then(getResponse);
}

export const authorize = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
      method: "POST",
      credentials: "include", // теперь куки посылаются вместе с запросом
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password,
        email,
      }),
    }).then(getResponse);
}

export const signout = () => {
  return fetch(`${BASE_URL}/signout`, {
    method: "GET",
    credentials: "include", // теперь куки посылаются вместе с запросом
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then(getResponse);
};

export const checkToken = () => {
    return fetch(`${BASE_URL}/users/me`, {
      method: "GET",
      credentials: "include", // теперь куки посылаются вместе с запросом
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then(getResponse);
};