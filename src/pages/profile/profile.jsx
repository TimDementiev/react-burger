import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate, useLocation, Outlet } from "react-router-dom";

import { logout, updateUserData } from "../../services/actions/auth";
import styles from "./profile.module.css";
import { useForm } from "../../hooks/use-form";
import { getCookie } from "../../utils/cookie";

export const ProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((store) => store.user.user);
  const refreshToken = getCookie("refreshToken");

  const { values, handleValues, setValues } = useForm({
    name: user.name,
    email: user.email,
    password: "",
  });

  const isDataChanged = !(
    values.email === user.email &&
    values.name === user.name &&
    values.password === ""
  );

  function onLogout() {
    dispatch(logout(refreshToken, () => navigate("/", { replace: true })));
  }

  function submit(e) {
    e.preventDefault();
    dispatch(updateUserData(values.email, values.name, values.password));
  }

  function reset(e) {
    e.preventDefault();
    setValues({
      email: user.email,
      name: user.name,
      password: "",
    });
  }

  return (
    <div className={`${styles.container} pt-30`}>
      <nav className={`${styles.nav} pr-15`}>
        <ul className={`${styles.items}`}>
          <li className={`${styles.item}`}>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                isActive
                  ? `${styles.linkActive} text_type_main-medium text`
                  : `${styles.link} text_type_main-medium text_color_inactive text`
              }
              end
            >
              Профиль
            </NavLink>
          </li>
          <li className={`${styles.item}`}>
            <NavLink
              to="/profile/orders"
              className={({ isActive }) =>
                isActive
                  ? `${styles.linkActive} text_type_main-medium text`
                  : `${styles.link} text_type_main-medium text_color_inactive text`
              }
              end
            >
              История заказов
            </NavLink>
          </li>
          <li className={`${styles.item}`}>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive
                  ? `${styles.linkActive} text_type_main-medium text`
                  : `${styles.link} text_type_main-medium text_color_inactive text`
              }
              onClick={onLogout}
            >
              Выход
            </NavLink>
          </li>
        </ul>
        <p
          className={`${styles.description} pt-20 pb-4 text_type_main-default text_color_inactive text`}
        >
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </nav>

      {location.state?.orders || location.pathname === "/profile/orders" ? (
        <Outlet />
      ) : (
        <form className={styles.form} onSubmit={submit}>
          <div className="pb-6">
            <Input
              type={"text"}
              placeholder={"Имя"}
              onChange={handleValues}
              icon={"EditIcon"}
              value={values.name}
              name={"name"}
              error={false}
              errorText={"Ошибка"}
              size={"default"}
            />
          </div>
          <div className="pb-6">
            <Input
              type={"email"}
              placeholder={"Логин"}
              onChange={handleValues}
              icon={"EditIcon"}
              value={values.email}
              name={"email"}
              error={false}
              errorText={"Ошибка"}
              size={"default"}
            />
          </div>
          <div className="pb-6">
            <Input
              type={"password"}
              placeholder={"Пароль"}
              onChange={handleValues}
              icon={"EditIcon"}
              value={values.password}
              name={"password"}
              error={false}
              errorText={"Ошибка"}
              size={"default"}
            />
          </div>
          {isDataChanged && (
            <div className={styles.buttons}>
              <Button
                htmlType="button"
                type="secondary"
                size="medium"
                onClick={reset}
              >
                Oтмена
              </Button>
              <Button
                htmlType="submit"
                disabled={!values.email && !values.password && !values.name}
                type="primary"
                size="medium"
              >
                Сохранить
              </Button>
            </div>
          )}
        </form>
      )}
    </div>
  );
};
