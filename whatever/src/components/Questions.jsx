import React, { useEffect, useState, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react"; // Import Dialog and Transition from Headless UI
import Spinner from "./Spinner"; // Adjust the path based on your file structure

const Questions = () => {
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]); // Stores the question data
    const [loading, setLoading] = useState(true); // Tracks loading state
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Tracks current question
    const [selectedAnswers, setSelectedAnswers] = useState([]); // Tracks selected answers
    const [answerStatus, setAnswerStatus] = useState({}); // Tracks submission status
    const [isSubmitted, setIsSubmitted] = useState(false); // Tracks if the user has submitted answers

    // New state variables for tracking correct and incorrect counts
    const [correctCount, setCorrectCount] = useState(0);
    const [incorrectCount, setIncorrectCount] = useState(0);

    // New state to store incorrect answers for the current question
    const [incorrectAnswers, setIncorrectAnswers] = useState([]);

    // State variables for the explanation modal
    const [showModal, setShowModal] = useState(false); // Controls modal visibility
    const [explanation, setExplanation] = useState(""); // Stores the explanation text
    const [loadingExplain, setLoadingExplain] = useState(false); // Add this line with other useState hooks

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

            // Store incorrect answers for the current question
            const incorrect = selectedAnswers.filter(
                (ans) => !currentQuestion.correct_answers.includes(ans)
            );
            setIncorrectAnswers(incorrect);
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
        setIncorrectAnswers([]);
        setShowModal(false); // Close the modal if open
        setExplanation("");
    };

    // Function to handle the "Explain" button click
    const handleExplain = async () => {
        setLoadingExplain(true); // Start loading
        const payload = {
            question: currentQuestion.question,
            correct_answers: currentQuestion.correct_answers,
            incorrect_answers: incorrectAnswers,
        };

        try {
            const response = await fetch("/api/explain", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json(); // Parse the response as JSON

            // Assuming the API returns an 'explanation' field
            setExplanation(data.explanation);
            setShowModal(true); // Open the modal
        } catch (error) {
            console.error("Error fetching explanation:", error);
            alert("Failed to fetch explanation. Please try again.");
        } finally {
            setLoadingExplain(false); // End loading
        }
    };

    // Function to close the modal
    const handleCloseModal = () => {
        setShowModal(false);
        setExplanation("");
    };

    // Handle continue to next question
    const handleContinue = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedAnswers([]);
            setAnswerStatus({});
            setIsSubmitted(false);
            setIncorrectAnswers([]); // Reset incorrect answers for the next question
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
                                    : "bg-gray-600 text-white ";
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
                    <div className="flex space-x-4">
                        <button
                            onClick={handleContinue}
                            className="flex-1 py-3 sm:py-4 rounded-lg text-white font-bold bg-green-500 hover:bg-green-700 transition-colors duration-200"
                        >
                            Continue
                        </button>
                        {!answerStatus.isCorrect && (
                            <button
                                onClick={handleExplain}
                                disabled={loadingExplain} // Disable button when loading
                                className={`flex-1 py-3 sm:py-4 rounded-lg text-white font-bold bg-blue-500 hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center ${
                                    loadingExplain ? "cursor-not-allowed opacity-70" : ""
                                }`}
                            >
                                {loadingExplain ? (
                                    <>
                                        <Spinner />
                                        Loading...
                                    </>
                                ) : (
                                    "Explain"
                                )}
                            </button>
                        )}
                    </div>
                )}
            </div>

            {/* Explanation Modal */}
            <Transition appear show={showModal} as={Fragment}>
                <Dialog as="div" className="fixed inset-0 z-20 overflow-y-auto" onClose={handleCloseModal}>
                    <div className="min-h-screen px-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-30" />
                        </Transition.Child>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span className="inline-block h-screen align-middle" aria-hidden="true">
                            &#8203;
                        </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-gray-800 shadow-xl rounded-lg">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-white mb-4"
                                >
                                    Explanation
                                </Dialog.Title>
                                <div className="mt-2">
                                    {explanation ? (
                                        <p className="text-gray-200">{explanation}</p>
                                    ) : (
                                        <p className="text-gray-200">No explanation available.</p>
                                    )}
                                </div>

                                <div className="mt-4">
                                    <button
                                        type="button"
                                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                        onClick={handleCloseModal}
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
};

export default Questions;