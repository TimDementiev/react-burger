import {
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILED,
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
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED,
  UPDATE_TOKEN_REQUEST,
  UPDATE_TOKEN_SUCCESS,
  UPDATE_TOKEN_FAILED,
  AUTH_CHECKED,
  AUTH_CHECKED_FAILED,
} from "../actions/auth";



const initialState = {
  isAuthSuccess: false,

  form: {
    name: "",
    email: "",
    password: "",
    code: ""
  },

  user: null,
  getUserDataRequest: false,
  getUserDataFaild: false,
  getUserDataSuccess: false,
  updateUserDataRequest: false,
  updateUserDataFaild: false,
  updateUserDataSuccess: false,
  registrationRequest: false,
  registrateUserFaild: false,
  registrateUserSuccess: false,
  authorizationRequest: false,
  authorizationFaild: false,
  authorizationSuccess: false,
  logoutRequest: false,
  logoutFaild: false,
  logoutSuccess: false,
  recoveryPasswordRequest: false,
  recoveryPasswordFaild: false,
  recoveryPasswordSuccess: false,
  resetPasswordRequest: false,
  resetPasswordFaild: false,
  resetPasswordSuccess: false,
  updateTokenRequest: false,
  updateTokenFaild: false,
  updateTokenSuccess: false,
}

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_CHECKED: {
      return {
        ...state,

        isAuthSuccess: true,
      }
    }
    case AUTH_CHECKED_FAILED: {
      return {
        ...state,

        isAuthSuccess: false,
      }
    }

    //Получение данных пользователя
    case GET_USER_REQUEST: {
      return {
        ...state,

        getUserDataRequest: true,
        getUserDataFaild: false,
      }
    }

    case GET_USER_FAILED: {
      return {
        ...state,

        getUserDataRequest: false,
        getUserDataFaild: true,
        isAuthSuccess: false,
      }
    }

    case GET_USER_SUCCESS: {
      return {
        ...state,

        getUserDataFaild: false,
        getUserDataSuccess: true,

        user: action.user,
      }
    }

    //Обновление данных пользователя
    case UPDATE_USER_REQUEST: {
      return {
        ...state,

        updateUserDataRequest: true,
        updateUserDataFaild: false,
        updateUserDataSuccess: false,
      }
    }

    case UPDATE_USER_FAILED: {
      return {
        ...state,

        updateUserDataRequest: false,
        updateUserDataSuccess: false,
        updateUserDataFaild: true,
      }
    }

    case UPDATE_USER_SUCCESS: {
      return {
        ...state,

        updateUserDataRequest: false,
        updateUserDataSuccess: true,
        updateUserDataFaild: false,

        user: action.user,

        form: {
          ...state.form,
          email: "",
          password: "",
          name: "",
        },
      }
    }

    //Регистрация пользователя
    case REGISTRATION_FORM_REQUEST: {
      return {
        ...state,

        registrationRequest: true,
        registrateUserFaild: false,
        registrateUserSuccess: false,
      }
    }

    case REGISTRATION_FORM_FAILED: {
      return {
        ...state,

        registrationRequest: false,
        registrateUserFaild: true,
        registrateUserSuccess: false,
      }
    }

    case REGISTRATION_FORM_SUCCESS: {
      return {
        ...state,

        user: action.user,

        form: {
          ...state.form,
          email: "",
          password: "",
          name: "",
        },

        registrationRequest: false,
        registrateUserFaild: false,
        registrateUserSuccess: true,
      }
    }

    case LOGIN_REQUEST: {
      return {
        ...state,
        authorizationRequest: true,
        authorizationFaild: false,
        authorizationSuccess: false,
      }
    }

    case LOGIN_FAILED: {
      return {
        ...state,
        authorizationRequest: false,
        authorizationFaild: true,
        authorizationSuccess: false,

        isAuthSuccess: false,
      }
    }

    case LOGIN_SUCCESS: {

      return {
        ...state,

        user: action.user,

        form: {
          ...state.form,
          email: '',
          name: '',
          password: '',
        },


        isAuthSuccess: true,

        authorizationRequest: false,
        authorizationFaild: false,
        authorizationSuccess: true,
      }
    }

    //Выход из системы
    case LOGOUT_REQUEST: {
      return {
        ...state,
        logoutRequest: true,
        logoutFaild: false,
        logoutSuccess: false,
      }
    }

    case LOGOUT_FAILED: {
      return {
        ...state,
        logoutRequest: false,
        logoutFaild: true,
        logoutSuccess: false,
      }
    }

    case LOGOUT_SUCCESS: {
      return {
        ...state,
        user: null,

        form: {
          ...state.form,
          email: '',
          name: '',
          password: '',
        },

        logoutRequest: false,
        logoutFaild: false,
        logoutSuccess: true,

        isAuthSuccess: false,
      }
    }

    //Восстановление пароля
    case RECOVERY_PASSWORD_REQUEST: {
      return {
        ...state,
        recoveryPasswordRequest: true,
        recoveryPasswordFaild: false,
        recoveryPasswordSuccess: false,
      }
    }

    case RECOVERY_PASSWORD_FAILED: {
      return {
        ...state,
        recoveryPasswordRequest: false,
        recoveryPasswordFaild: true,
        recoveryPasswordSuccess: false,
      }
    }

    case RECOVERY_PASSWORD_SUCCESS: {
      return {
        ...state,

        form: {
          ...state.form,
          email: '',
        },

        message: action.message,

        recoveryPasswordRequest: false,
        recoveryPasswordFaild: false,
        recoveryPasswordSuccess: true,
      }
    }


    //Сброс пароля
    case RESET_PASSWORD_REQUEST: {
      return {
        ...state,

        resetPasswordRequest: true,
        resetPasswordFaild: false,
        resetPasswordSuccess: false,
      }
    }

    case RESET_PASSWORD_FAILED: {
      return {
        ...state,

        resetPasswordRequest: false,
        resetPasswordFaild: true,
        resetPasswordSuccess: false,
      }
    }

    case RESET_PASSWORD_SUCCESS: {
      return {
        ...state,

        resetPasswordRequest: false,
        resetPasswordFaild: false,
        resetPasswordSuccess: true,
      }
    }

    //Обновление токена
    case UPDATE_TOKEN_REQUEST: {
      return {
        ...state,
        updateTokenRequest: true,
        updateTokenFaild: false,
        updateTokenSuccess: false,
      }
    }

    case UPDATE_TOKEN_FAILED: {
      return {
        ...state,
        updateTokenRequest: false,
        updateTokenFaild: true,
        updateTokenSuccess: false,
      }
    }

    case UPDATE_TOKEN_SUCCESS: {
      return {
        ...state,
        updateTokenRequest: false,
        updateTokenFaild: false,
        updateTokenSuccess: true,
      }
    }

    default: {
      return state;
    }
  }

}