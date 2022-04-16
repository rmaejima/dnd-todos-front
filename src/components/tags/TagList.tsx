import { IconButton } from 'components/common/IconButton';
import React from 'react';
import styled from 'styled-components';
import { FaPlus } from 'react-icons/fa';
import { useAllTags } from 'utils/apis/tag';
import { CreateTagModalProvider } from './modal/CrateTagModalProvider';
import { EditTagModalProvider } from './modal/EditTagModalProvider';
import { TagCard } from './TagCard';
import { colors } from 'utils/theme';

export const TagList: React.VFC = () => {
  const { tags, isLoading, error, refetchAllTags } = useAllTags();
  return (
    <>
      {error && <p>エラーが発生しました</p>}
      {isLoading && <p>読み込み中です</p>}

      {tags && (
        <Container>
          {tags.map((tag) => (
            <EditTagModalProvider
              key={tag.id}
              tag={tag}
              onCompleteUpdate={refetchAllTags}
            >
              <TagCard tag={tag} />
            </EditTagModalProvider>
          ))}
        </Container>
      )}

      <CreateTagModalProvider onCompleteCreate={refetchAllTags}>
        <FloatingActionContaner>
          <IconButton color="#fff" bgColor={colors.primary[500]}>
            <FaPlus />
          </IconButton>
        </FloatingActionContaner>
      </CreateTagModalProvider>
    </>
  );
};

const Container = styled.div`
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
`;

const FloatingActionContaner = styled.div`
  position: fixed;
  bottom: 3rem;
  right: 4rem;
`;
