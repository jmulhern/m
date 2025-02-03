import React, { useEffect, useState } from "react";


const Pets = () => {

    const [pets, setPets] = useState([]);
    useEffect(() => {
        const fetchPets = async () => {
            try {
                const response = await fetch("/api/pets"); // Fetch data from API
                if (!response.ok) {
                    console.log(`Failed to fetch data: ${response.statusText}`);
                }
                const data = await response.json();
                setPets(data);
            } catch (err) {
                // Handle errors
                console.log(err.message);
            }
        };

        fetchPets();
    }, []);

    return (
        <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-teal-400">
                Pets
            </h2>
            {pets.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Render placeholder cards */}
                    {pets.map((pet) => (
                        <div
                            key={pet.id}
                            className="bg-gray-800 rounded-lg shadow-lg overflow-hidden flex flex-col items-center text-center p-6"
                        >
                            {/* Image */}
                            <img
                                src={pet.image}
                                alt={`Placeholder ${pet.id}`}
                                className="rounded-lg mb-6"
                            />

                            {/* Text */}
                            <p className="text-gray-300 text-sm">{pet.text}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p>Nothing sorry.</p> // Handle case when the list is empty
            )}
        </div>
    );
};

export default Pets;