import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function OverallDetails({ timeLeft }) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const confirmReset = () => {
        // Clears all local storage entries
        localStorage.clear();
        console.log("Local storage cleared.");
        setIsModalOpen(false); // Close the modal
    };

    return (
        <div className="relative inline-block text-left">
            {/* Dropdown Button */}
            <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="inline-flex items-center px-4 py-2 rounded text-white hover:bg-gray-600 focus:outline-none transition-colors duration-200"
            >
                <i className="fas fa-chevron-down" />
            </button>

            {/* Dropdown Content */}
            {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-900 text-white border border-gray-700 rounded shadow-lg p-3 z-10 transition-all duration-200">
                    <p className="text-yellow-400 font-semibold text-center mb-2">
                        <i className="fas fa-clock px-1"></i>
                        {timeLeft}
                    </p>
                    <hr className="border-gray-700 my-2" />
                    {/* Reset Button */}
                    <button
                        onClick={openModal}
                        className="flex items-center justify-center font-semibold hover:text-red-500 focus:outline-none transition-colors duration-200 w-full"
                    >
                        <i className="text-red-500 fas fa-trash mr-2"></i>
                        Reset
                    </button>
                </div>
            )}

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">
                            Are you sure about that?
                        </h2>
                        <p className="text-gray-600 mb-6">
                            This action will reset all the data!
                        </p>
                        <div className="flex justify-end">
                            {/* Cancel Button */}
                            <button
                                onClick={closeModal}
                                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 focus:outline-none transition-colors duration-200 mr-2"
                            >
                                Nevermind
                            </button>
                            {/* Confirm Button */}
                            <button
                                onClick={confirmReset}
                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none transition-colors duration-200"
                            >
                                Okay
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default OverallDetails;