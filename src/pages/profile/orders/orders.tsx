import { useEffect, FC } from "react";
import { useDispatch, useSelector } from "../../../services/types/index";
import { Link, useLocation } from "react-router-dom";

import { OrderCard } from "../../../components/orders/order-card/order-card";
import {
  wsOrdersConnectionClosed,
  wsOrdersConnectionOpen,
} from "../../../services/actions/ws_orders";
import styles from "./orders.module.css";
import { TFeed } from "../../../services/types/data";

export const UserOrders: FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { orders } = useSelector((store) => store.wsOrders);

  useEffect(() => {
    dispatch(wsOrdersConnectionOpen());
    return () => {
      dispatch(wsOrdersConnectionClosed());
    };
  }, [dispatch]);

  return (
    <div className={styles.orderList}>
      {orders &&
        orders
          .map((order: TFeed) => {
            return (
              <Link
                to={`${location.pathname}/${order._id}`}
                state={{ previousLocationOrders: location }}
                className={`${styles.link} mb-2`}
                key={order._id}
              >
                <OrderCard order={order} key={order._id} statusVue={true} />
              </Link>
            );
          })
          .reverse()}
    </div>
  );
};
