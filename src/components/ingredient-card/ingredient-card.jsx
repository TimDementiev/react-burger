import { ingredientType } from "../../utils/types";
import ingredientCardStyles from "./ingredient-card.module.css";

import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";

const IngredientCard = (props) => {
  return (
    <div className={ingredientCardStyles.container}>
      <img
        className={ingredientCardStyles.image}
        src={props.image}
        alt={props.name}
      />
      <div className={ingredientCardStyles.cost}>
        <span className={`text text_type_digits-default`}>{props.price}</span>
        <CurrencyIcon />
      </div>
      <h3
        className={`${ingredientCardStyles.title} text text_type_main-default`}
      >
        {props.name}
      </h3>
      {props.__v >= 1 && <Counter count={props.__v} size="default" />}
    </div>
  );
};

IngredientCard.propTypes = ingredientType.isRequired;

export default IngredientCard;
