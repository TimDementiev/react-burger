import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./register.module.css";
import { Link, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registrationUser } from "../../services/actions/auth";
import { useForm } from "../../hooks/use-form";

export const RegisterPage = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user.user);
  const isAuth = useSelector((store) => store.user.isAuth)

  const { values, handleValues } = useForm({name: "", email: "", password: ""});

  const onFormSubmit = (e) => {
    e.preventDefault();
    dispatch(
      registrationUser(values.name, values.email, values.password)
    );
  }

  if (user && isAuth) {
    return <Redirect to={"/"} />;
  }

  return (
    <div className={styles.container}>
      <h2 className={`${styles.title} text text_type_main-medium pb-6`}>
        Регистрация
      </h2>
      <form className={styles.form} onSubmit={(e) => onFormSubmit(e)}>
        <div className="pb-6">
          <Input
            type={"text"}
            placeholder={"Имя"}
            onChange={handleValues}
            value={values.name}
            name={"name"}
            error={false}
            errorText={"Ошибка"}
            size={"default"}
          />
        </div>
        <div className="pb-6">
          <EmailInput
            onChange={handleValues}
            value={values.email}
            name={"email"}
            size="default"
          />
        </div>
        <div className="pb-6">
          <PasswordInput
            onChange={handleValues}
            value={values.password}
            name={"password"}
            size="default"
          />
        </div>
        <Button type="primary" size="medium">
          Зарегистрироваться
        </Button>
      </form>
      <p className="text text_type_main-default text_color_inactive pt-20 pb-4">
        Уже зарегистрированы?
        <Link
          className={`${styles.link} text text_type_main-default`}
          to="/login"
        >
          Войти
        </Link>
      </p>
    </div>
  );
};
