import { useEffect, useMemo } from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams, useMatch } from "react-router-dom";

import styles from "./order-info.module.css";
import { OrdersInfoIngredients } from "./order-info-ingredients/order-info-ingredients";
import { getDate } from "../../utils/get-date";
import {
  wsFeedConnectionClosed,
  wsFeedConnectionOpen,
} from "../../services/actions/ws_feed";
import {
  wsOrdersConnectionClosed,
  wsOrdersConnectionOpen,
} from "../../services/actions/ws_orders";

export const OrderInfo = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const background = location.state?.background;
  const { id } = useParams();
  const isProfileOrders = useMatch("/profile/orders/:id");
  const isAllOrders = useMatch("/feed/:id");
  const ingredients = useSelector((store) => store.burgerIngredients.data);
  const feedOrders = useSelector((store) => store.wsFeed.orders);
  const profileOrders = useSelector((store) => store.wsOrders.orders);
  let orders = isProfileOrders ? profileOrders : feedOrders;
  let order = orders?.find((order) => order._id === id);

  const orderIngredientsData = useMemo(() => {
    return order?.ingredients.map((id) => {
      return ingredients?.find((item) => {
        return id === item._id;
      });
    });
  }, [order?.ingredients, ingredients]);

  const orderTotalPrice = useMemo(() => {
    return orderIngredientsData?.reduce((sum, item) => {
      if (item?.type === "bun") {
        return (sum += item.price);
      }
      return (sum += item.price);
    }, 0);
  }, [orderIngredientsData]);

  useEffect(() => {
    if (isProfileOrders) {
      dispatch(wsOrdersConnectionOpen());
    }
    if (isAllOrders) {
      dispatch(wsFeedConnectionOpen());
    }
    return () => {
      if (isProfileOrders) {
        dispatch(wsOrdersConnectionClosed());
      }
      if (isAllOrders) {
        dispatch(wsFeedConnectionClosed());
      }
    };
  }, [dispatch, isProfileOrders, isAllOrders]);

  return (
    <>
      {order && (
        <div className={styles.container}>
          {background && (
            <p className="text text_type_digits-default pb-10">
              #{order.number}
            </p>
          )}
          {!background && (
            <p
              className={`${styles.order} text text_type_digits-default pb-10`}
            >
              #{order.number}
            </p>
          )}
          <h2 className="text text_type_main-medium pb-3">{order.name}</h2>
          {!!order.status && (
            <p className={`${styles.status} text text_type_main-default pb-15`}>
              {order.status === "done"
                ? "Выполнен"
                : order.status === "pending"
                ? "Готовится"
                : order.status === "created"
                ? "Создан"
                : "Выполнен"}
            </p>
          )}
          <h3 className={`text text_type_main-medium pb-6`}>Состав:</h3>
          <div>
            <OrdersInfoIngredients details={orderIngredientsData} />
          </div>
          <div className={`${styles.total} pt-10`}>
            <p className="text text_type_main-default text_color_inactive pb-10">
              {getDate(order.createdAt)}
            </p>
            <div className={styles.price}>
              <p className="text text_type_digits-default pr-2">
                {orderTotalPrice}
              </p>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
