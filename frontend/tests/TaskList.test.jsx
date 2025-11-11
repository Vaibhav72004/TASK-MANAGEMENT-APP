import { render, screen } from '@testing-library/react';
import TaskList from '../src/components/TaskList.jsx';

test('renders empty state', () => {
  render(<TaskList tasks={[]} onToggle={() => {}} onDelete={() => {}} onEdit={() => {}} />);
  expect(screen.getByText(/No tasks yet/i)).toBeInTheDocument();
});
