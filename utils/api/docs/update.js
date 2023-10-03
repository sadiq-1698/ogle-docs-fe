import handleResponse from "../handle-response";

export async function updateDocument(docData) {
  const response = await fetch(`/api/docs`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(docData),
  });

  return handleResponse(response).then((data) => data);
}
