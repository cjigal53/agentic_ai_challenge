'use client';

import { Task } from '@/lib/types';
import { TaskItem } from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  onToggle: (taskId: string) => void;
  onDelete: (taskId: string) => void;
}

export function TaskList({ tasks, onToggle, onDelete }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-20 relative">
        {/* Brutalist empty state */}
        <div className="brutal-card border-sage shadow-brutal-sage inline-block p-12 corner-accent text-sage relative">
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-background px-4">
            <span className="text-xs font-bold tracking-[0.3em] uppercase text-sage font-sans">
              Empty State
            </span>
          </div>

          <div className="inline-flex items-center justify-center w-24 h-24 border-5 border-sage mb-6 rotate-45">
            <svg
              className="w-12 h-12 text-sage -rotate-45"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="square"
                strokeLinejoin="miter"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          </div>

          <h3 className="text-3xl font-display font-black text-text-primary mb-3">
            No tasks yet
          </h3>
          <div className="w-16 h-1 bg-sage mx-auto mb-4"></div>
          <p className="text-base font-sans font-medium text-text-secondary max-w-xs mx-auto">
            Create your first task to start organizing your work
          </p>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-16 h-16 border-3 border-clay/30 rotate-12 pointer-events-none hidden md:block"></div>
        <div className="absolute bottom-10 right-10 w-12 h-12 bg-terracotta/20 -rotate-12 pointer-events-none hidden md:block"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onToggle={onToggle} onDelete={onDelete} />
      ))}
    </div>
  );
}
