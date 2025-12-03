
import React, { useState } from 'react';
import { UserData, Mood } from '../types';
import { useUserData } from '../hooks/useUserData';
import { getAIMotivation } from '../services/geminiService';
import Header from './Header';
import MascotDisplay from './MascotDisplay';
import TaskLogger from './TaskLogger';
import MoodSelector from './MoodSelector';
import StatsPanel from './StatsPanel';
import AIFeedback from './AIFeedback';
import MascotCustomization from './MascotCustomization';

interface DashboardProps {
  user: UserData;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user: initialUser, onLogout }) => {
  const { user, completeTask, logMood, addTask, purchaseAndEquipSkin, aiFeedback, isLoading } = useUserData(initialUser);
  const [isCustomizationOpen, setIsCustomizationOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-900 text-white p-4 sm:p-6 lg:p-8">
      <Header 
        user={user} 
        onLogout={onLogout} 
        onOpenCustomization={() => setIsCustomizationOpen(true)}
      />
      <main className="max-w-7xl mx-auto mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column: Mascot and AI */}
          <div className="lg:col-span-1 space-y-6">
            <MascotDisplay mascot={user.mascot} />
            <AIFeedback feedback={aiFeedback} isLoading={isLoading} />
          </div>

          {/* Middle Column: Tasks */}
          <div className="lg:col-span-1 space-y-6 bg-slate-800/50 p-6 rounded-2xl">
            <h2 className="text-2xl font-bold text-cyan-300">Today's Quests</h2>
            <TaskLogger onAddTask={addTask} />
            <div className="h-px bg-slate-700"></div>
            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
              {user.tasks.map(task => (
                <div key={task.id} className={`p-4 rounded-lg flex items-center justify-between transition-all duration-300 ${task.completed ? 'bg-green-500/20 text-slate-400' : 'bg-slate-700 hover:bg-slate-600'}`}>
                  <div>
                    <p className={`font-medium ${task.completed ? 'line-through' : ''}`}>{task.name}</p>
                    <span className="text-xs uppercase font-semibold text-cyan-400 bg-cyan-900/50 px-2 py-0.5 rounded">{task.type}</span>
                  </div>
                  {!task.completed && (
                    <button 
                      onClick={() => completeTask(task.id, getAIMotivation)}
                      className="bg-cyan-500 text-slate-900 font-bold text-sm px-4 py-2 rounded-md hover:bg-cyan-400 transition-colors"
                      disabled={isLoading}
                    >
                      Done
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Mood & Stats */}
          <div className="lg:col-span-1 space-y-6">
             <MoodSelector currentMood={user.mascot.mood_state} onLogMood={(mood) => logMood(mood, getAIMotivation)} />
             <StatsPanel user={user} />
          </div>

        </div>
      </main>
      
      <MascotCustomization 
        isOpen={isCustomizationOpen}
        onClose={() => setIsCustomizationOpen(false)}
        user={user}
        onPurchaseAndEquip={purchaseAndEquipSkin}
      />
    </div>
  );
};

export default Dashboard;
