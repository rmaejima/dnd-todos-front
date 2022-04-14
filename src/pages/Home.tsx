import React from 'react';
import styled from 'styled-components';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { SafeArea } from 'components/common/SafeArea';
import { TodoList } from 'components/todos/TodoList';

export const Home: React.VFC = () => {
  return (
    <SafeArea>
      <IconTitle>
        <FaRegCalendarAlt />
        <h1>TODO</h1>
      </IconTitle>
      <TodoList />
    </SafeArea>
  );
};

const IconTitle = styled.div`
  display: flex;
  align-items: center;

  margin-bottom: 2rem;
  color: ${(p) => p.theme.colors.text.base};
  font-size: 1.5rem;
  font-weight: bold;

  > h1 {
    margin-left: 1rem;
    color: ${(p) => p.theme.colors.text.base};
    font-size: 1.5rem;
    font-weight: bold;
  }
`;
