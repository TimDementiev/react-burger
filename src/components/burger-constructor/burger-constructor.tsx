import { useEffect, useMemo, useState, useCallback, FC } from "react";
import { useDispatch, useSelector } from "../../services/types/index";
import { useDrop } from "react-dnd";
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerConstructorStyles from "./burger-constructor.module.css";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { getOrderDetails } from "../../services/actions/order-details.js";
import {
  BURGER_CONSTRUCTOR_ADD_BUN,
  BURGER_CONSTRUCTOR_ADD_ITEM,
} from "../../services/actions/burger-constructor";
import ConstructorItems from "../burger-constructor-items/burger-constructor-items";
import { useNavigate } from "react-router-dom";
import { TConstructorIngredient, TIngredient } from "../../services/types/data";

interface IDropItem {
  ingredient: TConstructorIngredient;
  _id: string;
  bun: TIngredient;
  fillings: TConstructorIngredient[]
}

const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { bun, fillings } = useSelector((store:any) => store.burgerConstructor);
  const [totalCost, setTotalCost] = useState(0);
  const [modalActive, setModalActive] = useState(false);
  const isAuthSuccess = useSelector((store:any) => store.user.isAuthSuccess);
  const itemsData = useCallback(() => {
    let itemsId = [];
    let fillingId = fillings.map((item: any) => item._id);
    let bunId = [bun._id];
    itemsId = [bunId, ...fillingId, bunId];
    return itemsId;
  }, [fillings, bun]);

  const filling = useMemo(
    () => fillings.filter((item: any) => item.type !== "bun"),
    [fillings]
  );

  useEffect(() => {
    const totalCost = filling.reduce(
      (current: number , total: any) => current + total.price,
      bun === null ? 0 : bun.price * 2
    );
    setTotalCost(totalCost);
  }, [bun, filling]);

  const openModal = () => {
    if (!isAuthSuccess) {
      navigate("/login");
    }
    setModalActive(true);
  };

  const closeModal = () => {
    setModalActive(false);
  };

  const orderDetails = (productsid: Array<string>) => {
    dispatch(getOrderDetails(productsid));
  };

  const [, dropTarget] = useDrop({
    accept: "fillings",
    drop(item: IDropItem) {
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
        <Modal onClose={closeModal}>
          <OrderDetails />
        </Modal>
      )}
      <div
        className={burgerConstructorStyles.preparationContainer}
        ref={dropTarget}
      >
        {bun || fillings.length > 0 ? (
          <div className={burgerConstructorStyles.preparationContainer}>
            {bun && (
              <div className="ml-10 mr-4">
                <ConstructorElement
                  type="top"
                  isLocked={true}
                  text={`${bun.name} (верх)`}
                  price={bun.price}
                  thumbnail={`${bun.image}`}
                />
              </div>
            )}
            <ul className={`${burgerConstructorStyles.fillingList}`}>
              {fillings.length > 0 ? (
                fillings.map((item: TConstructorIngredient, index: number) => {
                  return (
                    <ConstructorItems index={index} key={item.id} item={item} />
                  );
                })
              ) : (
                <div
                  className={`${burgerConstructorStyles.emptyPreparationIngredients} text text_type_main-medium text_color_inactive ml-4`}
                >
                  Перетащите сюда начинку
                </div>
              )}
            </ul>
            {bun && (
              <div className="ml-8">
                <ConstructorElement
                  type="bottom"
                  isLocked={true}
                  text={`${bun.name} (низ)`}
                  price={bun.price}
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
      {(bun || fillings.length > 0) && (
        <div className={`${burgerConstructorStyles.sum} mt-10`}>
          <div className={`${burgerConstructorStyles.costContainer} mr-10`}>
            <p
              className={`${burgerConstructorStyles.cost} text text_type_digits-medium`}
            >
              {totalCost}
            </p>
            <CurrencyIcon type="primary" />
          </div>
          {fillings.length === 0 || bun === null ? (
            <Button htmlType="button" type="primary" size="large" disabled>
              Оформить заказ
            </Button>
          ) : (
            <Button
              type="primary"
              size="large"
              onClick={() => {
                orderDetails(itemsData());
                openModal();
              }}
              htmlType="button"
            >
              Оформить заказ
            </Button>
          )}
        </div>
      )}
    </section>
  );
};

export default BurgerConstructor;
