export const WS_FEED_CONNECTION_SUCCESS = 'WS_FEED_CONNECTION_SUCCESS';
export const WS_FEED_CONNECTION_ERROR = 'WS_FEED_CONNECTION_ERROR';
export const WS_FEED_CONNECTION_CLOSED = 'WS_FEED_CONNECTION_CLOSED';
export const WS_FEED_GET_MESSAGE = 'WS_FEED_GET_MESSAGE';
export const WS_FEED_SEND_MESSAGE = 'WS_FEED_SEND_MESSAGE';
export const WS_FEED_CONNECTION_START = 'WS_FEED_CONNECTION_START';

export const wsFeedConnectionSuccess = () => {
	return {
		type: WS_FEED_CONNECTION_SUCCESS
	};
};

export const wsFeedConnectionOpen = () => {
	console.log("flag1");
	return {
		type: WS_FEED_CONNECTION_START
	}
}

export const wsFeedConnectionError = () => {
	return {
		type: WS_FEED_CONNECTION_ERROR
	};
};

export const wsFeedConnectionClosed = () => {
	return {
		type: WS_FEED_CONNECTION_CLOSED
	};
};

export const wsFeedGetMessage = order => {
	return {
		type: WS_FEED_GET_MESSAGE,
		payload: order
	};
};

export const wsFeedSendMessage = order => {
	return {
		type: WS_FEED_SEND_MESSAGE,
		payload: order
	};
};