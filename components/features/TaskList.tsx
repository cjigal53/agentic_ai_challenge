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
      <div className="text-center py-16 relative">
        {/* Glassmorphism Empty State */}
        <div className="glass-card rounded-3xl p-12 md:p-16 max-w-xl mx-auto relative overflow-hidden">
          {/* Decorative Gradient Orb */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-purple/20 to-cyan/20 rounded-full blur-3xl"></div>

          {/* Animated Icon */}
          <div className="relative mb-8 inline-flex">
            <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-purple/20 to-cyan/20 flex items-center justify-center float">
              <svg
                className="w-12 h-12 text-purple"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            {/* Pulse ring */}
            <div className="absolute inset-0 w-24 h-24 rounded-3xl bg-purple/20 animate-ping"></div>
          </div>

          <h3 className="text-3xl md:text-4xl font-display font-bold mb-4">
            <span className="gradient-text">No tasks yet</span>
          </h3>

          <p className="text-base md:text-lg font-sans text-text-secondary max-w-sm mx-auto leading-relaxed">
            Start your productivity journey by creating your first task above
          </p>

          {/* Decorative Elements */}
          <div className="flex justify-center gap-2 mt-8">
            <div className="w-2 h-2 rounded-full bg-purple animate-pulse"></div>
            <div className="w-2 h-2 rounded-full bg-cyan animate-pulse" style={{animationDelay: "0.2s"}}></div>
            <div className="w-2 h-2 rounded-full bg-coral animate-pulse" style={{animationDelay: "0.4s"}}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Task count badge */}
      <div className="flex items-center justify-between mb-6">
        <div className="glass-card px-4 py-2 rounded-xl inline-flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple to-cyan"></div>
          <span className="text-sm font-semibold text-text-primary">
            {tasks.length} {tasks.length === 1 ? 'Task' : 'Tasks'}
          </span>
        </div>
      </div>

      {/* Task items */}
      {tasks.map((task, index) => (
        <div
          key={task.id}
          className="animate-fade-in"
          style={{animationDelay: `${index * 0.05}s`}}
        >
          <TaskItem task={task} onToggle={onToggle} onDelete={onDelete} />
        </div>
      ))}
    </div>
  );
}
