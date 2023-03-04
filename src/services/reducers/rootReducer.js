import { combineReducers } from "redux";
import { burgerConstructorReducer } from "./burger-constructor";
import { burgerIngredientsReducer } from "./burger-ingredients";
import { ingredientReducer } from "./ingredient";
import { orderReducer } from "./order-details";
import { authReducer } from "./auth";

export const rootReducer = combineReducers({
  burgerConstructor: burgerConstructorReducer,
  burgerIngredients: burgerIngredientsReducer,
  ingredientDetails: ingredientReducer,
  order: orderReducer,
  user: authReducer,
});

export default rootReducer;
