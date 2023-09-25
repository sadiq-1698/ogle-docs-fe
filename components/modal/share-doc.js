import Close from "@/elements/close";

const ShareDocument = (props) => {
  const { closeModal, name, _id } = props;

  return (
    <div className="bg-white rounded-lg p-5 w-96 shadow-search">
      <div className="flex justify-between items-center mb-5">
        <span className="font-medium text-xl">Share "{name}"</span>
        <button
          aria-label="Close modal"
          onClick={() => closeModal()}
          className="hover:bg-gray-300 smooth-scale p-1 rounded-full"
        >
          <Close />
        </button>
      </div>
      <div className="w-full mb-4">
        <input className="w-full" />
      </div>
      <div className="mb-5">
        <span className="mb-5">People with access</span>
      </div>
      <div>
        <span className="">General access</span>
      </div>
      <div className="flex justify-between mt-5">
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
