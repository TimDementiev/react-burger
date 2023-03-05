import { combineReducers } from "redux";
import { burgerConstructorReducer } from "./burger-constructor";
import { burgerIngredientsReducer } from "./burger-ingredients";
import { ingredientReducer } from "./ingredient";
import { orderReducer } from "./order-details";
import { authReducer } from "./auth";
import { feedReducer } from "./feed";
import { ordersReducer } from "./orders";

export const rootReducer = combineReducers({
  burgerConstructor: burgerConstructorReducer,
  burgerIngredients: burgerIngredientsReducer,
  ingredientDetails: ingredientReducer,
  order: orderReducer,
  user: authReducer,
  wsFeed: feedReducer,
  wsOrders: ordersReducer,
});

export default rootReducer;
