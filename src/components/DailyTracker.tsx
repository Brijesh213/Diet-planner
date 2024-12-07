import React, { useState, useMemo } from 'react';
import { Plus, Search, Utensils, X } from 'lucide-react';
import { FoodItem, commonFoods } from '../utils/foodData';
import AddFoodModal from './AddFoodModal';

const DailyTracker = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [meals, setMeals] = useState<FoodItem[]>([]);
  const [customFoods, setCustomFoods] = useState<FoodItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const allFoods = [...commonFoods, ...customFoods];

  const filteredFoods = useMemo(() => {
    if (!searchTerm.trim()) return allFoods;
    
    const searchLower = searchTerm.toLowerCase();
    return allFoods.filter(food => 
      food.name.toLowerCase().includes(searchLower)
    );
  }, [searchTerm, allFoods]);

  const addMeal = (food: FoodItem) => {
    setMeals([...meals, food]);
  };

  const removeMeal = (index: number) => {
    setMeals(meals.filter((_, i) => i !== index));
  };

  const handleAddCustomFood = (food: FoodItem) => {
    setCustomFoods([...customFoods, food]);
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
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center px-4 py-2 text-sm font-medium text-white bg-emerald-500 hover:bg-emerald-600 rounded-md transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Custom Food
        </button>
      </div>

      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search foods..."
          className="pl-10 w-full rounded-md border border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 p-2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">Food Database</h3>
          <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
            {filteredFoods.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No foods found matching "{searchTerm}"</p>
            ) : (
              filteredFoods.map((food) => (
                <div key={food.name} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div>
                    <p className="font-medium">{food.name}</p>
                    <div className="text-sm text-gray-500 mt-1">
                      <span>{food.calories} kcal</span>
                      <span className="mx-2">•</span>
                      <span>P: {food.protein}g</span>
                      <span className="mx-2">•</span>
                      <span>C: {food.carbs}g</span>
                      <span className="mx-2">•</span>
                      <span>F: {food.fat}g</span>
                    </div>
                  </div>
                  <button
                    onClick={() => addMeal(food)}
                    className="p-2 text-emerald-500 hover:bg-emerald-50 rounded-full transition-colors"
                    title="Add to meals"
                  >
                    <Plus className="h-5 w-5" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Today's Meals</h3>
          <div className="space-y-4 mb-6">
            {meals.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No meals added yet</p>
            ) : (
              meals.map((meal, index) => (
                <div key={`${meal.name}-${index}`} className="flex items-center justify-between p-4 bg-emerald-50 rounded-lg">
                  <div>
                    <p className="font-medium">{meal.name}</p>
                    <div className="text-sm text-gray-500 mt-1">
                      <span>{meal.calories} kcal</span>
                      <span className="mx-2">•</span>
                      <span>P: {meal.protein}g</span>
                      <span className="mx-2">•</span>
                      <span>C: {meal.carbs}g</span>
                      <span className="mx-2">•</span>
                      <span>F: {meal.fat}g</span>
                    </div>
                  </div>
                  <button
                    onClick={() => removeMeal(index)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                    title="Remove meal"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              ))
            )}
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <h4 className="font-semibold mb-4">Daily Totals</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-white rounded-lg">
                <p className="text-gray-500">Calories</p>
                <p className="text-2xl font-bold text-emerald-500">{totalNutrients.calories}</p>
              </div>
              <div className="text-center p-4 bg-white rounded-lg">
                <p className="text-gray-500">Protein</p>
                <p className="text-2xl font-bold text-emerald-500">{totalNutrients.protein}g</p>
              </div>
              <div className="text-center p-4 bg-white rounded-lg">
                <p className="text-gray-500">Carbs</p>
                <p className="text-2xl font-bold text-emerald-500">{totalNutrients.carbs}g</p>
              </div>
              <div className="text-center p-4 bg-white rounded-lg">
                <p className="text-gray-500">Fat</p>
                <p className="text-2xl font-bold text-emerald-500">{totalNutrients.fat}g</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AddFoodModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddCustomFood}
      />
    </div>
  );
};

export default DailyTracker;