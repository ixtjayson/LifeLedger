
import React from 'react';
import { UserData } from '../types';
import { BADGE_DEFINITIONS } from '../constants';

interface StatsPanelProps {
  user: UserData;
}

const FireIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M12.25 5.25a.75.75 0 00-1.5 0v.256a.25.25 0 01-.5 0V5.25a.75.75 0 00-1.5 0v2.022c0 .414.162.81.446 1.106a2.5 2.5 0 013.108-4.234V5.25zM9.25 5.25a.75.75 0 00-1.5 0v5.06c0 1.06 1.253 1.83 2.25 1.286.332-.182.5-.558.5-.946V5.25a.75.75 0 00-1.5 0v.256a.25.25 0 01-.5 0V5.25z" clipRule="evenodd" />
        <path d="M10 2c-4.418 0-8 3.582-8 8s3.582 8 8 8 8-3.582 8-8-3.582-8-8-8zM8.5 5.25a.75.75 0 00-1.5 0v5.06c0 1.06 1.253 1.83 2.25 1.286.332-.182.5-.558.5-.946V5.25a.75.75 0 00-1.5 0v.256a.25.25 0 01-.5 0V5.25zM12.25 5.25a.75.75 0 00-1.5 0v2.022c0 .414.162.81.446 1.106a2.5 2.5 0 013.108-4.234V5.25a.75.75 0 00-1.5 0v.256a.25.25 0 01-.5 0V5.25z" />
    </svg>
)

const BadgeIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z" clipRule="evenodd" />
    </svg>
)

const StatsPanel: React.FC<StatsPanelProps> = ({ user }) => {
  return (
    <div className="bg-slate-800/50 p-6 rounded-2xl">
      <div className="flex items-center justify-around text-center">
        <div className="flex flex-col items-center">
          <FireIcon className="w-10 h-10 text-orange-400 mb-1" />
          <p className="text-2xl font-bold">{user.streak}</p>
          <p className="text-sm text-slate-400">Day Streak</p>
        </div>
        <div className="h-16 w-px bg-slate-700"></div>
        <div className="flex flex-col items-center">
            <BadgeIcon className="w-10 h-10 text-yellow-400 mb-1" />
            <p className="text-2xl font-bold">{user.badges.length}</p>
            <p className="text-sm text-slate-400">Badges</p>
        </div>
      </div>
      {user.badges.length > 0 && (
        <div className="mt-6 border-t border-slate-700 pt-4">
            <h4 className="font-semibold mb-3 text-center text-slate-300">Your Trophy Case</h4>
            <div className="flex flex-wrap gap-4 justify-center">
                {user.badges.map(badgeName => {
                    const badge = BADGE_DEFINITIONS[badgeName];
                    if (!badge) return null;

                    return (
                        <div key={badge.name} className="relative group">
                            <div className="text-3xl bg-slate-700 p-2 rounded-full transform transition-transform duration-200 group-hover:scale-110">
                                {badge.icon}
                            </div>
                             <div className="absolute bottom-full mb-2 w-max max-w-xs p-2 bg-slate-900 border border-slate-600 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 text-center">
                                <p className="font-bold text-yellow-300">{badge.name}</p>
                                <p className="text-slate-300">{badge.description}</p>
                                <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-slate-600"></div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
      )}
    </div>
  );
};

export default StatsPanel;
