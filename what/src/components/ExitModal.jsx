import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ExitModal = ({
                       isOpen,
                       onClose,
                       onConfirm,
                   }) => {
    return (
        isOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-gray-800 rounded-lg shadow-lg max-w-sm w-full p-6 text-white">
                    <h2 className="text-lg font-semibold mb-4">Are you sure you want to exit the quiz?</h2>
                    <div className="flex space-x-4">
                        {/* Okay button */}
                        <button
                            onClick={onConfirm}
                            className="flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white font-medium focus:outline-none"
                        >
                            <i className="fa-solid fa-check mr-2"></i> Okay.
                        </button>
                        {/* Nah button */}
                        <button
                            onClick={onClose}
                            className="flex items-center px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg text-white font-medium focus:outline-none"
                        >
                            <i className="fa-solid fa-xmark mr-2"></i> Nah
                        </button>
                    </div>
                </div>
            </div>
        )
    );
};

const Header = ({
                    assessmentName,
                    currentQuestionIndex,
                    totalQuestions,
                    correctCount,
                    incorrectCount,
                }) => {

};

export default Header;