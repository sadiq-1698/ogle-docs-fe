import handleResponse from "../handle-response";

export async function userLogin(loginData) {
  const response = await fetch(`/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginData),
  });

  return handleResponse(response).then((data) => data);
}
