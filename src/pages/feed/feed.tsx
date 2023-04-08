import { useEffect, FC } from "react";
import { useDispatch, useSelector } from "../../services/types/index";
import { OrdersStatistics } from "../../components/orders-statistics/orders-statistics";

import { Orders } from "../../components/orders/orders";
import {
  wsFeedConnectionClosed,
  wsFeedConnectionOpen,
} from "../../services/actions/ws_feed";
import styles from "./feed.module.css";

export const FeedPage: FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector((store) => store.wsFeed.orders);

  useEffect(() => {
    dispatch(wsFeedConnectionOpen());
    return () => {
      dispatch(wsFeedConnectionClosed());
    };
  }, [dispatch]);

  if (!orders.length) {
    return <div>Loading</div>;
  }

  return (
    <div className={styles.feed}>
      <h2 className={`${styles.title} text text_type_main-large pt-10 pb-5`}>Лента заказов</h2>
      <div className={styles.container}>
        <Orders />
        <OrdersStatistics />
      </div>
    </div>
  );
};
