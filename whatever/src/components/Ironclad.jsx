import React, { useState } from "react";

const Ironclad = () => {
    // Full Ironclad card tier data, categorized by tier ranking
    const tierData = [
        {
            tier: "S",
            color: "bg-blue-500",
            cards: [
                {
                    name: "Offering",
                    image: "public/images/ironclad-offering.webp",
                    description: "Lose 6 HP. Gain 2 Energy and draw 5 cards.",
                    reason: "Explosive card and energy advantage for burst-heavy turns."
                },
                {
                    name: "Feed",
                    image: "public/images/ironclad-feed.webp",
                    description: "Deal 10 damage. If fatal, gain 3 max HP. Exhaust.",
                    reason: "Unique and essential for gaining max HP in longer runs."
                },
                {
                    name: "Corruption",
                    image: "public/images/ironclad-corruption.webp",
                    description: "Deal 10 damage. If fatal, gain 3 max HP. Exhaust.",
                    reason: "Unique and essential for gaining max HP in longer runs."
                },
                {
                    name: "Immolate",
                    image: "public/images/ironclad-immolate.webp",
                    description: "Deal 21 damage to all enemies. Add 1 Burn to your discard pile.",
                    reason: "Powerful AoE nuke with a minor downside."
                },
            ],
        },
        {
            tier: "A",
            color: "bg-red-500",
            cards: [
                {
                    name: "Disarm",
                    image: "public/images/ironclad-disarm.webp",
                    description: "Reduce Strength of an enemy by 2(3). Exhaust.",
                    reason: "High value in Strength-based enemy encounters."
                },
                {
                    name: "Feel No Pain",
                    image: "public/images/ironclad-feel-no-pain.webp",
                    description: "Gain 4 Block when you Exhaust a card.",
                    reason: "Essential defense generator for Exhaust-heavy decks."
                },
                {
                    name: "Impervious",
                    image: "public/images/ironclad-impervious.webp",
                    description: "Gain 30 Block. Exhaust.",
                    reason: "Massive block value, works well with Exhaust and Barricade."
                },
                {
                    name: "Dark Embrace",
                    image: "public/images/ironclad-dark-embrace.webp",
                    description: "???",
                    reason: "???"
                },
                {
                    name: "Shrug It Off",
                    image: "public/images/ironclad-shrug-it-off.webp",
                    description: "???",
                    reason: "???"
                },
                {
                    name: "Battle Trance",
                    image: "public/images/ironclad-battle-trance.webp",
                    description: "Draw 3 cards. You cannot draw additional cards this turn.",
                    reason: "Versatile and cost-effective card draw option."
                },
                {
                    name: "Shockwave",
                    image: "public/images/ironclad-shockwave.webp",
                    description: "Apply 3 Weak and 3 Vulnerable to ALL enemies. Exhaust.",
                    reason: "Strong utility card for both defense and offense scaling."
                },
                {
                    name: "Reaper",
                    image: "public/images/ironclad-reaper.webp",
                    description: "Deal 4 AoE damage. Heal for damage dealt.",
                    reason: "Crucial sustain tool for Strength builds, shines in late-game."
                },
                {
                    name: "Flame Barrier",
                    image: "public/images/ironclad-flame-barrier.webp",
                    description: "???",
                    reason: "???"
                },
                {
                    name: "Pommel Strike",
                    image: "public/images/ironclad-pommel-strike.webp",
                    description: "Deal 9 damage. Draw 1 card.",
                    reason: "A simple attack with minor card cycling."
                },
                {
                    name: "Spot Weakness",
                    image: "public/images/ironclad-spot-weakness.webp",
                    description: "???",
                    reason: "???"
                },
            ],
        },
        {
            tier: "B",
            color: "bg-orange-500",
            cards: [
                {
                    name: "Fiend Fire",
                    image: "public/images/ironclad-fiend-fire.webp",
                    description: "Exhaust your hand. Deal 7 damage for each card exhausted.",
                    reason: "Massive burst potential in Exhaust builds."
                },
                {
                    name: "Burning Pact",
                    image: "public/images/ironclad-burning-pact.webp",
                    description: "???",
                    reason: "???"
                },
                {
                    name: "Second Wind",
                    image: "public/images/ironclad-second-wind.webp",
                    description: "Exhaust all non-attack cards in your hand. Gain 5 Block for each.",
                    reason: "Reliable defensive tool with synergy in Exhaust decks."
                },
                {
                    name: "Bloodletting",
                    image: "public/images/ironclad-bloodletting.webp",
                    description: "???",
                    reason: "???"
                },
                {
                    name: "Barricade",
                    image: "public/images/ironclad-barricade.webp",
                    description: "Block is no longer removed at the end of your turn.",
                    reason: "Key card for defensive/block-focused builds."
                },
                {
                    name: "Brutality",
                    image: "public/images/ironclad-brutality.webp",
                    description: "???",
                    reason: "???"
                },
                {
                    name: "True Grit",
                    image: "public/images/ironclad-true-grit.webp",
                    description: "Gain 7 Block. Exhaust a random card.",
                    reason: "Okay defensive tool, but randomness can be a downside."
                },
                {
                    name: "Inflame",
                    image: "public/images/ironclad-inflame.webp",
                    description: "???",
                    reason: "???"
                },
                {
                    name: "Uppercut",
                    image: "public/images/ironclad-uppercut.webp",
                    description: "???",
                    reason: "???"
                },
                {
                    name: "Blood for Blood",
                    image: "public/images/ironclad-blood-for-blood.webp",
                    description: "???",
                    reason: "???"
                },
                {
                    name: "Exhume",
                    image: "public/images/ironclad-exhume.webp",
                    description: "???",
                    reason: "???"
                },
                {
                    name: "Headbutt",
                    image: "public/images/ironclad-headbutt.webp",
                    description: "???",
                    reason: "???"
                },
                {
                    name: "Ghostly Armor",
                    image: "public/images/ironclad-ghostly-armor.webp",
                    description: "???",
                    reason: "???"
                },
                {
                    name: "Carnage",
                    image: "public/images/ironclad-carnage.webp",
                    description: "???",
                    reason: "???"
                },
                {
                    name: "Seeing Red",
                    image: "public/images/ironclad-seeing-red.webp",
                    description: "???",
                    reason: "???"
                },
                {
                    name: "Demon Form",
                    image: "public/images/ironclad-demon-form.webp",
                    description: "At the start of your turn, gain 2 Strength.",
                    reason: "Exceptional for long fights, provides consistent Strength scaling."
                },
                {
                    name: "Power Through",
                    image: "public/images/ironclad-power-through.webp",
                    description: "???",
                    reason: "???"
                },
                {
                    name: "Evolve",
                    image: "public/images/ironclad-evolve.webp",
                    description: "???",
                    reason: "???"
                },
                {
                    name: "Limit Break",
                    image: "public/images/ironclad-limit-break.webp",
                    description: "Doubles your Strength. Exhaust.",
                    reason: "Essential for Strength builds, enabling exponential scaling."
                },
                {
                    name: "Anger",
                    image: "public/images/ironclad-anger.webp",
                    description: "Deal 6 damage. Add a copy of this card to your deck.",
                    reason: "Increases deck size, hurting consistency over time."
                },

                {
                    name: "Whirlwind",
                    image: "public/images/ironclad-whirlwind.webp",
                    description: "Spend all Energy. Deal damage to all enemies X times.",
                    reason: "Excellent AoE that scales exceptionally well with Energy."
                },

            ],
        },
        {
            tier: "C",
            color: "bg-yellow-500",
            cards: [
                {
                    name: "Intimidate",
                    image: "public/images/ironclad-intimidate.webp",
                    description: "???",
                    reason: "???"
                },
                {
                    name: "Armaments",
                    image: "public/images/ironclad-armaments.webp",
                    description: "???",
                    reason: "???"
                },
                {
                    name: "Pummel",
                    image: "public/images/ironclad-pummel.webp",
                    description: "???",
                    reason: "???"
                },
                {
                    name: "Bludgeon",
                    image: "public/images/ironclad-bludgeon.webp",
                    description: "Deal 32 damage.",
                    reason: "High single-target burst damage that's easy to use and effective."
                },
                {
                    name: "Heavy Blade",
                    image: "public/images/ironclad-heavy-blade.webp",
                    description: "???",
                    reason: "???"
                },
                {
                    name: "Hemokinesis",
                    image: "public/images/ironclad-hemokinesis.webp",
                    description: "???",
                    reason: "???"
                },
                {
                    name: "Combust",
                    image: "public/images/ironclad-combust.webp",
                    description: "At the end of your turn, lose 1 HP and deal 5 damage to ALL enemies.",
                    reason: "Good AoE damage over time, but at the cost of HP."
                },
                {
                    name: "Dropkick",
                    image: "public/images/ironclad-dropkick.webp",
                    description: "???",
                    reason: "???"
                },
                {
                    name: "Sword Boomerang",
                    image: "public/images/ironclad-sword-boomerang.webp",
                    description: "???",
                    reason: "???"
                },
                {
                    name: "Body Slam",
                    image: "public/images/ironclad-body-slam.webp",
                    description: "???",
                    reason: "???"
                },
                {
                    name: "Twin Strike",
                    image: "public/images/ironclad-twin-strike.webp",
                    description: "???",
                    reason: "???"
                },
                {
                    name: "Clothesline",
                    image: "public/images/ironclad-clothesline.webp",
                    description: "???",
                    reason: "???"
                },
                {
                    name: "Entrench",
                    image: "public/images/ironclad-entrench.webp",
                    description: "???",
                    reason: "???"
                },
                {
                    name: "Sentinel",
                    image: "public/images/ironclad-sentinel.webp",
                    description: "???",
                    reason: "???"
                },
                {
                    name: "Dual Wield",
                    image: "public/images/ironclad-dual-wield.webp",
                    description: "???",
                    reason: "???"
                },
                {
                    name: "Cleave",
                    image: "public/images/ironclad-cleave.webp",
                    description: "Deal 8 damage to ALL enemies.",
                    reason: "Decent AoE option, particularly in the early game."
                },
            ],
        },
        {
            tier: "D",
            color: "bg-green-500",
            cards: [
                {
                    name: "Warcry",
                    image: "public/images/ironclad-warcry.webp",
                    description: "???",
                    reason: "???"
                },
                {
                    name: "Juggernaut",
                    image: "public/images/ironclad-juggernaut.webp",
                    description: "???",
                    reason: "???"
                },
                {
                    name: "Rupture",
                    image: "public/images/ironclad-rupture.webp",
                    description: "???",
                    reason: "???"
                },
                {
                    name: "Reckless Charge",
                    image: "public/images/ironclad-reckless-charge.webp",
                    description: "???",
                    reason: "???"
                },
                {
                    name: "Perfected Strike",
                    image: "public/images/ironclad-perfected-strike.webp",
                    description: "Deals damage based on the number of Strike cards in your deck.",
                    reason: "Highly deck-dependent and weak in most scenarios."
                },
                {
                    name: "Double Tap",
                    image: "public/images/ironclad-double-tap.webp",
                    description: "???",
                    reason: "???"
                },
                {
                    name: "Berserk",
                    image: "public/images/ironclad-berserk.webp",
                    description: "???",
                    reason: "???"
                },
                {
                    name: "Thunderclap",
                    image: "public/images/ironclad-thunderclap.webp",
                    description: "Deal 7 AoE damage. Apply 1 Vulnerable to all enemies.",
                    reason: "Good Vulnerability application and utility."
                },
                {
                    name: "Metallicize",
                    image: "public/images/ironclad-metallicize.webp",
                    description: "???",
                    reason: "???"
                },
                {
                    name: "Fire Breathing",
                    image: "public/images/ironclad-fire-breathing.webp",
                    description: "???",
                    reason: "???"
                },
                {
                    name: "Rage",
                    image: "public/images/ironclad-rage.webp",
                    description: "???",
                    reason: "???"
                },
                {
                    name: "Flex",
                    image: "public/images/ironclad-flex.webp",
                    description: "???",
                    reason: "???"
                },
                {
                    name: "Havoc",
                    image: "public/images/ironclad-havoc.webp",
                    description: "???",
                    reason: "???"
                },
                {
                    name: "Iron Wave",
                    image: "public/images/ironclad-iron-wave.webp",
                    description: "???",
                    reason: "???"
                },
                {
                    name: "Infernal Blade",
                    image: "public/images/ironclad-infernal-blade.webp",
                    description: "Add a random attack into your hand. It costs 0.",
                    reason: "Inconsistent value but good tempo advantages."
                },
                {
                    name: "Rampage",
                    image: "public/images/ironclad-rampage.webp",
                    description: "???",
                    reason: "???"
                },
                {
                    name: "Wild Strike",
                    image: "public/images/ironclad-wild-strike.webp",
                    description: "Deal 12 damage. Shuffle a Wound into your draw pile.",
                    reason: "Okay damage, but Wound offsets the benefit."
                },
            ],
        },
        {
            tier: "F",
            color: "bg-gray-500",
            cards: [
                {
                    name: "Sever Soul",
                    image: "public/images/ironclad-sever-soul.webp",
                    description: "???",
                    reason: "???"
                },
                {
                    name: "Clash",
                    image: "public/images/ironclad-clash.webp",
                    description: "Deal 14 damage. Can only be played if every card in your hand is an Attack.",
                    reason: "Terrible due to its restrictive condition."
                },
                {
                    name: "Searing Blow",
                    image: "public/images/ironclad-searing-blow.webp",
                    description: "???",
                    reason: "???"
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
        <div className="flex flex-col items-center justify-center p-6 bg-gray-900 text-white">
            <h1 className="text-3xl font-bold mb-6">Slay the Spire: Ironclad Card Tiers</h1>

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
                        <tr key={index} className={row.color}>
                            <td className="px-2 py-2">{row.tier}</td>
                            <td className="px-2 py-2">
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
                                    {row.cards.map((card, cardIndex) => (
                                        <button
                                            key={cardIndex}
                                            className="relative flex flex-col"
                                            onClick={() => openModal(card)}
                                        >
                                            {card.name}
                                        </button>
                                    ))}
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {modalVisible && selectedCard && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4">
                    <div className="bg-gray-800 rounded-lg shadow-lg w-full max-w-md p-6 relative">
                        <button
                            className="absolute top-2 right-2 text-gray-400 hover:text-white"
                            onClick={closeModal}
                        >
                            ✖
                        </button>
                        <img
                            src={selectedCard.image}
                            alt={selectedCard.name}
                            className="mx-auto w-32 rounded-lg mb-4"
                        />
                        <h2 className="text-lg font-semibold">{selectedCard.name}</h2>
                        <p className="text-gray-300 mt-2">{selectedCard.description}</p>
                        <p className="text-sm text-gray-400 mt-4 italic">{selectedCard.reason}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Ironclad;
