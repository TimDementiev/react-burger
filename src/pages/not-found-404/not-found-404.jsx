import { Link } from "react-router-dom";
import notFound404Img from "../../images/NotFound404.png";
import styles from "./not-found-404.module.css";

export const NotFound404Page = () => {
  return (
    <div className={`${styles.container} pb-20`}>
      <img className={styles.img} src={notFound404Img} alt={"NotFound404"} />
      <Link
        to="/"
        className={`${styles.link} pt-15 text text_type_main-medium text_color_inactive`}
      >
        На главную страницу
      </Link>
    </div>
  );
};