import { DOC_ROLES, EDITOR, VIEWER } from "@/enums";
import Close from "@/elements/close";
import { useEffect, useState } from "react";
import CaretDown from "@/elements/caret-down";
import { updateDocument } from "@/utils/api/docs/update-by-id";
import Spinner from "@/elements/spinner";

const NotifyPeople = ({
  docDetails,
  closeModal,
  setDocument,
  usersToNotify,
  displaySnackbar,
  setNotifyScreen,
  setUsersToNotify,
}) => {
  const [loading, setLoading] = useState(false);
  const [currRole, setCurrRole] = useState(null);
  const [showRolesDropdown, setShowDropDown] = useState(false);

  const handleUserCloseClick = (user) => {
    if (user) {
      const filteredArr = usersToNotify.filter((el) => el._id !== user._id);
      setUsersToNotify([...filteredArr]);
    } else {
      setUsersToNotify([]);
    }
  };

  const handleSendInvite = async () => {
    const userId = usersToNotify[0]._id;
    const isEditor = docDetails.editors.findIndex((el) => el === userId);
    const isViewer = docDetails.viewers.findIndex((el) => el === userId);

    let result;

    if (
      (isEditor >= 0 && currRole.key === EDITOR) ||
      (isViewer >= 0 && currRole.key === VIEWER)
    ) {
      closeModal();
      return;
    }

    if (isEditor < 0 && isViewer < 0) {
      result = {
        [currRole.arrayName]: [...docDetails[currRole.arrayName], userId],
      };
    }

    if (isEditor >= 0 && currRole.key === VIEWER) {
      result = {
        viewers: [...docDetails.viewers, userId],
        editors: docDetails.viewers.slice(isEditor),
      };
    }

    if (isViewer >= 0 && currRole.key === EDITOR) {
      result = {
        editors: [...docDetails.editors, userId],
        viewers: docDetails.editors.slice(isViewer),
      };
    }

    setLoading(true);

    const response = await updateDocument({ ...docDetails, ...result });

    if (response && response.data) {
      setDocument((prev) => ({ ...prev, ...result }));
      displaySnackbar("User access updated");
      setLoading(false);
      closeModal();
    }
  };

  useEffect(() => {
    if (usersToNotify?.length === 0) {
      setNotifyScreen(false);
      setUsersToNotify(null);
    }
  }, [usersToNotify]);

  return (
    <div>
      <div className="flex items-center px-6">
        <div className="h-12 py-1 flex-1 border-2 border-solid border-gray-400 focus:border-blue-700 px-4 rounded-md flex flex-wrap">
          {usersToNotify.map((user) => {
            return (
              <div
                key={user._id}
                className="border border-gray-400 rounded-3xl bg-grey-7 px-2 flex items-center"
              >
                <span className="text-sm mr-1">{user.name}</span>
                <button onClick={() => handleUserCloseClick(user)}>
                  <Close size={18} />
                </button>
              </div>
            );
          })}
        </div>

        <button
          style={{ width: "26%" }}
          onClick={() => setShowDropDown((s) => !s)}
          className="h-12 p-0.5 ml-2 border-2 border-solid border-gray-400 px-4 rounded-md flex justify-between items-center hover:bg-grey-6 relative"
        >
          {!currRole ? "Role" : currRole.text}
          <CaretDown />
          {showRolesDropdown && (
            <div className="bg-white w-full absolute left-0 top-11 shadow-dropdown py-2">
              {Object.keys(DOC_ROLES).map(function (key) {
                return (
                  <button
                    key={DOC_ROLES[key].key}
                    style={{ width: "110%" }}
                    onClick={() => setCurrRole(DOC_ROLES[key])}
                    className="bg-white py-3 px-4 hover:bg-grey-10 text-start"
                  >
                    {DOC_ROLES[key].text}
                  </button>
                );
              })}
            </div>
          )}
        </button>
      </div>

      <div className="my-4 px-6">
        <textarea
          placeholder="Message"
          className="w-full border-2 border-solid border-gray-400 focus:border-blue-700 outline-none rounded-md p-3 px-4"
        />
      </div>

      <div className="flex items-center justify-end px-6">
        <button
          onClick={() => handleUserCloseClick()}
          className="text-sm text-blue-700 px-3 py-2 mr-3 hover:bg-blue-100 rounded-3xl font-semibold"
        >
          Cancel
        </button>
        <button
          onClick={() => handleSendInvite()}
          style={{ minWidth: "58px", minHeight: "36px" }}
          className="text-sm text-white bg-blue-700 hover:bg-blue-900 px-3 py-2 rounded-3xl font-semibold flex items-center justify-center"
        >
          {loading ? <Spinner size={20} /> : "Send"}
        </button>
      </div>
    </div>
  );
};

export default NotifyPeople;
