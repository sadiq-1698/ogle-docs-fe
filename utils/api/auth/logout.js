import handleResponse from "../handle-response";

export async function userLogout() {
  const response = await fetch(`/api/auth/logout`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return handleResponse(response).then((data) => data);
}
