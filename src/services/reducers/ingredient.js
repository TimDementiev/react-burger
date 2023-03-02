import {
    SET_INGREDIENT_MODAL,
    RESET_INGREDIENT_MODAL,
  } from "../actions/ingredient";

  const initialState = {
    data: null,
    modalActive: false,
    dataIngredientDetails: null,
  }

  export const ingredientReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_INGREDIENT_MODAL: {
        return {
          ...state,
          modalActive: true,
          dataIngredientDetails: action.ingredient,
        };
      }
      case RESET_INGREDIENT_MODAL: {
        return {
          ...state,
          modalActive: false,
          dataIngredientDetails: null
        };
      }
      default: {
        return state;
      }
    }
  };