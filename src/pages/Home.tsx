import { PageTitle } from 'components/common/PageTitle';
import { SafeArea } from 'components/common/SafeArea';
import { TodoList } from 'components/todos/TodoList';
import React from 'react';
import { FaRegCalendarAlt } from 'react-icons/fa';

export const Home: React.VFC = () => {
  return (
    <SafeArea>
      <PageTitle>
        <FaRegCalendarAlt />
        <h1>TODO</h1>
      </PageTitle>
      <TodoList />
    </SafeArea>
  );
};
