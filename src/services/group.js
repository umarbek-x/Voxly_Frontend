const API_URL = "http://localhost:8080/api/v0.1/groups";

export async function getMyGroups() {
  const response = await fetch(`${API_URL}/`, {
    method: "GET",
    credentials: "include",
  });

  return response.json();
}

export async function getGroupById(groupId) {
  const response = await fetch(
    `http://localhost:8080/api/v0.1/groups/${groupId}`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  return await response.json();
}

export async function connectGroup() {
  const response = await fetch(
    "http://localhost:8080/api/v0.1/groups/connect",
    {
      method: "POST",
      credentials: "include",
    }
  );

  return await response.json();
}