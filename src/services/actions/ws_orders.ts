import { TFeedResponse, TOrder } from "../types/data";
export const WS_ORDERS_CONNECTION_SUCCESS: 'WS_ORDERS_CONNECTION_SUCCESS' = 'WS_ORDERS_CONNECTION_SUCCESS';
export const WS_ORDERS_CONNECTION_ERROR: 'WS_ORDERS_CONNECTION_ERROR' = 'WS_ORDERS_CONNECTION_ERROR';
export const WS_ORDERS_CONNECTION_CLOSED: 'WS_ORDERS_CONNECTION_CLOSED' = 'WS_ORDERS_CONNECTION_CLOSED';
export const WS_ORDERS_GET_MESSAGE: 'WS_ORDERS_GET_MESSAGE' = 'WS_ORDERS_GET_MESSAGE';
export const WS_ORDERS_SEND_MESSAGE: 'WS_ORDERS_SEND_MESSAGE' = 'WS_ORDERS_SEND_MESSAGE';
export const WS_ORDERS_CONNECTION_START: 'WS_ORDERS_CONNECTION_START' = 'WS_ORDERS_CONNECTION_START';

export interface IWsOrdersSuccess {
	readonly type: typeof WS_ORDERS_CONNECTION_SUCCESS;
  }

  export interface IWsOrdersConnectionStart {
	readonly type: typeof WS_ORDERS_CONNECTION_START;
  }

  export interface IWsOrdersConnectionError {
	readonly type: typeof WS_ORDERS_CONNECTION_ERROR;
	readonly payload: MessageEvent;
  }

  export interface IWsOrdersConnectionClosed {
	readonly type: typeof WS_ORDERS_CONNECTION_CLOSED;
  }

  export interface IWsOrdersGetMessage {
	readonly type: typeof WS_ORDERS_GET_MESSAGE;
	readonly payload: TFeedResponse;
  }

  export interface IWsOrdersSendMessage {
	readonly type: typeof WS_ORDERS_SEND_MESSAGE;
	readonly payload: TOrder;
  }

  export type TWsOrdersActions =
	| IWsOrdersSuccess
	| IWsOrdersConnectionStart
	| IWsOrdersConnectionError
	| IWsOrdersConnectionClosed
	| IWsOrdersGetMessage
	| IWsOrdersSendMessage

	export const wsOrdersConnectionSuccess = (): IWsOrdersSuccess => {
	return {
		type: WS_ORDERS_CONNECTION_SUCCESS
	};
};

export const wsOrdersConnectionOpen = (): IWsOrdersConnectionStart => {
	return {
		type: WS_ORDERS_CONNECTION_START
	}
}

export const wsOrdersConnectionError = (message: MessageEvent): IWsOrdersConnectionError => {
	return {
		type: WS_ORDERS_CONNECTION_ERROR,
		payload: message
	};
};

export const wsOrdersConnectionClosed = (): IWsOrdersConnectionClosed => {
	return {
		type: WS_ORDERS_CONNECTION_CLOSED
	};
};

export const wsOrdersGetMessage = (orders: TFeedResponse): IWsOrdersGetMessage => {
	return {
		type: WS_ORDERS_GET_MESSAGE,
		payload: orders
	};
};

export const wsOrdersSendMessage = (order: TOrder): IWsOrdersSendMessage => {
	return {
		type: WS_ORDERS_SEND_MESSAGE,
		payload: order
	};
};