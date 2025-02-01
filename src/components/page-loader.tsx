import React from "react";

const PageLoader: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-purple-50 to-pink-50">
      <div className="text-center">
        {/* Animated Spinner */}
        <div className="mx-auto mb-6 h-20 w-20 animate-spin rounded-full border-4 border-purple-300 border-t-pink-500"></div>

        {/* Loading Text */}
        <h1 className="mb-2 text-3xl font-bold text-purple-700">Loading...</h1>
        <p className="text-lg font-medium text-purple-900">
          Heyyo, hold on a sec
        </p>

        {/* Optional: Animated Dots */}
        <div className="mt-4 flex justify-center space-x-2">
          <div className="h-3 w-3 animate-bounce rounded-full bg-purple-500"></div>
          <div className="h-3 w-3 animate-bounce rounded-full bg-pink-500 delay-100"></div>
          <div className="h-3 w-3 animate-bounce rounded-full bg-purple-500 delay-200"></div>
        </div>
      </div>
    </div>
  );
};

export default PageLoader;
