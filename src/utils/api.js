export const api = {
  url: "https://norma.nomoreparties.space/api/ingredients",
  headers: {
    "Content-Type": "aplication.json",
  },
};

export const getData = () => {
  return fetch(`${api.url}`)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка ${res.status} - ${res.statusText}`);
    })
    .catch((err) => {
      console.log(err);
    });
};
