import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

import { OrderCard } from "../../../components/orders/order-card/order-card";
import { wsOrdersConnectionClosed, wsOrdersConnectionOpen } from "../../../services/actions/actions-ws-types/ws_orders-action-types";
import styles from "./orders.module.css";

export const UserOrders = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { orders } = useSelector((store) => store.wsOrders);

  useEffect(() => {
    dispatch(wsOrdersConnectionOpen());
    return () => {
      dispatch(wsOrdersConnectionClosed());
    };
  }, [dispatch]);

  if (orders.length === 0) {
    return <div>Loading</div>;
  }

  return (
    <div className={styles.orderList}>
      {orders &&
        orders.map((order) => {
          return (
            <Link
              to={{
                pathname: `${location.pathname}/${order._id}`,
                state: { background: location },
              }}
              className={`${styles.link} mb-2`}
              key={order._id}
            >
              <OrderCard order={order} key={order._id} statusVue={true} />
            </Link>
          );
        }).reverse()}
    </div>
  );
};
