import React, { useState, useMemo } from 'react';
import { Plus, Search, Utensils } from 'lucide-react';
import { FoodItem, commonFoods } from '../../utils/foodData';
import AddFoodModal from '../AddFoodModal';
import FoodDatabase from './FoodDatabase';
import MealsList from './MealsList';
import NutritionSummary from './NutritionSummary';
import FoodSearch from '../FoodSearch';

const DailyTracker = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [meals, setMeals] = useState<FoodItem[]>([]);
  const [customFoods, setCustomFoods] = useState<FoodItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);

  const allFoods = useMemo(() => [...commonFoods, ...customFoods], [customFoods]);

  const filteredFoods = useMemo(() => {
    if (!searchTerm.trim()) return allFoods;
    
    const searchLower = searchTerm.toLowerCase();
    return allFoods.filter(food => 
      food.name.toLowerCase().includes(searchLower)
    );
  }, [searchTerm, allFoods]);

  const addMeal = (food: FoodItem) => {
    setMeals(prevMeals => [...prevMeals, food]);
  };

  const removeMeal = (index: number) => {
    setMeals(prevMeals => prevMeals.filter((_, i) => i !== index));
  };

  const handleAddCustomFood = (food: FoodItem) => {
    const customFood = { ...food, isCustom: true };
    setCustomFoods(prevFoods => [...prevFoods, customFood]);
    setIsModalOpen(false);
  };

  const handleRemoveFood = (foodToRemove: FoodItem) => {
    setCustomFoods(prevFoods => 
      prevFoods.filter(food => food.name !== foodToRemove.name)
    );
    
    setMeals(prevMeals => 
      prevMeals.filter(meal => meal.name !== foodToRemove.name)
    );
  };

  const totalNutrients = meals.reduce(
    (acc, meal) => ({
      calories: acc.calories + meal.calories,
      protein: acc.protein + meal.protein,
      carbs: acc.carbs + meal.carbs,
      fat: acc.fat + meal.fat,
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );

  return (
    <div id="daily-tracker" className="bg-white rounded-2xl shadow-xl p-8 scroll-mt-20">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Utensils className="h-8 w-8 text-emerald-500" />
          <h2 className="text-2xl font-bold ml-3">Daily Food Tracker</h2>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}
            className="flex items-center px-4 py-2 text-sm font-medium text-emerald-700 bg-emerald-100 hover:bg-emerald-200 rounded-md transition-colors"
          >
            <Search className="h-4 w-4 mr-2" />
            Advanced Search
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center px-4 py-2 text-sm font-medium text-white bg-emerald-500 hover:bg-emerald-600 rounded-md transition-colors"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Custom Food
          </button>
        </div>
      </div>

      {showAdvancedSearch ? (
        <div className="mb-6">
          <FoodSearch foods={allFoods} onSelectFood={addMeal} />
        </div>
      ) : (
        <>
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Quick search foods..."
              className="pl-10 w-full rounded-md border border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 p-2"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FoodDatabase
              foods={filteredFoods}
              searchTerm={searchTerm}
              onAddMeal={addMeal}
              onRemoveFood={handleRemoveFood}
            />

            <div>
              <MealsList meals={meals} onRemoveMeal={removeMeal} />
              <NutritionSummary totals={totalNutrients} />
            </div>
          </div>
        </>
      )}

      <AddFoodModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddCustomFood}
      />
    </div>
  );
};

export default DailyTracker;