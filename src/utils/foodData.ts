export interface FoodItem {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  isCustom?: boolean;
}

// Helper function to generate unique IDs
const generateId = (name: string): string => {
  return `${name.toLowerCase().replace(/\s+/g, '-')}-${Math.random().toString(36).substr(2, 9)}`;
};

export const commonFoods: FoodItem[] = [
  { id: generateId('chicken-breast'), name: 'Chicken Breast (100g)', calories: 165, protein: 31, carbs: 0, fat: 3.6, isCustom: false },
  { id: generateId('brown-rice'), name: 'Brown Rice (100g)', calories: 111, protein: 2.6, carbs: 23, fat: 0.9, isCustom: false },
  { id: generateId('broccoli'), name: 'Broccoli (100g)', calories: 55, protein: 3.7, carbs: 11.2, fat: 0.6, isCustom: false },
  { id: generateId('salmon'), name: 'Salmon (100g)', calories: 208, protein: 22, carbs: 0, fat: 13, isCustom: false },
  { id: generateId('sweet-potato'), name: 'Sweet Potato (100g)', calories: 86, protein: 1.6, carbs: 20, fat: 0.1, isCustom: false },
  { id: generateId('greek-yogurt'), name: 'Greek Yogurt (100g)', calories: 59, protein: 10, carbs: 3.6, fat: 0.4, isCustom: false },
  { id: generateId('quinoa'), name: 'Quinoa (100g)', calories: 120, protein: 4.4, carbs: 21.3, fat: 1.9, isCustom: false },
  { id: generateId('almonds'), name: 'Almonds (30g)', calories: 164, protein: 6, carbs: 6, fat: 14, isCustom: false },
  { id: generateId('banana'), name: 'Banana (medium)', calories: 105, protein: 1.3, carbs: 27, fat: 0.4, isCustom: false },
  { id: generateId('egg'), name: 'Egg (large)', calories: 72, protein: 6.3, carbs: 0.4, fat: 4.8, isCustom: false }
];