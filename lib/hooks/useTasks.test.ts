import { renderHook, act, waitFor } from '@testing-library/react';
import { useTasks } from './useTasks';
import { Task, TaskInput } from '@/lib/types';

beforeEach(() => {
  localStorage.clear();
});

describe('useTasks Hook', () => {
  describe('addTask', () => {
    it('creates a task with UUID and timestamp', async () => {
      const { result } = renderHook(() => useTasks());

      await waitFor(() => expect(result.current.tasks).toHaveLength(0));

      const taskInput: TaskInput = {
        title: 'Test Task',
        description: 'Test Description',
        completed: false,
      };

      let createdTask: Task;
      act(() => {
        createdTask = result.current.addTask(taskInput);
      });

      expect(createdTask!).toMatchObject({
        title: 'Test Task',
        description: 'Test Description',
        completed: false,
      });
      expect(createdTask!.id).toBeTruthy();
      expect(createdTask!.createdAt).toBeInstanceOf(Date);
    });

    it('adds task to the tasks array', async () => {
      const { result } = renderHook(() => useTasks());

      await waitFor(() => expect(result.current.tasks).toHaveLength(0));

      act(() => {
        result.current.addTask({ title: 'Task 1', completed: false });
      });

      expect(result.current.tasks).toHaveLength(1);
      expect(result.current.tasks[0].title).toBe('Task 1');
    });
  });

  describe('toggleTask', () => {
    it('toggles completed status', async () => {
      const { result } = renderHook(() => useTasks());

      await waitFor(() => expect(result.current.tasks).toHaveLength(0));

      let taskId: string;
      act(() => {
        const task = result.current.addTask({ title: 'Task', completed: false });
        taskId = task.id;
      });

      act(() => {
        result.current.toggleTask(taskId!);
      });

      expect(result.current.tasks[0].completed).toBe(true);
    });
  });

  describe('deleteTask', () => {
    it('removes the correct task', async () => {
      const { result } = renderHook(() => useTasks());

      await waitFor(() => expect(result.current.tasks).toHaveLength(0));

      let taskId: string;
      act(() => {
        result.current.addTask({ title: 'Task 1', completed: false });
        result.current.addTask({ title: 'Task 2', completed: false });
      });

      await waitFor(() => expect(result.current.tasks).toHaveLength(2));

      taskId = result.current.tasks[0].id;

      act(() => {
        result.current.deleteTask(taskId);
      });

      expect(result.current.tasks).toHaveLength(1);
      expect(result.current.tasks[0].title).toBe('Task 2');
    });
  });

  describe('localStorage persistence', () => {
    it('saves tasks to localStorage', async () => {
      const { result } = renderHook(() => useTasks());

      await waitFor(() => expect(result.current.tasks).toHaveLength(0));

      act(() => {
        result.current.addTask({ title: 'Persistent Task', completed: false });
      });

      await waitFor(() => {
        const stored = localStorage.getItem('todo-app-tasks');
        expect(stored).toBeTruthy();
      });

      const stored = localStorage.getItem('todo-app-tasks');
      const parsed = JSON.parse(stored!);
      expect(parsed[0].title).toBe('Persistent Task');
    });

    it('loads tasks from localStorage on mount', async () => {
      const initialTasks = [
        { id: '1', title: 'Loaded Task', completed: false, createdAt: new Date().toISOString() }
      ];
      localStorage.setItem('todo-app-tasks', JSON.stringify(initialTasks));

      const { result } = renderHook(() => useTasks());

      await waitFor(() => expect(result.current.tasks).toHaveLength(1));

      expect(result.current.tasks[0].title).toBe('Loaded Task');
    });
  });
});
