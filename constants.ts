
import { UserData, TaskType, Mood, ShopItem, BadgeDefinition } from './types';

export const TASK_XP_MAP: Record<TaskType, number> = {
  [TaskType.MICRO]: 5,
  [TaskType.MEDIUM]: 10,
  [TaskType.MAJOR]: 20,
};

export const MASCOT_STAGES: { [key: number]: { name: string; xpThreshold: number } } = {
  1: { name: 'Seed', xpThreshold: 0 },
  2: { name: 'Sprout', xpThreshold: 50 },
  3: { name: 'Sapling', xpThreshold: 150 },
  4: { name: 'Blooming', xpThreshold: 300 },
  5: { name: 'Legendary', xpThreshold: 600 },
};

export const SHOP_ITEMS: ShopItem[] = [
    {
        id: 'default',
        name: 'Classic Clay',
        price: 0,
        style: { potGradient: { from: '#8B4513', to: '#A0522D' } },
    },
    {
        id: 'sunset',
        name: 'Sunset Pot',
        price: 50,
        style: { potGradient: { from: '#FF8C00', to: '#FF4500' } },
    },
    {
        id: 'oceanic',
        name: 'Oceanic Pot',
        price: 75,
        style: { potGradient: { from: '#00BFFF', to: '#1E90FF' } },
    },
    {
        id: 'forest',
        name: 'Forest Pot',
        price: 75,
        style: { potGradient: { from: '#228B22', to: '#006400' } },
    },
    {
        id: 'royal',
        name: 'Royal Purple Pot',
        price: 100,
        style: { potGradient: { from: '#8A2BE2', to: '#4B0082' } },
    },
];

export const BADGE_DEFINITIONS: Record<string, BadgeDefinition> = {
  "3-Day Streak": {
    name: "3-Day Streak",
    description: "Completed at least one task for 3 days in a row.",
    icon: "🥉",
  },
  "7-Day Powerhouse": {
    name: "7-Day Powerhouse",
    description: "Maintained a streak for a full week! Keep it up!",
    icon: "🥈",
  },
  "First Major Quest": {
    name: "Quest Conqueror",
    description: "Completed your first 'Major' difficulty quest.",
    icon: "💥",
  },
  "Mood Master": {
    name: "Mood Master",
    description: "Logged your mood for 5 consecutive days.",
    icon: "🧘",
  }
};


export const INITIAL_USER_DATA: Omit<UserData, 'user_id' | 'name' | 'email' | 'avatarUrl'> = {
  mascot: {
    type: 'plant',
    growth_level: 1,
    leaves: 0,
    flowers: 0,
    health: 100,
    mood_state: Mood.HAPPY,
    animations: [],
    currentSkin: 'default',
  },
  xp: 0,
  coins: 10,
  streak: 0,
  badges: [],
  tasks: [
    { id: '1', name: 'Drink a glass of water', type: TaskType.MICRO, completed: false },
    { id: '2', name: 'Study for 30 minutes', type: TaskType.MEDIUM, completed: false },
  ],
  moodLog: [],
  ownedSkins: ['default'],
};
