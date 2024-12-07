import React, { useState } from 'react';
import { UserCircle, Scale, Target } from 'lucide-react';

const ProfileSetup = () => {
  const [formData, setFormData] = useState({
    age: '',
    height: '',
    weight: '',
    goal: 'weight-loss'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div id="profile-setup" className="bg-white rounded-2xl shadow-xl p-8 scroll-mt-20">
      <div className="flex items-center mb-6">
        <UserCircle className="h-8 w-8 text-emerald-500" />
        <h2 className="text-2xl font-bold ml-3">Profile Setup</h2>
      </div>

      <form className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Height (cm)</label>
            <input
              type="number"
              name="height"
              value={formData.height}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Weight (kg)</label>
            <input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Fitness Goal</label>
            <select
              name="goal"
              value={formData.goal}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
            >
              <option value="weight-loss">Weight Loss</option>
              <option value="weight-gain">Weight Gain</option>
              <option value="muscle-building">Muscle Building</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-500 hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
          >
            Save Profile
          </button>
        </div>
      </form>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="stat-card">
          <Scale className="h-6 w-6 text-emerald-500" />
          <div className="ml-4">
            <p className="text-sm text-gray-500">BMI</p>
            <p className="text-lg font-semibold">23.5</p>
          </div>
        </div>

        <div className="stat-card">
          <Target className="h-6 w-6 text-emerald-500" />
          <div className="ml-4">
            <p className="text-sm text-gray-500">Daily Calories</p>
            <p className="text-lg font-semibold">2,400</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="h-6 w-6 text-emerald-500">🎯</div>
          <div className="ml-4">
            <p className="text-sm text-gray-500">Target Weight</p>
            <p className="text-lg font-semibold">70 kg</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSetup;