import { FC, FormEvent } from 'react'
import {
  Button,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch } from "../../services/types/index";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useForm } from "../../hooks/use-form";
import { authorization } from "../../services/actions/auth";
import styles from "./login.module.css";

export const LoginPage: FC = () => {
  const { values, handleValues } = useForm({ email: "", password: "" });
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(
      authorization(values.email, values.password, () =>
        navigate(
          location?.state?.previousLocation
            ? location.state.previousLocation
            : "/"
        )
      )
    );
  }

  return (
    <div className={styles.container}>
      <h2 className={`${styles.title} pb-6 text_type_main-medium text`}>
        Вход
      </h2>
      <form className={styles.form} onSubmit={onSubmit}>
        <div className="pb-5">
          <EmailInput
            onChange={handleValues}
            value={values.email}
            name={"email"}
            size="default"
          />
        </div>
        <div className="pb-5">
          <PasswordInput
            onChange={handleValues}
            value={values.password}
            name={"password"}
            size="default"
          />
        </div>
        <Button
          htmlType="submit"
          disabled={!values.password || !values.email}
          type="primary"
          size="medium"
        >
          Войти
        </Button>
      </form>
      <p className="pt-20 pb-4 text_type_main-default text_color_inactive text">
        Вы — новый пользователь?
        <Link className={styles.link} to="/register">
          Зарегистрироваться
        </Link>
      </p>
      <p className="text_type_main-default text_color_inactive text">
        Забыли пароль?
        <Link className={styles.link} to="/forgot-password">
          Восстановить пароль
        </Link>
      </p>
    </div>
  );
};
