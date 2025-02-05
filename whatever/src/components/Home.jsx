import React from "react";
import {useNavigate} from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
    return (
        <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
            <div className="font-bold text-6xl">
                whatever
                <button
                    onClick={() => navigate("/one")}
                    className="mt-6 text-white text-6xl font-bold hover:text-gray-900"
                >
                    .
                </button>
            </div>
        </div>
    );
};


export default Home;