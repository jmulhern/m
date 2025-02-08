import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const assessments = [
        "AWS Cloud Practitioner",
        "Random Trivia"
    ];

    // `useNavigate` hook for programmatic navigation
    const navigate = useNavigate();

    const handleNavigation = (assessment) => {
        navigate(`/w/${assessment.toLowerCase().replace(/\s+/g, "-")}`); // Navigate to `/w/{word-with-dashes}`
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
            {/* Large centered text */}
            <h1 className="text-7xl font-bold mb-10">What?</h1>

            {/* Vertical list of random words */}
            <ul className="space-y-4 text-xl text-gray-300">
                {assessments.map((assessment, index) => (
                    <li
                        key={index}
                        className="cursor-pointer  transition hover:text-orange-400 duration-200"
                        onClick={() => handleNavigation(assessment)} // Navigate on click
                    >
                        <i className="fas fa-arrow-right ml-2"></i> {/* Font Awesome icon */}
                        {assessment}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Home;