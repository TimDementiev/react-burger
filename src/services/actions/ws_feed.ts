import { TFeedResponse, TOrder } from "../types/data";
export const WS_FEED_CONNECTION_SUCCESS: 'WS_FEED_CONNECTION_SUCCESS' = 'WS_FEED_CONNECTION_SUCCESS';
export const WS_FEED_CONNECTION_ERROR: 'WS_FEED_CONNECTION_ERROR' = 'WS_FEED_CONNECTION_ERROR';
export const WS_FEED_CONNECTION_CLOSED: 'WS_FEED_CONNECTION_CLOSED' = 'WS_FEED_CONNECTION_CLOSED';
export const WS_FEED_GET_MESSAGE: 'WS_FEED_GET_MESSAGE' = 'WS_FEED_GET_MESSAGE';
export const WS_FEED_SEND_MESSAGE: 'WS_FEED_SEND_MESSAGE' = 'WS_FEED_SEND_MESSAGE';
export const WS_FEED_CONNECTION_START: 'WS_FEED_CONNECTION_START' = 'WS_FEED_CONNECTION_START';

export interface IWsFeedConnectionSuccess {
  readonly type: typeof WS_FEED_CONNECTION_SUCCESS;
}

export interface IWsFeedConnectionStart {
  readonly type: typeof WS_FEED_CONNECTION_START;
}

export interface IWsFeedConnectionError {
  readonly type: typeof WS_FEED_CONNECTION_ERROR;
  readonly payload: MessageEvent;
}

export interface IWsFeedConnectionClosed {
  readonly type: typeof WS_FEED_CONNECTION_CLOSED;
}

export interface IWsFeedGetMessage {
  readonly type: typeof WS_FEED_GET_MESSAGE;
  readonly payload: TFeedResponse;
}

export interface IWsFeedSendMessage {
  readonly type: typeof WS_FEED_SEND_MESSAGE;
  readonly payload: TOrder;
}

export type TWsFeedActions =
  | IWsFeedConnectionSuccess
  | IWsFeedConnectionStart
  | IWsFeedConnectionError
  | IWsFeedConnectionClosed
  | IWsFeedGetMessage
  | IWsFeedSendMessage

  export const wsFeedConnectionSuccess = (): IWsFeedConnectionSuccess => {
  return {
    type: WS_FEED_CONNECTION_SUCCESS,
  };
};

export const wsFeedConnectionOpen = (): IWsFeedConnectionStart => {
  return {
    type: WS_FEED_CONNECTION_START,
  };
};

export const wsFeedConnectionError = (message: MessageEvent): IWsFeedConnectionError => {
  return {
    type: WS_FEED_CONNECTION_ERROR,
    payload: message
  };
};

export const wsFeedConnectionClosed = (): IWsFeedConnectionClosed => {
  return {
    type: WS_FEED_CONNECTION_CLOSED,
  };
};

export const wsFeedGetMessage = (orders: TFeedResponse): IWsFeedGetMessage => {
  return {
    type: WS_FEED_GET_MESSAGE,
		payload: orders
  };
};

export const wsFeedSendMessage = (order: TOrder): IWsFeedSendMessage => {
  return {
    type: WS_FEED_SEND_MESSAGE,
    payload: order,
  };
};
