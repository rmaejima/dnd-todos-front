import React from 'react';
import styled from 'styled-components';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { SafeArea } from 'components/common/SafeArea';
import { ArchivedTodoList } from 'components/todos/archived/ArchivedTodoList';

export const Archived: React.VFC = () => {
  return (
    <SafeArea>
      <IconTitle>
        <FaRegCalendarAlt />
        <h1>ゴミ箱</h1>
      </IconTitle>
      <ArchivedTodoList />
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
