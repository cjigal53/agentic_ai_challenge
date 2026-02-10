'use client';

import { useState, FormEvent } from 'react';
import { TaskInput } from '@/lib/types';

interface TaskFormProps {
  onAddTask: (task: TaskInput) => void;
}

export function TaskForm({ onAddTask }: TaskFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      setError('Title is required');
      return;
    }

    if (title.length > 100) {
      setError('Title must be 100 characters or less');
      return;
    }

    onAddTask({
      title: title.trim(),
      description: description.trim() || undefined,
      completed: false,
    });

    setTitle('');
    setDescription('');
    setError('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-text-primary mb-2">
          Task Title *
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setError('');
          }}
          placeholder="Enter task title..."
          maxLength={100}
          className="w-full px-4 py-3 bg-transparent border border-glass-border rounded-xl
                     text-text-primary placeholder-text-secondary/50
                     focus:ring-2 focus:ring-neon-cyan/50 focus:border-neon-cyan
                     transition-all duration-200
                     hover:border-glass-border/50"
        />
        <div className="flex justify-between mt-2">
          {error && (
            <p className="text-sm text-red-400">{error}</p>
          )}
          <p className="text-xs text-neon-cyan ml-auto">
            {title.length}/100
          </p>
        </div>
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-text-primary mb-2">
          Description (optional)
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add more details..."
          rows={3}
          className="w-full px-4 py-3 bg-transparent border border-glass-border rounded-xl
                     text-text-primary placeholder-text-secondary/50
                     focus:ring-2 focus:ring-neon-cyan/50 focus:border-neon-cyan
                     transition-all duration-200
                     hover:border-glass-border/50
                     resize-none"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-neon-cyan to-neon-violet
                   text-white font-medium py-3 px-6 rounded-xl
                   hover:shadow-glow-cyan hover:scale-105
                   active:scale-100
                   transition-all duration-200
                   focus:outline-none focus:ring-2 focus:ring-neon-cyan/50 focus:ring-offset-2 focus:ring-offset-deep-black"
      >
        Add Task
      </button>
    </form>
  );
}
