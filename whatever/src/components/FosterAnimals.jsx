import React, { useEffect, useState } from "react";


const FosterAnimals = () => {

    const [fosterAnimals, setFosterAnimals] = useState([]);
    useEffect(() => {
        const fetchFosterAnimals = async () => {
            try {
                const response = await fetch("/api/foster_animals"); // Fetch data from API
                if (!response.ok) {
                    console.log(`Failed to fetch data: ${response.statusText}`);
                }
                const data = await response.json();
                setFosterAnimals(data);
            } catch (err) {
                // Handle errors
                console.log(err.message);
            }
        };

        fetchFosterAnimals();
    }, []);

    return (
        <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-teal-400">
                Fosters
            </h2>
            {fosterAnimals.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Render placeholder cards */}
                    {fosterAnimals.map((fosterAnimal) => (
                        <div
                            key={fosterAnimal.id}
                            className="bg-gray-800 rounded-lg shadow-lg overflow-hidden flex flex-col items-center text-center p-6"
                        >
                            {/* Image */}
                            <img
                                src={fosterAnimal.image}
                                alt={`Placeholder ${fosterAnimal.id}`}
                                className="rounded-lg mb-6"
                            />

                            {/* Text */}
                            <p className="text-gray-300 text-sm">{fosterAnimal.text}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p>Nothing sorry.</p> // Handle case when the list is empty
            )}
        </div>
    );
};

export default FosterAnimals;