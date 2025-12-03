
import React from 'react';
import { UserData } from '../types';
import CoinIcon from './icons/CoinIcon';
import XPIcon from './icons/XPIcon';
import PaintBrushIcon from './icons/PaintBrushIcon';

interface HeaderProps {
  user: UserData;
  onLogout: () => void;
  onOpenCustomization: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout, onOpenCustomization }) => {
  return (
    <header className="max-w-7xl mx-auto bg-slate-800/50 backdrop-blur-sm p-4 rounded-2xl flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <img src={user.avatarUrl} alt={user.name} className="w-12 h-12 rounded-full border-2 border-cyan-400" />
        <div>
          <h1 className="text-xl font-bold">Welcome, {user.name}!</h1>
          <p className="text-sm text-slate-400">Let's make today awesome.</p>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2 bg-slate-700 px-3 py-1.5 rounded-full text-sm font-semibold">
          <XPIcon className="text-purple-400" />
          <span>{user.xp} XP</span>
        </div>
        <div className="flex items-center space-x-2 bg-slate-700 px-3 py-1.5 rounded-full text-sm font-semibold">
          <CoinIcon className="text-yellow-400" />
          <span>{user.coins}</span>
        </div>
        <button
          onClick={onOpenCustomization}
          className="bg-purple-500 text-white p-2 rounded-lg hover:bg-purple-600 transition-colors"
          aria-label="Customize Mascot"
        >
            <PaintBrushIcon className="w-5 h-5" />
        </button>
        <button
          onClick={onLogout}
          className="bg-rose-500 text-white font-semibold text-sm px-4 py-2 rounded-lg hover:bg-rose-600 transition-colors"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
