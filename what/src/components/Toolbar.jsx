import React, { useState } from "react";

const ExitModal = ({ isOpen, onClose, onConfirm }) => {
    return (
        isOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">
                        Are you sure about that?
                    </h2>
                    <p className="text-gray-600 mb-6">
                        You will exit and lose all your progress.
                    </p>
                    <div className="flex justify-end">
                        {/* Cancel Button */}
                        <button
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 focus:outline-none transition-colors duration-200 mr-2"
                        >
                            Nevermind
                        </button>
                        {/* Confirm Button */}
                        <button
                            onClick={onConfirm}
                            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none transition-colors duration-200"
                        >
                            Okay
                        </button>
                    </div>
                </div>
            </div>
        )
    );
};


const Toolbar = ({
                     assessmentName,
                     navigate,
                     currentQuestionIndex,
                     totalQuestions,
                     correctCount,
                     incorrectCount,
                 }) => {
    const [showModal, setShowModal] = useState(false);

    // Handle Confirm Exit
    const handleExitConfirm = () => {
        setShowModal(false);
        navigate("/"); // Navigate to home after confirmation
    };

    // Handle Modal Close
    const handleCloseModal = () => {
        setShowModal(false);
    };

    // Handle Alien Icon Tap
    const handleOpenModal = () => {
        setShowModal(true);
    };

    return (
        <div className="fixed top-0 left-0 right-0 bg-gray-800 text-white flex justify-between items-center py-2 px-3 shadow-lg z-10">

            {/* Left - Correct and Incorrect Counts */}
            <div className="flex gap-4">
                {/* Correct Count */}
                <div className="flex flex-col items-center text-green-500">
                    <i className="fa-solid fa-check text-2xl"></i>
                    <span className="text-base font-medium">{correctCount}</span>
                </div>

                {/* Incorrect Count */}
                <div className="flex flex-col items-center text-red-500">
                    <i className="fa-solid fa-xmark text-2xl"></i>
                    <span className="text-base font-medium">{incorrectCount}</span>
                </div>
            </div>

            {/* Center - Assessment Name and Current Question */}
            <div className="flex flex-col items-center grow">
                <span className="text-gray-300 text-lg font-medium">{assessmentName}</span>
                <span className="text-gray-400 text-sm">{currentQuestionIndex + 1} of {totalQuestions}</span>
            </div>

            {/* Right - Alien Icon */}
            <div>
                <button
                    onClick={handleOpenModal}
                    className="text-gray-300 hover:text-gray-400 focus:outline-none"
                >
                    <i className="fa-solid fa-xmark text-2xl mr-2"></i>
                </button>
            </div>

            {/* Exit Confirmation Modal */}
            <ExitModal
                isOpen={showModal}
                onClose={handleCloseModal}
                onConfirm={handleExitConfirm}
            />
        </div>
    );
};

export default Toolbar;