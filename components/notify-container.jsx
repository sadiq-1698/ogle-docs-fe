import Spinner from "@/elements/spinner";
import { useEffect, useState } from "react";
import { updateDocument } from "@/utils/api/docs/update-by-id";
import { getAllRequests } from "@/utils/api/requests/get-all";

const NotifyContainer = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [granting, setGranting] = useState(false);
  const [requestsList, setRequestsList] = useState(null);

  // Utility functions
  const handleGrantPermission = async (request) => {
    if (granting) return;
    try {
      setGranting(true);
      const response = await updateDocument(
        {
          id: request.docId,
          requestId: request._id,
          grantedUserId: request.from,
        },
        "PATCH"
      );
      if (response.data) {
        const tempArr = requestsList.filter((el) => el._id !== request._id);
        setRequestsList([...tempArr]);
      }
    } catch (error) {
    } finally {
      setGranting(false);
    }
  };

  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getAllRequests();
        if (response.data) {
          setRequestsList([...response.data.requestsList]);
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, []);

  return (
    <div className="absolute bg-white shadow-search rounded-md h-52 w-80 top-14 right-0 overflow-y-auto">
      {loading ? (
        <div className="h-full w-full flex justify-center items-center">
          <Spinner color="blue" size={50} />
        </div>
      ) : (
        <>
          {requestsList && requestsList.length > 0 ? (
            <div className="py-2">
              {requestsList.map((request) => {
                return (
                  <div className="px-3 pt-3 pb-1 hover:bg-gray-100 border-b border-solid border-gray-300 ">
                    <p className="text-sm">
                      <strong>{request.userName}</strong> has requested access
                      to your document <strong>"{request.docName}"</strong>
                    </p>
                    <div className="flex justify-center mt-2">
                      <button
                        style={{ fontSize: "10px" }}
                        onClick={() => handleGrantPermission(request)}
                        className="text-blue-600 p-1 font-bold"
                      >
                        GRANT PERMISSION
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="h-full w-full flex justify-center items-center">
              <span className="px-5 w-full text-center">
                {error ? "Failed to fetch requests" : "No notifications"}
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default NotifyContainer;
