import modalOverlayStyles from "./modal-overlay.module.css";

const ModalOverlay = ({ onClose }) => {
  return <div className={modalOverlayStyles.overlay} onClick={onClose}></div>;
};

export default ModalOverlay;
