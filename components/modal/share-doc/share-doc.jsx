import { useState } from "react";
import Close from "@/elements/close";
import copy from "copy-to-clipboard";
import SearchUsers from "./search-users";
import GeneralAccess from "./general-access";
import Snackbar from "@mui/material/Snackbar";
import PeopleWithAccess from "./people-with-access";
import LinkIcon from "@/elements/link";

const ShareDocument = (props) => {
  const {
    _id: docId,
    closeModal,
    accessType,
    name: docName,
    profileLetter,
  } = props;

  const [displaySnackBar, setDisplaySnackBar] = useState(false);

  // Utility functions
  const handleCopy = () => {
    copy(window.location.href, {
      onCopy: () => {
        setDisplaySnackBar(true);
        setTimeout(() => {
          setDisplaySnackBar(false);
        }, 2000);
      },
    });
  };

  return (
    <div className="bg-white rounded-lg py-5 w-96 shadow-search">
      <div className="flex justify-between items-center mb-5 px-5">
        <span className="font-medium text-xl">Share "{docName}"</span>
        <button
          aria-label="Close modal"
          onClick={() => closeModal()}
          className="hover:bg-gray-300 smooth-scale p-1 rounded-full"
        >
          <Close />
        </button>
      </div>

      <SearchUsers />

      <PeopleWithAccess profileLetter={profileLetter} docId={docId} />

      <GeneralAccess accessType={accessType} />

      <div className="flex justify-between mt-5 px-5">
        <button
          onClick={() => handleCopy()}
          className="rounded-3xl flex items-center border border-gray-600 bg-transparent hover:bg-grey-8 border-solid text-blue-600 font-semibold p-2 px-4 text-sm"
        >
          <LinkIcon />
          <span className="ml-1">Copy Link</span>
        </button>
        <button className="rounded-3xl bg-blue-700 text-white font-semibold p-2 px-4 text-sm hover:shadow-search smooth-scale">
          Done
        </button>
      </div>

      <Snackbar
        open={displaySnackBar}
        style={{
          width: "auto",
        }}
        message="Copied to clipboard"
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      />
    </div>
  );
};

export default ShareDocument;
