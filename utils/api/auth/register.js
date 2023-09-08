import handleResponse from "../handle-response";

export async function userRegister(regData) {
  const response = await fetch(`/api/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(regData),
  });

  return handleResponse(response).then((data) => data);
}
