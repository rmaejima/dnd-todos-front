import React from 'react';
import styled from 'styled-components';
import { useAllTodos } from 'utils/apis/todo';

export const FinishedTodoList: React.VFC = () => {
  const { todos } = useAllTodos({ finished: true });
  return <></>;
};
