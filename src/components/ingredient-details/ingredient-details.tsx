import { useParams } from "react-router-dom";
import { useSelector } from "../../services/types/index";
import { FC } from "react";

import ingredientDetailsStyles from "./ingredient-details.module.css";

const IngredientDetails: FC = () => {
  const dataIngredients = useSelector(
    (store) => store.burgerIngredients.data
  );
  const { id } = useParams<{ id: string }>();
  const ingredient = dataIngredients.find(
    (ingredient) => ingredient._id === id
  );

  return (
    <>
      <h2
        className={`${ingredientDetailsStyles.title} text text_type_main-large`}
      >
        Детали ингредиента
      </h2>
      <div className={`${ingredientDetailsStyles.container}`}>
        <img
          className={`${ingredientDetailsStyles.pic}`}
          src={ingredient?.image_large}
          alt={ingredient?.name}
        />
        <h3
          className={`${ingredientDetailsStyles.ingredient} text text_type_main-medium pt-4`}
        >
          {ingredient?.name}
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
              {ingredient?.calories}
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
              {ingredient?.proteins}
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
              {ingredient?.fat}
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
              {ingredient?.carbohydrates}
            </p>
          </li>
        </ul>
      </div>
    </>
  );
};

export default IngredientDetails;
