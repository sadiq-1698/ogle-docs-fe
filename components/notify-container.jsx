import Spinner from "@/elements/spinner";
import { getAllRequests } from "@/utils/api/requests/get-all";
import { useEffect, useState } from "react";

const NotifyContainer = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [requestsList, setRequestsList] = useState(null);

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
            <>Hello</>
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
