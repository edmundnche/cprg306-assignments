"use client";

import { useState } from "react";
import NewItem from "./new-item";
import ItemList from "./item-list";
import MealIdeas from "./meal-ideas";
import itemsData from "./items.json";

const cleanItemName = (itemName) => {
    return itemName
        .split(",")[0]
        .replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|[\u2011-\u26FF])/g, "")
        .trim();
};

export default function Page() {
    const [items, setItems] = useState(itemsData);
    const [selectedItemName, setSelectedItemName] = useState("");

    const handleAddItem = (newItem) => {
        setItems([...items, newItem]);
    };

    const handleItemSelect = (itemName) => {
        const cleanedName = cleanItemName(itemName);
        setSelectedItemName(cleanedName);
    };

    return (
        <main className="p-6 bg-gray-900 min-h-screen">
            <h1 className="text-3xl font-bold text-white mb-6 text-center">Shopping List</h1>
            <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex flex-col w-full lg:w-1/3 bg-gray-800 p-4 rounded-lg shadow-md">
                    <NewItem onAddItem={handleAddItem} />
                    <ItemList items={items} onItemSelect={handleItemSelect} />
                </div>
                <div className="w-full lg:w-2/3 bg-gray-800 p-4 rounded-lg shadow-md">
                    <MealIdeas ingredient={selectedItemName} />
                </div>
            </div>
        </main>
    );
}
