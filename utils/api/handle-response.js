async function handleResponse(response) {
  const contentType = response.headers.get("Content-Type") || "";
  const isJson = contentType.includes("application/json");
  const data = isJson ? await response.json() : await response.text();

  console.log("data", data);

  if (!response.ok) {
    const message = isJson
      ? data.message || response.statusText
      : response.statusText;
    throw new Error(message);
  }

  return data;
}

export default handleResponse;
