"use client";

import { useEffect, useState } from "react";

const fetchMealIdeas = async (ingredient) => {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
    const data = await response.json();
    return data.meals;
};

const fetchMealDetails = async (mealId) => {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
    const data = await response.json();
    return data.meals[0];
};

const MealIdeas = ({ ingredient }) => {
    const [meals, setMeals] = useState([]);
    const [selectedMealId, setSelectedMealId] = useState(null);
    const [loading, setLoading] = useState(false);

    const loadMealIdeas = async () => {
        if (ingredient) {
            setLoading(true);
            const mealSummaries = await fetchMealIdeas(ingredient);
            if (mealSummaries) {
                const mealDetails = await Promise.all(
                    mealSummaries.map(async (meal) => {
                        const details = await fetchMealDetails(meal.idMeal);
                        return details;
                    })
                );
                setMeals(mealDetails);
            } else {
                setMeals([]);
            }
            setLoading(false);
        }
    };

    useEffect(() => {
        loadMealIdeas();
    }, [ingredient]);

    const handleMealClick = (mealId) => {
        setSelectedMealId((prevId) => (prevId === mealId ? null : mealId));
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4 text-white">Meal Ideas</h2>
            <p className="text-white mb-2">Here are some meal ideas using {ingredient}:</p>
            {loading ? (
                <p className="text-white">Loading...</p>
            ) : (
                meals.length > 0 ? (
                    <ul className="space-y-2">
                        {meals.map((meal) => (
                            <li key={meal.idMeal} className="bg-gray-700 p-2 rounded-lg shadow-md">
                                <div
                                    className="cursor-pointer"
                                    onClick={() => handleMealClick(meal.idMeal)}
                                >
                                    <h3 className="text-lg font-bold text-white">{meal.strMeal}</h3>
                                </div>
                                {selectedMealId === meal.idMeal && (
                                    <div className="flex items-start mt-2">
                                        <div className="w-2/3">
                                            <p className="mb-1 text-sm text-white">Ingredients needed:</p>
                                            <ul className="list-disc list-inside text-sm text-white">
                                                {Array.from({ length: 20 }, (_, i) => i + 1)
                                                    .map(i => ({
                                                        ingredient: meal[`strIngredient${i}`],
                                                        measure: meal[`strMeasure${i}`],
                                                    }))
                                                    .filter(ing => ing.ingredient)
                                                    .map((ing, idx) => (
                                                        <li key={idx}>{`${ing.ingredient} (${ing.measure})`}</li>
                                                    ))}
                                            </ul>
                                        </div>
                                        <div className="w-1/3 ml-4">
                                            <img src={meal.strMealThumb} alt={meal.strMeal} className="w-full h-auto rounded-md" />
                                        </div>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-white">No meal ideas found for {ingredient}.</p>
                )
            )}
        </div>
    );
};

export default MealIdeas;
