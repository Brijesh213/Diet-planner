import React, { useMemo } from 'react';
import { BarChart2, TrendingUp, Scale, Target } from 'lucide-react';
import { useFitness } from '../../context/FitnessContext';
import ProgressChart from './ProgressChart';
import ProgressAnalysis from './ProgressAnalysis';

const ProgressStats = () => {
  const { goal, weeklyProgress, currentWeight, targetWeight } = useFitness();

  const { weightDifference, isOnTrack } = useMemo(() => {
    const lastWeight = weeklyProgress[weeklyProgress.length - 1].weight;
    const firstWeight = weeklyProgress[0].weight;
    const diff = lastWeight - firstWeight;

    const onTrack = goal === 'weight-loss' ? diff < 0 :
                   goal === 'muscle-gain' ? diff > 0 :
                   Math.abs(diff) <= 0.5;

    return { weightDifference: diff, isOnTrack: onTrack };
  }, [weeklyProgress, goal]);

  const getGoalText = () => ({
    'weight-loss': 'Weight Loss Goal',
    'muscle-gain': 'Muscle Gain Goal',
    'maintenance': 'Maintenance Goal'
  }[goal]);

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
            <p className="text-lg font-semibold">
              {Math.abs(weightDifference).toFixed(1)} kg
              {goal === 'weight-loss' ? ' lost' : goal === 'muscle-gain' ? ' gained' : ' maintained'}
            </p>
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

      <ProgressChart data={weeklyProgress} goal={goal} />
      
      <ProgressAnalysis
        data={weeklyProgress}
        goal={goal}
        isOnTrack={isOnTrack}
        weightDifference={weightDifference}
      />
    </div>
  );
};

export default ProgressStats;