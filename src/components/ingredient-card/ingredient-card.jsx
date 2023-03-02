import { useDrag } from "react-dnd";
import { useMemo } from "react";
import { useSelector } from "react-redux";

import { ingredientType } from "../../utils/types";
import ingredientCardStyles from "./ingredient-card.module.css";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";

const IngredientCard = (ingredient) => {
  const { bun, fillings } = useSelector((store) => store.burgerConstructor);

  const [{ opacity }, dragRef] = useDrag({
    type: "fillings",
    item: { ingredient },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });

  const counter = useMemo(
    () =>
      (count = 0) => {
        for (let { _id } of fillings) if (_id === ingredient._id) count++;

        if (bun && bun._id === ingredient._id) return 2;
        return count;
      },
    [bun, fillings, ingredient._id]
  );

  return (
    <div className={ingredientCardStyles.container} style={{ opacity }} ref={dragRef}>
      <img
        className={ingredientCardStyles.image}
        src={ingredient.image}
        alt={ingredient.name}
      />
      <div className={ingredientCardStyles.cost}>
        <span className={`text text_type_digits-default`}>
          {ingredient.price}
        </span>
        <CurrencyIcon />
      </div>
      <h3
        className={`${ingredientCardStyles.title} text text_type_main-default`}
      >
        {ingredient.name}
      </h3>
      {counter() > 0 && <Counter count={counter()} size="default" />}
    </div>
  );
};

IngredientCard.propTypes = ingredientType.isRequired;

export default IngredientCard;
