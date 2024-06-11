"use client";

import { useState } from "react";
import Item from './item';
import itemsData from "./items.json";

const ItemList = () => {
    const [sortBy, setSortBy] = useState("name");

    // Function to sort items
    const sortItems = (items, sortBy) => {
        if (sortBy === "name") {
            return items.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortBy === "category") {
            return items.sort((a, b) => a.category.localeCompare(b.category));
        }
        return items;
    };

    // Group items by category
    const groupItemsByCategory = (items) => {
        const groupedItems = items.reduce((acc, item) => {
            if (!acc[item.category]) {
                acc[item.category] = [];
            }
            acc[item.category].push(item);
            return acc;
        }, {});
        // Sort categories and items within each category
        Object.keys(groupedItems).forEach(category => {
            groupedItems[category].sort((a, b) => a.name.localeCompare(b.name));
        });
        return groupedItems;
    };

    // Sorted items
    let items = sortItems([...itemsData], sortBy);

    // Get grouped items if sorting by category
    let groupedItems = {};
    if (sortBy === "grouped") {
        groupedItems = groupItemsByCategory(items);
        // Sort categories alphabetically
        groupedItems = Object.fromEntries(
            Object.entries(groupedItems).sort((a, b) => a[0].localeCompare(b[0]))
        );
    }

    return (
        <>
            <div className="text-center mb-4">
                <button
                    className={`p-2 m-2 ${sortBy === "name" ? "bg-blue-500 text-white" : "bg-gray-300"}`}
                    onClick={() => setSortBy("name")}
                >
                    Sort by Name
                </button>
                <button
                    className={`p-2 m-2 ${sortBy === "category" ? "bg-blue-500 text-white" : "bg-gray-300"}`}
                    onClick={() => setSortBy("category")}
                >
                    Sort by Category
                </button>
                <button
                    className={`p-2 m-2 ${sortBy === "grouped" ? "bg-blue-500 text-white" : "bg-gray-300"}`}
                    onClick={() => setSortBy("grouped")}
                >
                    Group by Category
                </button>
            </div>
            {sortBy === "grouped" ? (
                Object.entries(groupedItems).map(([category, items]) => (
                    <div key={category} className="mb-4">
                        <h2 className="text-2xl font-bold capitalize">{category}</h2>
                        <ul className="space-y-4">
                            {items.map((item) => (
                                <Item key={item.id} {...item} />
                            ))}
                        </ul>
                    </div>
                ))
            ) : (
                <ul className="space-y-4">
                    {items.length === 0 && <p className="text-center">No items found.</p>}
                    {items.map((item) => (
                        <Item key={item.id} {...item} />
                    ))}
                </ul>
            )}
        </>
    );
};

export default ItemList;
