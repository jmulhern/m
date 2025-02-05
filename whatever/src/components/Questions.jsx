import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Questions = () => {
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]); // Stores the question data
    const [loading, setLoading] = useState(true); // Tracks loading state

    // Fetch question data from the API
    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await fetch("/api/questions/aws-practice-exam-01"); // Call API endpoint
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json(); // Parse the response as JSON
                setQuestions(data); // Set questions or empty array if undefined
                setLoading(false);
            } catch (error) {
                console.error("Error fetching questions:", error);
                setLoading(false); // Clear loading state, even on error
            }
        };

        fetchQuestions();
    }, []);

    // Handle click on a possible answer
    const handleTextClick = (chosenAnswer, correctAnswer) => {
        if (chosenAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
            console.log("correct");
        } else {
            console.log("wrong");
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-900">
                <h1 className="text-white text-xl">Loading...</h1>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 mt-4 px-4">
            <div className="w-full max-w-3xl">
                {/* Loop over questions and render them */}
                {questions.map((question, index) => (
                    <div
                        key={index}
                        className="mb-8 bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700"
                    >
                        {/* Display the question text */}
                        <h2 className="text-white text-2xl font-semibold mb-5">
                            Question {index + 1}
                        </h2>
                        <h2 className="text-gray-200 text-xl font-semibold mb-5">
                            {question.question}
                        </h2>

                        {/* Loop over the possible answers */}
                        <div className="space-y-3">
                            {question["possible_answers"].map((answer, idx) => (
                                <button
                                    key={idx}
                                    onClick={() =>
                                        handleTextClick(answer, question["answer"])
                                    }
                                    className="w-full text-left hover:text-blue-300 text-gray-200 font-medium py-3 px-4 rounded transition duration-200"
                                >
                                    {String.fromCharCode(65 + idx)}. {answer}
                                </button>
                            ))}
                        </div>
                    </div>
                ))}

                {/* Navigation button */}
                <div className="m-6">
                    <button
                        onClick={() => navigate("/")}
                        className="text-white text-lg font-bold hover:text-gray-300"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        </div>

    );
};

export default Questions;