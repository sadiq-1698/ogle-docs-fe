import handleResponse from "../handle-response";

const SERVER_ENDPOINT = "http://localhost:3000";

export async function userRegister(regData) {
  const response = await fetch(`${SERVER_ENDPOINT}/api/auth/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: regData,
  });

  return handleResponse(response).then((data) => data);
}
