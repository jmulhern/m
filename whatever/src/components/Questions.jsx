import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Questions = () => {
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]); // Stores the question data
    const [loading, setLoading] = useState(true); // Tracks loading state
    const [answerStatuses, setAnswerStatuses] = useState({}); // Tracks answer statuses

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
    const handleTextClick = (chosenAnswer, correctAnswer, questionIndex) => {
        const isCorrect = chosenAnswer.toLowerCase() === correctAnswer.toLowerCase();
        setAnswerStatuses((prevStatuses) => ({
            ...prevStatuses,
            [questionIndex]: isCorrect ? "correct" : "incorrect",
        }));

        if (isCorrect) {
            console.log("correct");
        } else {
            console.log("wrong");
        }
    };

    // Handle reset of all answers
    const handleReset = () => {
        setAnswerStatuses({});
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-900">
                <h1 className="text-white text-2xl">Loading...</h1>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 pt-4 px-4">
            <div className="w-full max-w-3xl">
                {/* Loop over questions and render them */}
                {questions.map((question, index) => {
                    // Determine the card's text color based on answer status
                    let cardTextColor = "text-gray-200";
                    if (answerStatuses[index] === "correct") {
                        cardTextColor = "text-green-400";
                    } else if (answerStatuses[index] === "incorrect") {
                        cardTextColor = "text-red-400";
                    }

                    return (
                        <div
                            key={index}
                            className={`mb-8 bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 transition-colors duration-300 ${
                                answerStatuses[index] === "correct"
                                    ? "border-green-500"
                                    : answerStatuses[index] === "incorrect"
                                        ? "border-red-500"
                                        : ""
                            }`}
                        >
                            {/* Display the question number */}
                            <h2 className={`text-2xl font-semibold mb-2 ${cardTextColor}`}>
                                Question {index + 1}
                            </h2>
                            {/* Display the question text */}
                            <h3 className={`text-xl font-semibold mb-5 ${cardTextColor}`}>
                                {question.question}
                            </h3>

                            {/* Loop over the possible answers */}
                            <div className="space-y-3">
                                {question["possible_answers"].map((answer, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() =>
                                            handleTextClick(answer, question["answer"], index)
                                        }
                                        disabled={answerStatuses.hasOwnProperty(index)} // Disable buttons if already answered
                                        className={`w-full text-left font-medium py-3 px-4 rounded transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                                            answerStatuses[index] === "correct"
                                                ? "bg-green-600  text-white"
                                                : answerStatuses[index] === "incorrect" && answer === question["answer"]
                                                    ? "bg-green-600 text-white"
                                                    : answerStatuses[index] === "incorrect"
                                                        ? "bg-red-600 text-white"
                                                        : "hover:text-blue-400 text-white"
                                        }`}
                                    >
                                        {String.fromCharCode(65 + idx)}. {answer}
                                    </button>
                                ))}
                            </div>
                        </div>
                    );
                })}

                {/* Action Buttons */}
                <div className="flex justify-between m-6">
                    <button
                        onClick={handleReset}
                        className="text-white text-lg font-bold bg-yellow-600 hover:bg-yellow-700 py-2 px-4 rounded"
                    >
                        Reset
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Questions;