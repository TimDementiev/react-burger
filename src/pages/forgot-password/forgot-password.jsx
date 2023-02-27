import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { useSelector, useDispatch } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { useForm } from "../../hooks/use-form";
import { recoveryPassword } from "../../services/actions/auth";
import styles from "./forgot-password.module.css";

export const ForgotPassword = () => {
  const { values, handleValues } = useForm({ email: "" });
  const dispatch = useDispatch();

  const { recoveryPasswordSuccess } = useSelector((store) => store.user);

  function onSubmit(e) {
    e.preventDefault();
    dispatch(recoveryPassword({ email: values.email }));
  }

  return (
    <div className={styles.container}>
      <h2 className={`${styles.title} pb-5 text_type_main-medium text`}>
        Восстановление пароля
      </h2>
      <form className={styles.form} onSubmit={onSubmit}>
        <div className="pb-6">
          <Input
            onChange={handleValues}
            type={"email"}
            placeholder={"Укажите e-mail"}
            value={values.email}
            name={"email"}
            error={false}
            errorText={"Ошибка"}
            size={"default"}
          />
        </div>
        <Button disabled={!values.email} type="primary" size="medium">
          {recoveryPasswordSuccess ? <Redirect to="/reset-password" /> : ""}
          Восстановить
        </Button>
      </form>
      <p className="mt-20 text_type_main-default text_color_inactive text">
        Вспомнили пароль?
        <Link className={styles.link} to="/login">
          Войти
        </Link>
      </p>
    </div>
  );
};
