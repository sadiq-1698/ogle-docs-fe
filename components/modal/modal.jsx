const Modal = ({ children }) => {
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 bg-overlay flex justify-center items-center z-40">
      {children}
    </div>
  );
};

export default Modal;
