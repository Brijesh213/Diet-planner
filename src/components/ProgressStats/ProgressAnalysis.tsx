import React from 'react';
import { ProgressDay } from '../../utils/progressCalculator';
import { getGoalMetrics } from '../../utils/progressCalculator';

interface ProgressAnalysisProps {
  data: ProgressDay[];
  goal: 'weight-loss' | 'maintenance' | 'muscle-gain';
  isOnTrack: boolean;
  weightDifference: number;
}

const ProgressAnalysis: React.FC<ProgressAnalysisProps> = ({
  goal,
  isOnTrack,
  weightDifference
}) => {
  const goalMetrics = getGoalMetrics(goal);

  const getAnalysisMessage = () => {
    const messages = {
      'weight-loss': {
        onTrack: `You're making excellent progress on your weight loss journey! You've lost ${Math.abs(weightDifference).toFixed(1)} kg this week, which is aligned with the target of ${Math.abs(goalMetrics.weeklyTarget)}kg per week. Keep maintaining your calorie deficit and staying active.`,
        offTrack: `Your weight loss has slowed down. You're aiming to lose ${Math.abs(goalMetrics.weeklyTarget)}kg per week. Try reducing your daily calories by 200-300 and increasing your activity level. Focus on protein-rich foods to maintain muscle mass.`
      },
      'muscle-gain': {
        onTrack: `Great progress on your muscle gain goal! You've gained ${weightDifference.toFixed(1)} kg this week, close to the target of ${goalMetrics.weeklyTarget}kg per week. Keep up the progressive overload and protein intake.`,
        offTrack: `Your muscle gain progress could improve. You're aiming to gain ${goalMetrics.weeklyTarget}kg per week. Ensure you're eating in a caloric surplus of ${goalMetrics.calorieTarget - 2400} calories and progressively increasing your weights in training.`
      },
      'maintenance': {
        onTrack: `You're doing a great job maintaining your weight! Your fluctuations are within the normal range of ±0.5kg.`,
        offTrack: `Your weight is fluctuating more than ideal for maintenance. Try to keep your daily calories closer to ${goalMetrics.calorieTarget} to maintain stability.`
      }
    };

    return messages[goal][isOnTrack ? 'onTrack' : 'offTrack'];
  };

  return (
    <div className="mt-6 p-4 rounded-lg bg-gray-50">
      <h4 className="font-semibold mb-2">Progress Analysis</h4>
      <p className="text-gray-600">{getAnalysisMessage()}</p>
      
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className={`p-3 rounded-lg ${isOnTrack ? 'bg-emerald-100' : 'bg-amber-100'}`}>
          <h5 className="font-medium mb-1">Weekly Target</h5>
          <p className="text-sm">
            {goal === 'weight-loss' && `Lose ${Math.abs(goalMetrics.weeklyTarget)}kg per week`}
            {goal === 'muscle-gain' && `Gain ${goalMetrics.weeklyTarget}kg per week`}
            {goal === 'maintenance' && 'Maintain current weight (±0.5kg)'}
          </p>
        </div>
        <div className="p-3 rounded-lg bg-blue-100">
          <h5 className="font-medium mb-1">Calorie Target</h5>
          <p className="text-sm">
            {goal === 'weight-loss' && `${goalMetrics.calorieTarget} calories (deficit)`}
            {goal === 'muscle-gain' && `${goalMetrics.calorieTarget} calories (surplus)`}
            {goal === 'maintenance' && `${goalMetrics.calorieTarget} calories (maintenance)`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProgressAnalysis;