import handleResponse from "../handle-response";

const SERVER_ENDPOINT = "http://localhost:3000";

export async function userLogin(loginData) {
  const response = await fetch(`${SERVER_ENDPOINT}/api/feedbacks/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: loginData,
  });

  return handleResponse(response).then((data) => data);
}
