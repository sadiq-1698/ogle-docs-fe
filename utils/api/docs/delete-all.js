import handleResponse from "../handle-response";

export async function deleteAllDocuments() {
  const response = await fetch(`/api/docs`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return handleResponse(response).then((data) => data);
}
