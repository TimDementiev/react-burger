import { rootReducer } from "./reducers/rootReducer";
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware } from "redux";
import  thunk from "redux-thunk";
import { socketMiddleware } from "./middleware/socketMiddleware";
import {
  WS_FEED_CONNECTION_START,
  WS_FEED_CONNECTION_SUCCESS,
  WS_FEED_CONNECTION_ERROR,
  WS_FEED_CONNECTION_CLOSED,
  WS_FEED_GET_MESSAGE,
  WS_FEED_SEND_MESSAGE,
} from "./actions/ws_feed";

import {
  WS_ORDERS_CONNECTION_START,
  WS_ORDERS_CONNECTION_SUCCESS,
  WS_ORDERS_CONNECTION_ERROR,
  WS_ORDERS_CONNECTION_CLOSED,
  WS_ORDERS_GET_MESSAGE,
  WS_ORDERS_SEND_MESSAGE,
} from "./actions/ws_orders";

const wsUrl = "wss://norma.nomoreparties.space/orders/all";
const wsOrdersUrl = "wss://norma.nomoreparties.space/orders";

const feedWsActions = {
  wsInit: WS_FEED_CONNECTION_START,
  wsSendMessage: WS_FEED_SEND_MESSAGE,
  onOpen: WS_FEED_CONNECTION_SUCCESS,
  onClose: WS_FEED_CONNECTION_CLOSED,
  onError: WS_FEED_CONNECTION_ERROR,
  onMessage: WS_FEED_GET_MESSAGE,
};

const userOrdersWsActions = {
  wsInit: WS_ORDERS_CONNECTION_START,
  wsSendMessage: WS_ORDERS_SEND_MESSAGE,
  onOpen: WS_ORDERS_CONNECTION_SUCCESS,
  onClose: WS_ORDERS_CONNECTION_CLOSED,
  onError: WS_ORDERS_CONNECTION_ERROR,
  onMessage: WS_ORDERS_GET_MESSAGE,
};

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(
      thunk,
      socketMiddleware(wsUrl, feedWsActions),
      socketMiddleware(wsOrdersUrl, userOrdersWsActions),
    )
  )
);

export default store;
