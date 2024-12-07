import React from 'react';
import { ProgressDay } from '../../utils/progressCalculator';

interface ProgressChartProps {
  data: ProgressDay[];
  goal: 'weight-loss' | 'maintenance' | 'muscle-gain';
}

const ProgressChart: React.FC<ProgressChartProps> = ({ data, goal }) => {
  const maxWeight = Math.max(...data.map(day => day.weight));
  const minWeight = Math.min(...data.map(day => day.weight));
  const weightRange = maxWeight - minWeight || 1;

  const getWeightBarColor = (current: number, prev: number) => {
    if (goal === 'weight-loss') {
      return current < prev ? 'bg-emerald-500' : 'bg-amber-500';
    }
    if (goal === 'muscle-gain') {
      return current > prev ? 'bg-emerald-500' : 'bg-amber-500';
    }
    return Math.abs(current - prev) < 0.2 ? 'bg-emerald-500' : 'bg-amber-500';
  };

  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Weekly Progress</h3>
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-emerald-500 rounded-full mr-2"></div>
            <span className="text-sm text-gray-600">On Track</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-amber-500 rounded-full mr-2"></div>
            <span className="text-sm text-gray-600">Need Focus</span>
          </div>
        </div>
      </div>

      <div className="relative h-64">
        <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between h-48">
          {data.map((day, index) => (
            <div key={day.day} className="flex flex-col items-center flex-1">
              <div className="relative w-full px-2">
                <div
                  className={`w-full rounded-t opacity-80 ${
                    getWeightBarColor(day.weight, data[index - 1]?.weight || day.weight)
                  }`}
                  style={{
                    height: `${((day.weight - minWeight) / weightRange) * 180}px`,
                  }}
                ></div>
                <div
                  className="absolute bottom-0 left-0 w-full bg-blue-500 rounded-t opacity-30"
                  style={{
                    height: `${(day.calories / 3000) * 180}px`,
                  }}
                ></div>
              </div>
              <div className="mt-2 text-center">
                <p className="text-sm font-medium">{day.day}</p>
                <p className="text-xs text-gray-500">{day.weight.toFixed(1)} kg</p>
                <p className="text-xs text-gray-500">{day.calories} cal</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressChart;