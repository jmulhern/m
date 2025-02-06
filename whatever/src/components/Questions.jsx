import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Questions = () => {
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]); // Stores the question data
    const [loading, setLoading] = useState(true); // Tracks loading state
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Tracks current question
    const [selectedAnswers, setSelectedAnswers] = useState([]); // Tracks selected answers
    const [answerStatus, setAnswerStatus] = useState({}); // Tracks submission status
    const [isSubmitted, setIsSubmitted] = useState(false); // Tracks if the user has submitted answers

    // New state variables for tracking correct and incorrect answers
    const [correctCount, setCorrectCount] = useState(0);
    const [incorrectCount, setIncorrectCount] = useState(0);

    // Fetch question data from the API
    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await fetch("/api/questions/aws-practice-exam"); // Call API endpoint
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json(); // Parse the response as JSON

                // Rename 'answer' to 'correct_answers' and ensure it's always an array
                const processedData = data.map((question) => ({
                    ...question,
                    correct_answers: Array.isArray(question.correct_answers)
                        ? question.correct_answers
                        : [question.correct_answers],
                }));

                setQuestions(processedData); // Set processed questions
                setLoading(false);
            } catch (error) {
                console.error("Error fetching questions:", error);
                setLoading(false); // Clear loading state, even on error
            }
        };

        fetchQuestions();
    }, []);

    // Handle click on a possible answer
    const handleTextClick = (chosenAnswer) => {
        if (isSubmitted) return; // Prevent changes after submission

        if (selectedAnswers.includes(chosenAnswer)) {
            // Deselect the answer
            setSelectedAnswers(selectedAnswers.filter((answer) => answer !== chosenAnswer));
        } else {
            // Select the answer
            setSelectedAnswers([...selectedAnswers, chosenAnswer]);
        }
    };

    // Handle submit of selected answers
    const handleSubmit = () => {
        const correctAnswers = currentQuestion.correct_answers.map((ans) => ans.toLowerCase());
        const selected = selectedAnswers.map((ans) => ans.toLowerCase());

        // Check if selected answers match the correct answers
        const isCorrect =
            selected.length === correctAnswers.length &&
            selected.every((ans) => correctAnswers.includes(ans));

        setAnswerStatus({
            isCorrect,
            correct_answers: currentQuestion.correct_answers,
        });

        setIsSubmitted(true);

        // Update counts based on correctness
        if (isCorrect) {
            setCorrectCount(correctCount + 1);
        } else {
            setIncorrectCount(incorrectCount + 1);
        }
    };

    // Handle reset of the quiz
    const handleReset = () => {
        setCurrentQuestionIndex(0);
        setSelectedAnswers([]);
        setAnswerStatus({});
        setIsSubmitted(false);
        setCorrectCount(0);
        setIncorrectCount(0);
    };

    // Handle continue to next question
    const handleContinue = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedAnswers([]);
            setAnswerStatus({});
            setIsSubmitted(false);
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
    if (answerStatus.isCorrect) {
        cardTextColor = "text-green-400";
    } else if (answerStatus.isCorrect === false) {
        cardTextColor = "text-red-400";
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 pt-16 px-4">
            {/* Floating Toolbar */}
            <div className="fixed top-0 left-0 right-0 bg-gray-800 text-white flex justify-between items-center p-4 shadow-lg z-10">
                {/* Left Side: AWS Cloud Practitioner */}
                <div className="text-lg font-semibold">
                    AWS
                </div>

                {/* Center: Question Number */}
                <div className="text-lg font-semibold">
                    {currentQuestionIndex + 1} of {questions.length}
                </div>

                {/* Right Side: Correct and Incorrect Counts */}
                <div className="text-lg font-semibold">
                    <span className="text-green-500 mr-2">{correctCount}</span><span className="text-red-500">{incorrectCount}</span>
                </div>
            </div>

            <div className="w-full max-w-3xl mt-2 sm:mt-6">
                {/* Current Question Card */}
                <div
                    className={`mb-8 bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg border transition-colors duration-300 ${
                        isSubmitted
                            ? answerStatus.isCorrect
                                ? "border-green-500"
                                : "border-red-500"
                            : "border-gray-700"
                    }`}
                >
                    {/* Display the question text */}
                    <h3 className={`text-lg font-semibold mb-5 ${cardTextColor}`}>
                        {currentQuestion.question}
                    </h3>

                    {/* Loop over the possible answers */}
                    <div className="space-y-3">
                        {currentQuestion.possible_answers.map((answer, idx) => {
                            const isSelected = selectedAnswers.includes(answer);
                            let buttonClass =
                                "w-full text-left font-medium py-2 sm:py-3 px-3 sm:px-4 rounded transition duration-200 ";

                            if (isSubmitted) {
                                const isAnswerCorrect = currentQuestion.correct_answers.includes(answer);
                                if (isAnswerCorrect) {
                                    buttonClass += "bg-green-600 text-white ";
                                } else if (isSelected && !isAnswerCorrect) {
                                    buttonClass += "bg-red-600 text-white ";
                                } else {
                                    buttonClass += "bg-gray-600 text-white ";
                                }
                            } else {
                                buttonClass += isSelected
                                    ? "bg-blue-600 text-white "
                                    : "bg-gray-600 hover:bg-blue-600 text-white ";
                            }

                            return (
                                <button
                                    key={idx}
                                    onClick={() => handleTextClick(answer)}
                                    disabled={isSubmitted} // Disable buttons after submission
                                    className={buttonClass}
                                >
                                    {String.fromCharCode(65 + idx)}. {answer}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Persistent Submit Button */}
            <div className="w-full px-4 max-w-3xl mb-4">
                {!isSubmitted && (
                    <button
                        onClick={handleSubmit}
                        disabled={selectedAnswers.length === 0}
                        className={`w-full py-3 sm:py-4 rounded-lg text-white font-bold ${
                            selectedAnswers.length === 0
                                ? "bg-gray-500 cursor-not-allowed"
                                : "bg-orange-600 hover:bg-orange-700"
                        } transition-colors duration-200`}
                    >
                        Submit
                    </button>
                )}

                {isSubmitted && (
                    <button
                        onClick={handleContinue}
                        className="w-full py-3 sm:py-4 rounded-lg text-white font-bold bg-green-500 hover:bg-green-700 transition-colors duration-200"
                    >
                        Continue
                    </button>
                )}
            </div>
        </div>
    );
};

export default Questions;