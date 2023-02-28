import { getCookie, setCookie } from "../utils/cookie";

export const api = {
  url: "https://norma.nomoreparties.space/api",
  headers: {
    "Content-Type": "aplication.json",
  },
};

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

function request(url, options) {
  return fetch(url, options).then(checkResponse);
}

export const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
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

export const authorizationRequest = async (email, password) => {
  return await request(`${api.url}/auth/login`, {
    method: "POST",
    headers: api.headers,
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });
};

export const registrationRequest = async (name, email, password) => {
  return await request(`${api.url}/auth/register`, {
    method: "POST",
    headers: api.headers,
    body: JSON.stringify({
      email: email,
      password: password,
      name: name,
    }),
  });
};

export const getUserDataRequest = async () => {
  return await fetchWithRefresh(`${api.url}/auth/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: "Bearer " + getCookie("token"),
    },
  });
};

export const updateUserDataRequest = async (email, name, password) => {
  return await fetchWithRefresh(`${api.url}/auth/user`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("token"),
    },
    body: JSON.stringify({
      name: name,
      email: email,
      password: password,
    }),
  });
};

export const logoutRequest = async () => {
  return await fetch(`${api.url}/auth/logout`, {
    method: "POST",
    headers: api.headers,
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  });
};

export const updateTokenRequest = async () => {
  return await request(`${api.url}/auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  });
};

export const recoveryPasswordRequest = async (email) => {
  return await request(`${api.url}/password-reset`, {
    method: "POST",
    headers: api.headers,
    body: JSON.stringify({
      email: email.email,
    }),
  });
};

export const resetPasswordRequest = async (password, token) => {
  return await request(`${api.url}/password-reset/reset`, {
    method: "POST",
    headers: api.headers,
    body: JSON.stringify(password, token),
  });
};

export const fetchWithRefresh = async (url, options) => {
  try {
    const res = await fetch(url, options);
    return await checkResponse(res);
  } catch (err) {
    console.log(err)
    if (err.message === 'jwt expired') {
      const refreshToken = await updateTokenRequest();
      const accessToken = refreshToken.accessToken.split("Bearer ")[1];

      if (!refreshToken.success) {
        Promise.reject(refreshToken);
      }
      localStorage.setItem("refreshToken", refreshToken.refreshToken);
      setCookie("token", accessToken);

      options.headers.Authorization = refreshToken.accessToken;
      const res = await fetch(url, options);
      return await checkResponse(res);
    } else {
      return Promise.reject(err);
    }
  }
}
