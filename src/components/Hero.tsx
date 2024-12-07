import React from 'react';
import { ArrowRight, Dumbbell, Target, Trophy } from 'lucide-react';

const Hero = () => {
  const handleGetStarted = () => {
    const metricsSection = document.querySelector('#user-metrics');
    if (metricsSection) {
      metricsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-gray-100 opacity-50" />

      {/* Hero Content */}
      <div className="relative max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Text Content */}
              <div>
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block">Transform your body</span>
                  <span className="block text-emerald-500">achieve your goals</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl md:mt-5 md:text-xl">
                  Personalized nutrition plans, workout routines, and progress tracking all in one place. Start your fitness journey today.
                </p>
                
                {/* Feature Highlights */}
                <div className="mt-8 grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Dumbbell className="h-5 w-5 text-emerald-500" />
                    <span className="text-sm text-gray-600">Custom Workouts</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Target className="h-5 w-5 text-emerald-500" />
                    <span className="text-sm text-gray-600">Nutrition Plans</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Trophy className="h-5 w-5 text-emerald-500" />
                    <span className="text-sm text-gray-600">Progress Tracking</span>
                  </div>
                </div>

                <div className="mt-8 sm:flex sm:justify-start">
                  <button
                    onClick={handleGetStarted}
                    className="w-full sm:w-auto flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-emerald-500 hover:bg-emerald-600 md:py-4 md:text-lg md:px-10 transition-all hover:scale-105"
                  >
                    Start Free Trial
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Image Grid */}
              <div className="hidden lg:grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition-transform">
                    <img
                      src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=800&q=80"
                      alt="Fitness Training"
                      className="w-full h-48 object-cover"
                    />
                  </div>
                  <div className="rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition-transform">
                    <img
                      src="https://images.unsplash.com/photo-1576678927484-cc907957088c?auto=format&fit=crop&w=800&q=80"
                      alt="Workout Session"
                      className="w-full h-64 object-cover"
                    />
                  </div>
                </div>
                <div className="space-y-4 mt-8">
                  <div className="rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition-transform">
                    <img
                      src="https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?auto=format&fit=crop&w=800&q=80"
                      alt="Strength Training"
                      className="w-full h-64 object-cover"
                    />
                  </div>
                  <div className="rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition-transform">
                    <img
                      src="https://images.unsplash.com/photo-1584466977773-e625c37cdd50?auto=format&fit=crop&w=800&q=80"
                      alt="Muscle Building"
                      className="w-full h-48 object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Hero;