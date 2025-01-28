// jobLoader.js
export async function jobLoader({ params }) {
  try {
    const res = await fetch(`/api/jobs/${params.id}`);
    if (!res.ok) {
      throw new Error("Failed to fetch job data");
    }
    return await res.json();
  } catch (error) {
    console.error("Error loading job:", error);
    throw error;
  }
}

export { jobLoader as default };
