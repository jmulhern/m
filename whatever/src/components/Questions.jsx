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
    };

    // Handle reset of the quiz
    const handleReset = () => {
        setCurrentQuestionIndex(0);
        setSelectedAnswers([]);
        setAnswerStatus({});
        setIsSubmitted(false);
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
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 pt-4 px-4">
            <div className="w-full max-w-3xl">
                {/* Current Question Card */}
                <div
                    className={`mb-8 bg-gray-800 p-6 rounded-lg shadow-lg border transition-colors duration-300 ${
                        isSubmitted
                            ? answerStatus.isCorrect
                                ? "border-green-500"
                                : "border-red-500"
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
                        {currentQuestion.possible_answers.map((answer, idx) => {
                            const isSelected = selectedAnswers.includes(answer);
                            let buttonClass =
                                "w-full text-left font-medium py-3 px-4 rounded transition duration-200 ";

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

                {/* Action Buttons */}
                <div className="flex justify-start m-6 w-full max-w-3xl space-x-4">
                    {/* Submit Button - Visible when at least one answer is selected and not yet submitted */}
                    {!isSubmitted && selectedAnswers.length > 0 && (
                        <button
                            onClick={handleSubmit}
                            className="text-white text-lg font-bold bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded"
                        >
                            Submit
                        </button>
                    )}

                    {/* Continue Button - Visible after submission */}
                    {isSubmitted && (
                        <button
                            onClick={handleContinue}
                            className="text-white text-lg font-bold bg-green-500 hover:bg-green-700 py-2 px-4 rounded"
                        >
                            Continue
                        </button>
                    )}

                    {/* Reset Button - Always Visible */}
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