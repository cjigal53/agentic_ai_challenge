'use client';

import { Task } from '@/lib/types';
import { formatTaskTimestamp } from '@/lib/utils';

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
        glass-card rounded-2xl p-6 md:p-8 glass-hover
        transition-all duration-300
        ${task.completed ? 'opacity-60' : 'opacity-100'}
        group
      `}
    >
      <div className="flex items-start gap-5">
        {/* Custom Glassmorphic Checkbox */}
        <div className="relative mt-1">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggle(task.id)}
            className="peer sr-only"
            id={`task-${task.id}`}
            aria-label={`Mark "${task.title}" as ${task.completed ? 'incomplete' : 'complete'}`}
          />
          <label
            htmlFor={`task-${task.id}`}
            className="flex items-center justify-center w-7 h-7 rounded-lg glass-card cursor-pointer
                       transition-all duration-300
                       peer-checked:bg-gradient-to-br peer-checked:from-purple peer-checked:to-cyan
                       hover:shadow-glow-purple hover:scale-110
                       peer-focus:ring-2 peer-focus:ring-purple/50"
          >
            <svg
              className={`w-4 h-4 text-white transition-all duration-300 ${
                task.completed ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={3}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </label>
        </div>

        {/* Task Content */}
        <div className="flex-1 min-w-0 font-sans">
          <h3
            className={`
              text-lg md:text-xl font-semibold leading-tight mb-2
              transition-all duration-300
              ${task.completed
                ? 'line-through text-text-secondary'
                : 'text-text-primary'
              }
            `}
          >
            {task.title}
          </h3>
          {task.description && (
            <p
              className={`
                text-sm md:text-base leading-relaxed
                transition-all duration-300
                ${task.completed
                  ? 'text-text-secondary/70'
                  : 'text-text-secondary'
                }
              `}
            >
              {task.description}
            </p>
          )}
          <div className="flex items-center gap-2 mt-4">
            <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple to-cyan"></div>
            <p className="text-xs font-medium text-text-secondary">
              {formatTaskTimestamp(task.createdAt)}
            </p>
          </div>
        </div>

        {/* Delete Button */}
        <button
          onClick={handleDelete}
          className="flex-shrink-0 w-10 h-10 rounded-xl glass-card
                     text-coral hover:bg-gradient-to-br hover:from-coral/20 hover:to-coral/10
                     transition-all duration-300
                     hover:shadow-glow-coral hover:scale-110
                     active:scale-95
                     focus:outline-none focus:ring-2 focus:ring-coral/50
                     flex items-center justify-center
                     opacity-0 group-hover:opacity-100"
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
