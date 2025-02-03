import React from "react";
import { useParams } from "react-router-dom";


const Next = () => {
    const { path } = useParams();

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-900">
            <h1 className="text-white text-2xl font-bold mb-8">Good</h1>
            <a href={"/"+path} target="_self" rel="noopener noreferrer" className="text-white font-bold underline mb-8">next</a>
            <a href="/" target="_self" rel="noopener noreferrer" className="text-white font-bold underline">bye</a>
        </div>
    );
};

export default Next;