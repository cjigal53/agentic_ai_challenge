# Issue #9: Task Type Definitions and State Management

## Issue
https://github.com/cjigal53/agentic_ai_challenge/issues/9

## Overview
Define TypeScript interfaces for Task objects and create a custom React hook for state management. This provides the foundation for all task operations in the Todo App.

## Requirements

### Task Type
```typescript
interface Task {
  id: string;              // Unique identifier (UUID)
  title: string;           // Task title (required)
  description?: string;    // Optional description
  completed: boolean;      // Completion status
  createdAt: Date;         // Creation timestamp
}
```

### TaskInput Type
```typescript
type TaskInput = Omit<Task, 'id' | 'createdAt'>;
```
Used when creating new tasks (id and createdAt auto-generated).

### State Management Hook
Custom hook `useTasks()` with:
- State: `tasks: Task[]`
- Operations: addTask, toggleTask, deleteTask, updateTask

## Approach

### 1. Type Definitions (`lib/types.ts`)

**Task Interface**:
- id: string (UUID v4)
- title: string (1-100 characters)
- description: optional string
- completed: boolean
- createdAt: Date object

**TaskInput Type**:
- Derived from Task using Omit utility type
- Excludes id and createdAt (auto-generated)

### 2. State Management Hook (`lib/hooks/useTasks.ts`)

**Hook Structure**:
```typescript
export function useTasks(initialTasks: Task[] = []) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  // Operations...

  return { tasks, addTask, toggleTask, deleteTask, updateTask };
}
```

**Operations**:

**addTask(taskInput: TaskInput): Task**
- Generate UUID using crypto.randomUUID()
- Create Date object for createdAt
- Add to tasks array (immutable)
- Return created task

**toggleTask(taskId: string): void**
- Find task by id
- Toggle completed boolean
- Update tasks array (immutable)

**deleteTask(taskId: string): void**
- Filter out task by id
- Update tasks array

**updateTask(taskId: string, updates: Partial<TaskInput>): void**
- Find task by id
- Merge updates with existing task
- Update tasks array (immutable)

### 3. Implementation Details

**Immutability**:
- All state updates use functional setState
- Array operations: map, filter, spread operator
- Never mutate existing objects

**Performance**:
- Use useCallback for all operations
- Memoized functions prevent unnecessary re-renders

**Type Safety**:
- Strict TypeScript types
- No any types
- Proper return types

## Acceptance Criteria

- [x] Task interface defined with all fields
- [x] TaskInput type using Omit
- [x] useTasks hook created
- [x] addTask generates UUID and Date
- [x] toggleTask updates completion status
- [x] deleteTask removes from array
- [x] updateTask merges partial updates
- [x] All operations are immutable
- [x] Functions memoized with useCallback
- [x] TypeScript strict mode passes

## Testing Plan

### Unit Tests

**Task Type Tests**:
- Verify type structure
- Test TaskInput excludes id and createdAt

**useTasks Hook Tests**:
1. **addTask**:
   - Creates task with UUID
   - Sets createdAt to Date
   - Adds to tasks array
   - Returns created task

2. **toggleTask**:
   - Toggles completed from false to true
   - Toggles completed from true to false
   - Doesn't affect other tasks

3. **deleteTask**:
   - Removes correct task
   - Doesn't affect other tasks
   - Handles non-existent id

4. **updateTask**:
   - Updates specified fields
   - Preserves other fields
   - Doesn't affect other tasks

### Test Tools
- @testing-library/react-hooks
- Jest matchers
- Mock data generators

## Implementation Notes

- Use crypto.randomUUID() (available in modern browsers and Node)
- Date objects for createdAt (not timestamps)
- Initial state can be empty array or provided
- Hook is reusable across components
- No localStorage in this issue (comes later)

## Success Criteria

✅ Types compile without errors
✅ Hook functions work correctly
✅ All tests passing
✅ Ready for UI components to consume
