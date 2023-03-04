import { useSelector } from "react-redux";

import ingredientCategoryStyles from "./ingredient-category.module.css";
import IngredientCard from "../ingredient-card/ingredient-card.jsx";
import { ingredientCategoryType } from "../../utils/types";

const IngredientCategory = ({tabRef, name, type}) => {
  const data = useSelector((store) => store.burgerIngredients.data);

  return (
    <section className="mb-10" id={type}>
      <h2 className="text text_type_main-medium mb-6" ref={tabRef}>
        {name}
      </h2>
      <ul className={`${ingredientCategoryStyles.ingredients}`}>
        {data.map((e) => {
          if (e.type === type) {
            return (
              <li
                key={e._id}
              >
                <IngredientCard {...e} />
              </li>
            );
          } else {
            return null;
          }
        })}
      </ul>
    </section>
  );
}

IngredientCategory.propTypes = ingredientCategoryType;

export default IngredientCategory;
