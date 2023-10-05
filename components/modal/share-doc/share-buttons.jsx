import { useState } from "react";
import LinkIcon from "@/elements/link";
import Spinner from "@/elements/spinner";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { updateDocument } from "@/utils/api/docs/update-by-id";

const ShareButtons = ({
  closeModal,
  docDetails,
  setDocument,
  currAccessType,
  displaySnackbar,
}) => {
  const [loading, setLoading] = useState(false);

  // Utility functions
  const handleCopy = () => {
    displaySnackbar("Copied to clipboard");
  };

  const handleSetGeneralAccess = async () => {
    setLoading(true);
    const response = await updateDocument({
      ...docDetails,
      accessType: currAccessType,
    });
    if (response && response.data) {
      setDocument((prev) => ({ ...prev, accessType: currAccessType }));
      displaySnackbar("Doc access updated!");
      setLoading(false);
      closeModal();
    }
  };

  return (
    <div className="flex justify-between mt-5 px-5">
      <CopyToClipboard text={window.location.href}>
        <button
          onClick={() => handleCopy()}
          className="rounded-3xl flex items-center border border-gray-600 bg-transparent hover:bg-grey-8 border-solid text-blue-600 font-semibold p-2 px-4 text-sm"
        >
          <LinkIcon />
          <span className="ml-1">Copy Link</span>
        </button>
      </CopyToClipboard>

      <button
        onClick={() => handleSetGeneralAccess()}
        className="rounded-3xl bg-blue-700 text-white font-semibold p-2 px-4 text-sm hover:shadow-search smooth-scale"
      >
        {loading ? <Spinner size={20} /> : "Done"}
      </button>
    </div>
  );
};

export default ShareButtons;
