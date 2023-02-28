import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import AppHeader from "../app-header/app-header";
import appStyles from "./app.module.css";
import { getBurgerIngredients } from "../../services/actions/burger-ingredients";
import {
  HomePage,
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  ProfilePage,
  NotFound404Page,
} from "../../pages/index";
import { checkUserAuth, getUserData } from "../../services/actions/auth";
import { getCookie } from "../../utils/cookie";

function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const background = location.state?.background;


  useEffect(() => {
    dispatch(getBurgerIngredients());
    dispatch(checkUserAuth());
  }, [dispatch]);

  useEffect(() => {
    if (getCookie("token")) {
      dispatch(getUserData());
    }
  }, [dispatch]);

  return (
    <div className={appStyles.app}>
      <AppHeader />
      <Routes location={background || location}>
        <Route path="/" element={<HomePage />} exact forNonAuthUsers={false} />
        <Route
          path="/login"
          element={<LoginPage />}
          exact
          forNonAuthUsers={true}
        />
        <Route
          path="/register"
          element={<RegisterPage />}
          exact
          forNonAuthUsers={true}
        />
        <Route
          path="/forgot-password"
          element={<ForgotPasswordPage />}
          exact
          forNonAuthUsers={true}
        />
        <Route
          path="/reset-password"
          element={<ResetPasswordPage />}
          exact
          forNonAuthUsers={true}
        />
        <Route
          path="/profile"
          element={<ProfilePage />}
          forNonAuthUsers={false}
        />
        <Route path="*" element={<NotFound404Page />} />
      </Routes>
    </div>
  );
}

export default App;
