import modalOverlayStyles from "./style.module.css";
import { modalType } from "../../utils/types";

export const ModalOverlay = ({ onClose, children }) => {
  return (
    <div className={modalOverlayStyles.overlay} onClick={onClose}>
      {children}
    </div>
  );
};

export const modalOverlayPropTypes = modalType;
