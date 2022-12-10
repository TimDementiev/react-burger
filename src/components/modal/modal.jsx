import { useEffect } from "react";
import { createPortal } from "react-dom";
import modalStyles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ModalOverlay } from "../ModalOverlay";
import { modalType } from "../../utils/types";

export const Modal = ({ isOpen, title, onClose, children }) => {
  function stopPropagation(e) {
    e.stopPropagation();
  }

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const modalsElement = document.getElementById("modals");

  return createPortal(
    <>
      {isOpen && (
        <ModalOverlay onClose={onClose}>
          <div className={modalStyles.modal} onClick={stopPropagation}>
            <button className={modalStyles.closeButton} onClick={onClose}>
              <CloseIcon type="primary" />
            </button>
            <h3
              className={`${modalStyles.title_container} mt-10 ml-10 mr-10`}
            >
              <p className="text text_type_main-large">{title}</p>
            </h3>
            <div className="flex column align_items-center justify_content-center">
              {children}
            </div>
          </div>
        </ModalOverlay>
      )}
    </>,
    modalsElement
  );
};

export const modalPropTypes = modalType;
