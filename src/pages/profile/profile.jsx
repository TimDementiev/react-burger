import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Route, Routes } from "react-router-dom";
import { logout, updateUserData } from "../../services/actions/auth";
import profileStyle from "./profile.module.css";
import { useForm } from "../../hooks/use-form";


export const ProfilePage = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user.user);

  const { values, handleValues, setValues } = useForm({
    name: user.name,
    email: user.email,
    password: "",
  });

  function onLogout() {
    dispatch(logout());
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
    <div className={`${profileStyle.container} pt-30`}>
      <nav className={`${profileStyle.nav} pr-15`}>
        <ul className={`${profileStyle.items}`}>
          <li className={`${profileStyle.item}`}>
            <NavLink
              to="/profile"
              exact
              className={`${profileStyle.link} text_type_main-medium text_color_inactive text`}
              activeClassName={`${profileStyle.linkActive} text_type_main-medium text`}
            >
              Профиль
            </NavLink>
          </li>
          <li className={`${profileStyle.item}`}>
            <NavLink
              to="/profile/orders"
              exact
              className={`${profileStyle.link} text_type_main-medium text_color_inactive text`}
              activeClassName={`${profileStyle.linkActive} text_type_main-medium text`}
            >
              История заказов
            </NavLink>
          </li>
          <li className={`${profileStyle.item}`}>
            <NavLink
              to="/login"
              exact
              className={`${profileStyle.link} text_type_main-medium text_color_inactive text`}
              activeClassName={`${profileStyle.linkActive} text_type_main-medium text`}
              onClick={onLogout}
            >
              Выход
            </NavLink>
          </li>
        </ul>
        <p
          className={`${profileStyle.description} pt-20 pb-4 text_type_main-default text_color_inactive text`}
        >
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </nav>
      <Routes>
        <Route path="/profile" exact>
          <form className={profileStyle.form} onSubmit={submit}>
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
            <div className={profileStyle.buttons}>
              <Button type="secondary" size="medium" onClick={reset}>
                Oтмена
              </Button>
              <Button
                disabled={!values.email && !values.password && !values.name}
                type="primary"
                size="medium"
              >
                Сохранить
              </Button>
            </div>
          </form>
        </Route>
      </Routes>
    </div>
  );
};
