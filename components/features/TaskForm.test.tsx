import { render, screen, fireEvent } from '@testing-library/react';
import { TaskForm } from './TaskForm';

describe('TaskForm', () => {
  it('shows error when title is empty', () => {
    const mockAdd = jest.fn();
    render(<TaskForm onAddTask={mockAdd} />);

    fireEvent.click(screen.getByText('Add Task'));
    expect(screen.getByText('Title is required')).toBeInTheDocument();
    expect(mockAdd).not.toHaveBeenCalled();
  });

  it('shows error when title exceeds 100 characters', () => {
    const mockAdd = jest.fn();
    render(<TaskForm onAddTask={mockAdd} />);

    const input = screen.getByPlaceholderText('Enter task title...');
    fireEvent.change(input, { target: { value: 'a'.repeat(101) } });
    fireEvent.click(screen.getByText('Add Task'));

    expect(screen.getByText(/100 characters or less/i)).toBeInTheDocument();
  });

  it('calls onAddTask with valid input', () => {
    const mockAdd = jest.fn();
    render(<TaskForm onAddTask={mockAdd} />);

    fireEvent.change(screen.getByPlaceholderText('Enter task title...'), {
      target: { value: 'Test Task' }
    });
    fireEvent.click(screen.getByText('Add Task'));

    expect(mockAdd).toHaveBeenCalledWith({
      title: 'Test Task',
      description: undefined,
      completed: false,
    });
  });

  it('clears form after submission', () => {
    const mockAdd = jest.fn();
    render(<TaskForm onAddTask={mockAdd} />);

    const input = screen.getByPlaceholderText('Enter task title...') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'Test' } });
    fireEvent.click(screen.getByText('Add Task'));

    expect(input.value).toBe('');
  });
});
