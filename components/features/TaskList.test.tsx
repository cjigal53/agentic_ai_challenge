import { render, screen } from '@testing-library/react';
import { TaskList } from './TaskList';
import { Task } from '@/lib/types';

const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Test Task 1',
    description: 'Description 1',
    completed: false,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '2',
    title: 'Test Task 2',
    completed: true,
    createdAt: new Date('2024-01-02'),
  },
];

describe('TaskList', () => {
  const mockOnToggle = jest.fn();
  const mockOnDelete = jest.fn();

  it('displays empty state when no tasks', () => {
    render(<TaskList tasks={[]} onToggle={mockOnToggle} onDelete={mockOnDelete} />);
    expect(screen.getByText(/no tasks yet/i)).toBeInTheDocument();
    expect(screen.getByText(/create your first task/i)).toBeInTheDocument();
  });

  it('renders multiple tasks', () => {
    render(<TaskList tasks={mockTasks} onToggle={mockOnToggle} onDelete={mockOnDelete} />);
    expect(screen.getByText('Test Task 1')).toBeInTheDocument();
    expect(screen.getByText('Test Task 2')).toBeInTheDocument();
  });

  it('does not show empty state when tasks exist', () => {
    render(<TaskList tasks={mockTasks} onToggle={mockOnToggle} onDelete={mockOnDelete} />);
    expect(screen.queryByText(/no tasks yet/i)).not.toBeInTheDocument();
  });
});
