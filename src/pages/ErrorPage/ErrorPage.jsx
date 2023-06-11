import { Link } from "react-router-dom";
import errorImage from "../../assets/error.jpg";

const ErrorPage = () => {
  return (
    <div
      className="flex items-center justify-center min-h-screen"
      style={{ backgroundImage: `url(${errorImage})`, backgroundSize: "cover" }}
    >
      <div className="absolute inset-0 bg-black opacity-70"></div> {/* Add the overlay div */}
      <div className="relative max-w-lg p-8 bg-white shadow-md rounded-lg">
        <h1 className="text-4xl font-bold mb-6 text-gray-600">
          404 - Page Not Found
        </h1>
        <p className="text-lg mb-6">
          Oops! The page you are looking for does not exist.
        </p>
        <Link
          to="/"
          className="button-primary"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
