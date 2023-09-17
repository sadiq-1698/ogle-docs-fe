import handleResponse from "../handle-response";

export async function createDocument(docData) {
  const response = await fetch(`/api/docs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(docData),
  });

  return handleResponse(response).then((data) => data);
}
