import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { FoodItem } from '../../utils/foodData';

interface FoodDatabaseProps {
  foods: FoodItem[];
  searchTerm: string;
  onAddMeal: (food: FoodItem) => void;
  onRemoveFood: (food: FoodItem) => void;
}

const FoodDatabase: React.FC<FoodDatabaseProps> = ({
  foods,
  searchTerm,
  onAddMeal,
  onRemoveFood,
}) => {
  const handleRemoveFood = (food: FoodItem) => {
    if (food.isCustom) {
      onRemoveFood(food);
    }
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Food Database</h3>
      <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
        {foods.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No foods found matching "{searchTerm}"</p>
        ) : (
          foods.map((food) => (
            <div key={food.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div>
                <div className="flex items-center">
                  <p className="font-medium">{food.name}</p>
                  {food.isCustom && (
                    <span className="ml-2 px-2 py-1 text-xs font-medium text-emerald-700 bg-emerald-100 rounded-full">
                      Custom
                    </span>
                  )}
                </div>
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
              <div className="flex space-x-2">
                <button
                  onClick={() => onAddMeal(food)}
                  className="p-2 text-emerald-500 hover:bg-emerald-50 rounded-full transition-colors"
                  title="Add to meals"
                >
                  <Plus className="h-5 w-5" />
                </button>
                {food.isCustom && (
                  <button
                    onClick={() => handleRemoveFood(food)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                    title="Remove from database"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FoodDatabase;