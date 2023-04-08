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
import { AppDispatch } from "../types/index";
import { TUser } from "../types/data";

export const SET_USER_DATA: "SET_USER_DATA" = "SET_USER_DATA";
export const GET_USER_DATA_REQUEST: "GET_USER_DATA_REQUEST" = "GET_USER_DATA_REQUEST";
export const GET_USER_DATA_SUCCESS: "GET_USER_DATA_SUCCESS" = "GET_USER_DATA_SUCCESS";
export const GET_USER_DATA_FAILED: "GET_USER_DATA_FAILED" = "GET_USER_DATA_FAILED";
export const UPDATE_USER_REQUEST: "UPDATE_USER_REQUEST" = "UPDATE_USER_REQUEST";
export const UPDATE_USER_SUCCESS: "UPDATE_USER_SUCCESS" = "UPDATE_USER_SUCCESS";
export const UPDATE_USER_FAILED: "UPDATE_USER_FAILED" = "UPDATE_USER_FAILED";
export const REGISTRATION_FORM_REQUEST: "REGISTRATION_FORM_REQUEST" = "REGISTRATION_FORM_REQUEST";
export const REGISTRATION_FORM_SUCCESS: "REGISTRATION_FORM_SUCCESS" = "REGISTRATION_FORM_SUCCESS";
export const REGISTRATION_FORM_FAILED: "REGISTRATION_FORM_FAILED" = "REGISTRATION_FORM_FAILED";
export const LOGIN_REQUEST: "LOGIN_REQUEST" = "LOGIN_REQUEST";
export const LOGIN_SUCCESS: "LOGIN_SUCCESS" = "LOGIN_SUCCESS";
export const LOGIN_FAILED: "LOGIN_FAILED" = "LOGIN_FAILED";
export const LOGOUT_REQUEST: "LOGOUT_REQUEST" = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS: "LOGOUT_SUCCESS" = "LOGOUT_SUCCESS";
export const LOGOUT_FAILED: "LOGOUT_FAILED" = "LOGOUT_FAILED";
export const RECOVERY_PASSWORD_REQUEST: "RECOVERY_PASSWORD_REQUEST" = "RECOVERY_PASSWORD_REQUEST";
export const RECOVERY_PASSWORD_SUCCESS: "RECOVERY_PASSWORD_SUCCESS" = "RECOVERY_PASSWORD_SUCCESS";
export const RECOVERY_PASSWORD_FAILED: "RECOVERY_PASSWORD_FAILED" = "RECOVERY_PASSWORD_FAILED";
export const RESET_FORM_SET_VALUE: "RESET_FORM_SET_VALUE" = "RESET_FORM_SET_VALUE";
export const SET_PASSWORD_REQUEST: "SET_PASSWORD_REQUEST" = "SET_PASSWORD_REQUEST";
export const SET_PASSWORD_SUCCESS: "SET_PASSWORD_SUCCESS" = "SET_PASSWORD_SUCCESS";
export const SET_PASSWORD_FAILED: "SET_PASSWORD_FAILED" = "SET_PASSWORD_FAILED";
export const UPDATE_TOKEN_REQUEST: "UPDATE_TOKEN_REQUEST" = "UPDATE_TOKEN_REQUEST";
export const UPDATE_TOKEN_SUCCESS: "UPDATE_TOKEN_SUCCESS" = "UPDATE_TOKEN_SUCCESS";
export const UPDATE_TOKEN_FAILED: "UPDATE_TOKEN_FAILED" = "UPDATE_TOKEN_FAILED";
export const AUTH_CHECKED: "AUTH_CHECKED" = "AUTH_CHECKED";
export const AUTH_CHECKED_FAILED: "AUTH_CHECKED_FAILED" = "AUTH_CHECKED_FAILED";

export interface ISetUser {
  readonly type: typeof SET_USER_DATA;
  readonly payload: TUser;
}

export interface IAuthGetUserRequest {
  readonly type: typeof GET_USER_DATA_REQUEST;
}

export interface IAuthGetUserSuccess {
  readonly type: typeof GET_USER_DATA_SUCCESS;
  readonly payload: boolean;
}

export interface IAuthGetUserFailed {
  readonly type: typeof GET_USER_DATA_FAILED;
}

export interface IAuthUpdateUserRequest {
  readonly type: typeof UPDATE_USER_REQUEST;
}

export interface IAuthUpdateUserSuccess {
  readonly type: typeof UPDATE_USER_SUCCESS;
  readonly payload: boolean;
}

export interface IAuthUpdateUserFailed {
  readonly type: typeof UPDATE_USER_FAILED;
}

export interface IAuthRegistrationFormRequest {
  readonly type: typeof REGISTRATION_FORM_REQUEST;
}

export interface IAuthRegistrationFormSuccess {
  readonly type: typeof REGISTRATION_FORM_SUCCESS;
  readonly payload: boolean;
}

export interface IAuthRegistrationFormFailed {
  readonly type: typeof REGISTRATION_FORM_FAILED;
}

export interface IAuthLoginRequest {
  readonly type: typeof LOGIN_REQUEST;
}

export interface IAuthLoginSuccess {
  readonly type: typeof LOGIN_SUCCESS;
  readonly payload: boolean;
}

export interface IAuthLoginFailed {
  readonly type: typeof LOGIN_FAILED;
}

