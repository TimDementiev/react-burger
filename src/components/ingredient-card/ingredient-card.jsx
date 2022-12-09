import React from "react";
import PropTypes from 'prop-types';
import { ingredientType } from "../../utils/types";
import styles from "./ingredient-card.module.css";

import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";

const IngredientCard = (props) => {
  return (
    <div className={styles.container}>
      <img
        className={styles.image}
        src={props.ingredient.image}
        alt={props.ingredient.name}
      />
      <div className={styles.cost}>
        <span className={`text text_type_digits-default`}>
          {props.ingredient.cost}
        </span>
        <CurrencyIcon />
      </div>
      <h3 className={`${styles.title} text text_type_main-default`}>
        {props.ingredient.name}
      </h3>
      <Counter count={1} size="default" />
    </div>
  );
};

IngredientCard.propTypes = ingredientType.isRequired;

export default IngredientCard;
