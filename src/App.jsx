// App.jsx
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { useState, useEffect } from "react";
import { db } from "./firebase";
import {
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";

import MainLayout from "./layouts/MainLayout";
import NotFoundPage from "./pages/NotFoundPage";
import HomePage from "./pages/HomePage";
import JobsPage from "./pages/JobsPage";
import JobPage from "./pages/JobPage";
import AddJobPage from "./pages/AddJobPage";
import EditJobPage from "./pages/EditJobPage";
import { jobLoader } from "./loaders/jobLoader";

const App = () => {
  const [jobs, setJobs] = useState([]);

  // Subscribe to jobs collection changes
  useEffect(() => {
    const jobsRef = collection(db, "jobs");

    const unsubscribe = onSnapshot(jobsRef, (snapshot) => {
      const jobsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setJobs(jobsData);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const addJob = async (newJob) => {
    try {
      const jobsRef = collection(db, "jobs");
      const docRef = await addDoc(jobsRef, newJob);

      // Return the new job with its ID
      return {
        id: docRef.id,
        ...newJob,
      };
    } catch (error) {
      console.error("Error adding job:", error);
      throw error;
    }
  };

  const deleteJob = async (jobId) => {
    try {
      const jobRef = doc(db, "jobs", jobId);
      await deleteDoc(jobRef);
      return true;
    } catch (error) {
      console.error("Error deleting job:", error);
      return false;
    }
  };

  const updateJob = async (jobId, updatedJob) => {
    try {
      const jobRef = doc(db, "jobs", jobId);
      await updateDoc(jobRef, updatedJob);
      return {
        id: jobId,
        ...updatedJob,
      };
    } catch (error) {
      console.error("Error updating job:", error);
      throw error;
    }
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage jobs={jobs} />} />
        <Route path="/jobs" element={<JobsPage jobs={jobs} />} />
        <Route
          path="/jobs/:id"
          element={<JobPage onDelete={deleteJob} />}
          loader={jobLoader}
        />
        <Route path="/add-job" element={<AddJobPage addJob={addJob} />} />
        <Route
          path="/edit-job/:id"
          element={<EditJobPage onUpdate={updateJob} />}
          loader={jobLoader}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
