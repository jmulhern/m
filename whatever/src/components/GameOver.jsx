import React from "react";
import { useNavigate } from "react-router-dom";

const Two = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-900">
            <h1 className="text-white text-2xl font-bold mb-8">Game Over</h1>
            <button
                onClick={() => navigate("/")}
                className="mt-6 text-white text-6xl font-bold hover:text-gray-900"
            >
                .
            </button>
        </div>
    );
};

export default Two;