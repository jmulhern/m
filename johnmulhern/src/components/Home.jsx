import React from "react";
import Fosters from "./Fosters";
import Pets from "./Pets";


const Home = () => {
    return (
        <div>
            {/* Navbar */}
            <nav className="bg-gray-900 text-gray-200 fixed top-0 left-0 w-full z-50">
                <div className="container mx-auto px-4 py-3 flex justify-center">
                    {/* Title */}
                    <h1 className="text-2xl font-bold">Hello</h1>
                </div>
            </nav>

            <div className="pt-16 flex items-center justify-center h-screen bg-gray-800 text-gray-200">
                {/* Card Container */}
                <div className="bg-gray-900 text-gray-200 rounded-lg shadow-xl p-8 max-w-lg text-center">
                    <h1 className="text-5xl font-extrabold mb-6 text-teal-400">
                        This is Clarice
                    </h1>
                    <img
                        src="public/images/clarice-what.webp"
                        alt="A cute cat"
                        className="rounded-lg shadow-lg"
                    />
                </div>
            </div>

            <section className="bg-gray-900 text-gray-200 py-12">
                <Pets />
            </section>

            <section className="bg-gray-900 text-gray-200 py-12">
                <Fosters />
            </section>
        </div>
    );
};

export default Home;