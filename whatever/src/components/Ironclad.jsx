import React, { useState } from "react";

const Ironclad = () => {
    // Full Ironclad card tier data, categorized by usefulness, with reasons
    const tierData = [
        {
            tier: "S",
            cards: [
                {
                    name: "Limit Break",
                    description: "Doubles your Strength. Exhaust.",
                    reason: "Essential for Strength builds, enabling exponential scaling."
                },
                {
                    name: "Feed",
                    description: "Deal 10 damage. If fatal, gain 3 max HP. Exhaust.",
                    reason: "Unique and essential for gaining max HP in longer runs."
                },
                {
                    name: "Demon Form",
                    description: "At the start of your turn, gain 2 Strength.",
                    reason: "Provides unmatched long-term Strength scaling for late-game fights."
                },
                {
                    name: "Offering",
                    description: "Lose 6 HP. Gain 2 Energy and draw 5 cards.",
                    reason: "Incredible energy and card advantage for explosive turns."
                },
                {
                    name: "Whirlwind",
                    description: "Spend all Energy. Deal damage to all enemies X times.",
                    reason: "Amazing AOE that scales with Energy, great for crowd control."
                },
                {
                    name: "Immolate",
                    description: "Deal 21 damage to ALL. Add 1 Burn to your discard pile.",
                    reason: "A very strong AOE nuke with minor downsides."
                },
            ],
        },
        {
            tier: "A",
            cards: [
                {
                    name: "Reaper",
                    description: "Deal 4 AoE damage. Heal for damage dealt.",
                    reason: "Useful for healing, especially when paired with Strength scaling."
                },
                {
                    name: "Bludgeon",
                    description: "Deal 32 damage.",
                    reason: "Massive single-target damage that fits most decks."
                },
                {
                    name: "Fiend Fire",
                    description: "Exhaust your hand. Deal 7 damage for each.",
                    reason: "Incredibly strong with Exhaust builds for burst damage."
                },
                {
                    name: "Barricade",
                    description: "Block is no longer removed at the end of your turn.",
                    reason: "Key for block-focused Ironclad strategies."
                },
                {
                    name: "Feel No Pain",
                    description: "Gain 4 Block when you Exhaust a card.",
                    reason: "Core block generation for Exhaust-focused decks."
                },
                {
                    name: "Shockwave",
                    description: "Apply 3 Weak and 3 Vulnerable to ALL. Exhaust.",
                    reason: "Game-changing debuff utility for Strength builds and survival."
                },
                {
                    name: "Second Wind",
                    description: "Exhaust non-attack cards. Gain 5 Block for each.",
                    reason: "Useful for block generation in Exhaust-heavy decks."
                },
            ],
        },
        {
            tier: "B",
            cards: [
                {
                    name: "Battle Trance",
                    description: "Draw 3 cards. Can't draw more this turn.",
                    reason: "Efficient card draw, though limits further drawing."
                },
                {
                    name: "Infernal Blade",
                    description: "Add a random attack into your hand. It costs 0.",
                    reason: "Decent value with a free attack, but inconsistent in quality."
                },
                {
                    name: "Disarm",
                    description: "Reduce Strength of an enemy by 2. Exhaust.",
                    reason: "Invaluable for neutralizing damage-dealing enemies over time."
                },
                {
                    name: "Rampage",
                    description: "Deal 8 damage. Increases by 5 every time it's played.",
                    reason: "Scales decently in thin decks but takes time to reach potential."
                },
                {
                    name: "Combust",
                    description: "At the end of your turn, lose 1 HP and deal 5 AoE damage.",
                    reason: "Good AOE damage with a minor HP cost."
                },
                {
                    name: "Metallicize",
                    description: "Gain 3 Block passively at the end of your turn.",
                    reason: "Reliable and consistent passive block generation."
                },
            ],
        },
        {
            tier: "C",
            cards: [
                {
                    name: "Cleave",
                    description: "Deal 8 AoE damage.",
                    reason: "Decent early-game AOE, but lacks scaling for late-game."
                },
                {
                    name: "Pommel Strike",
                    description: "Deal 9 damage and draw 1 card.",
                    reason: "Solid attack with card draw, though not particularly impactful."
                },
                {
                    name: "Twin Strike",
                    description: "Deal 5 damage twice.",
                    reason: "Works well with Strength scaling but is not versatile."
                },
                {
                    name: "True Grit",
                    description: "Gain 7 Block. Exhaust a random card.",
                    reason: "Good defensive card, though randomness can be a downside."
                },
            ],
        },
        {
            tier: "D",
            cards: [
                {
                    name: "Wild Strike",
                    description: "Deal 12 damage and shuffle a Wound into your deck.",
                    reason: "Good damage, but adding Wound cards weakens it over time."
                },
                {
                    name: "Anger",
                    description: "Deal 6 damage. Add a copy of this card to your deck.",
                    reason: "Free attack, but clogs your deck over time."
                },
                {
                    name: "Heavy Blade",
                    description: "Deal 14 damage, scales with Strength (x3).",
                    reason: "Relies on huge Strength scaling to shine, making it situational."
                },
                {
                    name: "Sentinel",
                    description: "Gain 5 Block. Gain 2 Energy if this card is Exhausted.",
                    reason: "Decent energy generation in Exhaust decks, but niche."
                },
            ],
        },
        {
            tier: "F",
            cards: [
                {
                    name: "Perfected Strike",
                    description: "Deals more damage the more Strikes you have.",
                    reason: "Limited to Strike synergy, which is often suboptimal."
                },
                {
                    name: "Clash",
                    description: "Deal 14 damage, but can only be played with attacks in hand.",
                    reason: "Restrictive condition makes it too inconsistent."
                },
                {
                    name: "Searing Blow",
                    description: "Has unlimited upgrade scaling. Deals decent damage.",
                    reason: "Takes too many upgrades to become viable."
                },
                {
                    name: "Brutality",
                    description: "Lose 1 HP/t. Draw 1 extra card each turn.",
                    reason: "Extra card draw is useful, but consistent HP loss is risky."
                },
            ],
        },
    ];

    // State for modal
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);

    const openModal = (card) => {
        setSelectedCard(card);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setSelectedCard(null);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
            <h1 className="text-3xl font-bold m-8">Slay the Spire: Ironclad Card Tiers</h1>

            {/* Table */}
            <div className="overflow-auto bg-gray-800 shadow-md rounded-lg">
                <table className="table-auto border-collapse border border-gray-700 text-left">
                    <thead className="bg-gray-700 text-gray-300">
                    <tr>
                        <th className="px-6 py-3 border border-gray-600">Tier</th>
                        <th className="px-6 py-3 border border-gray-600">Cards</th>
                    </tr>
                    </thead>
                    <tbody>
                    {tierData.map((row, index) => (
                        <tr key={index} className="hover:bg-gray-600">
                            <td className="px-6 py-4 border border-gray-600 font-semibold">{row.tier}</td>
                            <td className="px-6 py-4 border border-gray-600">
                                <ul>
                                    {row.cards.map((card, cardIndex) => (
                                        <li key={cardIndex}>
                                            {/* Trigger for modal */}
                                            <button
                                                className="text-blue-400 underline hover:text-blue-300"
                                                onClick={() => openModal(card)}
                                            >
                                                {card.name}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {modalVisible && selectedCard && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60">
                    <div className="bg-gray-800 rounded-lg shadow-lg p-6 w-11/12 max-w-md text-center">
                        <h2 className="text-xl font-bold text-white mb-4">{selectedCard.name}</h2>
                        <p className="text-gray-300 mb-4">{selectedCard.description}</p>
                        <p className="text-gray-400 text-sm italic">{selectedCard.reason}</p>
                        <button
                            className="mt-6 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded"
                            onClick={closeModal}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            <a
                href="/slay-the-spire"
                target="_self"
                rel="noopener noreferrer"
                className="m-8  text-white font-bold underline"
            >
                bye
            </a>
        </div>
    );
};

export default Ironclad;