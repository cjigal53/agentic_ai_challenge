'use client';

import { useTasks } from '@/lib/hooks/useTasks';
import { TaskList } from '@/components/features/TaskList';
import { TaskForm } from '@/components/features/TaskForm';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

export default function Home() {
  const { tasks, addTask, toggleTask, deleteTask } = useTasks();

  return (
    <main className="min-h-screen p-6 md:p-12 relative">
      <div className="max-w-4xl mx-auto space-y-16 relative z-10">
        {/* Header - Brutalist Editorial Style */}
        <div className="relative">
          <div className="absolute top-0 right-0 z-20">
            <ThemeToggle />
          </div>

          {/* Editorial Header with Decorative Elements */}
          <div className="border-l-6 border-terracotta pl-6 md:pl-10 pt-4 relative">
            <div className="absolute -left-3 top-0 w-6 h-6 bg-terracotta rotate-45"></div>
            <span className="text-xs font-bold tracking-[0.3em] uppercase text-stone mb-2 block font-sans">
              Issue № 001
            </span>
            <h1 className="text-5xl md:text-7xl font-display font-black text-text-primary leading-[0.95] mb-4 text-balance">
              Todo App by CJI
            </h1>
            <div className="w-24 h-1 bg-sage mb-6"></div>
            <p className="text-lg md:text-xl font-sans font-medium text-text-secondary max-w-xl">
              Built with agentic AI development workflow
            </p>
            <p className="text-sm font-sans text-text-secondary/70 mt-2 tracking-wide">
              Following the Plan → Build → Test cycle
            </p>
          </div>
        </div>

        {/* Task Form - Brutalist Card */}
        <div className="brutal-card border-charcoal shadow-brutal p-8 md:p-10 corner-accent text-charcoal">
          <div className="flex items-baseline gap-4 mb-8">
            <span className="text-4xl font-display font-black text-terracotta">01</span>
            <h2 className="text-3xl font-display font-bold text-text-primary">
              Create New Task
            </h2>
          </div>
          <TaskForm onAddTask={addTask} />
        </div>

        {/* Task List */}
        <div className="counter-reset">
          <TaskList tasks={tasks} onToggle={toggleTask} onDelete={deleteTask} />
        </div>
      </div>

      {/* Decorative Background Elements */}
      <div className="fixed top-20 right-10 w-32 h-32 border-5 border-sage/20 -rotate-12 pointer-events-none hidden md:block"></div>
      <div className="fixed bottom-20 left-10 w-24 h-24 bg-clay/10 rotate-45 pointer-events-none hidden md:block"></div>
    </main>
  );
}
