'use client';

import { useState, useCallback } from 'react';
import { Task, TaskInput } from '@/lib/types';

export function useTasks(initialTasks: Task[] = []) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

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