export interface IAuthLogoutRequest {
  readonly type: typeof LOGOUT_REQUEST;
}

export interface IAuthLogoutSuccess {
  readonly type: typeof LOGOUT_SUCCESS;
  readonly payload: boolean;
}

export interface IAuthLogoutFailed {
  readonly type: typeof LOGOUT_FAILED;
}

export interface IAuthRecoveryPasswordRequest {
  readonly type: typeof RECOVERY_PASSWORD_REQUEST;
}

export interface IAuthRecoveryPasswordSuccess {
  readonly type: typeof RECOVERY_PASSWORD_SUCCESS;
  readonly payload: boolean;
}

export interface IAuthRecoveryPasswordFailed {
  readonly type: typeof RECOVERY_PASSWORD_FAILED;
}

export interface IAuthResetPasswordRequest {
  readonly type: typeof SET_PASSWORD_REQUEST;
}

export interface IAuthResetPasswordSuccess {
  readonly type: typeof SET_PASSWORD_SUCCESS;
  readonly payload: boolean;
}

export interface IAuthResetPasswordFailed {
  readonly type: typeof SET_PASSWORD_FAILED;
}

export interface IAuthUpdateTokenReset {
  readonly type: typeof UPDATE_TOKEN_REQUEST;
}

export interface IAuthUpdateTokenSuccess {
  readonly type: typeof UPDATE_TOKEN_SUCCESS;
  readonly payload: boolean;
}

export interface IAuthUpdateTokenFailed {
  readonly type: typeof UPDATE_TOKEN_FAILED;
}

export interface IAuthChecked {
  readonly type: typeof AUTH_CHECKED;
}

export interface IAuthCheckedFailed {
  readonly type: typeof AUTH_CHECKED_FAILED;
}

export type TAuthActions =
  | ISetUser
  | IAuthGetUserRequest
  | IAuthGetUserSuccess
  | IAuthGetUserFailed
  | IAuthUpdateUserRequest
  | IAuthUpdateUserSuccess
  | IAuthUpdateUserFailed
  | IAuthRegistrationFormRequest
  | IAuthRegistrationFormSuccess
  | IAuthRegistrationFormFailed
  | IAuthLoginRequest
  | IAuthLoginSuccess
  | IAuthLoginFailed
  | IAuthLogoutRequest
  | IAuthLogoutSuccess
  | IAuthLogoutFailed
  | IAuthRecoveryPasswordRequest
  | IAuthRecoveryPasswordSuccess
  | IAuthRecoveryPasswordFailed
  | IAuthResetPasswordRequest
  | IAuthResetPasswordSuccess
  | IAuthResetPasswordFailed
  | IAuthUpdateTokenReset
  | IAuthUpdateTokenSuccess
  | IAuthUpdateTokenFailed
  | IAuthChecked
  | IAuthCheckedFailed


//Регистрация пользователя
export function registrateUser(email: string, name: string, password: string, forwarding: () => void) {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: REGISTRATION_FORM_REQUEST,
    });
    registrationRequest(email, password, name)
      .then((res) => {
        const authToken = res.accessToken.split("Bearer ")[1];
        const refreshToken = res.refreshToken;
        setCookie("token", authToken);
        localStorage.setItem("refreshToken", refreshToken);
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
export function authorization(email: string, password: string, forwarding: () => void) {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: LOGIN_REQUEST,
    });
    authorizationRequest(email, password)
      .then((res) => {
        const refreshToken = res.refreshToken;
        setCookie("token", res.accessToken.split("Bearer ")[1]);
        localStorage.setItem("refreshToken", refreshToken);
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
export function recoveryPassword(email: string) {
  return function (dispatch: AppDispatch) {
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
export function setPassword(password: string, code: string) {
  return function (dispatch: AppDispatch) {
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
export function updateToken() {
  return function (dispatch: AppDispatch) {
    dispatch({ type: UPDATE_TOKEN_REQUEST });
    updateTokenRequest()
      .then((res) => {
        setCookie("token", res.accessToken.split("Bearer ")[1]);
        const refreshToken = res.refreshToken;
        localStorage.setItem("refreshToken", refreshToken);
        dispatch({ type: UPDATE_TOKEN_SUCCESS, payload: res.success });

      })
      .catch(() => {
        dispatch({
          type: UPDATE_TOKEN_FAILED,
        });
      });
  };
}

export const checkUserAuth = () => {
  return function (dispatch: AppDispatch) {
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
export function logout(forwarding: () => void) {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: LOGOUT_REQUEST,
    });
    logoutRequest()
      .then((res) => {
        dispatch({ type: LOGOUT_SUCCESS, payload: res.success });
        deleteCookie("token");
        localStorage.clear()
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
  return function (dispatch: AppDispatch) {
    dispatch({
      type: GET_USER_DATA_REQUEST,
    });
    getUserDataRequest()
      .then((res) => {
        dispatch({ type: SET_USER_DATA, payload: res.user });
        // dispatch({ type: UPDATE_TOKEN_SUCCESS, payload: null });

        dispatch({
          type: GET_USER_DATA_SUCCESS,
          payload: res.success,
        });
      })
      .catch(() => {
        dispatch({
          type: GET_USER_DATA_FAILED,
        });
      });
  };
}

//Обновление данных пользователя
export function updateUserData(email: string , name: string, password: string) {
  return function (dispatch: AppDispatch) {
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
