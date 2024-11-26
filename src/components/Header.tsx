import React from 'react';

import cn from 'classnames';
import { Todo } from '../types/Todo';
import Form from './Form';

type Props = {
  todos: Todo[];
  onCreateTodo: (todoTitle: string) => void;
  loading: boolean;
};

const Header: React.FC<Props> = ({ todos, onCreateTodo, loading }) => {
  return (
    <header className="todoapp__header">
      <button
        type="button"
        className={cn('todoapp__toggle-all', {
          active: todos.length > 0 && todos.every(todo => todo.completed),
        })}
        data-cy="ToggleAllButton"
      />

      {/* Add a todo on form submit */}
      <Form onCreateTodo={onCreateTodo} loading={loading} />
    </header>
  );
};

export default Header;
