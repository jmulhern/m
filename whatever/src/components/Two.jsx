import React from "react";
import { useNavigate } from "react-router-dom";

const Two = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-900">
            <h1 className="text-white text-2xl font-bold mb-8">K you're cool.</h1>
            <button
                onClick={() => navigate("/slay-the-spire")}
                className="mt-8 text-white font-bold underline hover:text-gray-400"
            >
                Slay the Spire
            </button>
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