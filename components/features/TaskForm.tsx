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
          className="block text-sm font-bold uppercase tracking-wider text-text-primary mb-3"
        >
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
          className="w-full px-5 py-4 bg-background border-3 border-charcoal
                     text-text-primary placeholder-stone/60 font-medium
                     focus:border-terracotta focus:shadow-brutal-sm
                     transition-all duration-150
                     hover:border-stone"
        />
        <div className="flex justify-between mt-3">
          {error && (
            <p className="text-sm font-bold text-terracotta">{error}</p>
          )}
          <p className="text-xs font-bold tracking-wider text-sage ml-auto">
            {title.length}/100
          </p>
        </div>
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-bold uppercase tracking-wider text-text-primary mb-3"
        >
          Description (optional)
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add more details..."
          rows={3}
          className="w-full px-5 py-4 bg-background border-3 border-charcoal
                     text-text-primary placeholder-stone/60 font-medium
                     focus:border-terracotta focus:shadow-brutal-sm
                     transition-all duration-150
                     hover:border-stone
                     resize-none"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-terracotta border-3 border-charcoal
                   text-cream-cool font-bold py-4 px-8 uppercase tracking-wider
                   shadow-brutal brutal-hover
                   transition-all duration-150
                   focus:outline-none"
      >
        Add Task
      </button>
    </form>
  );
}
