import { getCookie, setCookie } from "./cookie";

export const api = {
  url: "https://norma.nomoreparties.space/api",
  headers: {
    "Content-Type": "application/json",
  },
};

export const checkResponse = (res: Response) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

function request(url: string, options: RequestInit) {
  return fetch(url, options).then(checkResponse);
}

//Запрос ингредиентов
export const getInitialData = async () => {
  return await request(`${api.url}/ingredients`, {
    method: "GET",
    headers: api.headers,
  });
};

//Отправка заказа
export const getOrderData = async (ingredientsData: Array<string>) => {
  return await request(`${api.url}/orders`, {
    method: "POST",
    body: JSON.stringify({ ingredients: ingredientsData }),
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + getCookie("token"),
    },
  });
};

//Авторизация пользователя
export const authorizationRequest = async (email: string, password: string) => {
  return await request(`${api.url}/auth/login`, {
    method: "POST",
    headers: api.headers,
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });
};

//Регистрация пользователя
export const registrationRequest = async (email: string, password: string, name: string) => {
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

//Обновление токена
export const updateTokenRequest = async () => {
  return await request(`${api.url}/auth/token`, {
    method: "POST",
    headers: api.headers,
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  });
};

//Получение данных пользователя
export const getUserDataRequest = async () => {
  return await fetchWithRefresh(`${api.url}/auth/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      authorization: `Bearer ${getCookie('token')}`,
    },
  });
};

//Обновление данных пользователя
export const updateUserDataRequest = async (email: string, name: string, password: string) => {
  return await fetchWithRefresh(`${api.url}/auth/user`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${getCookie('token')}`,
    },
    body: JSON.stringify({
      email: email,
      name: name,
      password: password,
    }),
  });
};

//Обновление токена для обработки данных пользователя
type TFetchOptions = {
  method: string;
  headers: {
    "Content-Type": string;
    "authorization": string;
  };
  body?: string
}

export const fetchWithRefresh = async (url: string, options: TFetchOptions) => {
  try {
    const res = await fetch(url, options);
    return await checkResponse(res);
  } catch (err: any) {
    if (err.message === "jwt expired") {
      const refreshToken = await updateTokenRequest();
      const accessToken = refreshToken.accessToken.split("Bearer ")[1];

      if (!refreshToken.success) {
        Promise.reject(refreshToken);
      }
      localStorage.setItem("refreshToken", refreshToken.refreshToken);
      setCookie("token", accessToken);
      options.headers.authorization = refreshToken.accessToken;
      const res = await fetch(url, options);
      return await checkResponse(res);
    } else {
      return Promise.reject(err);
    }
  }
};

//Выход из профиля
export const logoutRequest = async () => {
  return await request(`${api.url}/auth/logout`, {
    method: "POST",
    headers: api.headers,
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  });
};

//Восстановление пароля
export const recoveryPasswordRequest = async (email: string) => {
  return await request(`${api.url}/password-reset`, {
    method: "POST",
    headers: api.headers,
    body: JSON.stringify({
      email,
    }),
  });
};

//Сброс пароля пользователя
export const setPasswordRequest = async (password: string, code: string) => {
  return await request(`${api.url}/password-reset/reset`, {
    method: "POST",
    headers: api.headers,
    body: JSON.stringify({
      password: password,
      token: code,
    }),
  });
};
