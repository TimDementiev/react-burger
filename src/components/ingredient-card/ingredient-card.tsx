import { useDrag } from "react-dnd";
import { useMemo, FC } from "react";
import { useSelector } from "../../services/types/index";
import { Link, useLocation } from "react-router-dom";

import ingredientCardStyles from "./ingredient-card.module.css";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { TIngredient } from "../../services/types/data";



const IngredientCard: FC<TIngredient> = (ingredient) => {
  const location = useLocation();
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
    <Link
      to={`/ingredients/${ingredient._id}`}
      state={{ previousLocationConstructor: location }}
      className={`${ingredientCardStyles.container}`}
      style={{ opacity }}
      ref={dragRef}
    >
      <img
        className={ingredientCardStyles.image}
        src={ingredient.image}
        alt={ingredient.name}
      />
      <div className={ingredientCardStyles.cost}>
        <span className={`text text_type_digits-default`}>
          {ingredient.price}
        </span>
        <CurrencyIcon type={"secondary"}/>
      </div>
      <h3
        className={`${ingredientCardStyles.title} text text_type_main-default`}
      >
        {ingredient.name}
      </h3>
      {counter() > 0 && <Counter count={counter()} size="default" />}
    </Link>
  );
};


export default IngredientCard;
