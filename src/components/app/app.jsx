import { useState, useEffect } from "react";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import appStyles from "./app.module.css";
import { getData } from "../../utils/api";

function App() {
  const [state, setData] = useState({
    data: [],
    loading: true,
    error: false,
  });

  useEffect(() => {
    setData({ ...state, loading: true, error: false });
    getData()
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
      {state.isLoading && "Loading"}
      {state.hasError && "Error"}
      {!state.loading && (
        <main className={appStyles.main}>
          <BurgerIngredients data={state.data} />
          <BurgerConstructor data={state.data} />
        </main>
      )}
    </div>
  );
}

export default App;
