import React from "react";
import { dataType } from "../../utils/types";
import burgerIngredientsStyles from "./burger-ingredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientCard from "../ingredient-card/ingredient-card.jsx";

const BurgerIngredients = ({ data }) => {
  const [current, setCurrent] = React.useState("bun");

  return (
    <section className={burgerIngredientsStyles.section}>
      <h1 className={`text text_type_main-large mb-5`}>Соберите бургер</h1>
      <div className={`${burgerIngredientsStyles.tabs}`}>
        <Tab value="bun" active={current === "bun"} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="sauce" active={current === "sauce"} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="main" active={current === "main"} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>
      <div className={`${burgerIngredientsStyles.ingredients}`}>
        <div className="mt-10" id="bun">
          <h2 className="text text_type_main-medium">Булки</h2>
          <ul className={`${burgerIngredientsStyles.kind} mt-6 ml-4`}>
            {data.map(
              (item) =>
                item.type === "bun" && (
                  <li key={item._id}>
                    <IngredientCard ingredient={item} />
                  </li>
                )
            )}
          </ul>
        </div>
        <div className="mt-10" id="sauce">
          <h2 className="text text_type_main-medium">Соусы</h2>
          <ul className={`${burgerIngredientsStyles.kind} mt-6 ml-4`}>
            {data.map(
              (item) =>
                item.type === "sauce" && (
                  <li key={item._id}>
                    <IngredientCard ingredient={item} />
                  </li>
                )
            )}
          </ul>
        </div>
        <div className="mt-10" id="main">
          <h2 className="text text_type_main-medium">Начинки</h2>
          <ul className={`${burgerIngredientsStyles.kind} mt-6 ml-4`}>
            {data.map(
              (item) =>
                item.type === "main" && (
                  <li key={item._id}>
                    <IngredientCard ingredient={item} />
                  </li>
                )
            )}
          </ul>
        </div>
      </div>
    </section>
  );
};

BurgerIngredients.propTypes = dataType;

export default BurgerIngredients;
