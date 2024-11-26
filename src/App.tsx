/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */

import { useCallback, useEffect, useMemo, useState } from 'react';
import { UserWarning } from './UserWarning';
import * as postService from './api/todos';
import { Todo } from './types/Todo';
import { filterTodos } from './utils/services';
import TodoItem from './components/TodoItem';
import Header from './components/Header';
import Footer from './components/Footer';
import ErrorNotification from './components/ErrorNotification';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [tempTodo, setTempTodo] = useState<Todo | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [deletingTodos, setDeletingTodos] = useState<number[]>([]);

  const filtered = useMemo(
    () => filterTodos(todos, activeFilter),
    [todos, activeFilter],
  );

  const addTodo = useCallback((title: string) => {
    setTempTodo({
      id: 0,
      userId: postService.USER_ID,
      title: title,
      completed: false,
    });
    setLoading(true);
    postService
      .createTodo(title)
      .then(newTodo => {
        setDeletingTodos(current => [...current, 0]);
        setTempTodo(null);
        setTodos(currentTodos => [...currentTodos, newTodo]);
      })
      .catch(() => setErrorMessage('Unable to create todo'))
      .finally(() => setLoading(false));
  }, []);

  const loadTodos = useCallback(() => {
    setLoading(true);
    postService
      .getTodos()
      .then(setTodos)
      .catch(() => setErrorMessage('Unable to load todos'))
      .finally(() => setLoading(false));
  }, []);

  const deleteTodo = useCallback((id: number) => {
    setLoading(true);
    setDeletingTodos(current => [...current, id]);
    postService
      .deleteTodo(id)
      .then(() => {
        setTodos(currentTodos => currentTodos.filter(todo => todo.id !== id));
      })
      .catch(() => setErrorMessage('Unable to load todos'))
      .finally(() => setLoading(false));
  }, []);

  const handleClearCompleted = () => {
    const completedTodos = todos.filter(todo => todo.completed);

    completedTodos.forEach(todo => {
      setDeletingTodos(current => [...current, todo.id]);
      deleteTodo(todo.id);
    });
  };

  useEffect(() => {
    loadTodos();
  }, [loadTodos]);

  useEffect(() => {
    if (errorMessage) {
      setTimeout(() => setErrorMessage(''), 3000);
    }
  }, [errorMessage]);

  if (!postService.USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header todos={todos} onCreateTodo={addTodo} loading={loading} />

        <section className="todoapp__main" data-cy="TodoList">
          {filtered.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onDelete={deleteTodo}
              deletingTodos={deletingTodos}
            />
          ))}
          {tempTodo && (
            <TodoItem
              key={tempTodo.id}
              todo={tempTodo}
              onDelete={deleteTodo}
              deletingTodos={deletingTodos}
            />
          )}
        </section>

        {todos.length > 0 && (
          <Footer
            todos={todos}
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
            handleClearCompleted={handleClearCompleted}
          />
        )}
      </div>

      {loading && <div className="loading">Loading...</div>}

      <ErrorNotification
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
    </div>
  );
};
