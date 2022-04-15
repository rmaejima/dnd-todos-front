import React from 'react';
import styled from 'styled-components';
import { useAllTodos } from 'utils/apis/todo';
import { TodoCard } from '../TodoCard';

export const FinishedTodoList: React.VFC = () => {
  const { todos, isLoading, error } = useAllTodos({ finished: true });
  return (
    <>
      {error && 'エラーが発生しました'}
      {isLoading && '読み込み中です'}

      <CardListContainer>
        {todos &&
          todos.map((todo) => (
            <li key={todo.id}>
              <TodoCard todo={todo} disabled />
            </li>
          ))}
      </CardListContainer>
    </>
  );
};

const CardListContainer = styled.ul`
  list-style: none;
  > li:not(:first-child) {
    margin-top: 0.5rem;
  }
`;
