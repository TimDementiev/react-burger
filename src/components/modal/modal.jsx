import { useEffect } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";

import styles from "./modal.module.css";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { modalType } from "../../utils/types";

const modalContainer = document.getElementById("modal");

const Modal = ({ title, onClose, children }) => {
  const navigate = useNavigate();

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
  }, [onClose, navigate]);

  return createPortal(
    <>
      <div className={`${styles.popup} pt-10 pb-15 pl-10 pr-10`}>
        <h3 className={`${styles.title} text text_type_main-large`}>{title}</h3>
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

Modal.propTypes = modalType;

export default Modal;
