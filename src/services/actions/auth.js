import {
  authorizationRequest,
  registrationRequest,
  getUserDataRequest,
  updateUserDataRequest,
  logoutRequest,
  updateTokenRequest,
  recoveryPasswordRequest,
  setPasswordRequest,
} from "../../utils/api";
import { deleteCookie, getCookie, setCookie } from "../../utils/cookie";

export const SET_USER_DATA = "SET_USER_DATA";
export const GET_USER_DATA_REQUEST = "GET_USER_DATA_REQUEST";
export const GET_USER_DATA_SUCCESS = "GET_USER_DATA_SUCCESS";
export const GET_USER_DATA_FAILED = "GET_USER_DATA_FAILED";
export const UPDATE_USER_REQUEST = "UPDATE_USER_REQUEST";
export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS";
export const UPDATE_USER_FAILED = "UPDATE_USER_FAILED";
export const REGISTRATION_FORM_REQUEST = "REGISTRATION_FORM_REQUEST";
export const REGISTRATION_FORM_SUCCESS = "REGISTRATION_FORM_SUCCESS";
export const REGISTRATION_FORM_FAILED = "REGISTRATION_FORM_FAILED";
export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";
export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILED = "LOGOUT_FAILED";
export const RECOVERY_PASSWORD_REQUEST = "RECOVERY_PASSWORD_REQUEST";
export const RECOVERY_PASSWORD_SUCCESS = "RECOVERY_PASSWORD_SUCCESS";
export const RECOVERY_PASSWORD_FAILED = "RECOVERY_PASSWORD_FAILED";
export const RESET_FORM_SET_VALUE = "RESET_FORM_SET_VALUE";
export const SET_PASSWORD_REQUEST = "SET_PASSWORD_REQUEST";
export const SET_PASSWORD_SUCCESS = "SET_PASSWORD_SUCCESS";
export const SET_PASSWORD_FAILED = "SET_PASSWORD_FAILED";
export const UPDATE_TOKEN_REQUEST = "UPDATE_TOKEN_REQUEST";
export const UPDATE_TOKEN_SUCCESS = "UPDATE_TOKEN_SUCCESS";
export const UPDATE_TOKEN_FAILED = "UPDATE_TOKEN_FAILED";
export const AUTH_CHECKED = "AUTH_CHECKED";
export const AUTH_CHECKED_FAILED = "AUTH_CHECKED_FAILED";

//Регистрация пользователя
export function registrateUser(email, password, name, forwarding) {
  return function (dispatch) {
    dispatch({
      type: REGISTRATION_FORM_REQUEST,
    });
    registrationRequest(email, password, name)
      .then((res) => {
        setCookie("token", res.accessToken.split("Bearer ")[1]);
        setCookie("refreshToken", res.refreshToken);
        dispatch({
          type: REGISTRATION_FORM_SUCCESS,
          payload: res.user,
        });
        dispatch({ type: SET_USER_DATA, payload: res.user });
        forwarding();
      })
      .catch(() => {
        dispatch({
          type: REGISTRATION_FORM_FAILED,
        });
      });
  };
}

//Авторизация
export function authorization(email, password, forwarding) {
  return function (dispatch) {
    dispatch({
      type: LOGIN_REQUEST,
    });
    authorizationRequest(email, password)
      .then((res) => {
        setCookie("token", res.accessToken.split("Bearer ")[1]);
        setCookie("refreshToken", res.refreshToken);
        dispatch({ type: LOGIN_SUCCESS, payload: res.success });
        dispatch({ type: SET_USER_DATA, payload: res.user });
        forwarding();
      })
      .catch((err) => {
        dispatch({
          type: LOGIN_FAILED,
        });
      });
  };
}

//Восстановление пароля
export function recoveryPassword(email) {
  return function (dispatch) {
    dispatch({
      type: RECOVERY_PASSWORD_REQUEST,
    });
    recoveryPasswordRequest(email)
      .then((res) => {
        dispatch({
          type: RECOVERY_PASSWORD_SUCCESS,
          payload: res.success,
        });
      })
      .catch(() => {
        dispatch({
          type: RECOVERY_PASSWORD_FAILED,
        });
      });
  };
}

//Установка пароля пользователя
export function setPassword(password, code) {
  return function (dispatch) {
    dispatch({
      type: SET_PASSWORD_REQUEST,
    });
    setPasswordRequest(password, code)
      .then((res) => {
        dispatch({
          type: SET_PASSWORD_SUCCESS,
          payload: res.success,
        });
      })
      .catch(() => {
        dispatch({
          type: SET_PASSWORD_FAILED,
        });
      });
  };
}

//Обновление токена
export function updateToken(refreshToken) {
  return function (dispatch) {
    dispatch({ type: UPDATE_TOKEN_REQUEST });
    updateTokenRequest(refreshToken)
      .then((res) => {
        setCookie("token", res.accessToken.split("Bearer ")[1]);
        setCookie("refreshToken", res.refreshToken);
        dispatch({ type: UPDATE_TOKEN_SUCCESS, payload: res.success });
        console.log("flag refreshToken success");
      })
      .catch(() => {
        dispatch({
          type: UPDATE_TOKEN_FAILED,
        });
      });
  };
}

export const checkUserAuth = () => {
  return function (dispatch) {
    if (getCookie("token")) {
      dispatch({
        type: AUTH_CHECKED,
      });
    } else {
      dispatch({
        type: AUTH_CHECKED_FAILED,
      });
    }
  };
};

//Выход из профиля
export function logout(refreshToken, forwarding) {
  return function (dispatch) {
    dispatch({
      type: LOGOUT_REQUEST,
    });
    logoutRequest(refreshToken)
      .then((res) => {
        dispatch({ type: LOGOUT_SUCCESS, payload: res.success });
        deleteCookie("token");
        deleteCookie("refreshToken");
        forwarding();
      })
      .catch(() => {
        dispatch({
          type: LOGOUT_FAILED,
        });
      });
  };
}

//Получение данных о пользователе
export function getUserData() {
  return function (dispatch) {
    dispatch({
      type: GET_USER_DATA_REQUEST,
    });
    getUserDataRequest()
      .then((res) => {
        dispatch({ type: SET_USER_DATA, payload: res.user });
        dispatch({ type: UPDATE_TOKEN_SUCCESS, payload: null });
        dispatch({
          type: GET_USER_DATA_SUCCESS,
          payload: res.success,
        });
      })
      .catch((err) => {
        dispatch({
          type: GET_USER_DATA_FAILED,
        });
      });
  };
}

//Обновление данных пользователя
export function updateUserData(email, name, password) {
  return function (dispatch) {
    dispatch({
      type: UPDATE_USER_REQUEST,
    });
    updateUserDataRequest(email, name, password)
      .then((res) => {
        dispatch({ type: SET_USER_DATA, payload: res.user });
        dispatch({
          type: UPDATE_USER_SUCCESS,
          payload: res.success,
        });
      })
      .catch((err) => {
        dispatch({ type: UPDATE_USER_FAILED });
      });
  };
}
