import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector, useDispatch } from "react-redux";
import { Link, Navigate, useLocation } from "react-router-dom";
import { useForm } from "../../hooks/use-form";
import { setPassword } from "../../services/actions/auth";
import styles from "./reset-password.module.css";

export const ResetPasswordPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const { setPasswordSuccess, recoveryPasswordSuccess } = useSelector(
    (state) => state.user
  );

  const { values, handleValues } = useForm({ password: "", code: "" });

  function formSubmit(e) {
    e.preventDefault();
    dispatch(setPassword( values.password, values.code ));
  }

  if (!recoveryPasswordSuccess) {
    return <Navigate to={{ pathname: "/forgot-password" }} />;
  }

  return (
    <div className={styles.container}>
      <h2 className="pb-6 text_type_main-medium text">Восстановление пароля</h2>

      <form className={styles.form} onSubmit={formSubmit}>
        <div className="pb-6">
          <PasswordInput
            onChange={handleValues}
            placeholder={"Введите новый пароль"}
            value={values.password}
            name={"password"}
            size="default"
          />
        </div>
        <div className="pb-6">
          <Input
            onChange={handleValues}
            type={"text"}
            placeholder={"Введите код из письма"}
            value={values.code}
            name={"code"}
            error={false}
            errorText={"Ошибка"}
            size={"default"}
          />
        </div>
        <div className={styles.button}>
          <Button
            htmlType="submit"
            disabled={!values.password || !values.code}
            type="primary"
            size="medium"
          >
            {!!setPasswordSuccess ? (
              <Navigate to={location.state?.from || "/profile"} />
            ) : (
              ""
            )}
            Сохранить
          </Button>
        </div>
      </form>

      <p className="pt-20 text_type_main-default text_color_inactive text">
        Вспомнили пароль?
        <Link className={styles.link} to="/login">
          Войти
        </Link>
      </p>
    </div>
  );
};
