import { useCallback } from 'react';
import useSWR from 'swr';
import { Tag, TagCreateRequest, TagUpdateRequest } from 'types/tag';

import { requestDelete, requestGet, requestPost, requestPut } from './axios';

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

export const createTag = async (tag: TagCreateRequest): Promise<Tag> => {
  const { data } = await requestPost<Tag, TagCreateRequest>('/tags', tag);
  return data;
};

export const updateTag = async (
  tagId: number,
  tag: TagUpdateRequest,
): Promise<Tag> => {
  const { data } = await requestPut<Tag, TagCreateRequest>(
    `/tags/${tagId}`,
    tag,
  );
  return data;
};

export const deleteTag = async (tagId: number) => {
  await requestDelete(`/tags/${tagId}`);
};
