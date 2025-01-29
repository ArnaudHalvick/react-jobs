// App.jsx
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { useState } from "react";

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

  const addJob = async (newJob) => {
    const response = await fetch("/api/jobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newJob),
    });
    const data = await response.json();
    setJobs([...jobs, data]);
  };

  const deleteJob = async (jobId) => {
    try {
      const response = await fetch(`/api/jobs/${jobId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Remove job from state
        setJobs(jobs.filter((job) => job.id !== jobId));
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error deleting job:", error);
      return false;
    }
  };

  const updateJob = async (jobId, updatedJob) => {
    const response = await fetch(`/api/jobs/${jobId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedJob),
    });
    const data = await response.json();
    setJobs(jobs.map((job) => (job.id === jobId ? data : job)));
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/jobs" element={<JobsPage />} />
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
