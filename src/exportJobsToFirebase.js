import { db } from "./firebase.js";
import { collection, addDoc } from "firebase/firestore";
import { readFile } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const exportJobsToFirebase = async () => {
  try {
    const jobsCollection = collection(db, "jobs");
    const rawData = await readFile(join(__dirname, "jobs.json"), "utf8");
    const jobsData = JSON.parse(rawData);
    const jobs = jobsData.jobs;

    for (const job of jobs) {
      await addDoc(jobsCollection, job);
      console.log(`Job with title '${job.title}' added to Firebase`);
    }

    console.log("All jobs exported to Firebase successfully!");
  } catch (error) {
    console.error("Error exporting jobs to Firebase:", error);
  }
};

exportJobsToFirebase();
