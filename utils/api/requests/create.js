import handleResponse from "../handle-response";

export async function createRequest(docId) {
  const response = await fetch(`/api/requests/${docId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return handleResponse(response).then((data) => data);
}
