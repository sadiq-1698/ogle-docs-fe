import handleResponse from "../handle-response";

export async function getAllRequests() {
  const response = await fetch(`/api/requests`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return handleResponse(response).then((data) => data);
}
