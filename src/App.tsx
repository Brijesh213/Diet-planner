import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import UserMetricsForm from './components/UserMetricsForm';
import NutritionDisplay from './components/NutritionDisplay';
import DailyTracker from './components/DailyTracker';
import WorkoutChallenge from './components/WorkoutChallenge';
import FitnessGallery from './components/FitnessGallery';
import { FitnessProvider } from './context/FitnessContext';
import type { NutritionRequirements } from './utils/nutritionCalculator';

function App() {
  const [nutritionRequirements, setNutritionRequirements] = useState<NutritionRequirements | null>(null);

  return (
    <FitnessProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Hero />
          <div className="mt-12">
            <UserMetricsForm onCalculate={setNutritionRequirements} />
            {nutritionRequirements && <NutritionDisplay requirements={nutritionRequirements} />}
          </div>
          
          <div className="mt-12">
            <FitnessGallery />
          </div>

          <div className="mt-12">
            <DailyTracker />
          </div>

          <div className="mt-12">
            <WorkoutChallenge />
          </div>
        </main>
      </div>
    </FitnessProvider>
  );
}

export default App;