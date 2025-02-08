import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const [assessments, setAssessments] = useState([]); // State to store assessments
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    const navigate = useNavigate(); // Navigation hook

    // Fetch assessments from the endpoint
    useEffect(() => {
        const fetchAssessments = async () => {
            try {
                const response = await fetch("/api/assessments"); // Fetch data
                if (!response.ok) {
                    throw new Error(`HTTP error: ${response.status}`); // Handle non-200 responses
                }
                const data = await response.json(); // Parse JSON
                setAssessments(data); // Set the assessments to state
                setLoading(false); // Turn off loading
            } catch (err) {
                setError(err.message); // Capture any errors
                setLoading(false); // Turn off loading
            }
        };

        fetchAssessments(); // Call the fetch function
    }, []);

    // Handle Navigation
    const handleNavigation = (id) => {
        navigate(`/w/${id}`); // Navigate using ID
    };

    // Show a loading spinner or error message if applicable
    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
                <p>Loading assessments...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
                <p>Error: {error}</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
            {/* Adjusted margin for the heading */}
            <h1 className="text-7xl font-bold mt-16 mb-10">What?</h1>

            {/* Card container wrapping the list */}
            <div className="bg-gray-800 rounded-lg shadow-md p-6 w-full max-w-lg mx-4">
                <ul className="space-y-4 text-lg text-gray-300">
                    {assessments.map((assessment) => (
                        <li
                            key={assessment.id}
                            className="cursor-pointer transition hover:text-orange-400 duration-200 flex items-center gap-2"
                            onClick={() => handleNavigation(assessment.id)} // Use ID for navigation
                        >
                            <i className={`${assessment.icon} text-xl`}></i> {/* Dynamic icon */}
                            {assessment.name}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Home;