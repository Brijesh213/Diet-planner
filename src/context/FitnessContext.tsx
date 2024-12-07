import React, { createContext, useContext, useState } from 'react';

interface FitnessContextType {
  goal: 'weight-loss' | 'maintenance' | 'muscle-gain';
  setGoal: (goal: 'weight-loss' | 'maintenance' | 'muscle-gain') => void;
  currentWeight: number;
  setCurrentWeight: (weight: number) => void;
  targetWeight: number;
  setTargetWeight: (weight: number) => void;
}

const FitnessContext = createContext<FitnessContextType | undefined>(undefined);

export const FitnessProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [goal, setGoal] = useState<'weight-loss' | 'maintenance' | 'muscle-gain'>('maintenance');
  const [currentWeight, setCurrentWeight] = useState(75);
  const [targetWeight, setTargetWeight] = useState(75);

  return (
    <FitnessContext.Provider
      value={{
        goal,
        setGoal,
        currentWeight,
        setCurrentWeight,
        targetWeight,
        setTargetWeight,
      }}
    >
      {children}
    </FitnessContext.Provider>
  );
};

export const useFitness = () => {
  const context = useContext(FitnessContext);
  if (context === undefined) {
    throw new Error('useFitness must be used within a FitnessProvider');
  }
  return context;
};