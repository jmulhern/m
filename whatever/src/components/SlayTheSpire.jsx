import React from "react";
import { useNavigate } from "react-router-dom";

const SlayTheSpire = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
            <h1 className="text-3xl font-bold">Slay the Spire</h1>

            <button
                onClick={() => navigate("/ironclad")}
                className="mt-4 text-white font-bold underline hover:text-red-400"
            >
                Ironclad
            </button>

            <button
                onClick={() => navigate("/defect")}
                className="mt-4 text-white font-bold underline hover:text-blue-400"
            >
                Defect
            </button>

            <button
                onClick={() => navigate("/the-watcher")}
                className="mt-4 text-white font-bold underline hover:text-purple-400"
            >
                The Watcher
            </button>

            <button
                onClick={() => navigate("/relic")}
                className="mt-4 text-white font-bold underline hover:text-orange-400"
            >
                Relic
            </button>

            <button
                onClick={() => navigate("/two")}
                className="mt-6 text-white text-6xl font-bold hover:text-gray-900"
            >
                .
            </button>

        </div>
    );
};

export default SlayTheSpire;