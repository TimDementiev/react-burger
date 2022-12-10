import React from "react";
import ingredientDetailsStyles from "./ingredient-details.module.css";
import { ingredientDetailsType } from "../../utils/types";

const IngredientDetails = (props) => {
  return (
    <>
      <h2
        className={`${ingredientDetailsStyles.title}  text text_type_main-large pt-3 pb-2`}
      >
        Детали ингредиента
      </h2>
      <div className={`${ingredientDetailsStyles.container}`}>
        <img
          className={`${ingredientDetailsStyles.pic}`}
          src={props.image_large}
          alt={props.name}
        />
        <h3
          className={`${ingredientDetailsStyles.ingredient} text text_type_main-medium pt-4`}
        >
          {props.name}
        </h3>
        <ul className={`${ingredientDetailsStyles.list} pt-8`}>
          <li className={`${ingredientDetailsStyles.item}`}>
            <p
              className={`${ingredientDetailsStyles.text} text text_type_main-default text_color_inactive pb-2`}
            >
              Калории, ккал
            </p>
            <p
              className={`${ingredientDetailsStyles.text} text text_type_digits-default text_color_inactive`}
            >
              {props.calories}
            </p>
          </li>
          <li className={`${ingredientDetailsStyles.item}`}>
            <p
              className={`${ingredientDetailsStyles.text} text text_type_main-default text_color_inactive pb-2`}
            >
              Белки, г
            </p>
            <p
              className={`${ingredientDetailsStyles.text} text text_type_digits-default text_color_inactive`}
            >
              {props.proteins}
            </p>
          </li>
          <li className={`${ingredientDetailsStyles.item}`}>
            <p
              className={`${ingredientDetailsStyles.text} text text_type_main-default text_color_inactive pb-2`}
            >
              Жиры, г
            </p>
            <p
              className={`${ingredientDetailsStyles.text} text text_type_digits-default text_color_inactive`}
            >
              {props.fat}
            </p>
          </li>
          <li className={`${ingredientDetailsStyles.item}`}>
            <p
              className={`${ingredientDetailsStyles.text} text text_type_main-default text_color_inactive pb-2`}
            >
              Углеводы, г
            </p>
            <p
              className={`${ingredientDetailsStyles.text} text text_type_digits-default text_color_inactive`}
            >
              {props.carbohydrates}
            </p>
          </li>
        </ul>
      </div>
    </>
  );
};

IngredientDetails.propTypes = ingredientDetailsType;

export default IngredientDetails;
