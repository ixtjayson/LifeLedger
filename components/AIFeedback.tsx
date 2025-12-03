
import React from 'react';
import { AIGamificationResponse } from '../types';

interface AIFeedbackProps {
  feedback: AIGamificationResponse | null;
  isLoading: boolean;
}

const AIFeedback: React.FC<AIFeedbackProps> = ({ feedback, isLoading }) => {
  if (isLoading) {
    return (
      <div className="bg-slate-800/50 p-6 rounded-2xl text-center">
        <div className="animate-pulse text-slate-400">AI is thinking...</div>
      </div>
    );
  }

  if (!feedback) {
    return (
      <div className="bg-slate-800/50 p-6 rounded-2xl text-slate-400 text-center">
        <p className="font-bold text-lg text-slate-300">Your AI Assistant</p>
        <p>Complete a quest or log your mood to get feedback!</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-purple-900/50 to-slate-800/50 p-6 rounded-2xl space-y-4 border border-purple-700/50 shadow-lg shadow-purple-900/20">
      <p className="text-lg font-semibold text-purple-300">🎉 AI Feedback:</p>
      <p className="italic">"{feedback.message}"</p>
      <div className="flex flex-wrap gap-2 text-sm">
        {feedback.xp_earned > 0 && <span className="bg-purple-400/20 text-purple-300 font-semibold px-2.5 py-1 rounded-full">+{feedback.xp_earned} XP</span>}
        {feedback.coins_earned > 0 && <span className="bg-yellow-400/20 text-yellow-300 font-semibold px-2.5 py-1 rounded-full">+{feedback.coins_earned} Coins</span>}
        {feedback.badges_unlocked.map(badge => (
           <span key={badge} className="bg-green-400/20 text-green-300 font-semibold px-2.5 py-1 rounded-full">Badge Unlocked: {badge}</span>
        ))}
      </div>
      <div className="h-px bg-purple-800/50"></div>
      <div>
        <p className="font-semibold text-purple-300">Next Step:</p>
        <p className="text-slate-300">{feedback.next_suggestion}</p>
      </div>
    </div>
  );
};

export default AIFeedback;
