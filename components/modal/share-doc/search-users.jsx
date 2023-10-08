import debounce from "lodash.debounce";
import { useCallback, useEffect, useState } from "react";
import { getSearchUsers } from "@/utils/api/users/get-search-users";

const SearchUsers = ({ setNotifyScreen, setUsersToNotify }) => {
  const [search, setSearch] = useState(null);
  const [searchList, setSearchList] = useState(null);
  const [searchValue, setSearchValue] = useState("");

  // react hook definitions
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const dbnce = useCallback(
    debounce((value) => {
      setSearch(value);
    }, 1000),
    []
  );

  // Utility functions
  const handleSearch = (e) => {
    setSearchList(null);
    const value = e.target.value;
    setSearchValue(value);
    dbnce(value);
  };

  const resetSearchStates = () => {
    setSearch(null);
    setSearchValue("");
    setSearchList(null);
  };

  const handleSelectUser = (user) => {
    resetSearchStates();
    setUsersToNotify([user]);
    setNotifyScreen(true);
  };

  // use effect definitions
  useEffect(() => {
    const fetchSearchUsers = async () => {
      const response = await getSearchUsers(search);
      if (response.data) {
        setSearchList(response.data.usersList);
      }
    };

    if (search && search.trim().length > 0) {
      fetchSearchUsers();
    }
  }, [search]);

  return (
    <div className="w-full mb-4 px-5">
      <div className="relative">
        <input
          value={searchValue}
          onChange={handleSearch}
          placeholder="Add people"
          className="w-full outline-none border-2 border-solid border-gray-400 focus:border-blue-700 p-3 px-4 rounded-md"
        />
        <div className="absolute shadow-search w-full z-20">
          {searchList &&
            searchList.length > 0 &&
            searchList.map((user) => {
              return (
                <button
                  key={user._id}
                  onClick={() => handleSelectUser(user)}
                  className="py-2 px-3 flex items-center w-full bg-grey-7 hover:bg-gray-200"
                >
                  <div className="h-10 w-10 bg-red-800 rounded-full flex items-center justify-center mr-2">
                    <span className="text-white font-bold text-sm">
                      {user.name.toString().trim().split(" ")[0].charAt(0)}
                    </span>
                  </div>
                  <div className="flex flex-col ml-3">
                    <span className="block text-start">{user.name}</span>
                    <span className="text-start">{user.username}</span>
                  </div>
                </button>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default SearchUsers;
