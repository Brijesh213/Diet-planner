import React from 'react';
import { Menu, X, Dumbbell } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleGetStarted = () => {
    const metricsSection = document.querySelector('#user-metrics');
    if (metricsSection) {
      metricsSection.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  const handleNavClick = (sectionId: string) => {
    const section = document.querySelector(`#${sectionId}`);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Dumbbell className="h-8 w-8 text-emerald-500" />
            <span className="ml-2 text-xl font-bold text-gray-800">FitLife</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => handleNavClick('user-metrics')} className="nav-link">
              Dashboard
            </button>
            <button onClick={() => handleNavClick('daily-tracker')} className="nav-link">
              Meal Planner
            </button>
            <button onClick={() => handleNavClick('workout-challenge')} className="nav-link">
              Workouts
            </button>
            <button 
              onClick={handleGetStarted}
              className="btn-primary transition-transform hover:scale-105"
            >
              Get Started
            </button>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden pb-4">
            <button onClick={() => handleNavClick('user-metrics')} className="mobile-nav-link w-full text-left">
              Dashboard
            </button>
            <button onClick={() => handleNavClick('daily-tracker')} className="mobile-nav-link w-full text-left">
              Meal Planner
            </button>
            <button onClick={() => handleNavClick('workout-challenge')} className="mobile-nav-link w-full text-left">
              Workouts
            </button>
            <button 
              onClick={handleGetStarted}
              className="w-full btn-primary mt-4"
            >
              Get Started
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;