import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook,
} from "react-redux";
import { ThunkAction, ThunkDispatch  } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';

import { rootReducer } from "../reducers/rootReducer";
import { TWsFeedActions } from "../actions/ws_feed";
import { TWsOrdersActions } from "../actions/ws_orders";
import { TAuthActions } from "../actions/auth";
import { TConstructorActions } from "../actions/burger-constructor";
import { TIngredientsActions } from "../actions/burger-ingredients";
import { TOrderDetailsActions } from "../actions/order-details";

type TApplicationActions =
	| TAuthActions
	| TConstructorActions
	| TIngredientsActions
	| TOrderDetailsActions
	| TWsFeedActions
	| TWsOrdersActions

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = ThunkDispatch<RootState, never, TApplicationActions>;

export type AppThunk<ReturnType = void> = ActionCreator<
	ThunkAction<ReturnType, Action, RootState, TApplicationActions>
>;

export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
export const useDispatch = () => dispatchHook<AppDispatch & AppThunk>();