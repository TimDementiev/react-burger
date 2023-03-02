import { getCookie } from "../utils/cookie";

export const api = {
  url: "https://norma.nomoreparties.space/api",
  headers: {
    "Content-Type": "aplication/json",
  },
};

export const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

function request(url, options) {
  return fetch(url, options).then(checkResponse);
}

export const getInitialData = () => {
  return fetch(`${api.url}/ingredients`).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status} - ${res.statusText}`);
  });
};

export const getOrderData = (ingredientsData) => {
  return fetch(`${api.url}/orders`, {
    method: "POST",
    body: JSON.stringify({ ingredients: ingredientsData }),
    headers: { "Content-Type": "application/json" },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status} - ${res.statusText}`);
  });
};

export const getIngredients = async () => {
  return await request(`${api.url}/ingredients`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const apiPostOrder = async (orderData) => {
  return await request(`${api.url}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ingredients: orderData }),
  });
};

//Авторизация пользователя
export const authorizationRequest = (email, password) =>
  request(`${api.url}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });

//Обновление токена
export const updateTokenRequest = (refreshToken) => {
  return request(`${api.url}/auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: refreshToken,
    }),
  });
};

//Регистрация пользователя
export const registrationRequest = async (email, password, name) => {
  return await request(`${api.url}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
      name: name,
    }),
  });
};

//Получение данных пользователя
export const getUserDataRequest = async (accessToken) => {
  return await request(`${api.url}/auth/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      authorization: `Bearer ${accessToken}`,
    },
  });
};

//Обновление данных пользователя
export const updateUserDataRequest = async (email, name, password) => {
  return await request(`${api.url}/auth/user`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("token"),
    },
    body: JSON.stringify({
      email: email,
      name: name,
      password: password,
    }),
  });
};

//Выход из профиля
export const logoutRequest = (refreshToken) => {
  return request(`${api.url}/auth/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: refreshToken,
    }),
  });
};

//Восстановление пароля
export const recoveryPasswordRequest = (email) => {
  return request(`https://norma.nomoreparties.space/api/password-reset`, {
    method: "POST",
    headers: api.headers,
    body: JSON.stringify({
      email,
    }),
  });
};

//Сброс пароля пользователя
export const setPasswordRequest = (password, code) => {
  return request(
    `https://norma.nomoreparties.space/api/password-reset/reset`,
    {
      method: "POST",
      headers: api.headers,
      body: JSON.stringify({
        password: password,
        token: code,
      }),
    }
  ).then((res) => checkResponse(res));
};
