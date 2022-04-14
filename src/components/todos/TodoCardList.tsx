import React from 'react';
import styled from 'styled-components';
import { useAllTodos } from 'utils/apis/todo';
import { TodoCard } from './TodoCard';

export const TodoCardList: React.VFC = () => {
  const { todos, isLoading, error, refetchAllTodos } = useAllTodos();
  return (
    <>
      {error && 'エラーが発生しました'}

      {/* TODO: ローディング実装 */}
      {isLoading && 'ローディング'}

      <Container>
        {todos && todos.map((todo) => <TodoCard key={todo.id} todo={todo} />)}
      </Container>
    </>
  );
};

const Container = styled.div`
  > div:not(:first-child) {
    margin-top: 0.5rem;
  }
`;
