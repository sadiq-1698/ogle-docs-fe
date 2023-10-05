import Spinner from "@/elements/spinner";
import { useEffect, useState } from "react";
import { getUsersWithAccess } from "@/utils/api/users/get-with-access";

const COLORS = ["bg-purple-800", "bg-red-800", "bg-green-800", "bg-gray-800"];

const PeopleWithAccess = ({ docDetails }) => {
  const [loading, setLoading] = useState(false);
  const [usersList, setUsersList] = useState(null);

  const getUserRole = (user) => {
    if (user._id === localStorage.getItem("userId")) {
      return "Owner";
    } else if (docDetails.editors.includes(user._id)) {
      return "Editor";
    } else {
      return "Viewer";
    }
  };

  // use effect definitions
  useEffect(() => {
    const fetchUsersWithAccess = async () => {
      setLoading(true);
      const response = await getUsersWithAccess(docDetails.id);
      if (response.data) {
        setUsersList(response.data.usersList);
        setLoading(false);
      }
    };

    fetchUsersWithAccess();
  }, []);

  return (
    <>
      <span className="font-medium px-5 block">People with access</span>

      {loading && (
        <div className="w-full flex justify-center items-center py-0.5 mb-4">
          <Spinner color="blue" size={32} />
        </div>
      )}

      {usersList &&
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

                  <span className="text-sm text-grey-2">
                    {getUserRole(user)}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
    </>
  );
};

export default PeopleWithAccess;
