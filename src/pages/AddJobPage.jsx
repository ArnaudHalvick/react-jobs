import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddJobPage = ({ addJob }) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [type, setType] = useState("Full-Time");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [salary, setSalary] = useState("Under $50K");
  const [companyName, setCompanyName] = useState("");
  const [companyDescription, setCompanyDescription] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);

    const newJob = {
      title,
      type,
      location,
      description,
      salary,
      company: {
        name: companyName,
        description: companyDescription,
        contactEmail,
        contactPhone,
      },
    };

    try {
      navigate("/jobs", { replace: true });
      const result = await addJob(newJob);
      if (result && result.id) {
        toast.success("Job added successfully");
      } else {
        throw new Error("Failed to create job - no ID returned");
      }
    } catch (error) {
      console.error("Error adding job:", error);
      toast.error("Failed to add job. Please try again.");
      navigate("/add-job");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-indigo-50">
      <div className="container m-auto max-w-2xl py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <form onSubmit={handleSubmit}>
            <h2 className="text-3xl text-center font-semibold mb-6">Add Job</h2>

            <div className="mb-4">
              <label
                htmlFor="type"
                className="block text-gray-700 font-bold mb-2"
              >
                Job Type
              </label>
              <select
                id="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="border rounded w-full py-2 px-3"
                required
                disabled={isSubmitting}
              >
                <option value="Full-Time">Full-Time</option>
                <option value="Part-Time">Part-Time</option>
                <option value="Remote">Remote</option>
                <option value="Internship">Internship</option>
              </select>
            </div>

            <div className="mb-4">
              <label
                htmlFor="title"
                className="block text-gray-700 font-bold mb-2"
              >
                Job Listing Name
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border rounded w-full py-2 px-3 mb-2"
                placeholder="eg. Beautiful Apartment In Miami"
                required
                disabled={isSubmitting}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-gray-700 font-bold mb-2"
              >
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border rounded w-full py-2 px-3"
                rows="4"
                placeholder="Add any job duties, expectations, requirements, etc"
                disabled={isSubmitting}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="salary"
                className="block text-gray-700 font-bold mb-2"
              >
                Salary
              </label>
              <select
                id="salary"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                className="border rounded w-full py-2 px-3"
                required
                disabled={isSubmitting}
              >
                <option value="Under $50K">Under $50K</option>
                <option value="$50K - 60K">$50K - $60K</option>
                <option value="$60K - 70K">$60K - $70K</option>
                <option value="$70K - 80K">$70K - $80K</option>
                <option value="$80K - 90K">$80K - $90K</option>
                <option value="$90K - 100K">$90K - $100K</option>
                <option value="$100K - 125K">$100K - $125K</option>
                <option value="$125K - 150K">$125K - $150K</option>
                <option value="$150K - 175K">$150K - $175K</option>
                <option value="$175K - 200K">$175K - $200K</option>
                <option value="Over $200K">Over $200K</option>
              </select>
            </div>

            <div className="mb-4">
              <label
                htmlFor="location"
                className="block text-gray-700 font-bold mb-2"
              >
                Location
              </label>
              <input
                type="text"
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="border rounded w-full py-2 px-3 mb-2"
                placeholder="Company Location"
                required
                disabled={isSubmitting}
              />
            </div>

            <h3 className="text-2xl mb-5">Company Info</h3>

            <div className="mb-4">
              <label
                htmlFor="company"
                className="block text-gray-700 font-bold mb-2"
              >
                Company Name
              </label>
              <input
                type="text"
                id="company"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="border rounded w-full py-2 px-3"
                placeholder="Company Name"
                disabled={isSubmitting}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="company_description"
                className="block text-gray-700 font-bold mb-2"
              >
                Company Description
              </label>
              <textarea
                id="company_description"
                value={companyDescription}
                onChange={(e) => setCompanyDescription(e.target.value)}
                className="border rounded w-full py-2 px-3"
                rows="4"
                placeholder="What does your company do?"
                disabled={isSubmitting}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="contact_email"
                className="block text-gray-700 font-bold mb-2"
              >
                Contact Email
              </label>
              <input
                type="email"
                id="contact_email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                className="border rounded w-full py-2 px-3"
                placeholder="Email address for applicants"
                required
                disabled={isSubmitting}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="contact_phone"
                className="block text-gray-700 font-bold mb-2"
              >
                Contact Phone
              </label>
              <input
                type="tel"
                id="contact_phone"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                className="border rounded w-full py-2 px-3"
                placeholder="Optional phone for applicants"
                disabled={isSubmitting}
              />
            </div>

            <div>
              <button
                className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline disabled:bg-indigo-300"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Adding Job..." : "Add Job"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AddJobPage;
