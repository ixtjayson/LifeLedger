
export enum TaskType {
  MICRO = 'micro',
  MEDIUM = 'medium',
  MAJOR = 'major',
}

export interface Task {
  id: string;
  name: string;
  type: TaskType;
  completed: boolean;
}

export enum Mood {
  HAPPY = 'happy',
  NEUTRAL = 'neutral',
  STRESSED = 'stressed',
  TIRED = 'tired',
  SAD = 'sad',
}

export interface Mascot {
  type: 'plant';
  growth_level: number; // 1: Seed, 2: Sprout, 3: Sapling, 4: Blooming, 5: Legendary
  leaves: number;
  flowers: number;
  health: number; // 0-100
  mood_state: Mood;
  animations: string[];
  currentSkin: string; // e.g., 'default', 'sunset', 'oceanic'
}

export interface UserData {
  user_id: string;
  name: string;
  email: string;
  avatarUrl: string;
  mascot: Mascot;
  xp: number;
  coins: number;
  streak: number;
  badges: string[];
  tasks: Task[];
  moodLog: { mood: Mood; date: string }[];
  ownedSkins: string[];
}

export interface AIGamificationResponse {
  message: string;
  xp_earned: number;
  coins_earned: number;
  badges_unlocked: string[];
  streak: number;
  next_suggestion: string;
}

export interface ShopItem {
  id: string;
  name: string;
  price: number;
  style: {
    potGradient: { from: string; to: string };
  };
}

export interface BadgeDefinition {
  name: string;
  description: string;
  icon: string;
}
