import { useState, useEffect } from "react";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import appStyles from "./app.module.css";
import { getInitialData } from "../../utils/api";
import { IngredientsContext } from "../../utils/appcontext";

function App() {
  const [state, setData] = useState({
    data: [],
    loading: true,
    error: false,
  });

  useEffect(() => {
    setData({ ...state, loading: true, error: false });
    getInitialData()
      .then((res) => {
        setData({ ...state, data: res.data, loading: false });
      })
      .catch((err) => {
        setData({ ...state, loading: false, error: true });
        console.log(err);
      });
  }, []);

  return (
    <div className={appStyles.app}>
      <AppHeader />
      <IngredientsContext.Provider value={state}>
        {state.isLoading && "Loading"}
        {state.hasError && "Error"}
        {!state.loading && (
          <main className={appStyles.main}>
            <BurgerIngredients />
            <BurgerConstructor />
          </main>
        )}
      </IngredientsContext.Provider>
    </div>
  );
}

export default App;
