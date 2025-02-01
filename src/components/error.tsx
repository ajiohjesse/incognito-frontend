import { Link } from "react-router";

const ErrorDisplay = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gradient-to-b from-purple-50 to-pink-50 p-6">
      <div className="mb-6 text-8xl">😕</div>{" "}
      <h1 className="mb-4 text-center text-4xl font-bold text-purple-700">
        Something went wrong
      </h1>
      <p className="mb-8 text-center text-lg text-gray-600">
        Oops! It seems something broke.
      </p>
      <Link
        to="/"
        className="rounded-lg bg-purple-600 px-6 py-3 text-white hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 focus:outline-none"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default ErrorDisplay;
