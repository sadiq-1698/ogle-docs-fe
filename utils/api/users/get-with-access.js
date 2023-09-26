import handleResponse from "../handle-response";

export async function getUsersWithAccess(docId) {
  const response = await fetch(`/api/users?docId=${docId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return handleResponse(response).then((data) => data);
}
