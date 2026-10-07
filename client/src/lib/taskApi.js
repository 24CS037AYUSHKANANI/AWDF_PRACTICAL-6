const API =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

async function call(endpoint, options = {}) {
  const response = await fetch(`${API}${endpoint}`, {
    ...options,
    headers: {
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...(options.headers || {})
    }
  });

  const result = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(result.message || "Unable to complete request");
  }

  return result;
}

export const getTasks = () => call("/tasks");

export const addTask = data =>
  call("/tasks", {
    method: "POST",
    body: JSON.stringify(data)
  });

export const editTask = (taskId, data) =>
  call(`/tasks/${taskId}`, {
    method: "PUT",
    body: JSON.stringify(data)
  });

export const removeTask = taskId =>
  call(`/tasks/${taskId}`, {
    method: "DELETE"
  });
