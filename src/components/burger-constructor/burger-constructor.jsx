import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerConstructorStyles from "./burger-constructor.module.css";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { getOrderData } from "../../utils/api";
import {
  BURGER_CONSTRUCTOR_ADD_BUN,
  BURGER_CONSTRUCTOR_ADD_ITEM,
} from "../../services/actions/burger-constructor";
import { useDrop } from "react-dnd";

const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const { bun, fillings } = useSelector((store) => store.burgerConstructor);
  const [totalCost, setTotalCost] = useState(0);

  const itemsData = useMemo(
    () => fillings.map((item) => item._id),
    [fillings]
  );

  const filling = useMemo(
    () => fillings.filter((item) => item.type !== "bun"),
    [fillings]
  );

  useEffect(() => {
    const totalCost = filling.reduce(
      (current, total) => current + total.price,
      bun === null ? 0 : bun.price * 2
    );
    setTotalCost(totalCost);
  }, [bun, filling]);

  const [modalActive, setModalActive] = useState(false);
  const toggleModal = () => setModalActive(!modalActive);

  const orderDetails = (productsid) => {
    dispatch(getOrderData(productsid));
  };

  const [, dropTarget] = useDrop({
    accept: "ingredients",
    drop(item) {
      if (item.ingredient.type === "bun") {
        dispatch({
          type: BURGER_CONSTRUCTOR_ADD_BUN,
          data: item.ingredient,
        });
      } else {
        dispatch({
          type: BURGER_CONSTRUCTOR_ADD_ITEM,
          data: { ...item.ingredient, id: Date.now() },
        });
      }
    },
  });

  return (
    <section className={`${burgerConstructorStyles.section} pt-15`}>
      {modalActive && (
        <Modal title="" onClose={toggleModal}>
          <OrderDetails />
        </Modal>
      )}
      <div className={burgerConstructorStyles.preparationContainer} ref={dropTarget}>
        {bun || fillings.length > 0 ? (
          <div className={burgerConstructorStyles.preparationContainer}>
            {bun && (
              <div className="ml-10 mr-4">
                <ConstructorElement
                  type="top"
                  isLocked={true}
                  text={`${bun.name} (верх)`}
                  price={`${bun.price}`}
                  thumbnail={`${bun.image}`}
                />
              </div>
            )}
            <ul className={`${burgerConstructorStyles.fillingList}`}>
              {fillings.map((element) => {
                if (element.type !== "bun") {
                  return (
                    <li
                      className={`${burgerConstructorStyles.fillingelement} mb-4 ml-4`}
                      key={element._id}
                    >
                      <DragIcon type="primary" />
                      <ConstructorElement
                        text={element.name}
                        price={element.price}
                        thumbnail={element.image}
                      />
                    </li>
                  );
                } else {
                  return null;
                }
              })}
            </ul>
            {bun && (
              <div className="ml-8">
                <ConstructorElement
                  type="bottom"
                  isLocked={true}
                  text={`${bun.name} (низ)`}
                  price={`${bun.price}`}
                  thumbnail={`${bun.image}`}
                />
              </div>
            )}
          </div>
        ) : (
          <div
            className={`${burgerConstructorStyles.emptyPreparationContainer} text text_type_main-medium text_color_inactive`}
          >
            Перетащите сюда булку и начинку!
          </div>
        )}
      </div>

      <div className={`${burgerConstructorStyles.sum} mt-10`}>
        <div className={`${burgerConstructorStyles.costContainer} mr-10`}>
          <p
            className={`${burgerConstructorStyles.cost} text text_type_digits-medium`}
          >
            {totalCost}
          </p>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          type="primary"
          size="large"
          htmlType="button"
          onClick={() => {
            orderDetails(itemsData);
            toggleModal();
          }}
        >
          Оформить заказ
        </Button>
      </div>
    </section>
  );
};

export default BurgerConstructor;
