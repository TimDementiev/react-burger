import { getInitialData } from '../../utils/api'

export const GET_BURGER_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_BURGER_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_BURGER_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

export function getBurgerIngredients() {
    return function (dispatch) {
      dispatch({
        type: GET_BURGER_INGREDIENTS_REQUEST
      });
      getInitialData()
        .then((res) => {
          dispatch({
            type: GET_BURGER_INGREDIENTS_SUCCESS,
            data: res.data
          });
        })
        .catch(() => {
          dispatch({
            type: GET_BURGER_INGREDIENTS_FAILED,
          });
        })
    };
  }
