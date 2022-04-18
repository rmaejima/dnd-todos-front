import { PageTitle } from 'components/common/PageTitle';
import { SafeArea } from 'components/common/SafeArea';
import { FinishedTodoList } from 'components/todos/finished/FinishedTodoList';
import React from 'react';
import { FaRegCalendarAlt } from 'react-icons/fa';

export const Finished: React.VFC = () => {
  return (
    <SafeArea>
      <PageTitle>
        <FaRegCalendarAlt />
        <h1>履歴</h1>
      </PageTitle>
      <FinishedTodoList />
    </SafeArea>
  );
};
