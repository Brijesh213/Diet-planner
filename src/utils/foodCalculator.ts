// Standard nutritional values per 100g
export const standardNutrients = {
  // Proteins
  chicken: { calories: 165, protein: 31, carbs: 0, fat: 3.6 },
  beef: { calories: 250, protein: 26, carbs: 0, fat: 17 },
  fish: { calories: 206, protein: 22, carbs: 0, fat: 12 },
  eggs: { calories: 155, protein: 13, carbs: 1.1, fat: 11 },
  tofu: { calories: 76, protein: 8, carbs: 1.9, fat: 4.8 },

  // Carbohydrates
  rice: { calories: 130, protein: 2.7, carbs: 28, fat: 0.3 },
  pasta: { calories: 158, protein: 5.8, carbs: 31, fat: 0.9 },
  potato: { calories: 77, protein: 2, carbs: 17, fat: 0.1 },
  bread: { calories: 265, protein: 9, carbs: 49, fat: 3.2 },
  oats: { calories: 389, protein: 16.9, carbs: 66, fat: 6.9 },

  // Vegetables
  broccoli: { calories: 34, protein: 2.8, carbs: 7, fat: 0.4 },
  spinach: { calories: 23, protein: 2.9, carbs: 3.6, fat: 0.4 },
  carrot: { calories: 41, protein: 0.9, carbs: 10, fat: 0.2 },
  tomato: { calories: 18, protein: 0.9, carbs: 3.9, fat: 0.2 },

  // Fruits
  apple: { calories: 52, protein: 0.3, carbs: 14, fat: 0.2 },
  banana: { calories: 89, protein: 1.1, carbs: 23, fat: 0.3 },
  orange: { calories: 47, protein: 0.9, carbs: 12, fat: 0.1 },

  // Dairy
  milk: { calories: 42, protein: 3.4, carbs: 5, fat: 1 },
  yogurt: { calories: 59, protein: 3.5, carbs: 4.7, fat: 3.3 },
  cheese: { calories: 402, protein: 25, carbs: 1.3, fat: 33 },

  // Nuts & Seeds
  almonds: { calories: 579, protein: 21, carbs: 22, fat: 50 },
  peanuts: { calories: 567, protein: 26, carbs: 16, fat: 49 },
  chia: { calories: 486, protein: 17, carbs: 42, fat: 31 },
};

export type FoodCategory = keyof typeof standardNutrients;

export const calculateNutrients = (foodType: FoodCategory, amount: number) => {
  const baseNutrients = standardNutrients[foodType];
  const multiplier = amount / 100; // Convert to percentage of 100g

  return {
    calories: Math.round(baseNutrients.calories * multiplier),
    protein: Math.round(baseNutrients.protein * multiplier * 10) / 10,
    carbs: Math.round(baseNutrients.carbs * multiplier * 10) / 10,
    fat: Math.round(baseNutrients.fat * multiplier * 10) / 10,
  };
};