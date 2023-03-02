import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styles from "./ingredient.module.css";

export const IngredientPage = () => {
  const { id } = useParams();
  const ingredients = useSelector((store) => store.burgerIngredients.data);
  const data = ingredients.find((ingredient) => ingredient._id === id);

  return (
    <>
      {data && (
        <div className={`${styles.container} pt-10 pr-10 pb-15 pl-10`}>
          <h2 className={`${styles.title} text text_type_main-large`}>
            Детали ингредиента
          </h2>
          <img className={`mb-4`} src={data.image_large} alt={data.name} />
          <p className={`text text_type_main-medium mb-8`}>{data.name}</p>

          <table className={styles.table}>
            <thead>
              <tr className={`${styles.headers} text text_type_main-default`}>
                <th>Калории,ккал</th>
                <th>Белки, г</th>
                <th>Жиры, г</th>
                <th>Углеводы, г</th>
              </tr>
            </thead>
            <tbody>
              <tr className={`${styles.data} text text_type_digits-default`}>
                <td>{data.calories}</td>
                <td>{data.proteins}</td>
                <td>{data.fat}</td>
                <td>{data.carbohydrates}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};
