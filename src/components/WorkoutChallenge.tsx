import React, { useState } from 'react';
import { Dumbbell, CheckCircle, Calendar, Info } from 'lucide-react';

interface Exercise {
  name: string;
  sets: number;
  reps: string;
  completed: boolean;
  instructions: string;
  image: string;
}

interface WorkoutDay {
  day: number;
  focus: string;
  exercises: Exercise[];
}

const workoutPlans: WorkoutDay[] = [
  {
    day: 1,
    focus: 'Upper Body',
    exercises: [
      { 
        name: 'Push-ups', 
        sets: 3, 
        reps: '12-15', 
        completed: false,
        instructions: 'Keep your core tight and elbows close to your body',
        image: 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?auto=format&fit=crop&w=800&q=80'
      },
      { 
        name: 'Dumbbell Rows', 
        sets: 3, 
        reps: '12 each side', 
        completed: false,
        instructions: 'Pull your elbow straight back, keeping it close to your body',
        image: 'https://images.unsplash.com/photo-1532029837206-abbe2b7620e3?auto=format&fit=crop&w=800&q=80'
      },
      { 
        name: 'Shoulder Press', 
        sets: 3, 
        reps: '10-12', 
        completed: false,
        instructions: 'Press dumbbells straight up, fully extending your arms',
        image: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=800&q=80'
      },
      { 
        name: 'Tricep Dips', 
        sets: 3, 
        reps: '12-15', 
        completed: false,
        instructions: 'Lower yourself slowly and keep your elbows pointing backward',
        image: 'https://images.unsplash.com/photo-1530822847156-5df684ec5ee1?auto=format&fit=crop&w=800&q=80'
      }
    ],
  },
  {
    day: 2,
    focus: 'Lower Body',
    exercises: [
      { 
        name: 'Squats', 
        sets: 4, 
        reps: '15-20', 
        completed: false,
        instructions: 'Keep your chest up and knees tracking over your toes',
        image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=800&q=80'
      },
      { 
        name: 'Lunges', 
        sets: 3, 
        reps: '12 each leg', 
        completed: false,
        instructions: 'Step forward and lower your back knee toward the ground',
        image: 'https://images.unsplash.com/photo-1597452485669-2c7bb5fef90d?auto=format&fit=crop&w=800&q=80'
      },
      { 
        name: 'Calf Raises', 
        sets: 3, 
        reps: '20', 
        completed: false,
        instructions: 'Rise up onto your toes, hold briefly at the top',
        image: 'https://images.unsplash.com/photo-1434608519344-49d77a699e1d?auto=format&fit=crop&w=800&q=80'
      },
      { 
        name: 'Glute Bridges', 
        sets: 3, 
        reps: '15', 
        completed: false,
        instructions: 'Squeeze your glutes at the top of the movement',
        image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80'
      }
    ],
  },
];

const WorkoutChallenge = () => {
  const [currentDay, setCurrentDay] = useState(1);
  const [selectedWorkout, setSelectedWorkout] = useState<WorkoutDay>(workoutPlans[0]);
  const [showInstructions, setShowInstructions] = useState<string | null>(null);

  const handleDayChange = (day: number) => {
    setCurrentDay(day);
    const workout = workoutPlans.find(w => w.day === day) || workoutPlans[0];
    setSelectedWorkout(workout);
  };

  const toggleExercise = (index: number) => {
    const updatedExercises = selectedWorkout.exercises.map((exercise, i) => {
      if (i === index) {
        return { ...exercise, completed: !exercise.completed };
      }
      return exercise;
    });

    setSelectedWorkout({ ...selectedWorkout, exercises: updatedExercises });
  };

  return (
    <div id="workout-challenge" className="bg-white rounded-2xl shadow-xl p-8 scroll-mt-20">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Dumbbell className="h-8 w-8 text-emerald-500" />
          <h2 className="text-2xl font-bold ml-3">Workout Challenge</h2>
        </div>
        <div className="flex items-center space-x-2">
          <Calendar className="h-6 w-6 text-emerald-500" />
          <select
            value={currentDay}
            onChange={(e) => handleDayChange(Number(e.target.value))}
            className="ml-2 rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
          >
            {workoutPlans.map((plan) => (
              <option key={plan.day} value={plan.day}>
                Day {plan.day} - {plan.focus}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Today's Focus: {selectedWorkout.focus}</h3>
        <p className="text-gray-500">Complete all exercises with proper form for best results.</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {selectedWorkout.exercises.map((exercise, index) => (
          <div
            key={exercise.name}
            className={`p-4 rounded-lg border transition-colors ${
              exercise.completed ? 'bg-emerald-50 border-emerald-200' : 'bg-gray-50 border-gray-200'
            }`}
          >
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/3">
                <div className="relative h-48 rounded-lg overflow-hidden">
                  <img
                    src={exercise.image}
                    alt={exercise.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-white font-semibold">{exercise.name}</h3>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-lg">{exercise.name}</h3>
                    <p className="text-sm text-gray-500">
                      {exercise.sets} sets × {exercise.reps}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setShowInstructions(showInstructions === exercise.name ? null : exercise.name)}
                      className="p-2 text-gray-400 hover:text-emerald-500 transition-colors"
                      title="Show instructions"
                    >
                      <Info className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => toggleExercise(index)}
                      className={`p-2 rounded-full transition-colors ${
                        exercise.completed ? 'text-emerald-500' : 'text-gray-400 hover:text-emerald-500'
                      }`}
                      title={exercise.completed ? 'Mark as incomplete' : 'Mark as complete'}
                    >
                      <CheckCircle className="h-6 w-6" />
                    </button>
                  </div>
                </div>
                
                {showInstructions === exercise.name && (
                  <div className="mt-4 p-4 bg-white rounded-lg border border-gray-200">
                    <p className="text-sm text-gray-600">{exercise.instructions}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Today's Progress</p>
              <p className="text-lg font-semibold">
                {selectedWorkout.exercises.filter((e) => e.completed).length} /{' '}
                {selectedWorkout.exercises.length} exercises completed
              </p>
            </div>
            <div className="h-16 w-16 rounded-full border-4 border-emerald-500 flex items-center justify-center">
              <span className="text-lg font-bold text-emerald-500">
                {Math.round(
                  (selectedWorkout.exercises.filter((e) => e.completed).length /
                    selectedWorkout.exercises.length) *
                    100
                )}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkoutChallenge;