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
        brutal-card border-charcoal shadow-brutal-sm p-6 md:p-8
        grid-number brutal-hover
        ${task.completed ? 'opacity-60' : 'opacity-100'}
      `}
    >
      <div className="flex items-start gap-5">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          className="mt-1.5 w-7 h-7 border-3 border-charcoal appearance-none
                     bg-background cursor-pointer transition-all duration-150
                     hover:border-terracotta hover:shadow-brutal-sm
                     focus:outline-none focus:border-terracotta
                     checked:bg-terracotta checked:border-terracotta
                     relative"
          aria-label={`Mark "${task.title}" as ${task.completed ? 'incomplete' : 'complete'}`}
          style={{
            backgroundImage: task.completed
              ? "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z'/%3E%3C/svg%3E\")"
              : 'none',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '75%',
          }}
        />
        <div className="flex-1 min-w-0 font-sans">
          <h3
            className={`
              text-xl md:text-2xl font-bold leading-tight mb-2
              ${task.completed
                ? 'line-through text-stone'
                : 'text-text-primary'
              }
            `}
          >
            {task.title}
          </h3>
          {task.description && (
            <p
              className={`
                text-base leading-relaxed
                ${task.completed
                  ? 'text-stone/70'
                  : 'text-text-secondary'
                }
              `}
            >
              {task.description}
            </p>
          )}
          <p className="text-xs font-bold uppercase tracking-wider text-sage mt-4">
            Created: {formatTaskTimestamp(task.createdAt)}
          </p>
        </div>
        <button
          onClick={handleDelete}
          className="flex-shrink-0 p-3 border-3 border-charcoal bg-background
                     text-terracotta hover:bg-terracotta hover:text-cream-cool
                     brutal-hover shadow-brutal-sm
                     transition-all duration-150"
          aria-label={`Delete task "${task.title}"`}
          title="Delete task"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
            <path strokeLinecap="square" strokeLinejoin="miter" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  );
}
