import {
  SET_USER_DATA,
  GET_USER_DATA_REQUEST,
  GET_USER_DATA_SUCCESS,
  GET_USER_DATA_FAILED,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILED,
  REGISTRATION_FORM_REQUEST,
  REGISTRATION_FORM_SUCCESS,
  REGISTRATION_FORM_FAILED,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED,
  RECOVERY_PASSWORD_REQUEST,
  RECOVERY_PASSWORD_SUCCESS,
  RECOVERY_PASSWORD_FAILED,
  SET_PASSWORD_REQUEST,
  SET_PASSWORD_SUCCESS,
  SET_PASSWORD_FAILED,
  UPDATE_TOKEN_REQUEST,
  UPDATE_TOKEN_SUCCESS,
  UPDATE_TOKEN_FAILED,
  // AUTH_CHECKED,
  // AUTH_CHECKED_FAILED,
} from "../actions/auth";

const initialState = {

  form: {
    name: "",
    email: "",
    password: "",
    code: "",
  },

  user: null,

  getUserDataRequest: false,
  getUserDataFailed: false,
  getUserDataSuccess: false,
  getUserDataResponse: null,

  updateUserDataRequest: false,
  updateUserDataFailed: false,
  updateUserDataSuccess: false,
  updateUserDataResponse: null,

  registrationRequest: false,
  registrateUserFailed: false,
  registrateUserSuccess: false,
  registrateResponse: null,

  authorizationRequest: false,
  authorizationFailed: false,
  authorizationSuccess: false,
  authorizationResponse: null,

  logoutRequest: false,
  logoutFailed: false,
  logoutSuccess: false,
  logoutResponse: null,

  recoveryPasswordRequest: false,
  recoveryPasswordFailed: false,
  recoveryPasswordSuccess: false,
  recoveryPasswordResponse: null,

  setPasswordRequest: false,
  setPasswordFailed: false,
  setPasswordSuccess: false,
  setPasswordResponse: null,

  updateTokenRequest: false,
  updateTokenFailed: false,
  updateTokenSuccess: false,
  updateTokenResponse: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA: {
      return {
        ...state,
        user: {
          name: action.payload.name,
          email: action.payload.email,
        },
      };
    }

    // case AUTH_CHECKED: {
    //   return {
    //     ...state,

    //     isAuthSuccess: true,
    //   };
    // }
    // case AUTH_CHECKED_FAILED: {
    //   return {
    //     ...state,
    //     isAuthSuccess: false,
    //   };
    // }

    //Получение данных пользователя
    case GET_USER_DATA_REQUEST: {
      return {
        ...state,
        getUserDataRequest: true,
        getUserDataFailed: false,
      };
    }

    case GET_USER_DATA_FAILED: {
      return {
        ...state,
        getUserDataRequest: false,
        getUserDataFailed: true,
        // isAuthSuccess: false,
      };
    }

    case GET_USER_DATA_SUCCESS: {
      return {
        ...state,
        getUserDataFailed: false,
        getUserDataSuccess: true,
        getUserDataResponse: action.payload,
      };
    }

    //Обновление данных пользователя
    case UPDATE_USER_REQUEST: {
      return {
        ...state,
        updateUserDataRequest: true,
        updateUserDataFailed: false,
        updateUserDataSuccess: false,
      };
    }

    case UPDATE_USER_FAILED: {
      return {
        ...state,
        updateUserDataRequest: false,
        updateUserDataSuccess: false,
        updateUserDataFailed: true,
      };
    }

    case UPDATE_USER_SUCCESS: {
      return {
        ...state,
        updateUserDataRequest: false,
        updateUserDataSuccess: true,
        updateUserDataFailed: false,
        form: {
          ...state.form,
          email: "",
          password: "",
          name: "",
        },
      };
    }

    //Регистрация пользователя
    case REGISTRATION_FORM_REQUEST: {
      return {
        ...state,

        registrationRequest: true,
        registrateUserFailed: false,
        registrateUserSuccess: false,
      };
    }

    case REGISTRATION_FORM_FAILED: {
      return {
        ...state,

        registrationRequest: false,
        registrateUserFailed: true,
        registrateUserSuccess: false,
      };
    }

    case REGISTRATION_FORM_SUCCESS: {
      return {
        ...state,
        form: {
          ...state.form,
          email: "",
          password: "",
          name: "",
        },
        registrationRequest: false,
        registrateUserFailed: false,
        registrateUserSuccess: true,
        registrateResponse: action.payload,
      };
    }

    case LOGIN_REQUEST: {
      return {
        ...state,
        authorizationRequest: true,
        authorizationFailed: false,
        authorizationSuccess: false,
      };
    }

    case LOGIN_FAILED: {
      return {
        ...state,
        authorizationRequest: false,
        authorizationFailed: true,
        authorizationSuccess: false,
      };
    }

    case LOGIN_SUCCESS: {
      return {
        ...state,
        // user: action.user,
        form: {
          ...state.form,
          email: "",
          name: "",
          password: "",
        },
        // isAuthSuccess: true,
        authorizationRequest: false,
        authorizationFailed: false,
        authorizationSuccess: true,
        authorizationResponse: action.payload,
      };
    }

    //Выход из системы
    case LOGOUT_REQUEST: {
      return {
        ...state,
        logoutRequest: true,
        logoutFailed: false,
        logoutSuccess: false,
      };
    }

    case LOGOUT_FAILED: {
      return {
        ...state,
        logoutRequest: false,
        logoutFailed: true,
        logoutSuccess: false,
      };
    }

    case LOGOUT_SUCCESS: {
      return {
        ...state,
        user: null,
        form: {
          ...state.form,
          email: "",
          name: "",
          password: "",
        },
        logoutRequest: false,
        logoutFailed: false,
        logoutSuccess: true,
        logoutResponse: action.payload,
      };
    }

    //Восстановление пароля
    case RECOVERY_PASSWORD_REQUEST: {
      return {
        ...state,
        recoveryPasswordRequest: true,
        recoveryPasswordFailed: false,
        recoveryPasswordSuccess: false,
      };
    }

    case RECOVERY_PASSWORD_FAILED: {
      return {
        ...state,
        recoveryPasswordRequest: false,
        recoveryPasswordFailed: true,
        recoveryPasswordSuccess: false,
      };
    }

    case RECOVERY_PASSWORD_SUCCESS: {
      return {
        ...state,
        form: {
          ...state.form,
          email: "",
        },
        message: action.message,
        recoveryPasswordRequest: false,
        recoveryPasswordFailed: false,
        recoveryPasswordSuccess: true,
        recoveryPasswordResponse: action.payload,
      };
    }

    //Сброс пароля
    case SET_PASSWORD_REQUEST: {
      return {
        ...state,
        setPasswordRequest: true,
        setPasswordFailed: false,
        setPasswordSuccess: false,
      };
    }

    case SET_PASSWORD_FAILED: {
      return {
        ...state,
        setPasswordRequest: false,
        setPasswordFailed: true,
        setPasswordSuccess: false,
      };
    }

    case SET_PASSWORD_SUCCESS: {
      return {
        ...state,
        setPasswordRequest: false,
        setPasswordFailed: false,
        setPasswordSuccess: true,
        setPasswordResponse: action.payload,
      };
    }

    //Обновление токена
    case UPDATE_TOKEN_REQUEST: {
      return {
        ...state,
        updateTokenRequest: true,
        updateTokenFailed: false,
        updateTokenSuccess: false,
      };
    }

    case UPDATE_TOKEN_FAILED: {
      return {
        ...state,
        updateTokenRequest: false,
        updateTokenFailed: true,
        updateTokenSuccess: false,
      };
    }

    case UPDATE_TOKEN_SUCCESS: {
      return {
        ...state,
        updateTokenRequest: false,
        updateTokenFailed: false,
        updateTokenSuccess: true,
        updateTokenResponse: action.payload,
      };
    }

    default: {
      return state;
    }
  }
};
