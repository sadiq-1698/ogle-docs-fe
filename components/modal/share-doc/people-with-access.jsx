const PeopleWithAccess = ({ profileLetter }) => {
  return (
    <>
      <span className="font-medium px-5 block">People with access</span>

      <div className="bg-white hover:bg-grey-6 py-2 mb-4">
        <div className="px-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="h-8 w-8 bg-red-800 rounded-full flex items-center justify-center mr-2">
                <span className="text-white font-bold text-sm">
                  {profileLetter}
                </span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center">
                  <span className="text-sm mr-1.5 font-semibold">
                    {localStorage.getItem("name")}
                  </span>
                </div>
                <span className="text-xs text-grey-9">
                  {localStorage.getItem("username")}
                </span>
              </div>
            </div>

            <span className="text-sm text-grey-2">Owner</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default PeopleWithAccess;
