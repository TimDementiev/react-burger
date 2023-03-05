import {
  WS_ORDERS_CONNECTION_SUCCESS,
  WS_ORDERS_CONNECTION_ERROR,
  WS_ORDERS_CONNECTION_CLOSED,
  WS_ORDERS_GET_MESSAGE,
} from "../actions/ws_orders";

const initialState = {
  wsConnected: false,
  orders: [],
  total: 0,
  totalToday: 0,
  error: null,
}

export const ordersReducer = (state = initialState, action) => {
  switch (action.type) {
    case WS_ORDERS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true,
        error: null,
      };

    case WS_ORDERS_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false,
        error: action.payload,
      };

    case WS_ORDERS_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false,
        error: null,
      };

    case WS_ORDERS_GET_MESSAGE:
      return {
        ...state,
        orders: action.payload.orders,
        total: action.payload.total,
        totalToday: action.payload.totalToday,
        error: null,
      };

    default:
      return state;
  }
};