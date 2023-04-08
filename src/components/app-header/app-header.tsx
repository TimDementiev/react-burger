import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { FC } from "react";
import { Link, useLocation } from "react-router-dom";
import headerStyles from "./app-header.module.css";

const AppHeader:FC = () => {
  const location = useLocation();

  return (
    <header className={`${headerStyles.header} m-10`}>
      <nav className={headerStyles.nav}>
        <Link to="/" className={`${headerStyles.button} mt-4 mb-4 pl-5 pr-5`}>
          <BurgerIcon
            type={location.pathname === "/" ? "primary" : "secondary"}
          />
          <span
            className={
              location.pathname === "/"
                ? "text text_type_main-default text_color_white pl-2"
                : "text text_type_main-default text_color_inactive pl-2"
            }
          >
            Конструктор
          </span>
        </Link>
        <Link
          to="/feed"
          className={`${headerStyles.button} mt-4 mb-4 pl-5 pr-5`}
        >
          <ListIcon
            type={location.pathname === "/feed" ? "primary" : "secondary"}
          />
          <span
            className={
              location.pathname === "/feed"
                ? "text text_type_main-default pl-2"
                : "text text_type_main-default text_color_inactive pl-2"
            }
          >
            Лента заказов
          </span>
        </Link>
        <Link to="/" className={headerStyles.logo}>
          <Logo />
        </Link>
        <Link
          to="/profile"
          className={`${headerStyles.button} ${headerStyles.profile} mt-4 mb-4 pl-5 pr-5`}
        >
          <ProfileIcon
            type={location.pathname === "/profile" ? "primary" : "secondary"}
          />
          <span
            className={
              location.pathname === "/profile"
                ? "text text_type_main-default pl-2"
                : "text text_type_main-default text_color_inactive pl-2"
            }
          >
            Личный кабинет
          </span>
        </Link>
      </nav>
    </header>
  );
};

export default AppHeader;
