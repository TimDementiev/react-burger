import {
  GET_BURGER_INGREDIENTS_REQUEST,
  GET_BURGER_INGREDIENTS_SUCCESS,
  GET_BURGER_INGREDIENTS_FAILED,
} from "../actions/burger-ingredients";

import { TIngredientsActions } from "../actions/burger-ingredients";
import { TIngredient } from "../types/data";

export type TIngredientsState = {
  data: Array<TIngredient>,
  isLoading: boolean,
  dataRequest: boolean,
  hasError: boolean,
}

const initialState: TIngredientsState = {
  data: [],
  isLoading: false,
  dataRequest: false,
  hasError: false,
};

export const burgerIngredientsReducer = (
  state = initialState,
  action: TIngredientsActions
): TIngredientsState => {
  switch (action.type) {
    case GET_BURGER_INGREDIENTS_REQUEST: {
      return {
        ...state,
        isLoading: true,
        dataRequest: false,
        hasError: false,
      };
    }
    case GET_BURGER_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        dataRequest: true,
        data: action.data,
      };
    }
    case GET_BURGER_INGREDIENTS_FAILED: {
      return {
        ...state,
        isLoading: false,
        dataRequest: false,
        hasError: true,
      };
    }
    default: {
      return state;
    }
  }
};
