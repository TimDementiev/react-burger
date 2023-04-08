import { FC } from "react";
import { useSelector } from "../../services/types/index";
import { Link, useLocation } from "react-router-dom";

import styles from "./orders.module.css";
import { OrderCard } from "./order-card/order-card";

export const Orders: FC = () => {
  const location = useLocation();
  const { orders } = useSelector((store) => store.wsFeed);

  if (!orders.length) {
    return <div>Loading</div>;
  }

  return (
    <section className={`${styles.orderList}`}>
      {orders &&
        orders.map((order) => {
          return (
            <Link
              to={`${location.pathname}/${order._id}`}
              state={{ previousLocationFeed: location }}
              className={`${styles.link}`}
              key={order._id}
            >
              <OrderCard order={order} key={order._id} statusVue={false} />
            </Link>
          );
        })}
    </section>
  );
};
