import React from 'react';

interface NutritionTotals {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

interface NutritionSummaryProps {
  totals: NutritionTotals;
}

const NutritionSummary: React.FC<NutritionSummaryProps> = ({ totals }) => {
  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <h4 className="font-semibold mb-4">Daily Totals</h4>
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center p-4 bg-white rounded-lg">
          <p className="text-gray-500">Calories</p>
          <p className="text-2xl font-bold text-emerald-500">{totals.calories}</p>
        </div>
        <div className="text-center p-4 bg-white rounded-lg">
          <p className="text-gray-500">Protein</p>
          <p className="text-2xl font-bold text-emerald-500">{totals.protein}g</p>
        </div>
        <div className="text-center p-4 bg-white rounded-lg">
          <p className="text-gray-500">Carbs</p>
          <p className="text-2xl font-bold text-emerald-500">{totals.carbs}g</p>
        </div>
        <div className="text-center p-4 bg-white rounded-lg">
          <p className="text-gray-500">Fat</p>
          <p className="text-2xl font-bold text-emerald-500">{totals.fat}g</p>
        </div>
      </div>
    </div>
  );
};

export default NutritionSummary;