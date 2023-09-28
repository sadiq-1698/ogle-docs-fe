import Close from "@/elements/close";
import { useEffect } from "react";

const NotifyPeople = ({ usersToNotify, setNotifyScreen, setUsersToNotify }) => {
  const handleUserCloseClick = (user) => {
    const filteredArr = usersToNotify.filter((el) => el._id !== user._id);
    setUsersToNotify([...filteredArr]);
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
          {usersToNotify.map((user, index) => {
            return (
              <div className="border border-gray-400 rounded-3xl bg-blue-300 px-2 py-1 flex items-center">
                <span className="text-sm mr-1">{user.name}</span>
                <button onClick={() => handleUserCloseClick(user)}>
                  <Close size={18} />
                </button>
              </div>
            );
          })}
        </div>
        <div className="h-12 p-0.5 w-1/6 ml-2 border-2 border-solid border-gray-400 focus:border-blue-700 px-4 rounded-md">
          Role
        </div>
      </div>
    </div>
  );
};

export default NotifyPeople;
