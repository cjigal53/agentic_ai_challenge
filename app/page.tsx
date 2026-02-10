'use client';

import { useTasks } from '@/lib/hooks/useTasks';
import { TaskList } from '@/components/features/TaskList';
import { TaskForm } from '@/components/features/TaskForm';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

export default function Home() {
  const { tasks, addTask, toggleTask, deleteTask } = useTasks();

  return (
    <main className="min-h-screen p-8 bg-gradient-to-br from-deep-black via-deep-black to-gray-900">
      <div className="max-w-3xl mx-auto space-y-12">
        {/* Header */}
        <div className="relative">
          <div className="absolute top-0 right-0 z-10">
            <ThemeToggle />
          </div>
          <div className="text-center space-y-4 pt-8">
            <h1 className="text-5xl md:text-6xl font-bold text-balance bg-gradient-to-r from-neon-cyan to-neon-violet bg-clip-text text-transparent">
              Todo App by CJI
            </h1>
            <p className="text-xl text-text-secondary">
              Built with agentic AI development workflow
            </p>
            <p className="text-sm text-text-secondary/70">
              Following the Plan → Build → Test cycle
            </p>
          </div>
        </div>

        {/* Task Form */}
        <div className="glass-card rounded-2xl p-8 transition-all duration-200">
          <h2 className="text-2xl font-semibold mb-6 text-text-primary">
            Create New Task
          </h2>
          <TaskForm onAddTask={addTask} />
        </div>

        {/* Task List */}
        <div>
          <TaskList tasks={tasks} onToggle={toggleTask} onDelete={deleteTask} />
        </div>
      </div>
    </main>
  );
}
