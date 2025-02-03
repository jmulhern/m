import React from "react";

const SlayTheSpire = () => {

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
            <h1 className="text-3xl font-bold mb-8">Slay the Spire</h1>
            <a
                href="/ironclad"
                target="_self"
                rel="noopener noreferrer"
                className="mt-8 text-white font-bold underline hover:text-red-400"
            >
                Ironclad
            </a>

            <a
                href="/"
                target="_self"
                rel="noopener noreferrer"
                className="mt-8  text-white font-bold underline"
            >
                bye
            </a>
        </div>
    );
};

export default SlayTheSpire;