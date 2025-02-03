import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const One = () => {
    const navigate = useNavigate();
    const [question, setQuestion] = useState(""); // Stores the question text
    const [possibleAnswers, setPossibleAnswers] = useState([]); // Stores the array of possible answers
    const [answer, setAnswer] = useState(""); // Stores the array of possible answers
    const [loading, setLoading] = useState(true); // Tracks loading state

    // Fetch riddle data from the API
    useEffect(() => {
        const fetchRiddle = async () => {
            try {
                const response = await fetch("/api/riddles"); // Call `/api/riddles`
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json(); // Parse the response as JSON
                setQuestion(data.question);
                setPossibleAnswers(data["possible_answers"]);
                setAnswer(data["answer"]);

                setLoading(false);
            } catch (error) {
                console.error("Error fetching riddle:", error);
                setLoading(false); // Clear loading state, even on error
            }
        };

        fetchRiddle();
    }, []);

    // Handle click on a possible answer
    const handleTextClick = (chosenAnswer) => {
        if (chosenAnswer.toLowerCase() === answer.toLowerCase()) {
            navigate("/two");
        } else {
            navigate("/gameover");
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
        <div className="flex flex-col items-center justify-center h-screen bg-gray-900">
            <h1 className="text-white text-2xl font-bold mb-8">
                {question || "Click on the correct answer."}
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
                {possibleAnswers.map((possibleAnswer, index) => (
                    <div
                        key={index}
                        className={`text-white cursor-pointer hover:underline`}
                        onClick={() => handleTextClick(possibleAnswer)}
                    >
                        {possibleAnswer}
                    </div>
                ))}
            </div>

            <a
                href="/"
                target="_self"
                rel="noopener noreferrer"
                className="text-white font-bold underline"
            >
                bye
            </a>
        </div>
    );
};

export default One;