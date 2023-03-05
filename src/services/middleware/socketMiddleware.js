import { getCookie } from "../../utils/cookie";

export const socketMiddleware = (wsUrl, wsActions) => {
	return store => {
		let socket = null;
    console.log("flag2.4");
		return next => action => {
			const { dispatch, getState } = store;
			const { type, payload } = action;
			const { wsInit, wsSendMessage, onOpen, onClose, onError, onMessage } = wsActions;
      const { user } = getState().user;
			const accessToken = getCookie('token')
      console.log("flag2.5");

			if (type === wsInit) {
				if (!user) {
          console.log("flag2");
					socket = new WebSocket(wsUrl);
				} else {
          console.log("flag3");
					socket = new WebSocket(`${wsUrl}?token=${accessToken}`);
				}
			}

			if (socket) {
				socket.onopen = event => {
					dispatch({ type: onOpen, payload: event });
				};

				socket.onerror = event => {
					dispatch({ type: onError, payload: event });
				};

				socket.onmessage = event => {
					const { data } = event;
					const parsedData = JSON.parse(data);
					const { success, ...restParsedData } = parsedData;

					dispatch({ type: onMessage, payload: restParsedData });
				};

				socket.onclose = event => {
					dispatch({ type: onClose, payload: event });
				};

				if (type === wsSendMessage) {
					const data = { ...payload };
					socket.send(JSON.stringify(data));
				}
			}

			next(action);
		};
	};
};