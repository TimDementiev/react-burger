import { getCookie } from "../../utils/cookie";
import { updateToken } from "../actions/auth";

export const socketMiddleware = (wsUrl, wsActions) => {
  return (store) => {
    let socket = null;

    return (next) => (action) => {
      const { dispatch, getState } = store;
      const { type, payload } = action;
      const { wsInit, wsSendMessage, onOpen, onClose, onError, onMessage } =
        wsActions;
      const { user } = getState().user;

      if (type === wsInit) {
        if (!user) {
          socket = new WebSocket(wsUrl);
        } else {
          const accessToken = getCookie("token");
          socket = new WebSocket(`${wsUrl}?token=${accessToken}`);
        }
      }

      if (type === onClose) {
        socket && socket.close(1000, "CLOSE_NORMAL");
      }

      if (socket) {
        socket.onopen = (event) => {
          dispatch({ type: onOpen, payload: event });
        };

        socket.onerror = (event) => {
          dispatch({ type: onError, payload: event });
        };

        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;

          dispatch({ type: onMessage, payload: restParsedData });

          if (restParsedData.message === "Invalid or missing token") {
            dispatch(updateToken());
          }
        };

        socket.onclose = (event) => {
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
