import React, { useEffect, useRef, useState } from 'react';

type Props = {
  onCreateTodo: (todoTitle: string) => void;
  loading: boolean;
};

const Form: React.FC<Props> = ({ onCreateTodo, loading }) => {
  const [todoTitle, setTodoTitle] = useState('');

  const titleField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (titleField.current && !loading) {
      titleField.current.focus();
    }
  }, [loading]);

  const handleTitleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodoTitle(event.target.value);
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (todoTitle.trim() !== '') {
      onCreateTodo(todoTitle);
      setTodoTitle('');
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <input
        disabled={loading}
        ref={titleField}
        data-cy="NewTodoField"
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
        value={todoTitle}
        onChange={handleTitleInput}
      />
    </form>
  );
};

export default Form;
