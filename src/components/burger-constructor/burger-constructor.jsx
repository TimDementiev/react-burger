import PropTypes from "prop-types";
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerConstructorStyles from "./burger-constructor.module.css";

const BurgerConstructor = ({ data }) => {
  const fillings = data.filter((element) => element.type !== "bun");
  const bun = data.find((element) => element.type === "bun");
  const totalCost = fillings.reduce(
    (total, current) => total + current.price,
    bun.price * 2
  );

  return (
    <section className={`${burgerConstructorStyles.section} pt-15`}>
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
        <Button type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
    </section>
  );
};

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      name: PropTypes.string,
      type: PropTypes.string,
      proteings: PropTypes.number,
      fat: PropTypes.number,
      carbohydrates: PropTypes.number,
      calories: PropTypes.number,
      price: PropTypes.number,
      image: PropTypes.string,
      image_mobile: PropTypes.string,
      image_large: PropTypes.string,
      __v: PropTypes.number,
    }).isRequired
  ).isRequired,
};

export default BurgerConstructor;
