import React, { useState, useMemo } from 'react';
import { Search, Filter } from 'lucide-react';
import { FoodItem } from '../../utils/foodData';
import NutritionCard from './NutritionCard';

interface FoodSearchProps {
  foods: FoodItem[];
  onSelectFood?: (food: FoodItem) => void;
}

const FoodSearch: React.FC<FoodSearchProps> = ({ foods, onSelectFood }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'high-protein' | 'low-carb' | 'low-fat'>('all');

  const filteredFoods = useMemo(() => {
    let filtered = foods;

    // Apply search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(food =>
        food.name.toLowerCase().includes(searchLower)
      );
    }

    // Apply nutritional filters
    switch (filterType) {
      case 'high-protein':
        filtered = filtered.filter(food => food.protein >= 20);
        break;
      case 'low-carb':
        filtered = filtered.filter(food => food.carbs <= 10);
        break;
      case 'low-fat':
        filtered = filtered.filter(food => food.fat <= 3);
        break;
    }

    return filtered;
  }, [foods, searchTerm, filterType]);

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search foods..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full rounded-lg border border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 p-3"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-gray-400" />
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as any)}
            className="rounded-lg border border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 p-3"
          >
            <option value="all">All Foods</option>
            <option value="high-protein">High Protein</option>
            <option value="low-carb">Low Carb</option>
            <option value="low-fat">Low Fat</option>
          </select>
        </div>
      </div>

      {filteredFoods.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No foods found matching your criteria</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredFoods.map((food) => (
            <div
              key={food.name}
              onClick={() => onSelectFood?.(food)}
              className="cursor-pointer"
            >
              <NutritionCard food={food} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FoodSearch;