import React from "react";

const Home = () => {
    const fosterAnimals = [
        {
            id: 1,
            image: "public/koi.webp",
            text: "Koi",
        },
        {
            id: 2,
            image: "public/casper.webp",
            text: "Casper",
        },
        {
            id: 3,
            image: "public/tessa.webp",
            text: "Tessa",
        },
        {
            id: 4,
            image: "public/peaches.webp",
            text: "Peaches",
        },
        {
            id: 5,
            image: "public/luna-w.webp",
            text: "Luna W",
        },
        {
            id: 6,
            image: "public/captain-lee-and-ruby.webp",
            text: "Captain Lee & Ruby",
        },
        {
            id: 7,
            image: "public/ollie.webp",
            text: "Ollie",
        },
        {
            id: 8,
            image: "public/missy.webp",
            text: "Missy",
        },
        {
            id: 9,
            image: "public/meg-and-toofers.webp",
            text: "Meg & Toofers",
        },
        {
            id: 10,
            image: "public/chuck.webp",
            text: "Chuck",
        },
        {
            id: 11,
            image: "public/puppers.webp",
            text: "Puppers",
        },
        {
            id: 12,
            image: "public/teefs.webp",
            text: "Teefs",
        },
        {
            id: 13,
            image: "public/milo-and-luna.webp",
            text: "Milo & Luna",
        },
        {
            id: 13,
            image: "public/dim-sum-and-chopstix.webp",
            text: "Dim Sum & Chopstix",
        },
    ];

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

                    {/* Card Grid */}
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
                </div>
            </section>
        </div>
    );
};

export default Home;