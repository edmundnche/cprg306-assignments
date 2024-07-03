"use client";

import { useState } from "react";

export default function NewItem({ onAddItem }) {
    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [category, setCategory] = useState("Produce");
    const [itemCreated, setItemCreated] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        const newItem = {
            name,
            quantity,
            category,
        };

        onAddItem(newItem);

        setName("");
        setQuantity(1);
        setCategory("Produce");

        setItemCreated(true);
        setTimeout(() => setItemCreated(false), 2000);
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleQuantityChange = (e) => {
        const value = e.target.value;
        if (value >= 1) {
            setQuantity(value);
        } else {
            setQuantity(1);
        }
    };

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    };

    return (
        <div className="w-full mb-10">
            {itemCreated && (
                <div className="absolute top-0 text-2xl text-yellow-400">
                    Item Created
                </div>
            )}
            <div className="w-full bg-white p-4 rounded-lg shadow-md">
                <h1 className="text-2xl text-gray-800 font-bold mb-4">
                    Create New Item
                </h1>
                <form onSubmit={handleSubmit}>
                    <label className="block mb-2">
                        <span className="text-gray-800">Item Name:</span>
                        <input
                            required
                            onChange={handleNameChange}
                            value={name}
                            className="mt-1 p-1 block w-full rounded-md text-black bg-gray-100 focus:bg-white"
                        />
                    </label>

                    <label className="block mb-2">
                        <span className="text-gray-800">Item Quantity:</span>
                        <input
                            type="number"
                            required
                            onChange={handleQuantityChange}
                            value={quantity}
                            min="1"
                            className="mt-1 p-1 block w-full rounded-md text-black bg-gray-100 focus:bg-white"
                        />
                    </label>

                    <label className="block mb-2">
                        <span className="text-gray-800">Item Category:</span>
                        <select
                            required
                            onChange={handleCategoryChange}
                            value={category}
                            className="mt-1 p-1 block w-full rounded-md text-black bg-gray-100 focus:bg-white"
                        >
                            <option value="Produce">Produce</option>
                            <option value="Dairy">Dairy</option>
                            <option value="Bakery">Bakery</option>
                            <option value="Meat">Meat</option>
                            <option value="Frozen Foods">Frozen Foods</option>
                            <option value="Canned Goods">Canned Goods</option>
                            <option value="Dry Goods">Dry Goods</option>
                            <option value="Beverages">Beverages</option>
                            <option value="Snacks">Snacks</option>
                            <option value="Household">Household</option>
                            <option value="Other">Other</option>
                        </select>
                    </label>

                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-sky-600 hover:bg-sky-500 rounded-md text-white"
                    >
                        Create Item
                    </button>
                </form>
            </div>
        </div>
    );
}
