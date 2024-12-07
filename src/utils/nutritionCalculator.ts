export interface UserMetrics {
  age: number;
  weight: number; // in kg
  height: number; // in cm
  gender: 'male' | 'female';
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very-active';
  goal: 'weight-loss' | 'maintenance' | 'muscle-gain';
}

export interface NutritionRequirements {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

const ACTIVITY_MULTIPLIERS = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  'very-active': 1.9,
};

const GOAL_MULTIPLIERS = {
  'weight-loss': 0.8,
  maintenance: 1,
  'muscle-gain': 1.2,
};

export const calculateBMR = (metrics: UserMetrics): number => {
  const { weight, height, age, gender } = metrics;
  
  if (gender === 'male') {
    return 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
  } else {
    return 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
  }
};

export const calculateNutritionRequirements = (metrics: UserMetrics): NutritionRequirements => {
  const bmr = calculateBMR(metrics);
  const tdee = bmr * ACTIVITY_MULTIPLIERS[metrics.activityLevel];
  const targetCalories = Math.round(tdee * GOAL_MULTIPLIERS[metrics.goal]);

  // Calculate macronutrient splits based on goals
  let proteinMultiplier = metrics.goal === 'muscle-gain' ? 2.2 : 2;
  let protein = Math.round(metrics.weight * proteinMultiplier); // g/kg of bodyweight
  let fat = Math.round((targetCalories * 0.25) / 9); // 25% of calories from fat
  let carbs = Math.round((targetCalories - (protein * 4) - (fat * 9)) / 4); // Remaining calories from carbs

  return {
    calories: targetCalories,
    protein,
    carbs,
    fat,
  };
};