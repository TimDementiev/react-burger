import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Routes,
  Route,
  useLocation,
  useNavigate,
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
  IngredientPage,
  NotFound404Page,
  FeedPage,
} from "../../pages/index";
import { UserOrders } from "../../pages/profile/orders/orders";

import { getUserData } from "../../services/actions/auth";
import { getCookie } from "../../utils/cookie";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { OrderInfo } from "../order-info/order-info";
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
        >
          <Route path="/profile/orders" element={<UserOrders />} />
        </Route>
        <Route
          path="/profile/orders/:id"
          element={<ProtectedRoute element={<OrderInfo />} />}
        />
        <Route
          path="/ingredients/:id"
          element={!dataRequest ? "Loading" : <IngredientPage />}
        />
        <Route path="*" element={<NotFound404Page />} />
      </Routes>

      <Routes>
        {ingredientId && (
          <Route
            path="/ingredients/:id"
            element={
              <Modal onClose={handleCloseModal}>
                {!dataRequest ? "Loading" : <IngredientDetails />}
              </Modal>
            }
          />
        )}

        {orderIdFeed && (
          <Route
            path="/feed/:id"
            element={
              <Modal onClose={handleCloseModal}>
                <OrderInfo />
              </Modal>
            }
          />
        )}

        {orderIdProfile && (
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
        )}
      </Routes>
    </div>
  );
}

export default App;
