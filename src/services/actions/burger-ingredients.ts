import { getInitialData } from '../../utils/api'
import { AppDispatch } from '../types';
import { TIngredient } from '../types/data';

export const GET_BURGER_INGREDIENTS_REQUEST:'GET_INGREDIENTS_REQUEST' = 'GET_INGREDIENTS_REQUEST';
export const GET_BURGER_INGREDIENTS_SUCCESS:'GET_INGREDIENTS_SUCCESS' = 'GET_INGREDIENTS_SUCCESS';
export const GET_BURGER_INGREDIENTS_FAILED:'GET_INGREDIENTS_FAILED' = 'GET_INGREDIENTS_FAILED';

export interface IIngredientsRequest {
  readonly type: typeof GET_BURGER_INGREDIENTS_REQUEST;
}

export interface IIngredientsFailed {
  readonly type: typeof GET_BURGER_INGREDIENTS_FAILED;
}

export interface IIngredientsSuccess {
  readonly type: typeof GET_BURGER_INGREDIENTS_SUCCESS;
  readonly data: Array<TIngredient>
}

export type TIngredientsActions =
  | IIngredientsRequest
  | IIngredientsFailed
  | IIngredientsSuccess

export function getBurgerIngredients() {
    return function (dispatch: AppDispatch) {
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
