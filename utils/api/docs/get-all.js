import handleResponse from "../handle-response";

export async function getAllDocs() {
  const response = await fetch(`/api/docs`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return handleResponse(response).then((data) => data);
}
