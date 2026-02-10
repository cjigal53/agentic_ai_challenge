'use client';

import { useTasks } from '@/lib/hooks/useTasks';
import { TaskList } from '@/components/features/TaskList';
import { TaskForm } from '@/components/features/TaskForm';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

export default function Home() {
  const { tasks, addTask, toggleTask, deleteTask } = useTasks();

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Header */}
        <div className="relative">
          <div className="absolute top-0 right-0">
            <ThemeToggle />
          </div>
          <div className="text-center space-y-2">
            <h1 className="text-5xl font-bold text-balance">
              Todo App by CJI
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Built with agentic AI development workflow
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500">
              Following the Plan → Build → Test cycle
            </p>
          </div>
        </div>

        {/* Task Form */}
        <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
            Create New Task
          </h2>
          <TaskForm onAddTask={addTask} />
        </div>

        {/* Task List */}
        <div className="mt-8">
          <TaskList tasks={tasks} onToggle={toggleTask} onDelete={deleteTask} />
        </div>
      </div>
    </main>
  );
}
