"use client";

import { useState, useEffect } from "react";
import NewItem from "./new-item";
import ItemList from "./item-list";
import MealIdeas from "./meal-ideas";
import itemsData from "./items.json";
import { useUserAuth } from "../_utils/auth-context";
import { useRouter } from "next/navigation";

const cleanItemName = (itemName) => {
    return itemName
        .split(",")[0]
        .replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|[\u2011-\u26FF])/g, "")
        .trim();
};

export default function Page() {
    const [items, setItems] = useState(itemsData);
    const [selectedItemName, setSelectedItemName] = useState("");
    const { user, firebaseSignOut } = useUserAuth();
    const router = useRouter();
    const [showMessage, setShowMessage] = useState(false);

    useEffect(() => {
        if (!user) {
            setShowMessage(true);
        }
    }, [user]);

    const handleAddItem = (newItem) => {
        setItems([...items, newItem]);
    };

    const handleItemSelect = (itemName) => {
        const cleanedName = cleanItemName(itemName);
        setSelectedItemName(cleanedName);
    };

    const handleLogout = async () => {
        try {
            await firebaseSignOut();
            router.push("/");
        } catch (error) {
            console.error("Error during logout:", error);
        }
    };

    const handleCloseMessage = () => {
        setShowMessage(false);
        router.push("/week-8");
    };

    if (!user && showMessage) {
        return (
            <div className="p-6 bg-gray-900 min-h-screen flex items-center justify-center relative">
                <h1 className="text-3xl font-bold text-white">You need to sign in to view this page</h1>
                <button
                    onClick={handleCloseMessage}
                    className="absolute top-2 right-2 bg-gray-200 text-gray-800 rounded-full p-2"
                >
                    &times;
                </button>
            </div>
        );
    }

    return (
        <main className="p-6 bg-gray-900 min-h-screen">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-white">Shopping List</h1>
                <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                >
                    Logout
                </button>
            </div>
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
