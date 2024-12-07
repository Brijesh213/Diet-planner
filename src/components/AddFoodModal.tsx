import React, { useState, useEffect } from 'react';
import { X, Calculator } from 'lucide-react';
import { FoodItem } from '../utils/foodData';
import { calculateNutrients, standardNutrients, FoodCategory } from '../utils/foodCalculator';

interface AddFoodModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (food: FoodItem) => void;
}

// Helper function to generate unique IDs
const generateId = (name: string): string => {
  return `${name.toLowerCase().replace(/\s+/g, '-')}-${Math.random().toString(36).substr(2, 9)}`;
};

const AddFoodModal = ({ isOpen, onClose, onAdd }: AddFoodModalProps) => {
  const [customName, setCustomName] = useState('');
  const [amount, setAmount] = useState<number>(100);
  const [selectedFood, setSelectedFood] = useState<FoodCategory | ''>('');
  const [calculatedNutrients, setCalculatedNutrients] = useState<Omit<FoodItem, 'name' | 'id'>>({
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
  });
  const [useCustomValues, setUseCustomValues] = useState(false);

  useEffect(() => {
    if (selectedFood && !useCustomValues) {
      const nutrients = calculateNutrients(selectedFood, amount);
      setCalculatedNutrients(nutrients);
    }
  }, [selectedFood, amount, useCustomValues]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customName.trim()) {
      onAdd({
        id: generateId(customName),
        name: customName,
        ...calculatedNutrients,
      });
      resetForm();
      onClose();
    }
  };

  const resetForm = () => {
    setCustomName('');
    setAmount(100);
    setSelectedFood('');
    setCalculatedNutrients({ calories: 0, protein: 0, carbs: 0, fat: 0 });
    setUseCustomValues(false);
  };

  const handleNutrientChange = (
    key: keyof Omit<FoodItem, 'name' | 'id'>,
    value: number
  ) => {
    setCalculatedNutrients(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Add Custom Food</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Food Name
              </label>
              <input
                type="text"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                className="w-full rounded-md border border-gray-300 p-2 focus:border-emerald-500 focus:ring-emerald-500"
                placeholder="e.g., Grilled Chicken Breast"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Amount (grams)
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full rounded-md border border-gray-300 p-2 focus:border-emerald-500 focus:ring-emerald-500"
                min="0"
                required
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-gray-700">
                Select Food Type for Automatic Calculation
              </label>
              <button
                type="button"
                onClick={() => setUseCustomValues(!useCustomValues)}
                className="text-sm text-emerald-600 hover:text-emerald-700"
              >
                {useCustomValues ? 'Use Auto Calculate' : 'Enter Custom Values'}
              </button>
            </div>

            {!useCustomValues && (
              <select
                value={selectedFood}
                onChange={(e) => setSelectedFood(e.target.value as FoodCategory)}
                className="w-full rounded-md border border-gray-300 p-2 focus:border-emerald-500 focus:ring-emerald-500"
                disabled={useCustomValues}
              >
                <option value="">Select a food type...</option>
                {Object.keys(standardNutrients).map((food) => (
                  <option key={food} value={food}>
                    {food.charAt(0).toUpperCase() + food.slice(1)}
                  </option>
                ))}
              </select>
            )}
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center mb-4">
              <Calculator className="h-5 w-5 text-emerald-500 mr-2" />
              <h4 className="font-medium">Nutritional Values</h4>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Calories
                </label>
                <input
                  type="number"
                  value={calculatedNutrients.calories}
                  onChange={(e) => handleNutrientChange('calories', Number(e.target.value))}
                  className="w-full rounded-md border border-gray-300 p-2 focus:border-emerald-500 focus:ring-emerald-500"
                  min="0"
                  readOnly={!useCustomValues}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Protein (g)
                </label>
                <input
                  type="number"
                  value={calculatedNutrients.protein}
                  onChange={(e) => handleNutrientChange('protein', Number(e.target.value))}
                  className="w-full rounded-md border border-gray-300 p-2 focus:border-emerald-500 focus:ring-emerald-500"
                  min="0"
                  step="0.1"
                  readOnly={!useCustomValues}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Carbs (g)
                </label>
                <input
                  type="number"
                  value={calculatedNutrients.carbs}
                  onChange={(e) => handleNutrientChange('carbs', Number(e.target.value))}
                  className="w-full rounded-md border border-gray-300 p-2 focus:border-emerald-500 focus:ring-emerald-500"
                  min="0"
                  step="0.1"
                  readOnly={!useCustomValues}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fat (g)
                </label>
                <input
                  type="number"
                  value={calculatedNutrients.fat}
                  onChange={(e) => handleNutrientChange('fat', Number(e.target.value))}
                  className="w-full rounded-md border border-gray-300 p-2 focus:border-emerald-500 focus:ring-emerald-500"
                  min="0"
                  step="0.1"
                  readOnly={!useCustomValues}
                  required
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-emerald-500 hover:bg-emerald-600 rounded-md transition-colors"
            >
              Add Food
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddFoodModal;