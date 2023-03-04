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
  IngredientPage,
  NotFound404Page,
} from "../../pages/index";
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
  const dataRequest = useSelector(
    (store) => store.burgerIngredients.dataRequest
  );
  const background = location.state && location.state.previousLocation;

  useEffect(() => {
    dispatch(getBurgerIngredients());
  }, [dispatch]);

  useEffect(() => {
    if (accessToken) {
      dispatch(getUserData());
    }
  }, [dispatch, accessToken]);

  const handleCloseModal = () => {
    navigate(-1);
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
        <Route
          path="/ingredients/:id"
          element={!dataRequest ? "Loading" : <IngredientPage />}
        />
        <Route path="*" element={<NotFound404Page />} />
      </Routes>

      {background && (
        <Routes>
          <Route
            path="/ingredients/:id"
            element={
              <Modal onClose={handleCloseModal} title="Детали ингредиента" >
                {!dataRequest ? "Loading" : <IngredientDetails />}
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
}

export default App;
