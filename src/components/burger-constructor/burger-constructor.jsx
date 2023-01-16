import { useState } from "react";
import { dataType } from "../../utils/types";
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

const BurgerConstructor = ({ data }) => {
  const fillings = data.filter((element) => element.type !== "bun");
  const bun = data.find((element) => element.type === "bun");
  const totalCost = fillings.reduce(
    (total, current) => total + current.price,
    bun.price * 2
  );
  const [active, setActive] = useState(false);
  const toggleModal = () => setActive(!active);

  const [orderNumber, setOrderNumber] = useState(0);
  const makeOrder = async () => {
    try {
      const res = await getOrderData(data.map((item) => item._id));
      const newOrder = await res;
      setOrderNumber(`${newOrder.order.number}`);
      toggleModal();
      console.log(orderNumber);
    } catch (error) {
      setOrderNumber(0);
      console.log(error);
    }
  };

  return (
    <section className={`${burgerConstructorStyles.section} pt-15`}>
      {active && (
        <Modal title="" onClose={toggleModal}>
          <OrderDetails orderNumber={orderNumber} />
        </Modal>
      )}
      <div className="ml-10 mr-4">
        <ConstructorElement
          type="top"
          isLocked={true}
          text={`${bun.name} (верх)`}
          price={`${bun.price}`}
          thumbnail={`${bun.image}`}
        />
      </div>
      <ul className={`${burgerConstructorStyles.fillingList}`}>
        {data.map((element) => {
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
      <div className="ml-8">
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={`${bun.name} (низ)`}
          price={`${bun.price}`}
          thumbnail={`${bun.image}`}
        />
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
            makeOrder();
          }}
        >
          Оформить заказ
        </Button>
      </div>
    </section>
  );
};

BurgerConstructor.propTypes = dataType;

export default BurgerConstructor;
