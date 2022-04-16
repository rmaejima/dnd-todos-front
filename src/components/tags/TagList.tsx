import React from 'react';
import styled from 'styled-components';
import { useAllTags } from 'utils/apis/tag';
import { CreateTagFloatingActionButton } from './CreateTagFloatingActionButton';
import { TagCard } from './TagCard';

export const TagList: React.VFC = () => {
  const { tags, isLoading, error, refetchAllTags } = useAllTags();
  return (
    <>
      {error && <p>エラーが発生しました</p>}
      {isLoading && <p>読み込み中です</p>}

      {tags && (
        <Container>
          {tags.map((tag) => (
            <TagCard key={tag.id} tag={tag} />
          ))}
        </Container>
      )}

      <CreateTagFloatingActionButton onCompleteCreate={refetchAllTags} />
    </>
  );
};

const Container = styled.div`
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
`;
