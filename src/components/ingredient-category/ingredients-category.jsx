import { useState } from "react";
import ingredientCategoryStyles from "./ingredient-category.module.css";
import Modal from "../modal/modal";
import IngredientCard from "../ingredient-card/ingredient-card.jsx";
import IngredientDetails from "../ingredient-details/ingredient-details.jsx";
import { ingredientCategoryType } from "../../utils/types";

const IngredientCategory = (props) => {
  const [active, setActive] = useState(null);
  const toggleModal = () => setActive(null);

  return (
    <section className="mb-10">
      {active && (
        <Modal onClose={toggleModal}>
          <IngredientDetails {...active} />
        </Modal>
      )}
      <h2 className="text text_type_main-medium mb-6" ref={props.tabRef}>
        {props.name}
      </h2>
      <ul className={`${ingredientCategoryStyles.ingredients}`}>
        {props.data.map((e) => {
          if (e.type === props.type) {
            return (
              <li
                onClick={() => {
                  setActive(e);
                }}
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
};

IngredientCategory.propTypes = ingredientCategoryType;

export default IngredientCategory;
