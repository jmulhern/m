import React, { useState, useEffect } from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import moment from "moment-timezone";

const Scoreboard = () => {
    const location = useLocation(); // Access location object
    const navigate = useNavigate();

    const { id } = useParams();// For navigation
    const [name, setName] = useState("");
    const [correctCount, setCorrectCount] = useState(0);
    const [incorrectCount, setIncorrectCount] = useState(0);
    const [answeredQuestions, setAnsweredQuestions] = useState([]);
    const [timeLeft, setTimeLeft] = useState("");

    useEffect(() => {
        // Helper: Calculate remaining time
        const calculateTimeLeft = () => {
            const now = new Date();
            const arizonaOffset = -7 * 60;
            const currentArizonaTime = new Date(
                now.getTime() + now.getTimezoneOffset() * 60000 + arizonaOffset * 60000
            );

            const nextDay = new Date(currentArizonaTime);
            nextDay.setHours(0, 0, 0, 0);
            nextDay.setDate(currentArizonaTime.getDate() + 1);
            const diff = nextDay - currentArizonaTime;


            const hoursLeft = Math.floor(diff / (1000 * 60 * 60));
            const minutesLeft = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const secondsLeft = Math.floor((diff % (1000 * 60)) / 1000);

            setTimeLeft(`${hoursLeft > 0 ? hoursLeft + "h " : ""}${minutesLeft}m ${secondsLeft}s`);
        };

        // Load assessment and questions from localStorage
        const today = moment.tz(new Date(), "America/Phoenix").format("YYYY-MM-DD");
        const key = `${today}-${id}`;
        const pastAssessmentRaw = localStorage.getItem(key);

        if (pastAssessmentRaw) {
            const pastAssessment = JSON.parse(pastAssessmentRaw);

            // Set basic info
            setName(pastAssessment.name);
            setCorrectCount(pastAssessment.correctCount);
            setIncorrectCount(pastAssessment.incorrectCount);

            // Calculate questions
            const totalQuestions = pastAssessment.correctCount + pastAssessment.incorrectCount;
            const storedQuestions = []; // Collect data into an array first

            for (let index = 0; index <= totalQuestions; index++) {
                const questionKey = `${key}-${index}`;
                const questionData = localStorage.getItem(questionKey);

                if (questionData) {
                    storedQuestions.push(JSON.parse(questionData));
                }
            }
            // Update state once after the loop
            setAnsweredQuestions(storedQuestions);
        } else {
            // Navigate away if no data found
            navigate("/");
        }

        // Calculate the time left immediately
        calculateTimeLeft();
        const interval = setInterval(calculateTimeLeft, 1000); // Update every second

        // Cleanup interval on unmount
        return () => clearInterval(interval);
    }, [id, navigate]); // Depend on "id" and "navigate"

    return (
        <div className="flex flex-col items-center  bg-gray-900 p-4">

            {/* Floating Toolbar */}
            <header className="toolbar fixed top-0 left-0 w-full bg-gray-800 text-white shadow-md z-10">
                <div className="container mx-auto p-4 flex justify-between items-center">
                    {/* Left - Correct and Incorrect Counts */}
                    <div>
                        <button
                            onClick={() => navigate("/")}
                            className="text-gray-300 hover:text-gray-400 focus:outline-none"
                        >
                            <i className="invisible fa-solid fa-home text-2xl mr-2"></i>
                        </button>
                    </div>


                    {/* Right: Icon */}
                    <div>
                        <button
                            onClick={() => navigate("/")}
                            className="text-gray-300 hover:text-gray-400 focus:outline-none"
                        >
                            <i className="fa-solid fa-xmark text-2xl mr-2"></i>
                        </button>
                    </div>
                </div>
            </header>

            {/* New Correct/Incorrect Section */}
            <section className="w-full max-w-3xl mt-20">
                <div className="flex justify-between items-center bg-gray-800 rounded-md shadow-md p-6 w-full">
                    <div className="flex justify-center items-center space-x-2">
                        <h1 className="text-2xl font-bold text-gray-100 px-2">{name}</h1>
                    </div>
                    <div className="flex gap-8 mr-4">
                        {/* Correct Count */}
                        <div className="flex flex-col items-center text-green-500">
                            <i className="fa-solid fa-check text-2xl"></i>
                            <span className="text-base font-medium">{correctCount}</span>
                        </div>

                        {/* Incorrect Count */}
                        <div className="flex flex-col items-center text-red-500">
                            <i className="fa-solid fa-xmark text-2xl"></i>
                            <span className="text-base font-medium">{incorrectCount}</span>
                        </div>
                    </div>
                </div>
            </section>

            <main className="w-full max-w-3xl mt-6 mb-16">
                <div className="bg-gray-800 rounded-md shadow-md p-6 w-full max-w-4xl">
                    <ul className="divide-y divide-gray-700">
                        {answeredQuestions.map((question, index) => {
                            const isCorrect = question.isCorrect;

                            return (
                                <li
                                    key={index}
                                    className="bg-gray-800 text-white p-4 sm:p-6 rounded-lg transition-colors duration-300"
                                >
                                    <div className="grid grid-cols-[auto,1fr] gap-4">
                                        {/* Status Icon Column */}
                                        <div className="flex items-start justify-center pt-1">
                                            {isCorrect ? (
                                                <i className="fas fa-check text-green-500"></i> // Green check icon
                                            ) : (
                                                <i className="fas fa-xmark text-red-500"></i> // Red xmark icon
                                            )}
                                        </div>

                                        {/* Question and Answer Column */}
                                        <div>
                                            {/* Question */}
                                            <p className="font-bold mb-2">Question:</p>
                                            <p className="text-gray-300 mb-4">{question.question}</p>

                                            {/* Answers */}
                                            {/* User's Answer */}
                                            <p className="font-bold text-gray-400 mb-1">Your Answer:</p>
                                            <p
                                                className={`font-semibold ${
                                                    isCorrect ? "text-green-500" : "text-red-500"
                                                }`}
                                            >
                                                {question.chosenAnswers.join(", ")}
                                            </p>

                                            {/* Correct Answer */}
                                            <p className="font-bold text-gray-400 mt-4 mb-1">Correct Answer:</p>
                                            <p className="text-gray-300">{question.correctAnswers.join(", ")}</p>
                                        </div>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>

                </div>
            </main>

        </div>
    );
};

export default Scoreboard;