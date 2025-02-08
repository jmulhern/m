import React, { useState } from "react";

const ExitModal = ({ isOpen, onClose, onConfirm }) => {
    return (
        isOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-gray-800 rounded-lg shadow-lg max-w-sm w-full p-6 text-white">
                    {/* Modal Title */}
                    <h2 className="text-base font-medium mb-6 text-center">
                        Are you sure you want to exit the quiz?
                    </h2>

                    {/* Centered Buttons */}
                    <div className="flex justify-center space-x-4">
                        {/* Okay Button */}
                        <button
                            onClick={onConfirm}
                            className="flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm text-white font-medium focus:outline-none"
                        >
                            <i className="fa-solid fa-check mr-2"></i> Okay.
                        </button>

                        {/* Nevermind Button */}
                        <button
                            onClick={onClose}
                            className="flex items-center px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg text-sm text-white font-medium focus:outline-none"
                        >
                            <i className="fa-solid fa-xmark mr-2"></i> Nevermind
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
        <div className="fixed top-0 left-0 right-0 bg-gray-800 text-white flex justify-between items-center p-4 shadow-lg z-10">

            {/* Left - Correct and Incorrect Counts */}
            <div className="flex gap-8">
                {/* Correct Count */}
                <div className="flex flex-col items-center text-green-500">
                    <i className="fa-solid fa-check text-2xl"></i>
                    <span>{correctCount}</span>
                </div>

                {/* Incorrect Count */}
                <div className="flex flex-col items-center text-red-500">
                    <i className="fa-solid fa-xmark text-2xl"></i>
                    <span>{incorrectCount}</span>
                </div>
            </div>

            {/* Center - Assessment Name and Current Question */}
            <div className="flex flex-col items-center grow">
                <span className="text-gray-300">{assessmentName}</span>
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
}

export default Toolbar;