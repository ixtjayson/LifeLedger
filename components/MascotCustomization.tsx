
import React, { useState } from 'react';
import { UserData } from '../types';
import { SHOP_ITEMS } from '../constants';
import CoinIcon from './icons/CoinIcon';

interface MascotCustomizationProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserData;
  onPurchaseAndEquip: (skinId: string) => {success: boolean, message: string};
}

const MascotCustomization: React.FC<MascotCustomizationProps> = ({ isOpen, onClose, user, onPurchaseAndEquip }) => {
  const [feedback, setFeedback] = useState<{ message: string; isError: boolean } | null>(null);

  if (!isOpen) return null;

  const handleAction = (skinId: string) => {
    const result = onPurchaseAndEquip(skinId);
    setFeedback({ message: result.message, isError: !result.success });
    setTimeout(() => setFeedback(null), 2000); // Clear feedback after 2 seconds
  }

  return (
    <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        onClick={onClose}
    >
      <div 
        className="bg-slate-800 border border-slate-700 rounded-2xl w-full max-w-2xl p-6 relative shadow-2xl shadow-purple-900/20"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white">&times;</button>
        <h2 className="text-2xl font-bold text-center mb-2 text-purple-300">Mascot Customization</h2>
        <div className="flex items-center justify-center space-x-2 bg-slate-700/50 w-fit mx-auto px-4 py-1.5 rounded-full text-lg font-semibold mb-6">
            <CoinIcon className="text-yellow-400 w-6 h-6" />
            <span className="text-white">{user.coins}</span>
        </div>

        {feedback && (
          <div className={`p-2 rounded-md text-center mb-4 text-sm font-semibold ${feedback.isError ? 'bg-rose-500/20 text-rose-300' : 'bg-green-500/20 text-green-300'}`}>
            {feedback.message}
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-h-[60vh] overflow-y-auto pr-2">
            {SHOP_ITEMS.map(item => {
                const isOwned = user.ownedSkins.includes(item.id);
                const isEquipped = user.mascot.currentSkin === item.id;
                
                return (
                    <div key={item.id} className="bg-slate-700 p-4 rounded-lg flex flex-col items-center justify-between text-center">
                        <div className="w-16 h-16 rounded-full mb-3 flex items-center justify-center" style={{background: `linear-gradient(45deg, ${item.style.potGradient.from}, ${item.style.potGradient.to})`}}>
                           {isEquipped && <span className="text-2xl" role="img" aria-label="equipped">✅</span>}
                        </div>
                        <h4 className="font-semibold">{item.name}</h4>

                        {isEquipped ? (
                            <button disabled className="w-full mt-3 py-2 text-sm font-bold bg-slate-600 text-slate-400 rounded-md cursor-not-allowed">Equipped</button>
                        ) : isOwned ? (
                            <button onClick={() => handleAction(item.id)} className="w-full mt-3 py-2 text-sm font-bold bg-cyan-500 text-slate-900 rounded-md hover:bg-cyan-400">Equip</button>
                        ) : (
                            <button onClick={() => handleAction(item.id)} className="w-full mt-3 py-2 text-sm font-bold bg-green-500 text-white rounded-md hover:bg-green-600 flex items-center justify-center space-x-1">
                                <CoinIcon className="w-4 h-4" />
                                <span>{item.price}</span>
                            </button>
                        )}
                    </div>
                )
            })}
        </div>
      </div>
    </div>
  );
};

export default MascotCustomization;
