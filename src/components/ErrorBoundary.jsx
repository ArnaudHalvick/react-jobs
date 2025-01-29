import { useRouteError, Link } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";

const ErrorBoundary = () => {
  const error = useRouteError();

  // Log the error for debugging purposes
  console.error(error);

  // Default error message
  let errorMessage = "An unexpected error occurred";

  // Customize error message based on error type
  if (error.message) {
    errorMessage = error.message;
  } else if (error.statusText) {
    errorMessage = error.statusText;
  }

  return (
    <section className="min-h-screen bg-indigo-50 px-4 py-32">
      <div className="container mx-auto max-w-2xl">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <FaExclamationTriangle className="text-red-500 text-5xl mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Oops!</h1>
          <p className="text-gray-600 mb-8">{errorMessage}</p>
          <div className="flex justify-center space-x-4">
            <Link
              to="/"
              className="bg-indigo-500 text-white px-6 py-3 rounded-lg hover:bg-indigo-600 transition-colors"
            >
              Go Home
            </Link>
            <button
              onClick={() => window.location.reload()}
              className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ErrorBoundary;
