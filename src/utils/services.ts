import { Todo } from '../types/Todo';

export const filterTodos = (todos: Todo[], status: string) => {
  return todos.filter(todo => {
    if (status === 'active') {
      return !todo.completed;
    }

    if (status === 'completed') {
      return todo.completed;
    }

    return true;
  });
};
