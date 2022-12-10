import { useEffect } from "react";
import { createPortal } from "react-dom";
import styles from "./modal.module.css";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const modalContainer = document.getElementById("modal");

const Modal = ({ title, onClose, children }) => {
  useEffect(() => {
    const handleEscKeydown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscKeydown);
    return () => {
      document.removeEventListener("keydown", handleEscKeydown);
    };
  }, [onClose]);

  return createPortal(
    <>
      <div className={styles.popup}>
        <h3
          className={`${styles.title} text text_type_main-large pt-10 pb-1 pl-10`}
        >
          {title}
        </h3>
        <button className={styles.closeButton} onClick={onClose}>
          <CloseIcon type="primary" />
        </button>
        {children}
      </div>
      <ModalOverlay onClose={onClose} />
    </>,
    modalContainer
  );
};

export default Modal;
