import { useState } from "react";
import { ACCESS_TYPES } from "@/enums";
import CaretDown from "@/elements/caret-down";

const GeneralAccess = ({ docDetails, currAccessType, setCurrAccessType }) => {
  const [typeDropdown, showTypeDropdown] = useState(false);

  const accessTypeDetails = ACCESS_TYPES[currAccessType];
  const iconBgClass = ACCESS_TYPES[currAccessType].className;
  const isCurrUserOwner =
    localStorage?.getItem("userId") === docDetails.ownerId;

  const handleSelectAccessType = (key) => {
    setCurrAccessType(key);
    showTypeDropdown(false);
  };

  return (
    <>
      {isCurrUserOwner ? (
        <>
          <span className="font-medium px-5 mt-4 inline-block">
            General access
          </span>

          <div className="py-2 hover:bg-grey-10">
            <div className="px-5">
              <div className="flex items-center ">
                <div className={`h-8 w-8 rounded-full ${iconBgClass} mr-2`}>
                  {accessTypeDetails.component}
                </div>

                <div className="flex flex-col relative">
                  <button
                    className="flex items-center"
                    onClick={() => showTypeDropdown((s) => !s)}
                  >
                    <span className="text-sm mr-1.5 font-semibold">
                      {accessTypeDetails.text}
                    </span>

                    <CaretDown />
                  </button>

                  <span className="text-xs text-grey-9">
                    {accessTypeDetails.description}
                  </span>

                  {typeDropdown ? (
                    <div className="bg-white w-4/5 absolute left-0 top-6 shadow-dropdown py-2">
                      {Object.keys(ACCESS_TYPES).map(function (key) {
                        return (
                          <button
                            key={key}
                            onClick={() => handleSelectAccessType(key)}
                            className="bg-white py-3 px-4 hover:bg-grey-10 w-full text-start"
                          >
                            {ACCESS_TYPES[key].text}
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default GeneralAccess;
