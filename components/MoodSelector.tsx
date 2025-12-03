
import React from 'react';
import { Mood } from '../types';

interface MoodSelectorProps {
  currentMood: Mood;
  onLogMood: (mood: Mood) => void;
}

const MOOD_OPTIONS: { mood: Mood; emoji: string; color: string }[] = [
  { mood: Mood.HAPPY, emoji: '😄', color: 'bg-yellow-400' },
  { mood: Mood.NEUTRAL, emoji: '😐', color: 'bg-slate-400' },
  { mood: Mood.STRESSED, emoji: '🥵', color: 'bg-orange-500' },
  { mood: Mood.TIRED, emoji: '😴', color: 'bg-indigo-400' },
  { mood: Mood.SAD, emoji: '😢', color: 'bg-blue-400' },
];

const MoodSelector: React.FC<MoodSelectorProps> = ({ currentMood, onLogMood }) => {
  return (
    <div className="bg-slate-800/50 p-6 rounded-2xl">
      <h3 className="text-xl font-bold text-center mb-4 text-purple-300">How are you feeling?</h3>
      <div className="flex justify-around items-center">
        {MOOD_OPTIONS.map(({ mood, emoji, color }) => (
          <button
            key={mood}
            onClick={() => onLogMood(mood)}
            className={`w-14 h-14 rounded-full flex items-center justify-center text-3xl transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-purple-400
             ${currentMood === mood ? 'ring-2 ring-purple-400 scale-110' : 'grayscale opacity-70 hover:grayscale-0 hover:opacity-100'}`}
          >
            <span className={`w-12 h-12 rounded-full flex items-center justify-center ${color}`}>{emoji}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MoodSelector;
