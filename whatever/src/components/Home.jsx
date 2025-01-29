import React, { useEffect, useState } from "react";


const Home = () => {

    const [fosterAnimals, setFosterAnimals] = useState([]);
    useEffect(() => {
        const fetchFosterAnimals = async () => {
            try {
                const response = await fetch("/api/foster_animals"); // Fetch data from API
                if (!response.ok) {
                    throw new Error(`Failed to fetch data: ${response.statusText}`);
                }
                const data = await response.json();
                setFosterAnimals(data);
                setLoading(false);
            } catch (err) {
                // Handle errors
                setError(err.message);
                setLoading(false);
            }
        };

        fetchFosterAnimals();
    }, []);

    return (
        <div>
            {/* Navbar */}
            <nav className="bg-gray-900 text-gray-200 fixed top-0 left-0 w-full z-50">
                <div className="container mx-auto px-4 py-3 flex justify-center">
                    {/* Title */}
                    <h1 className="text-2xl font-bold">Whatever</h1>
                </div>
            </nav>

            {/* Main Content */}
            <div className="pt-16 flex items-center justify-center h-screen bg-gray-800 text-gray-200">
                {/* Card Container */}
                <div className="bg-gray-900 text-gray-200 rounded-lg shadow-xl p-8 max-w-lg text-center">
                    <h1 className="text-5xl font-extrabold mb-4 text-teal-400">
                        Hello.
                    </h1>
                    <p className="text-lg font-medium mb-6 text-gray-300">
                        Yes, can I help you?
                    </p>
                    <img
                        src="public/clarice.webp"
                        alt="A cute cat"
                        className="rounded-lg shadow-lg"
                    />
                </div>
            </div>

            {/* Placeholder Card Section */}
            <section className="bg-gray-900 text-gray-200 py-12">
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
            </section>
        </div>
    );
};

export default Home;