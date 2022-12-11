import { useState, useRef } from "react";
import { dataType } from "../../utils/types";
import burgerIngredientsStyles from "./burger-ingredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientCategory from "../ingredient-category/ingredient-category";

const BurgerIngredients = ({ data }) => {
  const [current, setCurrent] = useState("bun");
  const bunRef = useRef();
  const sauceRef = useRef();
  const mainRef = useRef();
  const clickOnTab = (e, ref) => {
    setCurrent(e);
    ref.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className={burgerIngredientsStyles.section}>
      <h1 className={`text text_type_main-large mb-5`}>Соберите бургер</h1>
      <div className={`${burgerIngredientsStyles.tabs} mb-10`}>
        <Tab
          value="bun"
          active={current === "bun"}
          onClick={(e) => clickOnTab(e, bunRef)}
        >
          Булки
        </Tab>
        <Tab
          value="sauce"
          active={current === "sauce"}
          onClick={(e) => clickOnTab(e, sauceRef)}
        >
          Соусы
        </Tab>
        <Tab
          value="main"
          active={current === "main"}
          onClick={(e) => clickOnTab(e, mainRef)}
        >
          Начинки
        </Tab>
      </div>
      <ul className={`${burgerIngredientsStyles.ingredients} mt-10 `}>
        <IngredientCategory
          data={data}
          type="bun"
          tabRef={bunRef}
          name="Булки"
          id="bun"
        />
        <IngredientCategory
          data={data}
          type="sauce"
          tabRef={sauceRef}
          name="Соусы"
          id="sauce"
        />
        <IngredientCategory
          data={data}
          type="main"
          tabRef={mainRef}
          name="Начинки"
          id="main"
        />
      </ul>

      {/* <div className={`${burgerIngredientsStyles.ingredients}`}>
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
      </div>*/}
    </section>
  );
};

BurgerIngredients.propTypes = dataType;

export default BurgerIngredients;
