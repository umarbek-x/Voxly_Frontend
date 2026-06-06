const API_URL = "http://localhost:8080/api/v0.1/groups";

export async function createSession(payload) {
  const response = await fetch(
    `${API_URL}/sessions`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );

  return await response.json();
}