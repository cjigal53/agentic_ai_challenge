'use client';

import { useState, useCallback, useEffect } from 'react';
import { Task, TaskInput } from '@/lib/types';

const STORAGE_KEY = 'todo-app-tasks';

function loadTasksFromStorage(): Task[] {
  if (typeof window === 'undefined') return [];

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];

    const parsed = JSON.parse(stored);
    return parsed.map((task: any) => ({
      ...task,
      createdAt: new Date(task.createdAt),
    }));
  } catch (error) {
    console.error('Failed to load tasks from localStorage:', error);
    return [];
  }
}

function saveTasksToStorage(tasks: Task[]) {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error('Failed to save tasks to localStorage:', error);
  }
}

export function useTasks(initialTasks: Task[] = []) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadedTasks = loadTasksFromStorage();
    if (loadedTasks.length > 0) {
      setTasks(loadedTasks);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      saveTasksToStorage(tasks);
    }
  }, [tasks, isLoaded]);

  const addTask = useCallback((taskInput: TaskInput): Task => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title: taskInput.title,
      description: taskInput.description,
      completed: taskInput.completed || false,
      createdAt: new Date(),
    };
    setTasks((prev) => [...prev, newTask]);
    return newTask;
  }, []);

  const toggleTask = useCallback((taskId: string): void => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  }, []);

  const deleteTask = useCallback((taskId: string): void => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  }, []);

  const updateTask = useCallback((taskId: string, updates: Partial<TaskInput>): void => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, ...updates } : task
      )
    );
  }, []);

  return {
    tasks,
    addTask,
    toggleTask,
    deleteTask,
    updateTask,
  };
}
