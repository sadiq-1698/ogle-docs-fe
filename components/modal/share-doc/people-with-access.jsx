import Spinner from "@/elements/spinner";
import { useEffect, useState } from "react";
import { COLORS, DOC_ROLES } from "@/enums";
import CaretDown from "@/elements/caret-down";
import { getUsersWithAccess } from "@/utils/api/users/get-with-access";

const PeopleWithAccess = ({ docDetails }) => {
  const [loading, setLoading] = useState(false);
  const [usersList, setUsersList] = useState(null);
  const [userRoles, setUserRoles] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const getUserRole = (user, role) => {
    if (role) return role;

    if (user._id === localStorage.getItem("userId")) {
      return "Owner";
    } else if (docDetails.editors.includes(user._id)) {
      return "Editor";
    } else {
      return "Viewer";
    }
  };

  const handleRoleClick = (index) => {
    if (showDropdown === index) {
      setShowDropdown(false);
    } else {
      setShowDropdown(index);
    }
  };

  const handleUserRoleUpdate = (role, index) => {
    const tempArr = userRoles;
    tempArr[index] = DOC_ROLES[role].text;
    setUserRoles([...tempArr]);
    setShowDropdown(false);
  };

  const handleRemoveAccessClick = (user) => {
    const result = usersList.filter((el) => el._id !== user._id);
    setUsersList([...result]);
    setShowDropdown(false);
  };

  // use effect definitions
  useEffect(() => {
    const fetchUsersWithAccess = async () => {
      setLoading(true);
      const response = await getUsersWithAccess(docDetails.id);
      if (response.data) {
        setUsersList(response.data.usersList);
        const userRoles = response.data.usersList?.map((user) =>
          getUserRole(user)
        );
        setUserRoles([...userRoles]);
        setLoading(false);
      }
    };

    fetchUsersWithAccess();
  }, []);

  useEffect(() => {
    const tempArr = usersList?.map((user) => getUserRole(user));
    if (tempArr) setUserRoles([...tempArr]);
  }, [usersList]);

  return (
    <>
      <span className="font-medium px-5 block">People with access</span>

      {loading && (
        <div className="w-full flex justify-center items-center py-0.5 mb-4">
          <Spinner color="blue" size={32} />
        </div>
      )}

      {usersList &&
        userRoles &&
        usersList.length > 0 &&
        usersList.map((user, index) => {
          const bgClass = COLORS[index % COLORS.length];
          return (
            <div className="bg-white hover:bg-grey-6 py-2" key={user._id}>
              <div className="px-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div
                      className={`h-8 w-8 ${bgClass} rounded-full flex items-center justify-center mr-2`}
                    >
                      <span className="text-white font-bold text-sm">
                        {user.name.toString().split(" ")[0].charAt(0)}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center">
                        <span className="text-sm mr-1.5 font-semibold">
                          {user.name.toString()}
                        </span>
                      </div>
                      <span className="text-xs text-grey-9">
                        {user.username.toString()}
                      </span>
                    </div>
                  </div>

                  <div style={{ width: "100px" }} className="relative">
                    <button
                      onClick={() => handleRoleClick(index)}
                      className={`w-full h-12 p-0.5 px-4 rounded-md flex justify-${
                        index === 0 ? "end" : "between"
                      } items-center hover:bg-grey-6 relative`}
                    >
                      <span className="text-sm text-grey-2 text-left">
                        {userRoles[index]}
                      </span>
                      {getUserRole(user) !== "Owner" && <CaretDown />}
                    </button>

                    {getUserRole(user) !== "Owner" &&
                      showDropdown > -1 &&
                      showDropdown === index && (
                        <div
                          style={{ minWidth: "160px" }}
                          className="bg-white absolute left-0 top-10 shadow-dropdown py-2 z-30 rounded-sm"
                        >
                          {Object.keys(DOC_ROLES).map(function (role) {
                            return (
                              <button
                                key={DOC_ROLES[role].key}
                                onClick={() =>
                                  handleUserRoleUpdate(role, index)
                                }
                                className={`bg-white py-3 px-4 hover:bg-grey-10 text-start w-full`}
                              >
                                {DOC_ROLES[role].text}
                              </button>
                            );
                          })}

                          <div className="my-2 w-full border-t border-solid border-gray-300"></div>

                          <button
                            onClick={() => handleRemoveAccessClick(user)}
                            className="bg-white py-3 px-4 hover:bg-grey-10 text-start w-full"
                          >
                            Remove access
                          </button>
                        </div>
                      )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </>
  );
};

export default PeopleWithAccess;
