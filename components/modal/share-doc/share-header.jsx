import Close from "@/elements/close";
import BackArrow from "@/elements/back-arrow";

const ShareHeader = ({
  docName,
  closeModal,
  notifyScreen,
  setNotifyScreen,
  setUsersToNotify,
}) => {
  const handleClickBack = () => {
    setNotifyScreen(false);
    setUsersToNotify(null);
  };

  return (
    <div className="flex justify-between items-center mb-5 px-5">
      <div className="flex items-center">
        {notifyScreen && (
          <button
            onClick={() => handleClickBack()}
            className="mr-3 hover:bg-gray-300 smooth-scale p-1 rounded-full"
          >
            <BackArrow />
          </button>
        )}
        <span className="font-medium" style={{ fontSize: "22px" }}>
          Share &quot;{docName}&quot;
        </span>
      </div>
      <button
        aria-label="Close modal"
        onClick={() => closeModal()}
        className="hover:bg-gray-300 smooth-scale p-1 rounded-full"
      >
        <Close />
      </button>
    </div>
  );
};

export default ShareHeader;
