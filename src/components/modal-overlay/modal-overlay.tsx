import modalOverlayStyles from "./modal-overlay.module.css";
import { FC } from 'react'
import { TModalOverlay } from "../../services/types/data";

const ModalOverlay:FC<TModalOverlay> = ({onClose}) => {
  return <div className={modalOverlayStyles.overlay} onClick={onClose}></div>;
};

export default ModalOverlay;
