import Close from "@/elements/close";
import GeneralAccess from "./general-access";
import PeopleWithAccess from "./people-with-access";

const ShareDocument = (props) => {
  const { closeModal, profileLetter, accessType, name: docName } = props;

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

      <div className="w-full mb-4 px-5">
        <input
          placeholder="Add people"
          className="w-full outline-none border-2 border-solid border-gray-400 focus:border-blue-700 p-3 px-4 rounded-md"
        />
      </div>

      <PeopleWithAccess profileLetter={profileLetter} />

      <GeneralAccess accessType={accessType} />

      <div className="flex justify-between mt-5 px-5">
        <button className="rounded-3xl border border-gray-600 bg-transparent hover:bg-grey-8 border-solid text-blue-600 font-semibold p-2 px-4 text-sm">
          Copy Link
        </button>
        <button className="rounded-3xl bg-blue-700 text-white font-semibold p-2 px-4 text-sm hover:shadow-search smooth-scale">
          Done
        </button>
      </div>
    </div>
  );
};

export default ShareDocument;
