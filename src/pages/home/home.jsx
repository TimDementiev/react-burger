import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import styles from "./home.module.css";
import { getBurgerIngredients } from "../../services/actions/burger-ingredients";

export const HomePage = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((store) => store.burgerIngredients.isLoading);
  const hasError = useSelector((store) => store.burgerIngredients.hasError);

  useEffect(() => {
    dispatch(getBurgerIngredients());
  }, [dispatch]);

  return (
    <main className={styles.main}>
      {isLoading && "Loading"}
      {hasError && "Error"}
      {!isLoading && (
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
      )}
    </main>
  );
};
