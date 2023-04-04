import { useEffect, FC } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";

import styles from "./modal.module.css";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { TModal } from '../../services/types/data';

const modalContainer = document.getElementById("modal") as HTMLElement;

const Modal:FC<TModal> = ( { onClose, children} ) => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleEscKeydown = (e: KeyboardEvent) => {
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
        {/* <h3 className={`${styles.title} text text_type_main-large`}>{title}</h3> */}
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
