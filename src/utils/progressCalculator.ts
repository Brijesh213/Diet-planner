export interface ProgressDay {
  day: string;
  weight: number;
  calories: number;
}

export const calculateWeeklyProgress = (
  currentWeight: number,
  goal: 'weight-loss' | 'maintenance' | 'muscle-gain'
): ProgressDay[] => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  // Define goal-specific changes
  const weeklyChange = {
    'weight-loss': -0.5, // Lose 0.5kg per week
    'maintenance': 0,    // Maintain weight
    'muscle-gain': 0.3   // Gain 0.3kg per week
  }[goal];

  // Define goal-specific calorie targets
  const baseCalories = {
    'weight-loss': 2000,    // Caloric deficit
    'maintenance': 2400,    // Maintenance calories
    'muscle-gain': 2800     // Caloric surplus
  }[goal];

  // Add some natural variation to make it realistic
  const calorieVariation = 200; // Maximum daily calorie variation
  const weightVariation = 0.2;  // Maximum daily weight variation

  return days.map((day, index) => {
    // Calculate progressive weight change
    const progressWeight = currentWeight + (weeklyChange * (index / 7));
    
    // Add small random variation to make it more realistic
    const dailyVariation = (Math.random() * weightVariation * 2) - weightVariation;
    const finalWeight = progressWeight + dailyVariation;

    // Calculate calories with some variation
    const dailyCalories = baseCalories + (Math.random() * calorieVariation - calorieVariation / 2);

    return {
      day,
      weight: Number(finalWeight.toFixed(1)),
      calories: Math.round(dailyCalories)
    };
  });
};

export const getGoalMetrics = (goal: 'weight-loss' | 'maintenance' | 'muscle-gain') => {
  return {
    'weight-loss': {
      weeklyTarget: -0.5,
      calorieTarget: 2000,
      description: 'Aiming for healthy weight loss of 0.5kg per week'
    },
    'maintenance': {
      weeklyTarget: 0,
      calorieTarget: 2400,
      description: 'Maintaining current weight with stable calories'
    },
    'muscle-gain': {
      weeklyTarget: 0.3,
      calorieTarget: 2800,
      description: 'Building muscle with a moderate caloric surplus'
    }
  }[goal];
};