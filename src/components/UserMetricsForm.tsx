import React, { useState } from 'react';
import { Scale, Activity, Target } from 'lucide-react';
import { UserMetrics, calculateNutritionRequirements } from '../utils/nutritionCalculator';
import { useFitness } from '../context/FitnessContext';

interface UserMetricsFormProps {
  onCalculate: (requirements: ReturnType<typeof calculateNutritionRequirements>) => void;
}

const UserMetricsForm: React.FC<UserMetricsFormProps> = ({ onCalculate }) => {
  const { setGoal, setCurrentWeight, setTargetWeight } = useFitness();
  const [metrics, setMetrics] = useState<UserMetrics>({
    age: 25,
    weight: 70,
    height: 170,
    gender: 'male',
    activityLevel: 'moderate',
    goal: 'maintenance',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const requirements = calculateNutritionRequirements(metrics);
    onCalculate(requirements);
    
    // Update context with new values
    setGoal(metrics.goal);
    setCurrentWeight(metrics.weight);
    setTargetWeight(metrics.goal === 'weight-loss' ? metrics.weight - 5 : 
                   metrics.goal === 'muscle-gain' ? metrics.weight + 5 : 
                   metrics.weight);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setMetrics(prev => ({
      ...prev,
      [name]: name === 'age' || name === 'weight' || name === 'height' 
        ? Number(value) 
        : value
    }));
  };

  return (
    <div id="user-metrics" className="bg-white rounded-2xl shadow-xl p-8 scroll-mt-20">
      <div className="flex items-center mb-6">
        <Scale className="h-8 w-8 text-emerald-500" />
        <h2 className="text-2xl font-bold ml-3">Your Metrics</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
            <input
              type="number"
              name="age"
              value={metrics.age}
              onChange={handleChange}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
              required
              min="15"
              max="100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Weight (kg)</label>
            <input
              type="number"
              name="weight"
              value={metrics.weight}
              onChange={handleChange}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
              required
              min="30"
              max="300"
              step="0.1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Height (cm)</label>
            <input
              type="number"
              name="height"
              value={metrics.height}
              onChange={handleChange}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
              required
              min="100"
              max="250"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
            <select
              name="gender"
              value={metrics.gender}
              onChange={handleChange}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Activity Level</label>
            <select
              name="activityLevel"
              value={metrics.activityLevel}
              onChange={handleChange}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
            >
              <option value="sedentary">Sedentary (office job, little exercise)</option>
              <option value="light">Light (light exercise 1-3 days/week)</option>
              <option value="moderate">Moderate (moderate exercise 3-5 days/week)</option>
              <option value="active">Active (hard exercise 6-7 days/week)</option>
              <option value="very-active">Very Active (hard exercise & physical job)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Goal</label>
            <select
              name="goal"
              value={metrics.goal}
              onChange={handleChange}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
            >
              <option value="weight-loss">Weight Loss</option>
              <option value="maintenance">Maintenance</option>
              <option value="muscle-gain">Muscle Gain</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors flex items-center"
          >
            <Target className="w-5 h-5 mr-2" />
            Calculate Requirements
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserMetricsForm;