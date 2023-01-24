import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import burgerIngredientsStyles from "./burger-ingredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientCategory from "../ingredient-category/ingredient-category";

const BurgerIngredients = () => {
  const [current, setCurrent] = useState("bun");
  const [bunRef, bunInView] = useInView({ threshold: 0.1 });
  const [sauceRef, sauceInView] = useInView({ threshold: 0.1 });
  const [mainRef, mainInView] = useInView({ threshold: 0.1 });

  const clickOnTab = (type) => {
    setCurrent(type);
    const section = document.getElementById(type);
    section.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleIngredientScroll = () => {
    switch (true) {
      case bunInView:
        setCurrent("bun");
        break;
      case sauceInView:
        setCurrent("sauce");
        break;
      case mainInView:
        setCurrent("main");
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    handleIngredientScroll();
  }, [bunInView, sauceInView, mainInView]);

  return (
    <section className={burgerIngredientsStyles.section}>
      <h1 className={`text text_type_main-large mb-5`}>Соберите бургер</h1>
      <div className={`${burgerIngredientsStyles.tabs} mb-10`}>
        <Tab
          value="bun"
          active={current === "bun"}
          onClick={() => clickOnTab("bun")}
        >
          Булки
        </Tab>
        <Tab
          value="sauce"
          active={current === "sauce"}
          onClick={() => clickOnTab("sauce")}
        >
          Соусы
        </Tab>
        <Tab
          value="main"
          active={current === "main"}
          onClick={() => clickOnTab("main")}
        >
          Начинки
        </Tab>
      </div>
      <ul className={`${burgerIngredientsStyles.ingredients} mt-10 `}>
        <IngredientCategory type="bun" tabRef={bunRef} name="Булки" id="bun" />
        <IngredientCategory
          type="sauce"
          tabRef={sauceRef}
          name="Соусы"
          id="sauce"
        />
        <IngredientCategory
          type="main"
          tabRef={mainRef}
          name="Начинки"
          id="main"
        />
      </ul>
    </section>
  );
};

export default BurgerIngredients;
