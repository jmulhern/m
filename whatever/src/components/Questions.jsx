import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Questions = () => {
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]); // Stores the question data
    const [loading, setLoading] = useState(true); // Tracks loading state
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Tracks current question
    const [answerStatus, setAnswerStatus] = useState(null); // Tracks current question's answer status

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
        const isCorrect = chosenAnswer.toLowerCase() === correctAnswer.toLowerCase();
        setAnswerStatus(isCorrect ? "correct" : "incorrect");

        if (isCorrect) {
            console.log("correct");
        } else {
            console.log("wrong");
        }
    };

    // Handle reset of the quiz
    const handleReset = () => {
        setCurrentQuestionIndex(0);
        setAnswerStatus(null);
    };

    // Handle continue to next question
    const handleContinue = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setAnswerStatus(null);
        } else {
            // Optionally, navigate to a results page or show a completion message
            navigate("/");
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-900">
                <h1 className="text-white text-2xl">Loading...</h1>
            </div>
        );
    }

    // Guard against empty questions array
    if (questions.length === 0) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-900">
                <h1 className="text-white text-2xl">No questions available.</h1>
            </div>
        );
    }

    // Get the current question
    const currentQuestion = questions[currentQuestionIndex];

    // Determine the card's text color based on answer status
    let cardTextColor = "text-gray-200";
    if (answerStatus === "correct") {
        cardTextColor = "text-green-400";
    } else if (answerStatus === "incorrect") {
        cardTextColor = "text-red-400";
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 pt-4 px-4">
            <div className="w-full max-w-3xl">
                {/* Current Question Card */}
                <div
                    className={`mb-8 bg-gray-800 p-6 rounded-lg shadow-lg border transition-colors duration-300 ${
                        answerStatus === "correct"
                            ? "border-green-500"
                            : answerStatus === "incorrect"
                                ? "border-red-500"
                                : "border-gray-700"
                    }`}
                >
                    {/* Display the question number */}
                    <h2 className={`text-2xl font-semibold mb-2 ${cardTextColor}`}>
                        Question {currentQuestionIndex + 1} of {questions.length}
                    </h2>
                    {/* Display the question text */}
                    <h3 className={`text-xl font-semibold mb-5 ${cardTextColor}`}>
                        {currentQuestion.question}
                    </h3>

                    {/* Loop over the possible answers */}
                    <div className="space-y-3">
                        {currentQuestion["possible_answers"].map((answer, idx) => (
                            <button
                                key={idx}
                                onClick={() => handleTextClick(answer, currentQuestion["answer"])}
                                disabled={answerStatus !== null} // Disable buttons if already answered
                                className={`w-full text-left font-medium py-3 px-4 rounded transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                                    answerStatus === "correct"
                                        ? "bg-green-600 text-white"
                                        : answerStatus === "incorrect" && answer === currentQuestion["answer"]
                                            ? "bg-green-600 text-white"
                                            : answerStatus === "incorrect"
                                                ? "bg-red-600 text-white"
                                                : "bg-blue-600 hover:bg-blue-700 text-white"
                                }`}
                            >
                                {String.fromCharCode(65 + idx)}. {answer}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-start m-6 w-full max-w-3xl space-x-4">
                    {/* Continue Button - Visible after answering */}
                    {answerStatus && (
                        <button
                            onClick={handleContinue}
                            className="text-white text-lg font-bold bg-green-600 hover:bg-green-700 py-2 px-4 rounded"
                        >
                            Continue
                        </button>
                    )}

                    {/* Reset Button - Always Visible */}
                    <button
                        onClick={handleReset}
                        className="text-white text-lg font-bold bg-yellow-600 hover:bg-yellow-700 py-2 px-4 rounded"
                    >
                        Start Over
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Questions;