import { useState, useEffect, FC } from "react";
import { useInView } from "react-intersection-observer";
import burgerIngredientsStyles from "./burger-ingredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientCategory from "../ingredient-category/ingredient-category";

const BurgerIngredients: FC = () => {
  const [current, setCurrent] = useState("bun");
  const [bunRef, bunInView] = useInView({ threshold: 0.1 });
  const [sauceRef, sauceInView] = useInView({ threshold: 0.1 });
  const [mainRef, mainInView] = useInView({ threshold: 0.1 });

  const clickOnTab = (type:string) => {
    setCurrent(type);
    const section = document.getElementById(type) as HTMLElement;
    section.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
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
        <IngredientCategory type="bun" tabRef={bunRef} name="Булки" />
        <IngredientCategory
          type="sauce"
          tabRef={sauceRef}
          name="Соусы"
        />
        <IngredientCategory
          type="main"
          tabRef={mainRef}
          name="Начинки"
        />
      </ul>
    </section>
  );
};

export default BurgerIngredients;
