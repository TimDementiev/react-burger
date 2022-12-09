import React from "react";
import initialData from '../../utils/data';
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import styles from "./app.module.css";

function App() {

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.main}>
        <BurgerIngredients data={initialData} />
        <BurgerConstructor data={initialData} />
      </main>
    </div>
  );
}

export default App;
