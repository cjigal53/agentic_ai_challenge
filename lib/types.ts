/**
 * Type definitions for the Todo App
 */

export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: Date;
}

export type TaskInput = Omit<Task, 'id' | 'createdAt'>;
