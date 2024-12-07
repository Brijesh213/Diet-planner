import React from 'react';
import { X } from 'lucide-react';
import { FoodItem } from '../../utils/foodData';

interface MealsListProps {
  meals: FoodItem[];
  onRemoveMeal: (index: number) => void;
}

const MealsList: React.FC<MealsListProps> = ({ meals, onRemoveMeal }) => {
  return (
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
                onClick={() => onRemoveMeal(index)}
                className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                title="Remove meal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MealsList;