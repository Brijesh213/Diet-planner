import React from 'react';
import { Pie, Activity } from 'lucide-react';
import type { NutritionRequirements } from '../utils/nutritionCalculator';

interface NutritionDisplayProps {
  requirements: NutritionRequirements;
}

const NutritionDisplay: React.FC<NutritionDisplayProps> = ({ requirements }) => {
  const { calories, protein, carbs, fat } = requirements;
  
  const macroPercentages = {
    protein: Math.round((protein * 4 / calories) * 100),
    carbs: Math.round((carbs * 4 / calories) * 100),
    fat: Math.round((fat * 9 / calories) * 100),
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 mt-6">
      <div className="flex items-center mb-6">
        <Activity className="h-8 w-8 text-emerald-500" />
        <h2 className="text-2xl font-bold ml-3">Your Daily Requirements</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="bg-emerald-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Daily Calories</h3>
            <p className="text-4xl font-bold text-emerald-500">{calories}</p>
            <p className="text-gray-500 mt-2">calories per day</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Macronutrient Split</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Protein</span>
                  <span className="text-sm text-gray-500">{macroPercentages.protein}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-emerald-500 rounded-full h-2" 
                    style={{ width: `${macroPercentages.protein}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Carbs</span>
                  <span className="text-sm text-gray-500">{macroPercentages.carbs}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-500 rounded-full h-2" 
                    style={{ width: `${macroPercentages.carbs}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Fat</span>
                  <span className="text-sm text-gray-500">{macroPercentages.fat}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-yellow-500 rounded-full h-2" 
                    style={{ width: `${macroPercentages.fat}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-4">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="font-medium text-gray-500 mb-2">Daily Protein</h4>
              <p className="text-2xl font-bold">{protein}g</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="font-medium text-gray-500 mb-2">Daily Carbs</h4>
              <p className="text-2xl font-bold">{carbs}g</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="font-medium text-gray-500 mb-2">Daily Fat</h4>
              <p className="text-2xl font-bold">{fat}g</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NutritionDisplay;