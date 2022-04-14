import { useCallback } from 'react';
import useSWR from 'swr';
import { Tag } from 'types/tag';
import { requestGet } from './axios';

export const getTags = async (endpoint: string) => {
  const { data } = await requestGet<Tag[]>(endpoint);
  return data;
};

export const useAllTags = () => {
  const { data, error, mutate } = useSWR('/tags', getTags);

  const refetchAllTags = useCallback(() => {
    mutate();
  }, [mutate]);

  return {
    tags: data,
    error,
    isLoading: !data && !error,
    refetchAllTags,
  };
};
