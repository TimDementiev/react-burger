import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";

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
// import { checkUserAuth, getUserData } from "../../services/actions/auth";
import { getUserData } from "../../services/actions/auth";
import { getCookie } from "../../utils/cookie";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { ProtectedRoute } from "../protected-route/protected-route";
import { UnauthorizedRoute } from "../unauthorized-route/unauthorized-route";
function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const accessToken = getCookie("token");
  const background = location.state?.background;
  const dataRequest = useSelector(
    (store) => store.burgerIngredients.dataRequest
  );

  useEffect(() => {
    dispatch(getBurgerIngredients());
    }, [dispatch]);

  useEffect(() => {
    if (accessToken) {
      dispatch(getUserData(accessToken));
    }
  }, [dispatch, accessToken]);

  const handleCloseModal = () => {
    navigate.goBack();
  };

  return (
    <div className={appStyles.app}>
      <AppHeader />
      <Routes location={background || location}>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/login"
          element={<UnauthorizedRoute element={<LoginPage />} />}
        />
        <Route
          path="/register"
          element={<UnauthorizedRoute element={<RegisterPage />} />}
        />
        <Route
          path="/forgot-password"
          element={<UnauthorizedRoute element={<ForgotPasswordPage />} />}
        />
        <Route
          path="/reset-password"
          element={<UnauthorizedRoute element={<ResetPasswordPage />} />}
        />
        <Route
          path="/profile"
          element={<ProtectedRoute element={<ProfilePage />} />}
        />
        <Route path="*" element={<NotFound404Page />} />
      </Routes>

      {background && (
        <Route path="/ingredients/:id">
          <Modal onClose={handleCloseModal} title="Детали ингредиента">
            {!dataRequest ? "Loading" : <IngredientDetails />}
          </Modal>
        </Route>
      )}
    </div>
  );
}

export default App;
