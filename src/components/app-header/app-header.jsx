import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app-header.module.css";

const AppHeader = () => {
  return (
      <header className={styles.header}>
      <Logo />
    </header>
  );
};

export default AppHeader;
