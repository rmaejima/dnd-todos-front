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
      {isLoading && '読み込み中です'}

      <CardListContainer>
        {todos &&
          todos.map((todo) => (
            <TodoCard
              key={todo.id}
              todo={todo}
              omCompleteFinish={refetchAllTodos}
            />
          ))}
      </CardListContainer>
      <CreateTodoModalProvider onCompleteCreate={refetchAllTodos} />
    </>
  );
};

const CardListContainer = styled.div`
  > div:not(:first-child) {
    margin-top: 0.5rem;
  }
`;
