import { useCallback } from 'react';
import useSWR from 'swr';
import { Todo } from 'types/todo';
import { requestGet } from './axios';

type TodoResponse = Omit<Todo, 'createdAt' | 'updatedAt'> & {
  createdAt: string;
  updatedAt: string;
};

const convertTodoResponse = (data: TodoResponse): Todo => ({
  ...data,
  createdAt: new Date(data.createdAt),
  updatedAt: new Date(data.updatedAt),
});

export const getTodos = async (endpoint: string) => {
  const { data } = await requestGet<TodoResponse[]>(endpoint);
  return data.map(convertTodoResponse);
};

export const useAllTodos = () => {
  const { data, error, mutate } = useSWR('/todos', getTodos);

  const refetchAllTodos = useCallback(() => {
    mutate();
  }, [mutate]);

  return {
    todos: data,
    error,
    isLoading: !data && !error,
    refetchAllTodos,
  };
};
