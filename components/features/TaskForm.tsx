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
    <form onSubmit={handleSubmit} className="space-y-6 font-sans">
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-semibold text-text-primary mb-3"
        >
          Task Title <span className="text-coral">*</span>
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setError('');
          }}
          placeholder="What needs to be done?"
          maxLength={100}
          className="w-full px-5 py-4 glass-card rounded-2xl
                     text-text-primary placeholder:text-text-secondary/50 font-medium
                     focus:ring-2 focus:ring-purple/50 focus:shadow-glow-purple
                     transition-all duration-300
                     hover:shadow-glass-lg"
        />
        <div className="flex justify-between items-center mt-2">
          {error && (
            <p className="text-sm font-semibold text-coral flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {error}
            </p>
          )}
          <p className={`text-xs font-medium ml-auto ${
            title.length > 90 ? 'text-coral' : 'text-text-secondary'
          }`}>
            {title.length}/100
          </p>
        </div>
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-semibold text-text-primary mb-3"
        >
          Description <span className="text-text-secondary text-xs">(optional)</span>
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add more details about this task..."
          rows={3}
          className="w-full px-5 py-4 glass-card rounded-2xl
                     text-text-primary placeholder:text-text-secondary/50 font-medium
                     focus:ring-2 focus:ring-cyan/50 focus:shadow-glow-cyan
                     transition-all duration-300
                     hover:shadow-glass-lg
                     resize-none"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-purple via-cyan to-coral
                   text-white font-bold py-4 px-8 rounded-2xl
                   shadow-glass glass-hover
                   transition-all duration-300
                   hover:shadow-glass-xl hover:scale-[1.02]
                   active:scale-[0.98]
                   focus:outline-none focus:ring-2 focus:ring-purple/50
                   relative overflow-hidden group"
      >
        <span className="relative z-10 flex items-center justify-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
          </svg>
          Add Task
        </span>
        <div className="absolute inset-0 shimmer"></div>
      </button>
    </form>
  );
}
