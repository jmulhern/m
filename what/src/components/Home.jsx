import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment-timezone";
import OverallDetails from "./OverallDetails";

const Home = () => {
    const [assessments, setAssessments] = useState([]);
    const [filteredAssessments, setFilteredAssessments] = useState([]);
    const [searchQuery, setSearchQuery] = useState(""); // State for search query
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [timeLeft, setTimeLeft] = useState("");

    const navigate = useNavigate();
    const today = moment.tz(new Date(), "America/Phoenix").format("YYYY-MM-DD");

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

        const nextDay = new Date(currentArizonaTime);
        nextDay.setHours(0, 0, 0, 0);
        nextDay.setDate(currentArizonaTime.getDate() + 1);
        const diff = nextDay - currentArizonaTime;

        const hoursLeft = Math.floor(diff / (1000 * 60 * 60));
        const minutesLeft = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const secondsLeft = Math.floor((diff % (1000 * 60)) / 1000);

        setTimeLeft(`${hoursLeft > 0 ? hoursLeft + "h " : ""}${minutesLeft}m ${secondsLeft}s`);
    };

    const handleNavigation = (id) => {
        const localStorageKey = `${today}-${id}`;
        const existingData = localStorage.getItem(localStorageKey);
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
                <p>Loading...</p>
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
        <div className="flex flex-col items-center bg-gray-900 pt-4 px-4">

            {/* Floating Toolbar */}
            <header className="toolbar fixed top-0 left-0 w-full bg-gray-800 text-white shadow-md z-10">
                <div className="container mx-auto p-4 flex justify-between items-center">
                    {/* Left: Title */}
                    <h1 className="text-2xl font-bold text-gray-100">What?</h1>
                    {/* Right: Timer */}
                    <OverallDetails timeLeft={timeLeft} />
                </div>
            </header>

            {/* Assessments Section */}
            <main className="w-full max-w-3xl mt-20 flex flex-col items-center">

                {/* Search Bar */}
                <div className="w-full max-w-3xl mb-6">
                    <div className="flex items-center bg-gray-700 rounded-md border border-gray-600 p-2">
                        {/* Search Icon */}
                        <div className="p-2">
                            <i className="fas fa-search text-gray-400"></i>
                        </div>
                        {/* Search Input Field */}
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)} // Update search query on input
                            className="w-full px-2 py-1 bg-gray-700 text-gray-200 rounded-md focus:outline-none"
                            placeholder="Search..."
                        />
                    </div>
                </div>

                {/* Assessments List */}
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
                                    className="grid grid-cols-[auto_1fr_auto] py-4 gap-6 items-center cursor-pointer transition duration-200 px-4 text-gray-300 hover:text-yellow-500"
                                    onClick={() => handleNavigation(assessment.id)}
                                >
                                    {/* Column 1: Gem Icon with Number 0 (Shrink Width, Center Text) */}
                                    <div className="flex flex-col items-center w-min">
                                        <div className="text-center">
                                            {/* Dynamically set the gem icon color */}
                                            <i
                                                className={`fas text-lg ${
                                                    (() => {
                                                        const storedData = localStorage.getItem(assessment.id); // Fetch data from localStorage using assessment.id
                                                        if (storedData) {
                                                            const parsedData = JSON.parse(storedData);
                                                            if (parsedData.perfects && parsedData.perfects > 0) {
                                                                return "fa-gem text-blue-500 "
                                                            } else if (parsedData.goods && parsedData.goods > 0) {
                                                                return "fa-solid fa-thumbs-up text-green-500 "
                                                            } else if (parsedData.total && parsedData.total > 0) {
                                                                return "fa-duotone fa-solid fa-user-alien text-green-500 "
                                                            } else {
                                                                return "fa-solid fa-question text-gray-500 " 
                                                            }
                                                        } else {
                                                            return "fa-solid fa-question text-gray-500 "    
                                                        }
                                                    })()
                                                }`}
                                            ></i>
                                        </div>
                                    </div>

                                    {/* Column 2: Assessment Name (Left Justified) */}
                                    <div className="text-left">
                                        <span className="text-lg font-medium transition duration-200">
                                            {assessment.name}
                                        </span>
                                    </div>

                                    {/* Column 3: Start Icon or Correct/Incorrect Counts (Right Justified) */}
                                    <div className="flex justify-end">
                                        {storedData ? (
                                            <div className="flex space-x-4">
                                                <div className="text-center">
                                                    <i className="fas fa-check text-green-500 text-lg"></i>
                                                    <div className="text-sm text-green-500">{correctCount}</div>
                                                </div>
                                                <div className="text-center">
                                                    <i className="fas fa-times text-red-500 text-lg"></i>
                                                    <div className="text-sm text-red-500">{incorrectCount}</div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="text-center">
                                                <i className="fa-solid fa-rocket-launch text-lg"></i>
                                            </div>
                                        )}
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                    {filteredAssessments.length === 0 && (
                        <p className="text-center text-gray-500 mt-6">
                            Didn't find nothing...
                        </p>
                    )}
                </div>
            </main>
        </div>
    );
};

export default Home;