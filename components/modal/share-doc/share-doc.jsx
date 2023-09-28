import { useState } from "react";
import ShareHeader from "./share-header";
import SearchUsers from "./search-users";
import ShareButtons from "./share-buttons";
import GeneralAccess from "./general-access";
import Snackbar from "@mui/material/Snackbar";
import PeopleWithAccess from "./people-with-access";
import NotifyPeople from "./notify-people";

const snackBarStyles = { minWidth: "auto" };

const ShareDocument = (props) => {
  const { _id: docId, closeModal, accessType, name: docName } = props;

  const [notifyScreen, setNotifyScreen] = useState(false);
  const [usersToNotify, setUsersToNotify] = useState(null);
  const [displaySnackBar, setDisplaySnackBar] = useState(false);
  const [currAccessType, setCurrAccessType] = useState(accessType);

  return (
    <div className="bg-white rounded-lg py-5 w-96 shadow-search share-doc-container">
      <ShareHeader
        docName={docName}
        closeModal={closeModal}
        notifyScreen={notifyScreen}
        setNotifyScreen={setNotifyScreen}
        setUsersToNotify={setUsersToNotify}
      />

      {notifyScreen ? (
        <NotifyPeople
          usersToNotify={usersToNotify}
          setNotifyScreen={setNotifyScreen}
          setUsersToNotify={setUsersToNotify}
        />
      ) : (
        <>
          <SearchUsers
            setNotifyScreen={setNotifyScreen}
            setUsersToNotify={setUsersToNotify}
          />

          <PeopleWithAccess docId={docId} />

          <GeneralAccess
            currAccessType={currAccessType}
            setCurrAccessType={setCurrAccessType}
          />

          <ShareButtons setDisplaySnackBar={setDisplaySnackBar} />
        </>
      )}

      <Snackbar
        open={displaySnackBar}
        style={snackBarStyles}
        message="Copied to clipboard"
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      />
    </div>
  );
};

export default ShareDocument;
