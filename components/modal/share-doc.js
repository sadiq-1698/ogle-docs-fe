const ShareDocument = () => {
  return (
    <div className="bg-white rounded-lg p-5 w-96">
      <div className="flex justify-between items-center">
        <span className="mb-5 font-semibold text-xl">Share "Report"</span>
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
        <button className="rounded-3xl border border-gray-600 border-solid text-blue-600 font-semibold p-2 px-4 text-sm">
          Copy Link
        </button>
        <button className="rounded-3xl bg-blue-700 text-white font-semibold p-2 px-4 text-sm">
          Done
        </button>
      </div>
    </div>
  );
};

export default ShareDocument;
