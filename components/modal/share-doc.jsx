import CaretDown from "@/elements/caret-down";
import Close from "@/elements/close";
import Lock from "@/elements/lock";

const ShareDocument = (props) => {
  const { closeModal, name } = props;

  console.log("Share doc props", props);

  return (
    <div className="bg-white rounded-lg py-5 w-96 shadow-search">
      <div className="flex justify-between items-center mb-5 px-5">
        <span className="font-medium text-xl">Share "{name}"</span>
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

      <span className="mb-5 font-medium px-5 block">People with access</span>

      <span className="font-medium px-5">General access</span>

      <div className="bg-white hover:bg-grey-6 py-2">
        <div className="px-5">
          <div className="flex items-center">
            <Lock transform="translate(0 7)" />
            <div className="flex flex-col">
              <div className="flex items-center">
                <span className="text-sm mr-1.5 font-semibold">Restricted</span>
                <CaretDown />
              </div>
              <span className="text-xs text-grey-9">
                Only people with access can open with the link
              </span>
            </div>
          </div>
        </div>
      </div>

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
