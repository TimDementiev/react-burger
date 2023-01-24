import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAILED,
    RESET_ORDER,
  } from '../actions/order-details.js';

  const initialState = {
    number: null,
    orderDetailsRequest: false,
    orderDetailsFailed: false
  }

  export const orderReducer = (state = initialState, action) => {
    switch (action.type) {
      case CREATE_ORDER_REQUEST: {
        return {
          ...state,
          orderDetailsRequest: true,
          orderDetailsFailed: false,
        }
      }
      case CREATE_ORDER_SUCCESS: {
        return {
          ...state,
          number: action.number,
          orderDetailsRequest: false,
          orderDetailsFailed: false,
        }
      }
      case CREATE_ORDER_FAILED: {
        return {
          ...state,
          number: null,
          orderDetailsRequest: false,
          orderDetailsFailed: true,
        }
      }
      case RESET_ORDER: {
        return {
          ...state,
          number: null,
          orderDetailsRequest: false,
          orderDetailsFailed: false,
        }
      }
      default:
        return state;
    }
  }