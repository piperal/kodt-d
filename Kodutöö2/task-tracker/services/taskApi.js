export async function getTasks() {
  const response = await fetch(`${import.meta.env.BASE_URL}tasks.json`);

  if (!response.ok) {
    throw new Error('Failed to load tasks');
  }

  return response.json();
}