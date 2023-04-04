import { useEffect, FC } from "react";
// import { useSelector, useDispatch } from "react-redux";
import { useSelector, useDispatch } from "../../services/types/index";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";

import Header from "../../pages/header/header";
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
  FeedPage,
} from "../../pages/index";

import { getUserData } from "../../services/actions/auth";
import { getCookie } from "../../utils/cookie";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { OrderInfo } from "../order-info/order-info";
import { ProtectedRoute } from "../protected-route/protected-route";
import { UnauthorizedRoute } from "../unauthorized-route/unauthorized-route";

const App: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const accessToken = getCookie("token");
  const dataRequest = useSelector(
    (store: any) => store.burgerIngredients.dataRequest
  );

  const background =
    location.state?.previousLocationConstructor ||
    location.state?.previousLocationFeed ||
    location.state?.previousLocationOrders;

  const ingredientId = location.state?.previousLocationConstructor;
  const orderIdFeed = location.state?.previousLocationFeed;
  const orderIdProfile = location.state?.previousLocationOrders;

  useEffect(() => {
    dispatch(getBurgerIngredients());
  }, [dispatch]);

  useEffect(() => {
    if (accessToken) {
      dispatch(getUserData(accessToken));
    }
  }, [dispatch, accessToken]);

  const handleCloseModal = () => {
    navigate(-1);
  };

  return (
    <div className={appStyles.app}>
      <Routes location={background || location}>
        <Route path="/" element={<Header />}>
          <Route index element={<HomePage />} />
          <Route path="/feed" element={<FeedPage />} />
          <Route path="/feed/:id" element={<OrderInfo />} />
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
            path="/profile/orders/:id"
            element={<ProtectedRoute element={<OrderInfo />} />}
          />
          <Route
            path="/profile/orders"
            element={<ProtectedRoute element={<ProfilePage />} />}
          />
          <Route
            path="/ingredients/:id"
            element={!dataRequest ? "Loading" : <IngredientPage />}
          />
          <Route path="*" element={<NotFound404Page />} />
        </Route>
      </Routes>

      {ingredientId && (
        <Routes>
          <Route
            path="/ingredients/:id"
            element={
              <Modal onClose={handleCloseModal}>
                {!dataRequest ? "Loading" : <IngredientDetails />}
              </Modal>
            }
          />
        </Routes>
      )}

      {orderIdFeed && (
        <Routes>
          <Route
            path="/feed/:id"
            element={
              <Modal onClose={handleCloseModal}>
                <OrderInfo />
              </Modal>
            }
          />
        </Routes>
      )}

      {orderIdProfile && (
        <Routes>
          <Route
            path="/profile/orders/:id"
            element={
              <ProtectedRoute
                element={
                  <Modal onClose={handleCloseModal}>
                    <OrderInfo />
                  </Modal>
                }
              />
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
