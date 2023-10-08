import handleResponse from "../handle-response";

export async function updateDocument(docData, method = "PUT") {
  const response = await fetch(`/api/docs/${docData.id}`, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(docData),
  });

  return handleResponse(response).then((data) => data);
}
