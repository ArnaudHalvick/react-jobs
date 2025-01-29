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
  getDoc,
} from "firebase/firestore";

import MainLayout from "./layouts/MainLayout";
import ErrorBoundary from "./components/ErrorBoundary";
import NotFoundPage from "./pages/NotFoundPage";
import HomePage from "./pages/HomePage";
import JobsPage from "./pages/JobsPage";
import JobPage from "./pages/JobPage";
import AddJobPage from "./pages/AddJobPage";
import EditJobPage from "./pages/EditJobPage";
import { jobLoader } from "./loaders/jobLoader";

const App = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const jobsRef = collection(db, "jobs");

    const unsubscribe = onSnapshot(jobsRef, (snapshot) => {
      const jobsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setJobs(jobsData);
    });

    return () => unsubscribe();
  }, []);

  const addJob = async (newJob) => {
    try {
      const jobsRef = collection(db, "jobs");
      const docRef = await addDoc(jobsRef, newJob);
      const jobSnap = await getDoc(docRef);
      setJobs((prev) => [...prev, { id: docRef.id, ...jobSnap.data() }]);
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
      <Route path="/" element={<MainLayout />} errorElement={<ErrorBoundary />}>
        <Route
          index
          element={<HomePage jobs={jobs} />}
          errorElement={<ErrorBoundary />}
        />
        <Route
          path="/jobs"
          element={<JobsPage jobs={jobs} />}
          errorElement={<ErrorBoundary />}
        />
        <Route
          path="/jobs/:id"
          element={<JobPage onDelete={deleteJob} />}
          loader={jobLoader}
          errorElement={<ErrorBoundary />}
        />
        <Route
          path="/add-job"
          element={<AddJobPage addJob={addJob} />}
          errorElement={<ErrorBoundary />}
        />
        <Route
          path="/edit-job/:id"
          element={<EditJobPage onUpdate={updateJob} />}
          loader={jobLoader}
          errorElement={<ErrorBoundary />}
        />
        <Route
          path="*"
          element={<NotFoundPage />}
          errorElement={<ErrorBoundary />}
        />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
