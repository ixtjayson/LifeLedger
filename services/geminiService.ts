
import { AIGamificationResponse, Task, UserData, Mood, TaskType } from '../types';
import { TASK_XP_MAP } from '../constants';

// This is a mock service that simulates the Gemini API behavior described in the prompt.
// In a real application, this would make a network request to a backend that calls the Gemini API.

export const getAIMotivation = async (
  action: { type: 'TASK_COMPLETED'; task: Task } | { type: 'MOOD_LOGGED'; mood: Mood },
  userData: UserData
): Promise<AIGamificationResponse> => {
  // Simulate network delay
  await new Promise(res => setTimeout(res, 500));

  if (action.type === 'TASK_COMPLETED') {
    const xp_earned = TASK_XP_MAP[action.task.type];
    const coins_earned = Math.ceil(xp_earned / 2);
    const newStreak = userData.streak + 1;
    const badges_unlocked: string[] = [];

    if (newStreak === 3 && !userData.badges.includes("3-Day Streak")) {
        badges_unlocked.push("3-Day Streak");
    }
    if (newStreak === 7 && !userData.badges.includes("7-Day Powerhouse")) {
        badges_unlocked.push("7-Day Powerhouse");
    }
    if (action.task.type === TaskType.MAJOR && !userData.badges.includes("First Major Quest")) {
        badges_unlocked.push("First Major Quest");
    }

    const messages = [
      `Awesome job on finishing "${action.task.name}"! Keep that momentum going!`,
      `You crushed it! "${action.task.name}" is done and dusted. What's next?`,
      `Woohoo! You've conquered "${action.task.name}". Your mascot is looking proud!`,
    ];

    const suggestions = [
      `How about tackling another small task to keep the combo alive?`,
      `Your plant is thriving! Maybe it's time for a bigger challenge?`,
      `You're on a roll! Keep it up for an even bigger streak reward tomorrow.`
    ]

    return {
      message: messages[Math.floor(Math.random() * messages.length)],
      xp_earned: xp_earned,
      coins_earned: coins_earned,
      badges_unlocked: badges_unlocked,
      streak: newStreak,
      next_suggestion: suggestions[Math.floor(Math.random() * suggestions.length)],
    };
  }

  if (action.type === 'MOOD_LOGGED') {
    let message = '';
    let suggestion = '';

    switch (action.mood) {
      case Mood.HAPPY:
        message = "Feeling happy is awesome! Let's channel that energy. ✨";
        suggestion = "A great day to tackle a major task! Your mascot is glowing with you.";
        break;
      case Mood.STRESSED:
        message = "It's okay to feel stressed. Taking a moment for yourself is a great first step.";
        suggestion = "How about a 5-minute meditation? It's a micro-task that can make a big difference.";
        break;
      case Mood.TIRED:
        message = "Thanks for logging your mood. Rest is productive too! 😴";
        suggestion = "Maybe a simple micro-task is all you need today. Or just relax, your mascot needs it too!";
        break;
      case Mood.SAD:
        message = "We all have down days. It's brave of you to acknowledge it. 💙";
        suggestion = "Listening to your favorite music can be a quick mood booster. Give it a try.";
        break;
      default:
        message = "Mood logged. Every check-in helps you understand yourself better.";
        suggestion = "What's one small thing you can do for yourself right now?";
        break;
    }

    return {
      message,
      xp_earned: 2, // Small XP for logging mood
      coins_earned: 1,
      badges_unlocked: [],
      streak: userData.streak,
      next_suggestion: suggestion,
    };
  }
  
  // Fallback response
  return {
    message: "Let's get started!",
    xp_earned: 0,
    coins_earned: 0,
    badges_unlocked: [],
    streak: userData.streak,
    next_suggestion: "Add a task for today!",
  };
};
