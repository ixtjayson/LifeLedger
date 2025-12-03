
import React from 'react';
import { Mascot } from '../types';
import { MASCOT_STAGES, SHOP_ITEMS } from '../constants';

interface MascotDisplayProps {
  mascot: Mascot;
}

const MascotDisplay: React.FC<MascotDisplayProps> = ({ mascot }) => {
  const stageInfo = MASCOT_STAGES[mascot.growth_level];
  const currentSkin = SHOP_ITEMS.find(item => item.id === mascot.currentSkin) || SHOP_ITEMS[0];

  const moodStyles: React.CSSProperties = {
    transition: 'all 0.5s ease-in-out',
  };

  switch (mascot.mood_state) {
    case 'happy':
      moodStyles.filter = 'brightness(1.1) drop-shadow(0 0 8px rgba(74, 222, 128, 0.7))';
      break;
    case 'stressed':
      moodStyles.transform = 'rotate(-3deg)';
      break;
    case 'tired':
      moodStyles.filter = 'saturate(0.8) brightness(0.9)';
      break;
    case 'sad':
      moodStyles.transform = 'rotate(3deg)';
      moodStyles.filter = 'grayscale(0.3)';
      break;
  }
  
  const healthStyle: React.CSSProperties = {
      opacity: mascot.health / 100,
  };

  const renderLeaves = () => {
    const leafElements = [];
    for (let i = 0; i < mascot.leaves; i++) {
      const angle = (i * 45) % 360;
      const yPos = 50 + Math.floor(i / 8) * 15;
      leafElements.push(
        <ellipse key={`leaf-${i}`} cx="50" cy={yPos} rx="10" ry="20" fill="url(#leafGradient)" className="origin-center transition-transform duration-500" style={{transform: `rotate(${angle}deg)`}} />
      );
    }
    return leafElements;
  };

  const renderFlowers = () => {
    const flowerElements = [];
    for (let i = 0; i < mascot.flowers; i++) {
        const xPos = 20 + (i * 60) % 80;
        const yPos = 20 + Math.floor(i/2) * 20;
        flowerElements.push(
            <g key={`flower-${i}`} transform={`translate(${xPos}, ${yPos})`}>
                <circle cx="0" cy="0" r="8" fill="url(#petalGradient)" />
                <circle cx="0" cy="0" r="3" fill="#FFD700" />
            </g>
        );
    }
    return flowerElements;
  };

  const potGradientId = `potGradient-${currentSkin.id}`;

  return (
    <div className="bg-slate-800/50 p-6 rounded-2xl text-center">
      <h2 className="text-2xl font-bold text-green-300">{stageInfo.name} Plant</h2>
      <p className="text-slate-400 mb-4">Health: {mascot.health}%</p>
      <div className="flex justify-center items-center h-64">
        <svg viewBox="0 0 100 100" className="w-full h-full" style={{ ...moodStyles, ...healthStyle }}>
            <defs>
                <linearGradient id={potGradientId} x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" style={{stopColor: currentSkin.style.potGradient.from}} />
                    <stop offset="100%" style={{stopColor: currentSkin.style.potGradient.to}} />
                </linearGradient>
                <linearGradient id="stemGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style={{stopColor: '#228B22'}} />
                    <stop offset="100%" style={{stopColor: '#32CD32'}} />
                </linearGradient>
                 <radialGradient id="leafGradient">
                    <stop offset="0%" stopColor="#3CB371" />
                    <stop offset="100%" stopColor="#2E8B57" />
                </radialGradient>
                 <radialGradient id="petalGradient">
                    <stop offset="20%" stopColor="#FFC0CB" />
                    <stop offset="100%" stopColor="#FF69B4" />
                </radialGradient>
            </defs>

            {/* Pot */}
            <path d="M20,95 h60 l-10,-20 h-40 z" fill={`url(#${potGradientId})`} />
            <rect x="15" y="70" width="70" height="5" fill={currentSkin.style.potGradient.to} rx="2" />
          
            {mascot.growth_level >= 1 && (
                 <rect x="48" y="65" width="4" height="10" fill="url(#stemGradient)" />
            )}
            {mascot.growth_level >= 2 && (
                 <rect x="48" y="45" width="4" height="30" fill="url(#stemGradient)" />
            )}
            {mascot.growth_level >= 3 && (
                <>
                    <rect x="48" y="25" width="4" height="50" fill="url(#stemGradient)" />
                    {renderLeaves()}
                </>
            )}
            {mascot.growth_level >= 4 && (
                <>
                 {renderFlowers()}
                </>
            )}
        </svg>
      </div>
    </div>
  );
};

export default MascotDisplay;
