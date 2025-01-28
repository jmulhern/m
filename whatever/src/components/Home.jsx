import React from "react";

const Home = () => {
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
                        src="https://cdn2.thecatapi.com/images/MTY3ODIyMQ.jpg"
                        alt="A cute cat"
                        className="rounded-lg shadow-lg"
                    />
                </div>
            </div>

            {/* Features Section */}
            <section className="bg-gray-900 text-gray-200 py-12">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-8">Features</h2>
                    {/* Features Columns */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Column 1 */}
                        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                            <h3 className="text-xl font-bold text-teal-400 mb-4">
                                Feature 1
                            </h3>
                            <p className="text-gray-300">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                Pellentesque ac libero sit amet eros ultrices sagittis.
                                Maecenas in libero eget lorem tristique pretium sed a metus.
                                Nunc convallis nisi vitae ex vehicula, at consequat velit
                                tristique.
                            </p>
                        </div>
                        {/* Column 2 */}
                        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                            <h3 className="text-xl font-bold text-teal-400 mb-4">
                                Feature 2
                            </h3>
                            <p className="text-gray-300">
                                Fusce nec augue malesuada, malesuada odio in, ornare magna.
                                Curabitur euismod risus ut nisl pharetra, nec varius orci
                                facilisis. Donec pharetra ultrices risus, non pulvinar magna.
                                Suspendisse potenti.
                            </p>
                        </div>
                        {/* Column 3 */}
                        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                            <h3 className="text-xl font-bold text-teal-400 mb-4">
                                Feature 3
                            </h3>
                            <p className="text-gray-300">
                                Quisque vel nisi ut ante condimentum feugiat sed non lorem.
                                Nulla fringilla magna ac purus tincidunt, in molestie orci
                                mattis. Integer facilisis nulla vitae nisl fermentum
                                auctor. Aliquam sit amet suscipit nibh.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Cute Dog Section */}
            <section className="bg-gray-800 text-gray-200 py-12">
                <div className="container mx-auto px-4 flex flex-col items-center">
                    <h2 className="text-3xl font-bold text-center mb-8 text-teal-400">
                        Meet Our Mascot!
                    </h2>
                    <img
                        src="https://images.dog.ceo/breeds/shiba/shiba-11.jpg" /* Hardcoded URL to a cute dog image */
                        alt="A really cute dog"
                        className="rounded-lg shadow-lg"
                    />
                    <p className="text-gray-300 text-center mt-4 max-w-2xl">
                        Isn't this the most adorable dog you've ever seen? This fluffy
                        companion is here to bring smiles and bark out the good word about
                        our amazing features!
                    </p>
                </div>
            </section>
        </div>
    );
};

export default Home;