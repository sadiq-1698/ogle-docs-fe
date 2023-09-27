import handleResponse from "../handle-response";

export async function getSearchUsers(search) {
  const response = await fetch(`/api/users?search=${search}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return handleResponse(response).then((data) => data);
}
