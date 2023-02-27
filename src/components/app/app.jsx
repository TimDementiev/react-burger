import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import appStyles from "./app.module.css";
import { getBurgerIngredients } from "../../services/actions/burger-ingredients";
import {
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  NotFound404Page,
} from "../../pages/index";

function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector((store) => store.burgerIngredients.isLoading);
  const hasError = useSelector((store) => store.burgerIngredients.hasError);

  useEffect(() => {
    dispatch(getBurgerIngredients());
  }, [dispatch]);

  return (
    <div className={appStyles.app}>
      <AppHeader />
      <Router>
        <Routes>
          <Route path="/" exact forNonAuthUsers={false}>
            {isLoading && "Loading"}
            {hasError && "Error"}
            {!isLoading && (
              <main className={appStyles.main}>
                <DndProvider backend={HTML5Backend}>
                  <BurgerIngredients />
                  <BurgerConstructor />
                </DndProvider>
              </main>
            )}
          </Route>
          <Route path="/login" exact forNonAuthUsers={true}>
            <LoginPage />
          </Route>
          <Route path="/register" exact forNonAuthUsers={true}>
            <RegisterPage />
          </Route>
          <Route path="/forgot-password" exact forNonAuthUsers={true}>
            <ForgotPasswordPage />
          </Route>
          <Route path="/reset-password" exact forNonAuthUsers={true}>
            <ResetPasswordPage />
          </Route>
          <Route path="*">
            <NotFound404Page />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
