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
    const [timeLeft, setTimeLeft] = useState("");

    useEffect(() => {
        const today = moment.tz(new Date(), "America/Phoenix").format("YYYY-MM-DD-HH");
        const key = `${today}-${id}`; // Construct the key using the current date and assessment ID.
        const pastAssessmentRaw = localStorage.getItem(key); // Retrieve the item from localStorage.

        if (pastAssessmentRaw) {
            const pastAssessment = JSON.parse(pastAssessmentRaw)
            setName(pastAssessment.name)
            setCorrectCount(pastAssessment.correctCount)
            setIncorrectCount(pastAssessment.incorrectCount)
        } else {
            navigate("/")
        }

        const calculateTimeLeft = () => {
            // Get the current time in UTC
            const now = new Date();

            // Convert the current UTC time to Arizona Time (UTC-7)
            const arizonaOffset = -7 * 60; // offset in minutes (UTC-7)
            const currentArizonaTime = new Date(
                now.getTime() + (now.getTimezoneOffset() * 60000) + (arizonaOffset * 60000)
            );

            // Calculate midnight in Arizona Time
            const nextMidnight = new Date(currentArizonaTime);
            nextMidnight.setHours(24, 0, 0, 0); // Set to midnight

            // Calculate the difference in milliseconds
            const diff = nextMidnight - currentArizonaTime;

            // Convert the difference into hours, minutes, and seconds
            const hoursLeft = Math.floor(diff / (1000 * 60 * 60));
            const minutesLeft = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const secondsLeft = Math.floor((diff % (1000 * 60)) / 1000);

            // Format the time left
            setTimeLeft(`${hoursLeft}h ${minutesLeft}m ${secondsLeft}s`);
        };

        // Calculate time left immediately and start an interval
        calculateTimeLeft();
        const interval = setInterval(calculateTimeLeft, 1000);

        // Clean up the interval on component unmount
        return () => clearInterval(interval);
    })

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
            <div className="bg-gray-800 text-white p-6 sm:p-8 rounded-lg shadow-lg max-w-md w-full">
                <h1 className="text-2xl font-bold mb-6 text-center">
                    {name ?? "..."}
                </h1>
                <div className="flex justify-between items-center text-center mb-6">
                    <div className="flex-1">
                        <p className="text-green-400 text-lg font-semibold">
                            Got: <span>{correctCount ?? 0}</span>
                        </p>
                    </div>
                    <div className="flex-1">
                        <p className="text-red-400 text-lg font-semibold">
                            Missed: <span>{incorrectCount ?? 0}</span>
                        </p>
                    </div>
                </div>
                {/* Countdown Timer Section */}
                <div className="mt-4">
                    <p className="text-yellow-400 text-center font-semibold">
                        <span><i className="fas fa-solid fa-rotate px-1"></i> {timeLeft}</span>
                    </p>
                </div>

                {/* Back to Home Button */}
                <div className="mt-6 flex justify-center">
                    <button
                        className="hover:text-gray-400 text-white font-semibold py-2 px-4 rounded flex items-center"
                        onClick={() => navigate("/")}
                    >
                        <i className="fas fa-sharp fa-solid fa-home mr-2"></i>
                    </button>
                </div>

            </div>
        </div>
    );
};

export default Scoreboard;