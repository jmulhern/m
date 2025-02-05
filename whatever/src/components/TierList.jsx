import React, { useState, useEffect } from "react";
import axios from "axios";

const TierList = ({id, name}) => {
    const tierColor = {
        S: "bg-blue-500",
        A: "bg-red-500",
        B: "bg-orange-500",
        C: "bg-yellow-500",
        D: "bg-green-500",
        F: "bg-gray-500"
    };

    const [tierData, setTierData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchTierData = async () => {
            try {
                const response = await axios.get(`api/slay_the_spire/${id}`);
                setTierData(response.data); // Assuming the API returns the tier data in the expected format
                setLoading(false);
            } catch (err) {
                console.error("Failed to fetch tier data:", err);
                setError(true);
                setLoading(false);
            }
        };

        fetchTierData();
    }, []);

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
                <p>Failed to load data. Please try again later.</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center p-6 bg-gray-900 text-white">
            <h1 className="text-3xl font-bold mb-6">
                {name}
            </h1>

            <div className="overflow-auto w-full max-w-screen-lg">
                <table className="table-auto border-collapse text-left w-full">
                    <thead className="bg-gray-700 text-gray-300">
                    <tr>
                        <th className="px-2 py-2 border border-gray-600">Tier</th>
                        <th className="px-2 py-2 border border-gray-600">Cards</th>
                    </tr>
                    </thead>
                    <tbody>
                    {tierData.map((row, index) => (
                        <tr key={index} className={tierColor[row.name]}>
                            <td className="px-2 py-2">{row.name}</td>
                            <td className="px-2 py-2">
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
                                    {row.cards.map((cardName, cardIndex) => (
                                        <div
                                            key={cardIndex}
                                            className="relative flex flex-col"
                                        >
                                            {cardName}
                                        </div>
                                    ))}
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <a
                href="/slay-the-spire"
                target="_self"
                rel="noopener noreferrer"
                className="mt-8  text-white font-bold underline"
            >
                back
            </a>
        </div>
    );
};

export default TierList;