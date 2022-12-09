import React from "react";
import styles from "./ingredient-card.module.css";

import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";

const IngredientCard = (props) => {
  return (
    <div className={styles.container}>
      <img className={styles.image} src={props.image} alt={props.name} />
      <div className={styles.cost}>
        <span className={`text text_type_digits-default`}>{props.cost}</span>
        <CurrencyIcon />
      </div>
      <h3 className={`${styles.title} text text_type_main-default`}>
        {props.name}
      </h3>
      <Counter count={1} size="default" />
    </div>
  );
};

export default IngredientCard;
