import handleResponse from "../handle-response";

export async function deleteDocById(docId) {
  const response = await fetch(`/api/docs/${docId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return handleResponse(response).then((data) => data);
}
