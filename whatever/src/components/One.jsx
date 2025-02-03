import React from "react";
import { useNavigate } from "react-router-dom";

const One = () => {
    const navigate = useNavigate();

    // Function to handle click events
    const handleSquareClick = (color) => {
        if (color === "blue") {
            navigate("/next/two");
        } else {
            navigate("/gameover");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-900">
            <h1 className="text-white text-2xl font-bold mb-8">Click on the blue square.</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
                <div
                    className="w-40 h-40 bg-gray-300 hover:bg-blue-500 transition-colors"
                    onClick={() => handleSquareClick("blue")}
                ></div>
                <div
                    className="w-40 h-40 bg-gray-300 hover:bg-green-500 transition-colors"
                    onClick={() => handleSquareClick("green")}
                ></div>
                <div
                    className="w-40 h-40 bg-gray-300 hover:bg-yellow-500 transition-colors"
                    onClick={() => handleSquareClick("yellow")}
                ></div>
                <div
                    className="w-40 h-40 bg-gray-300 hover:bg-red-500 transition-colors"
                    onClick={() => handleSquareClick("red")}
                ></div>
            </div>

            <a href="/" target="_self" rel="noopener noreferrer" className="text-white font-bold underline">bye</a>
        </div>
    );
};

export default One;