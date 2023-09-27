import LinkIcon from "@/elements/link";
import { CopyToClipboard } from "react-copy-to-clipboard";

const ShareButtons = ({ setDisplaySnackBar }) => {
  // Utility functions
  const handleCopy = () => {
    setDisplaySnackBar(true);
    setTimeout(() => {
      setDisplaySnackBar(false);
    }, 2000);
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

      <button className="rounded-3xl bg-blue-700 text-white font-semibold p-2 px-4 text-sm hover:shadow-search smooth-scale">
        Done
      </button>
    </div>
  );
};

export default ShareButtons;
