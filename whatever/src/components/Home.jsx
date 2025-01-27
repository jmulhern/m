import React from "react";

const Home = () => {
  return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        {/* Card Container */}
        <div className="bg-white text-gray-800 rounded-lg shadow-xl p-8 max-w-lg text-center">
          <h1 className="text-5xl font-extrabold mb-4 text-blue-600">
            Welcome to Whatever!
          </h1>
          <p className="text-lg font-medium mb-6">
            We're so glad you're here. Explore all the features Whatever offers and have a great experience!
          </p>
          <img
              src="https://cdn2.thecatapi.com/images/MTY3ODIyMQ.jpg"
              alt="A cute cat"
              className="rounded-lg shadow-lg mb-6"
          />
          <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
            Get Started
          </button>
        </div>
      </div>
  );
};

export default Home;