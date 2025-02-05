import React, { useState, useEffect } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const TierList = ({id, name}) => {
    const navigate = useNavigate();

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
                        <th className="px-2 py-2 border border-gray-600"></th>
                    </tr>
                    </thead>
                    <tbody>
                    {tierData.map((tier) => (
                        <tr key={tier} className={tierColor[tier.name]}>
                            <td className="px-2 py-2">{tier.name}</td>
                            <td className="px-2 py-2">
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
                                    {tier.items.map((itemName) => (
                                        <div
                                            key={itemName}
                                            className="relative flex flex-col"
                                        >
                                            {itemName}
                                        </div>
                                    ))}
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <button
                onClick={() => navigate("/slay-the-spire")}
                className="mt-6 text-white text-6xl font-bold hover:text-gray-900"
            >
                .
            </button>
        </div>
    );
};

export default TierList;