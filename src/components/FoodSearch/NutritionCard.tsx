import React from 'react';
import { Info } from 'lucide-react';
import { FoodItem } from '../../utils/foodData';

interface NutritionCardProps {
  food: FoodItem;
}

const NutritionCard: React.FC<NutritionCardProps> = ({ food }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{food.name}</h3>
          <p className="text-sm text-gray-500 mt-1">{food.calories} calories per serving</p>
        </div>
        <div className="bg-emerald-100 rounded-full p-2">
          <Info className="h-5 w-5 text-emerald-600" />
        </div>
      </div>
      
      <div className="mt-4 grid grid-cols-3 gap-4">
        <div className="text-center p-2 bg-gray-50 rounded-lg">
          <p className="text-sm font-medium text-gray-600">Protein</p>
          <p className="text-lg font-semibold text-emerald-600">{food.protein}g</p>
        </div>
        <div className="text-center p-2 bg-gray-50 rounded-lg">
          <p className="text-sm font-medium text-gray-600">Carbs</p>
          <p className="text-lg font-semibold text-emerald-600">{food.carbs}g</p>
        </div>
        <div className="text-center p-2 bg-gray-50 rounded-lg">
          <p className="text-sm font-medium text-gray-600">Fat</p>
          <p className="text-lg font-semibold text-emerald-600">{food.fat}g</p>
        </div>
      </div>
    </div>
  );
};

export default NutritionCard;