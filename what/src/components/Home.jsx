import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment-timezone";

const Home = () => {
    const [assessments, setAssessments] = useState([]);
    const [filteredAssessments, setFilteredAssessments] = useState([]);
    const [searchQuery, setSearchQuery] = useState(""); // State for search query
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [timeLeft, setTimeLeft] = useState("");

    const navigate = useNavigate();
    const today = moment.tz(new Date(), "America/Phoenix").format("YYYY-MM-DD-HH");

    useEffect(() => {
        const fetchAssessments = async () => {
            try {
                const response = await fetch("/api/assessments");
                if (!response.ok) {
                    throw new Error(`HTTP error: ${response.status}`);
                }
                const data = await response.json();
                setAssessments(data);
                setFilteredAssessments(data); // Initialize filtered list
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchAssessments();

        calculateTimeLeft();
        const interval = setInterval(calculateTimeLeft, 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        // Filter assessments whenever the search query changes
        setFilteredAssessments(
            assessments.filter((assessment) =>
                assessment.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
        );
    }, [searchQuery, assessments]);

    const calculateTimeLeft = () => {
        const now = new Date();
        const arizonaOffset = -7 * 60;
        const currentArizonaTime = new Date(
            now.getTime() + now.getTimezoneOffset() * 60000 + arizonaOffset * 60000
        );

        const nextHour = new Date(currentArizonaTime);
        nextHour.setMinutes(0, 0, 0);
        nextHour.setHours(currentArizonaTime.getHours() + 1);

        const diff = nextHour - currentArizonaTime;

        const hoursLeft = Math.floor(diff / (1000 * 60 * 60));
        const minutesLeft = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const secondsLeft = Math.floor((diff % (1000 * 60)) / 1000);

        setTimeLeft(`${hoursLeft > 0 ? hoursLeft + "h " : ""}${minutesLeft}m ${secondsLeft}s`);
    };

    const handleNavigation = (id) => {
        const localStorageKey = `${today}-${id}`;
        const existingData = localStorage.getItem(localStorageKey);

        console.log(existingData);
        if (existingData === null) {
            navigate(`/w/${id}`);
        } else {
            navigate(`/w/${id}/scoreboard`, {
                state: {
                    name: existingData.name,    // Assessment Name
                    correctCount: existingData.correctCount,
                    incorrectCount: existingData.incorrectCount,
                },
            });
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
                <p>Loading assessments...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
                <p>Error: {error}</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center  bg-gray-900 pt-4 px-4">

        {/* Floating Toolbar */}
            <header className="toolbar fixed top-0 left-0 w-full bg-gray-800 text-white shadow-md z-10">
                <div className="container mx-auto p-4 flex justify-between items-center">
                {/* Left: Title */}
                    <h1 className="text-2xl font-bold text-gray-100">What?</h1>

                    {/* Center: Search Bar */}
                    <div className="flex-1 mx-6">
                        <input
                            type="text"
                            placeholder="You know what to do..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)} // Update search query on input
                            className="w-full p-2 bg-gray-700 text-gray-200 placeholder-gray-400 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                        />
                    </div>

                    {/* Right: Icon */}
                    <div>
                        <p className="text-yellow-400 font-semibold text-center">
                            <i className="fas fa-clock px-1"></i> {timeLeft}
                        </p>
                    </div>
                </div>
            </header>

            {/* Assessments List */}
            <main className="w-full max-w-3xl mt-20">
                <div className="bg-gray-800 rounded-md shadow-md p-6 w-full max-w-4xl">
                    <ul className="divide-y divide-gray-700">
                        {filteredAssessments.map((assessment) => {
                            const localStorageKey = `${today}-${assessment.id}`;
                            const storedData = localStorage.getItem(localStorageKey);

                            let correctCount = 0;
                            let incorrectCount = 0;

                            if (storedData !== null) {
                                const parsedData = JSON.parse(storedData);
                                correctCount = parsedData.correctCount || 0;
                                incorrectCount = parsedData.incorrectCount || 0;
                            }

                            return (
                                <li
                                    key={assessment.id}
                                    className="grid grid-cols-[auto_auto_1fr] py-4 gap-6 items-center  cursor-pointer transition duration-200 px-4"
                                    onClick={() => handleNavigation(assessment.id)}
                                >
                                    {/* Column 1: Scores */}
                                    <div className="flex items-center justify-center space-x-2">
                                        {storedData ? (
                                            <>
                                                <div className="text-center">
                                                    <i className="fas fa-check text-green-500 text-lg"></i>
                                                    <div className="text-sm text-green-500">
                                                        {correctCount}
                                                    </div>
                                                </div>
                                                <div className="text-center">
                                                    <i className="fas fa-xmark text-red-500 text-lg"></i>
                                                    <div className="text-sm text-red-500">
                                                        {incorrectCount}
                                                    </div>
                                                </div>
                                            </>
                                        ) : (
                                            <i className={`${assessment.icon} text-gray-300 text-2xl`}></i>
                                        )}
                                    </div>

                                    {/* Column 3: Assessment Name */}
                                    <div>
                                        <span className="text-lg font-medium text-gray-300 hover:text-yellow-500 transition duration-200">
                                            {assessment.name}
                                        </span>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                    {filteredAssessments.length === 0 && (
                        <p className="text-center text-gray-500 mt-6">
                            No assessments match your search.
                        </p>
                    )}
                </div>
            </main>
        </div>
    );
};

export default Home;