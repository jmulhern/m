import React from "react";
import { useNavigate } from "react-router-dom";

const Two = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-900">
            <h1 className="text-white text-2xl font-bold mb-8">K you're cool.</h1>
            <a href="/slay-the-spire" target="_self" rel="noopener noreferrer" className="text-white font-bold underline mb-8">Slay the Spire</a>
            <a href="/" target="_self" rel="noopener noreferrer" className="text-white font-bold underline">bye</a>
        </div>
    );
};

export default Two;