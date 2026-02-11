'use client';

import { useTasks } from '@/lib/hooks/useTasks';
import { TaskList } from '@/components/features/TaskList';
import { TaskForm } from '@/components/features/TaskForm';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

export default function Home() {
  const { tasks, addTask, toggleTask, deleteTask } = useTasks();

  return (
    <main className="min-h-screen p-6 md:p-12 relative overflow-hidden">
      <div className="max-w-5xl mx-auto space-y-12 relative z-10">
        {/* Header - Glassmorphism Hero */}
        <div className="relative animate-fade-in">
          <div className="absolute top-0 right-0 z-20">
            <ThemeToggle />
          </div>

          {/* Hero Section with Glass Effect */}
          <div className="glass-card rounded-3xl p-8 md:p-12 relative overflow-hidden">
            {/* Gradient Accent Bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple via-cyan to-coral"></div>

            {/* Floating Gradient Orb */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-gradient-to-br from-purple/30 to-cyan/30 rounded-full blur-3xl float"></div>

            <div className="relative">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple to-cyan animate-pulse-glow"></div>
                <span className="text-xs font-semibold tracking-wider uppercase text-text-secondary font-sans">
                  Powered by AI
                </span>
              </div>

              <h1 className="text-5xl md:text-7xl font-display font-extrabold leading-tight mb-6">
                <span className="gradient-text">Todo Flow</span>
              </h1>

              <p className="text-lg md:text-xl font-sans text-text-secondary max-w-2xl leading-relaxed">
                Experience task management reimagined with glassmorphism design and fluid gradient aesthetics
              </p>

              <div className="flex flex-wrap gap-3 mt-6">
                <div className="px-4 py-2 rounded-xl glass-card text-sm font-medium">
                  <span className="text-purple">✨</span> Agentic AI Workflow
                </div>
                <div className="px-4 py-2 rounded-xl glass-card text-sm font-medium">
                  <span className="text-cyan">⚡</span> Next.js 15
                </div>
                <div className="px-4 py-2 rounded-xl glass-card text-sm font-medium">
                  <span className="text-coral">🎨</span> Modern Design
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Task Form - Glass Card */}
        <div className="glass-card rounded-3xl p-8 md:p-10 gradient-border glass-hover relative animate-fade-in" style={{animationDelay: "0.1s"}}>
          {/* Floating Gradient Orb */}
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-gradient-to-tr from-coral/30 to-purple/30 rounded-full blur-3xl float" style={{animationDelay: "2s"}}></div>

          <div className="relative">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple to-cyan flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <h2 className="text-3xl font-display font-bold text-text-primary">
                Create New Task
              </h2>
            </div>
            <TaskForm onAddTask={addTask} />
          </div>
        </div>

        {/* Task List */}
        <div className="animate-fade-in" style={{animationDelay: "0.2s"}}>
          <TaskList tasks={tasks} onToggle={toggleTask} onDelete={deleteTask} />
        </div>
      </div>

      {/* Decorative Floating Gradient Orbs */}
      <div className="fixed top-1/4 right-0 w-96 h-96 bg-gradient-to-br from-cyan/20 to-purple/20 rounded-full blur-3xl pointer-events-none float" style={{animationDelay: "1s"}}></div>
      <div className="fixed bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-coral/20 to-cyan/20 rounded-full blur-3xl pointer-events-none float" style={{animationDelay: "3s"}}></div>
    </main>
  );
}
