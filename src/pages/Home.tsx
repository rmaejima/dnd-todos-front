import React from 'react';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { SafeArea } from 'components/common/SafeArea';
import { TodoList } from 'components/todos/TodoList';
import { PageTitle } from 'components/common/PageTitle';

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
