import { IconButton } from 'components/common/IconButton';
import React from 'react';
import styled from 'styled-components';
import { FaPlus } from 'react-icons/fa';
import { createTag, updateTag, useAllTags } from 'utils/apis/tag';
import { TagCard } from './TagCard';
import { colors } from 'utils/theme';
import { TagModalProvider } from './modal/TagModalProvider';
import { Button } from 'components/common/Button';
import { TagCreateRequest, TagUpdateRequest } from 'types/tag';

export const TagList: React.VFC = () => {
  const { tags, isLoading, error, refetchAllTags } = useAllTags();

  const onCreationSubmit = async (payload: TagCreateRequest) => {
    await createTag(payload);
    refetchAllTags();
  };

  const onUpdationSubmit = async (
    payload: TagUpdateRequest,
    tagId: number | undefined,
  ) => {
    if (!tagId) {
      return;
    }
    await updateTag(tagId, payload);
    refetchAllTags();
  };

  return (
    <>
      {error && <p>エラーが発生しました</p>}
      {isLoading && <p>読み込み中です</p>}

      {tags && (
        <Container>
          {tags.map((tag) => (
            <TagModalProvider
              key={tag.id}
              title="タグ編集"
              defaultValue={tag}
              onSubmit={onUpdationSubmit}
              generateSubmitButton={(
                isValid: boolean,
                onCancel: () => void,
              ) => (
                <>
                  <Button color={colors.error[500]} onClick={onCancel}>
                    キャンセル
                  </Button>
                  <Button type="submit" disabled={!isValid}>
                    更新
                  </Button>
                </>
              )}
            >
              <TagCard tag={tag} />
            </TagModalProvider>
          ))}
        </Container>
      )}

      <TagModalProvider
        title="新しいタグ"
        onSubmit={onCreationSubmit}
        generateSubmitButton={(isValid: boolean, onCancel: () => void) => (
          <>
            <Button color={colors.error[500]} onClick={onCancel}>
              キャンセル
            </Button>
            <Button type="submit" disabled={!isValid}>
              作成
            </Button>
          </>
        )}
      >
        <FloatingActionContaner>
          <IconButton color="#fff" bgColor={colors.primary[500]}>
            <FaPlus />
          </IconButton>
        </FloatingActionContaner>
      </TagModalProvider>
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
