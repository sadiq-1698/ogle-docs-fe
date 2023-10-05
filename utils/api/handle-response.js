async function handleResponse(response) {
  const contentType = response.headers.get("Content-Type") || "";
  const isJson = contentType.includes("application/json");
  const data = isJson ? await response.json() : await response.text();

  if (!response.ok) return { error: data.message, status: response.status };
  return { data: data };
}

export default handleResponse;
