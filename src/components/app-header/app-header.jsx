import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import headerStyles from "./app-header.module.css";

const AppHeader = () => {
  return (
    <header className={`${headerStyles.header} m-10`}>
      <nav className={headerStyles.nav}>
        <button className={`${headerStyles.button} pt-4 pb-4 pl-5 pr-5`}>
          <BurgerIcon type="primary" />
          <span
            style={{ color: "white" }}
            className="text text_type_main-default ml-2"
          >
            Конструктор
          </span>
        </button>
        <button className={`${headerStyles.button} pt-4 pb-4 pl-5 pr-5`}>
          <ListIcon type="secondary" />
          <span className="text text_type_main-default ml-2 text_color_inactive">
            Лента заказов
          </span>
        </button>
        <button className={`${headerStyles.button} ${headerStyles.profile} pt-4 pb-4 pl-5 pr-5`}>
          <ProfileIcon type="secondary" />
          <span className="text text_type_main-default ml-2 text_color_inactive">
            Личный кабинет
          </span>
        </button>
      </nav>
      <div className={headerStyles.logo}>
        <Logo />
      </div>
    </header>
  );
};

export default AppHeader;
