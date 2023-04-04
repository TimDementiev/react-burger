import { useSelector } from "../../services/types/index";

import ingredientCategoryStyles from "./ingredient-category.module.css";
import IngredientCard from "../ingredient-card/ingredient-card";
import { FC } from 'react';

type TProps = {
  tabRef: any,
  name: string,
  type: string
}

const IngredientCategory: FC<TProps> = ({tabRef, name, type}) => {
  const data = useSelector((store:any) => store.burgerIngredients.data);

  return (
    <section className="mb-10" id={type}>
      <h2 className="text text_type_main-medium mb-6" ref={tabRef}>
        {name}
      </h2>
      <ul className={`${ingredientCategoryStyles.ingredients}`}>
        {data.map((e:any) => {
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

export default IngredientCategory;
