export const api = {
  url: "https://norma.nomoreparties.space/api",
  headers: {
    "Content-Type": "aplication.json",
  },
};

// const checkReponse = (res) => {
//   return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
// };


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
