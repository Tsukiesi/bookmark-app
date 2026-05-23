import { useEffect } from "react";
import s from "./Modal.module.css";

interface ModalProps {
  active: boolean;
  closeModal: () => void;
  children: React.ReactNode;
}

const Modal = ({ active, closeModal, children }: ModalProps) => {
  useEffect(() => {
    if (!active) return;
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [active]);
  if (!active) return null;
  return (
    <div className={s.overlay}>
      <div className={s.modal}>{children}</div>
    </div>
  );
};

export default Modal;
