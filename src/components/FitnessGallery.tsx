import React from 'react';
import { Image } from 'lucide-react';

const fitnessImages = [
  {
    url: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&q=80&w=800',
    caption: 'Professional Bodybuilding'
  },
  {
    url: 'https://images.unsplash.com/photo-1577221084712-45b0445d2b00?auto=format&fit=crop&q=80&w=800',
    caption: 'Strength Training'
  },
  {
    url: 'https://images.unsplash.com/photo-1605296867424-35fc25c9212a?auto=format&fit=crop&q=80&w=800',
    caption: 'Muscle Definition'
  },
  {
    url: 'https://images.unsplash.com/photo-1532384748853-8f54a8f476e2?auto=format&fit=crop&q=80&w=800',
    caption: 'Workout Intensity'
  },
  {
    url: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=800',
    caption: 'Professional Competition'
  },
  {
    url: 'https://images.unsplash.com/photo-1534367610401-9f5ed68180aa?auto=format&fit=crop&q=80&w=800',
    caption: 'Bodybuilding Lifestyle'
  }
];

const FitnessGallery = () => {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 scroll-mt-20">
      <div className="flex items-center mb-6">
        <Image className="h-8 w-8 text-emerald-500" />
        <h2 className="text-2xl font-bold ml-3">Fitness Inspiration</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {fitnessImages.map((image, index) => (
          <div 
            key={index} 
            className="group relative overflow-hidden rounded-lg shadow-md transition-transform hover:scale-[1.02]"
          >
            <img
              src={image.url}
              alt={image.caption}
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-white font-medium">{image.caption}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <p className="text-gray-600">
          Get inspired by professional athletes and transform your body with dedication and proper training.
        </p>
      </div>
    </div>
  );
};

export default FitnessGallery;