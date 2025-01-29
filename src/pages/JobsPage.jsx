import JobListings from "../components/JobListings";

const JobsPage = ({ jobs }) => {
  return (
    <section className="bg-blue-50 px-4 py-6">
      <JobListings jobs={jobs} />
    </section>
  );
};

export default JobsPage;
