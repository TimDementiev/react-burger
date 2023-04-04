import { useMemo, FC } from "react";
import { useSelector } from "../../../services/types";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";


import styles from "./order-info-ingredients.module.css";
import { TIngredient } from "../../../services/types/data";

export type TOrderInfoDetails = {
	details: Array<TIngredient>;
}

export const OrdersInfoIngredients: FC<TOrderInfoDetails> = ({ details }) => {
  const ingredients = useSelector((store: any) => store.burgerIngredients.data);

  const count = (elem: any) => {
    let count = details.filter((item) => {
      return item === elem;
    }).length;
    return count;
  };

  const orderIngredient = useMemo(() => {
    return details?.map((elem: any) => {
      return ingredients?.find((item: TIngredient ) => {
        return elem._id === item._id;
      });
    });
  }, [details, ingredients]);

  return (
    <ul className={styles.scroller}>
      {orderIngredient &&
        [...new Set(orderIngredient)].map((item) => {
          return (
            <li className={`${styles.item} pr-6`} key={item?._id}>
              {item && (
                <>
                  <div className={styles.info}>
                    <div className={styles.content}>
                      <div className={styles.item}>
                        <img
                          className={styles.image}
                          src={item.image}
                          alt={item.name}
                        />
                      </div>
                    </div>
                    <p
                      className={`${styles.name} text text_type_main-default pl-4`}
                    >
                      {item.name}
                    </p>
                  </div>
                  <div className={styles.price}>
                    <p className="text text_type_digits-default pr-2">
                      {`${count(item)} x ${item.price}`}
                    </p>
                    <CurrencyIcon type="primary" />
                  </div>
                </>
              )}
            </li>
          );
        })}
    </ul>
  );
};

