import React, { useEffect, useState, Fragment } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Dialog, Transition } from "@headlessui/react"; // Import Dialog and Transition from Headless UI
import Spinner from "./Spinner"; // Adjust the path based on your file structure
import Toolbar from "./Toolbar";
import moment from "moment-timezone"; // Import the Toolbar component

const Assessments = () => {
    const { id } = useParams();
    const today = moment.tz(new Date(), "America/Phoenix").format("YYYY-MM-DD");

    const navigate = useNavigate();
    const [assessmentName, setAssessmentName] = useState("");
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
                const response = await fetch(`/api/assessments/${id}`); // Call API endpoint
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json(); // Parse the response as JSON

                // Rename 'answer' to 'correct_answers' and ensure it's always an array
                const processedData = data["questions"].map((question) => ({
                    ...question,
                    correct_answers: Array.isArray(question.correct_answers)
                        ? question.correct_answers
                        : [question.correct_answers],
                }));
                setAssessmentName(data["name"])
                setQuestions(processedData); // Set processed assessments
                setLoading(false);
            } catch (error) {
                console.error("Error fetching assessments:", error);
                setLoading(false); // Clear loading state, even on error
            }
        };

        fetchQuestions();
    }, []);

    const handleTextClick = (chosenAnswer) => {
        if (isSubmitted) return; // Prevent changes after submission

        const maxSelectableAnswers = currentQuestion.correct_answers.length; // Determine the max answers allowed

        if (selectedAnswers.includes(chosenAnswer)) {
            // Deselect the answer
            setSelectedAnswers(selectedAnswers.filter((answer) => answer !== chosenAnswer));
        } else if (maxSelectableAnswers === 1) {
            // If only one answer allowed, replace the existing selection with the new one
            setSelectedAnswers([chosenAnswer]);
        } else {
            // Otherwise, add the new answer only if we haven't reached the limit
            if (selectedAnswers.length < maxSelectableAnswers) {
                setSelectedAnswers([...selectedAnswers, chosenAnswer]);
            }
        }
    };

    // Handle submit of selected answers
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

            // Save incorrect answers for the current question (if needed)
            const incorrect = selectedAnswers.filter(
                (ans) => !currentQuestion.correct_answers.includes(ans)
            );
            setIncorrectAnswers(incorrect);
        }

        // Save the question info to localStorage
        const storageKey = `${today}-${id}-${currentQuestionIndex + 1}`; // Unique key for this question
        const questionData = {
            question: currentQuestion.question,           // Question text
            correctAnswers: currentQuestion.correct_answers, // Correct answers array
            chosenAnswers: selectedAnswers,              // Selected answers array
            isCorrect,                                   // Boolean indicating correctness
        };

        try {
            localStorage.setItem(storageKey, JSON.stringify(questionData)); // Save to localStorage
        } catch (err) {
            console.error("Error saving to localStorage: ", err); // Log any issues
        }
    };
    // Function to handle the "Explain" button click
    const handleExplain = async () => {
        setLoadingExplain(true); // Start loading
        const payload = {
            question: currentQuestion.question,
            correct_answers: currentQuestion.correct_answers,
            chosen_answers: incorrectAnswers,
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

    // Handle continue to next question
    const handleDone = () => {
        const today = moment.tz(new Date(), "America/Phoenix").format("YYYY-MM-DD");
        const key = `${today}-${id}`;

        localStorage.setItem(key, JSON.stringify({name: assessmentName, correctCount: correctCount, incorrectCount: incorrectCount}));
        navigate(`/w/${id}/scoreboard`);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-900">
                <h1 className="text-white text-2xl">Loading...</h1>
            </div>
        );
    }

    // Guard against empty assessments array
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
        <div className="flex flex-col items-center  bg-gray-900 p-4">
        {/* Use Toolbar Component */}
            <Toolbar
                assessmentName={assessmentName}
                navigate={navigate}
                currentQuestionIndex={currentQuestionIndex}
                totalQuestions={questions.length}
                correctCount={correctCount}
                incorrectCount={incorrectCount}
            />

            <div className="w-full max-w-3xl mt-20">
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
                    <div className="space-y-2">
                        {currentQuestion.possible_answers.map((answer) => {
                            const isSelected = selectedAnswers.includes(answer);
                            const isAnswerCorrect = currentQuestion.correct_answers.includes(answer);
                            let buttonClass =
                                "w-full text-left font-medium py-2 sm:py-3 px-3 sm:px-4 rounded transition duration-200 flex items-center gap-2 ";

                            if (isSubmitted) {
                                if (isAnswerCorrect) {
                                    buttonClass += "text-green-400 ";
                                } else if (isSelected && !isAnswerCorrect) {
                                    buttonClass += "text-red-400 ";
                                } else {
                                    buttonClass += "text-gray-600 ";
                                }
                            } else {
                                buttonClass += isSelected
                                    ? "bg-blue-600 text-white "
                                    : "bg-gray-600 text-white ";
                            }

                            return (
                                <button
                                    key={answer} // Use "answer" instead of index for a unique key
                                    onClick={() => handleTextClick(answer)}
                                    disabled={isSubmitted} // Disable buttons after submission
                                    className={buttonClass}
                                >
                                    {/* Conditionally render icons */}
                                    {isSubmitted && (
                                        isAnswerCorrect ? (
                                            <i className="fas fa-check text-green-400"></i>
                                        ) : isSelected && !isAnswerCorrect ? (
                                            <i className="fas fa-times text-red-400"></i>
                                        ) : null
                                    )}

                                    {/* Render the answer */}
                                    <span>
                            {String.fromCharCode(65 + currentQuestion.possible_answers.indexOf(answer))}. {answer}
                        </span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Persistent Submit or Navigation Buttons */}
            <div className="w-full px-4 max-w-3xl mb-6">
                {!isSubmitted && (
                    <button
                        onClick={handleSubmit}
                        disabled={selectedAnswers.length === 0}
                        className={`w-full py-3 sm:py-4 rounded-lg text-gray-200 font-bold ${
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
                        {/* Show "Done" button when on the last question */}
                        {currentQuestionIndex === questions.length - 1 ? (
                            <button
                                onClick={handleDone}
                                className="flex-1 py-3 sm:py-4 rounded-lg text-white font-bold bg-green-500 hover:bg-green-700 transition-colors duration-200"
                            >
                                Done
                            </button>
                        ) : (
                            <button
                                onClick={handleContinue} // Handle continue to the next question
                                className="flex-1 py-3 sm:py-4 rounded-lg text-white font-bold bg-green-500 hover:bg-green-700 transition-colors duration-200"
                            >
                                Continue
                            </button>
                        )}
                        {/* Optionally render Explain button if answer is incorrect */}
                        {!answerStatus.isCorrect && (
                            <button
                                onClick={handleExplain}
                                disabled={loadingExplain} // Disable button while loading
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

export default Assessments;