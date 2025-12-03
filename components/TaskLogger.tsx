
import React, { useState } from 'react';
import { TaskType } from '../types';

interface TaskLoggerProps {
  onAddTask: (name: string, type: TaskType) => void;
}

const TaskLogger: React.FC<TaskLoggerProps> = ({ onAddTask }) => {
  const [name, setName] = useState('');
  const [type, setType] = useState<TaskType>(TaskType.MEDIUM);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onAddTask(name.trim(), type);
      setName('');
      setType(TaskType.MEDIUM);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="What's your next quest?"
        className="w-full bg-slate-700 border-2 border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
      />
      <div className="grid grid-cols-3 gap-2">
        {(Object.values(TaskType) as Array<TaskType>).map((taskType) => (
          <button
            key={taskType}
            type="button"
            onClick={() => setType(taskType)}
            className={`w-full py-2 rounded-md text-sm font-semibold transition-colors duration-200 ${
              type === taskType
                ? 'bg-cyan-500 text-slate-900'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            {taskType.charAt(0).toUpperCase() + taskType.slice(1)}
          </button>
        ))}
      </div>
      <button
        type="submit"
        className="w-full bg-green-500 text-white font-bold py-3 rounded-lg hover:bg-green-600 transition-colors disabled:bg-slate-600 disabled:cursor-not-allowed"
        disabled={!name.trim()}
      >
        Add Quest
      </button>
    </form>
  );
};

export default TaskLogger;
