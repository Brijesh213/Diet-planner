import React, { useMemo } from 'react';
import { BarChart2, TrendingUp, Scale, Target } from 'lucide-react';
import { useFitness } from '../context/FitnessContext';

const ProgressStats = () => {
  const { goal, weeklyProgress, currentWeight, targetWeight } = useFitness();

  const weightDifference = useMemo(() => {
    const lastWeight = weeklyProgress[weeklyProgress.length - 1].weight;
    const firstWeight = weeklyProgress[0].weight;
    return lastWeight - firstWeight;
  }, [weeklyProgress]);

  const isOnTrack = useMemo(() => {
    switch (goal) {
      case 'weight-loss':
        return weightDifference < 0;
      case 'muscle-gain':
        return weightDifference > 0;
      default:
        return Math.abs(weightDifference) <= 0.5;
    }
  }, [goal, weightDifference]);

  const getProgressMessage = () => {
    if (goal === 'weight-loss') {
      return weightDifference < 0 
        ? `Great progress! You've lost ${Math.abs(weightDifference).toFixed(1)} kg this week`
        : 'Keep pushing! Focus on your calorie deficit';
    } else if (goal === 'muscle-gain') {
      return weightDifference > 0
        ? `Excellent! You've gained ${weightDifference.toFixed(1)} kg of mass`
        : 'Remember to eat in a calorie surplus and train hard';
    }
    return 'Maintaining weight stability';
  };

  const getGoalText = () => {
    switch (goal) {
      case 'weight-loss':
        return 'Weight Loss Goal';
      case 'muscle-gain':
        return 'Muscle Gain Goal';
      default:
        return 'Maintenance Goal';
    }
  };

  const { maxWeight, minWeight, weightRange } = useMemo(() => {
    const max = Math.max(...weeklyProgress.map((day) => day.weight));
    const min = Math.min(...weeklyProgress.map((day) => day.weight));
    return {
      maxWeight: max,
      minWeight: min,
      weightRange: max - min || 1 // Prevent division by zero
    };
  }, [weeklyProgress]);

  return (
    <div id="progress-stats" className="bg-white rounded-2xl shadow-xl p-8 scroll-mt-20">
      <div className="flex items-center mb-6">
        <BarChart2 className="h-8 w-8 text-emerald-500" />
        <h2 className="text-2xl font-bold ml-3">Progress Stats</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className={`stat-card ${isOnTrack ? 'bg-emerald-50' : 'bg-amber-50'}`}>
          <TrendingUp className={`h-6 w-6 ${isOnTrack ? 'text-emerald-500' : 'text-amber-500'}`} />
          <div className="ml-4">
            <p className="text-sm text-gray-500">{getGoalText()}</p>
            <p className="text-lg font-semibold">{getProgressMessage()}</p>
          </div>
        </div>

        <div className="stat-card">
          <Scale className="h-6 w-6 text-emerald-500" />
          <div className="ml-4">
            <p className="text-sm text-gray-500">Current Weight</p>
            <p className="text-lg font-semibold">{currentWeight} kg</p>
          </div>
        </div>

        <div className="stat-card">
          <Target className="h-6 w-6 text-emerald-500" />
          <div className="ml-4">
            <p className="text-sm text-gray-500">Target Weight</p>
            <p className="text-lg font-semibold">{targetWeight} kg</p>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Weekly Progress</h3>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-emerald-500 rounded-full mr-2"></div>
              <span className="text-sm text-gray-600">Weight</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
              <span className="text-sm text-gray-600">Calories</span>
            </div>
          </div>
        </div>

        <div className="relative h-64">
          <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between h-48">
            {weeklyProgress.map((day, index) => (
              <div key={day.day} className="flex flex-col items-center flex-1">
                <div className="relative w-full px-2">
                  <div
                    className="w-full bg-emerald-500 rounded-t opacity-80"
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

      <div className="mt-6 p-4 rounded-lg bg-gray-50">
        <h4 className="font-semibold mb-2">Progress Analysis</h4>
        <p className="text-gray-600">
          {goal === 'weight-loss' && (
            <>
              You're {isOnTrack ? 'on track' : 'slightly behind'} with your weight loss goal. 
              {weightDifference < 0 
                ? ' Keep up the great work!' 
                : ' Try to maintain a calorie deficit and increase activity.'}
            </>
          )}
          {goal === 'muscle-gain' && (
            <>
              You're {isOnTrack ? 'making good progress' : 'slightly behind'} on your muscle gain journey. 
              {weightDifference > 0 
                ? ' Keep up the consistent training and nutrition!' 
                : ' Focus on progressive overload and eating in a surplus.'}
            </>
          )}
          {goal === 'maintenance' && (
            <>
              Your weight has remained {Math.abs(weightDifference) < 0.5 ? 'stable' : 'somewhat variable'}. 
              {Math.abs(weightDifference) < 0.5 
                ? ' Great job maintaining!' 
                : ' Try to keep your daily calories more consistent.'}
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default ProgressStats;