export async function uploadCsvStudent(token, data) {
  const response = await fetch("http://localhost:8080/api/csv/upload", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: data,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to upload the CSV file");
  }

  return await response.json();
}