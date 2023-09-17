import handleResponse from "../handle-response";

export async function getDocById(docId) {
  const response = await fetch(`/api/docs/${docId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return handleResponse(response).then((data) => data);
}
