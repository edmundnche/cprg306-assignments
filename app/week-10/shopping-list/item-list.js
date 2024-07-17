"use client";

import { useState } from "react";
import Item from "./item";

const cleanItemName = (itemName) => {
    return itemName
        .split(",")[0]
        .replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|[\u2011-\u26FF])/g, "")
        .trim();
};

const ItemList = ({ items, onItemSelect }) => {
    const [sortBy, setSortBy] = useState("name");

    const sortItems = (items, sortBy) => {
        const itemsCopy = [...items];
        if (sortBy === "name") {
            return itemsCopy.sort((a, b) => cleanItemName(a.name).localeCompare(cleanItemName(b.name)));
        } else if (sortBy === "category") {
            return itemsCopy.sort((a, b) => a.category.localeCompare(b.category));
        }
        return itemsCopy;
    };

    const groupItemsByCategory = (items) => {
        const groupedItems = items.reduce((acc, item) => {
            if (!acc[item.category]) {
                acc[item.category] = [];
            }
            acc[item.category].push(item);
            return acc;
        }, {});
        Object.keys(groupedItems).forEach((category) => {
            groupedItems[category].sort((a, b) => cleanItemName(a.name).localeCompare(cleanItemName(b.name)));
        });
        return groupedItems;
    };

    let sortedItems = sortItems(items, sortBy);
    let groupedItems = {};
    if (sortBy === "grouped") {
        groupedItems = groupItemsByCategory(sortedItems);
        groupedItems = Object.fromEntries(
            Object.entries(groupedItems).sort((a, b) => a[0].localeCompare(b[0]))
        );
    }

    return (
        <>
            <div className="text-center mb-6">
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
                    <div key={category} className="mb-8">
                        <h2 className="text-2xl font-bold capitalize text-white mb-4">{category}</h2>
                        <ul className="space-y-4">
                            {items.map((item) => (
                                <Item key={item.id} {...item} onSelect={onItemSelect} />
                            ))}
                        </ul>
                    </div>
                ))
            ) : (
                <ul className="space-y-4">
                    {sortedItems.length === 0 && <p className="text-center text-white">No items found.</p>}
                    {sortedItems.map((item) => (
                        <Item key={item.id} {...item} onSelect={onItemSelect} />
                    ))}
                </ul>
            )}
        </>
    );
};

export default ItemList;
