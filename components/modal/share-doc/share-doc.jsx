import { useState } from "react";
import ShareHeader from "./share-header";
import SearchUsers from "./search-users";
import ShareButtons from "./share-buttons";
import NotifyPeople from "./notify-people";
import GeneralAccess from "./general-access";
import PeopleWithAccess from "./people-with-access";

const ShareDocument = (props) => {
  const {
    ownerId,
    content,
    viewers,
    editors,
    _id: docId,
    createdAt,
    isStarred,
    isTemplate,
    closeModal,
    accessType,
    setDocument,
    name: docName,
    displaySnackbar,
  } = props;

  const docDetails = {
    ownerId,
    content,
    viewers,
    editors,
    id: docId,
    createdAt,
    isStarred,
    isTemplate,
    accessType,
    name: docName,
  };

  const [usersList, setUsersList] = useState(null);
  const [userRoles, setUserRoles] = useState(null);
  const [notifyScreen, setNotifyScreen] = useState(false);
  const [usersToNotify, setUsersToNotify] = useState(null);
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
          docDetails={docDetails}
          closeModal={closeModal}
          setDocument={setDocument}
          usersToNotify={usersToNotify}
          displaySnackbar={displaySnackbar}
          setNotifyScreen={setNotifyScreen}
          setUsersToNotify={setUsersToNotify}
        />
      ) : (
        <>
          <SearchUsers
            setNotifyScreen={setNotifyScreen}
            setUsersToNotify={setUsersToNotify}
          />

          <PeopleWithAccess
            usersList={usersList}
            userRoles={userRoles}
            docDetails={docDetails}
            setUserRoles={setUserRoles}
            setUsersList={setUsersList}
          />

          <GeneralAccess
            docDetails={docDetails}
            currAccessType={currAccessType}
            setCurrAccessType={setCurrAccessType}
          />

          <ShareButtons
            usersList={usersList}
            userRoles={userRoles}
            closeModal={closeModal}
            docDetails={docDetails}
            setDocument={setDocument}
            currAccessType={currAccessType}
            displaySnackbar={displaySnackbar}
          />
        </>
      )}
    </div>
  );
};

export default ShareDocument;
