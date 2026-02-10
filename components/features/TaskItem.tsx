'use client';

import { Task } from '@/lib/types';

interface TaskItemProps {
  task: Task;
  onToggle: (taskId: string) => void;
  onDelete: (taskId: string) => void;
}

export function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${task.title}"?`)) {
      onDelete(task.id);
    }
  };

  return (
    <div
      className={`
        glass-card rounded-2xl p-6
        transition-all duration-200
        hover:scale-102 hover:bg-white/8
        ${task.completed ? 'opacity-50' : 'opacity-100'}
      `}
    >
      <div className="flex items-start gap-4">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          className="mt-1 w-6 h-6 rounded-md border-2 border-glass-border
                     bg-transparent text-neon-cyan
                     cursor-pointer transition-all duration-200
                     hover:border-neon-cyan hover:shadow-glow-cyan
                     focus:ring-2 focus:ring-neon-cyan/50 focus:ring-offset-2 focus:ring-offset-deep-black"
          aria-label={`Mark "${task.title}" as ${task.completed ? 'incomplete' : 'complete'}`}
        />
        <div className="flex-1 min-w-0">
          <h3
            className={`
              text-xl font-medium leading-relaxed
              ${task.completed
                ? 'line-through text-text-secondary/60'
                : 'text-text-primary'
              }
            `}
          >
            {task.title}
          </h3>
          {task.description && (
            <p
              className={`
                text-sm mt-2 leading-relaxed
                ${task.completed
                  ? 'text-text-secondary/50'
                  : 'text-text-secondary'
                }
              `}
            >
              {task.description}
            </p>
          )}
          <p className="text-xs text-text-secondary/60 mt-3">
            {new Date(task.createdAt).toLocaleDateString()}
          </p>
        </div>
        <button
          onClick={handleDelete}
          className="flex-shrink-0 p-2 rounded-lg
                     text-red-400 hover:text-red-300
                     hover:bg-red-500/10 hover:shadow-glow-red
                     transition-all duration-200
                     hover:scale-110 active:scale-100"
          aria-label={`Delete task "${task.title}"`}
          title="Delete task"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  );
}
