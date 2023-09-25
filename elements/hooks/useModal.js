import { useState } from "react";

const useModal = (initialState = false) => {
  const [isOpen, setIsOpen] = useState(initialState);
  const [component, setComponent] = useState();
  const [modalStyle, setModalStyle] = useState();

  const toggleModal = ({ component, modalStyle, shouldOpenModal }) => {
    if (shouldOpenModal) {
      setIsOpen((prevState) => !prevState);
      setComponent(component);
      setModalStyle(modalStyle);
    }
  };
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return {
    isOpen,
    component,
    modalStyle,
    toggleModal: toggleModal,
    openModal: openModal,
    closeModal: closeModal,
  };
};

export default useModal;
