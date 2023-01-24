import { getOrderData } from "../../utils/api";

export const CREATE_ORDER_REQUEST = 'CREATE_ORDER_REQUEST';
export const CREATE_ORDER_SUCCESS = 'CREATE_ORDER_SUCCESS';
export const CREATE_ORDER_FAILED = 'CREATE_ORDER_FAILED';
export const RESET_ORDER = 'RESET_ORDER';

export function getOrderDetails(order) {
  return function (dispatch) {
    dispatch({
      type: CREATE_ORDER_REQUEST
    });
    getOrderData(order)
      .then((res) => {
        dispatch({
          type: CREATE_ORDER_SUCCESS,
          number: res.order.number
        });
      })
      .catch(() => {
        dispatch({
          type: CREATE_ORDER_FAILED,
        });
      })
  };
}

