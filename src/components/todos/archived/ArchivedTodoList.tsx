import React from 'react';
import styled from 'styled-components';
import { useAllTodos } from 'utils/apis/todo';

import { TodoCard } from '../TodoCard';

export const ArchivedTodoList: React.VFC = () => {
  const { todos, isLoading, error, refetchAllTodos } = useAllTodos({
    archived: true,
  });
  return (
    <>
      {error && 'エラーが発生しました'}
      {isLoading && '読み込み中です'}

      <CardListContainer>
        {todos && todos.length !== 0 ? (
          todos.map((todo) => (
            <li key={todo.id}>
              <TodoCard
                todo={todo}
                cardType="ARCHIVED"
                onCompleteUpdate={refetchAllTodos}
              />
            </li>
          ))
        ) : (
          <EmptyMessage>ゴミ箱は空です</EmptyMessage>
        )}
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

const EmptyMessage = styled.p`
  color: ${(p) => p.theme.colors.text.base};
  font-size: 1rem;
  font-weight: bold;
`;
