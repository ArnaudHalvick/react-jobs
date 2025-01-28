import { useLoaderData } from "react-router-dom";

const JobPage = () => {
  const job = useLoaderData();

  return (
    <div>
      <h1>{job.title}</h1>
      <p>{job.description}</p>
    </div>
  );
};

export default JobPage;
