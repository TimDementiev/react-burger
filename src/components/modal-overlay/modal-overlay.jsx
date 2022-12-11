import modalOverlayStyles from "./modal-overlay.module.css";
import { modalType } from "../../utils/types";

const ModalOverlay = ({ onClose }) => {
  return <div className={modalOverlayStyles.overlay} onClick={onClose}></div>;
};

ModalOverlay.propTypes = modalType;

export default ModalOverlay;
