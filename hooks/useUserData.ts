
import { useState, useCallback, useEffect } from 'react';
import { UserData, Task, Mood, TaskType, AIGamificationResponse } from '../types';
import { MASCOT_STAGES, SHOP_ITEMS } from '../constants';

export const useUserData = (initialUser: UserData) => {
  const [user, setUser] = useState<UserData>(initialUser);
  const [aiFeedback, setAiFeedback] = useState<AIGamificationResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Persist user data to localStorage whenever it changes
    localStorage.setItem('lifeLedgerUser', JSON.stringify(user));
  }, [user]);

  const updateUserWithAIFeedback = useCallback((userData: UserData, feedback: AIGamificationResponse) => {
    const newXP = userData.xp + feedback.xp_earned;
    const newCoins = userData.coins + feedback.coins_earned;
    const newBadges = [...new Set([...userData.badges, ...feedback.badges_unlocked])];

    // Update mascot growth level based on new XP
    let newGrowthLevel = userData.mascot.growth_level;
    for (const level in MASCOT_STAGES) {
      if (newXP >= MASCOT_STAGES[level].xpThreshold) {
        newGrowthLevel = parseInt(level);
      }
    }
    
    // Add leaves and flowers for completing tasks
    let newLeaves = userData.mascot.leaves;
    let newFlowers = userData.mascot.flowers;
    if(feedback.xp_earned > 0 && feedback.xp_earned < 10) newLeaves += 1;
    if(feedback.xp_earned >= 10 && feedback.xp_earned < 20) newLeaves += 2;
    if(feedback.xp_earned >= 20) {
      newLeaves += 3;
      if (Math.random() > 0.5) newFlowers += 1;
    }

    return {
      ...userData,
      xp: newXP,
      coins: newCoins,
      badges: newBadges,
      streak: feedback.streak,
      mascot: {
        ...userData.mascot,
        growth_level: newGrowthLevel,
        leaves: newLeaves,
        flowers: newFlowers,
      }
    };
  }, []);

  const completeTask = useCallback(async (taskId: string, getAIMotivation: Function) => {
    setIsLoading(true);
    setAiFeedback(null);
    const task = user.tasks.find(t => t.id === taskId);
    if (task && !task.completed) {
      const updatedTasks = user.tasks.map(t =>
        t.id === taskId ? { ...t, completed: true } : t
      );
      
      const tempUser = {...user, tasks: updatedTasks};

      try {
        const feedback = await getAIMotivation({ type: 'TASK_COMPLETED', task }, tempUser);
        setAiFeedback(feedback);
        setUser(currentUser => {
            const userAfterAIFeedback = updateUserWithAIFeedback(currentUser, feedback);
            return {...userAfterAIFeedback, tasks: updatedTasks};
        });
      } catch (error) {
        console.error("AI feedback failed:", error);
        // still update task completion without AI rewards
        setUser(currentUser => ({...currentUser, tasks: updatedTasks}));
      } finally {
        setIsLoading(false);
      }
    } else {
        setIsLoading(false);
    }
  }, [user, updateUserWithAIFeedback]);
  
  const logMood = useCallback(async (mood: Mood, getAIMotivation: Function) => {
    setIsLoading(true);
    setAiFeedback(null);
    const newLog = { mood, date: new Date().toISOString() };
    const updatedUser = {
      ...user,
      moodLog: [...user.moodLog, newLog],
      mascot: {
        ...user.mascot,
        mood_state: mood,
      },
    };
    
    try {
        const feedback = await getAIMotivation({ type: 'MOOD_LOGGED', mood }, updatedUser);
        setAiFeedback(feedback);
        setUser(updateUserWithAIFeedback(updatedUser, feedback));
    } catch(error) {
        console.error("AI feedback failed:", error);
        setUser(updatedUser);
    } finally {
        setIsLoading(false);
    }

  }, [user, updateUserWithAIFeedback]);

  const addTask = useCallback((name: string, type: TaskType) => {
    const newTask: Task = {
        id: new Date().getTime().toString(),
        name,
        type,
        completed: false,
    };
    setUser(currentUser => ({
        ...currentUser,
        tasks: [newTask, ...currentUser.tasks],
    }));
  }, []);
  
  const purchaseAndEquipSkin = useCallback((skinId: string): {success: boolean, message: string} => {
    const skin = SHOP_ITEMS.find(item => item.id === skinId);
    if (!skin) return {success: false, message: "Item not found."};

    // If user already owns it, just equip
    if (user.ownedSkins.includes(skinId)) {
        setUser(currentUser => ({
            ...currentUser,
            mascot: {
                ...currentUser.mascot,
                currentSkin: skinId,
            }
        }));
        return {success: true, message: "Skin equipped!"};
    }

    // If user doesn't own it, check coins for purchase
    if (user.coins < skin.price) {
        return {success: false, message: "Not enough coins!"};
    }

    setUser(currentUser => ({
        ...currentUser,
        coins: currentUser.coins - skin.price,
        ownedSkins: [...currentUser.ownedSkins, skinId],
        mascot: {
            ...currentUser.mascot,
            currentSkin: skinId,
        }
    }));
    return {success: true, message: "Purchase successful!"};
  }, [user]);


  return { user, completeTask, logMood, addTask, purchaseAndEquipSkin, aiFeedback, isLoading };
};
