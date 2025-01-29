// jobLoader.js
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

export const jobLoader = async ({ params }) => {
  try {
    const jobRef = doc(db, "jobs", params.id);
    const jobSnap = await getDoc(jobRef);

    if (jobSnap.exists()) {
      return {
        id: jobSnap.id,
        ...jobSnap.data(),
      };
    } else {
      throw new Error("Job not found");
    }
  } catch (error) {
    console.error("Error loading job:", error);
    throw error;
  }
};
