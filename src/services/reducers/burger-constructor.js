import {
  BURGER_CONSTRUCTOR_ADD_BUN,
  BURGER_CONSTRUCTOR_ADD_ITEM,
  BURGER_CONSTRUCTOR_DELETE_ITEM,
  BURGER_CONSTRUCTOR_RESET_ITEM,
  BURGER_CONSTRUCTOR_MOVE_ITEM,
} from "../actions/burger-constructor";

const initialState = {
  bun: null,
  fillings: [],
};

export const burgerConstructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case BURGER_CONSTRUCTOR_DELETE_ITEM: {
      return {
        ...state,
        fillings: state.fillings.filter((item) => item.id !== action.id),
      };
    }

    case BURGER_CONSTRUCTOR_ADD_BUN: {
      return {
        ...state,
        bun: action.data,
      };
    }
    case BURGER_CONSTRUCTOR_ADD_ITEM: {
      return {
        ...state,
        fillings: [...state.fillings, action.data],
      };
    }
    case BURGER_CONSTRUCTOR_RESET_ITEM: {
      return {
        ...state,
        fillings: [],
        bun: null,
      };
    }
    case BURGER_CONSTRUCTOR_MOVE_ITEM: {
      const dragConstructor = [...state.fillings];
      dragConstructor.splice(
        action.data.dragIndex,
        0,
        dragConstructor.splice(action.data.hoverIndex, 1)[0]
      );

      return {
        ...state,
        fillings: dragConstructor,
      };
    }

    default: {
      return state;
    }
  }
};
