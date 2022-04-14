import React from 'react';
import styled from 'styled-components';
import { useAllTodos } from 'utils/apis/todo';
import { TodoCard } from './TodoCard';
import { CreateTodoModalProvider } from './CreateTodoModalProvider';

export const TodoList: React.VFC = () => {
  const { todos, isLoading, error, refetchAllTodos } = useAllTodos();

  return (
    <>
      {error && 'エラーが発生しました'}

      {/* TODO: ローディング実装 */}
      {isLoading && 'ローディング'}

      <CardListContainer>
        {todos && todos.map((todo) => <TodoCard key={todo.id} todo={todo} />)}
      </CardListContainer>
      <CreateTodoModalProvider />
    </>
  );
};

const CardListContainer = styled.div`
  > div:not(:first-child) {
    margin-top: 0.5rem;
  }
`;