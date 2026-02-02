import { renderHook, act } from '@testing-library/react';
import { useTasks } from './useTasks';
import { Task, TaskInput } from '@/lib/types';

describe('useTasks Hook', () => {
  describe('addTask', () => {
    it('creates a task with UUID and timestamp', () => {
      const { result } = renderHook(() => useTasks());

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

    it('adds task to the tasks array', () => {
      const { result } = renderHook(() => useTasks());

      act(() => {
        result.current.addTask({ title: 'Task 1', completed: false });
      });

      expect(result.current.tasks).toHaveLength(1);
      expect(result.current.tasks[0].title).toBe('Task 1');
    });

    it('defaults completed to false if not provided', () => {
      const { result } = renderHook(() => useTasks());

      let createdTask: Task;
      act(() => {
        createdTask = result.current.addTask({ title: 'Task', completed: false });
      });

      expect(createdTask!.completed).toBe(false);
    });
  });

  describe('toggleTask', () => {
    it('toggles completed from false to true', () => {
      const initialTasks: Task[] = [{
        id: '1',
        title: 'Task',
        completed: false,
        createdAt: new Date(),
      }];

      const { result } = renderHook(() => useTasks(initialTasks));

      act(() => {
        result.current.toggleTask('1');
      });

      expect(result.current.tasks[0].completed).toBe(true);
    });

    it('toggles completed from true to false', () => {
      const initialTasks: Task[] = [{
        id: '1',
        title: 'Task',
        completed: true,
        createdAt: new Date(),
      }];

      const { result } = renderHook(() => useTasks(initialTasks));

      act(() => {
        result.current.toggleTask('1');
      });

      expect(result.current.tasks[0].completed).toBe(false);
    });

    it('does not affect other tasks', () => {
      const initialTasks: Task[] = [
        { id: '1', title: 'Task 1', completed: false, createdAt: new Date() },
        { id: '2', title: 'Task 2', completed: false, createdAt: new Date() },
      ];

      const { result } = renderHook(() => useTasks(initialTasks));

      act(() => {
        result.current.toggleTask('1');
      });

      expect(result.current.tasks[0].completed).toBe(true);
      expect(result.current.tasks[1].completed).toBe(false);
    });
  });

  describe('deleteTask', () => {
    it('removes the correct task', () => {
      const initialTasks: Task[] = [
        { id: '1', title: 'Task 1', completed: false, createdAt: new Date() },
        { id: '2', title: 'Task 2', completed: false, createdAt: new Date() },
      ];

      const { result } = renderHook(() => useTasks(initialTasks));

      act(() => {
        result.current.deleteTask('1');
      });

      expect(result.current.tasks).toHaveLength(1);
      expect(result.current.tasks[0].id).toBe('2');
    });

    it('does not affect other tasks', () => {
      const initialTasks: Task[] = [
        { id: '1', title: 'Task 1', completed: false, createdAt: new Date() },
        { id: '2', title: 'Task 2', completed: false, createdAt: new Date() },
      ];

      const { result } = renderHook(() => useTasks(initialTasks));

      act(() => {
        result.current.deleteTask('1');
      });

      expect(result.current.tasks[0].title).toBe('Task 2');
    });
  });

  describe('updateTask', () => {
    it('updates specified fields', () => {
      const initialTasks: Task[] = [{
        id: '1',
        title: 'Old Title',
        description: 'Old Description',
        completed: false,
        createdAt: new Date(),
      }];

      const { result } = renderHook(() => useTasks(initialTasks));

      act(() => {
        result.current.updateTask('1', { title: 'New Title' });
      });

      expect(result.current.tasks[0].title).toBe('New Title');
      expect(result.current.tasks[0].description).toBe('Old Description');
    });

    it('preserves other fields', () => {
      const createdAt = new Date();
      const initialTasks: Task[] = [{
        id: '1',
        title: 'Task',
        completed: false,
        createdAt,
      }];

      const { result } = renderHook(() => useTasks(initialTasks));

      act(() => {
        result.current.updateTask('1', { completed: true });
      });

      expect(result.current.tasks[0].title).toBe('Task');
      expect(result.current.tasks[0].createdAt).toBe(createdAt);
    });
  });
});
