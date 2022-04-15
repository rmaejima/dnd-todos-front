import React from 'react';
import { useModal } from 'react-hooks-use-modal';
import styled from 'styled-components';
import { FaPlus } from 'react-icons/fa';
import { IconButton } from 'components/common/IconButton';
import { colors } from 'utils/theme';
import { Button } from 'components/common/Button';
import { TextField } from 'components/common/TextField';
import { useState } from 'react';
import { useAllTags } from 'utils/apis/tag';
import { Tag } from 'types/tag';
import { useEffect } from 'react';
import { TagTip } from '../tags/TagTip';
import { createTodo } from 'utils/apis/todo';
import { TodoCreateRequest } from 'types/todo';
import { stringNotEmpty } from 'utils/hooks/useValidation';

interface Props {
  onCompleteCreate: () => void;
}

export const CreateTodoFloatingActionButton: React.VFC<Props> = ({
  onCompleteCreate,
}) => {
  const { tags, isLoading, error, refetchAllTags } = useAllTags();
  const [Modal, open, close] = useModal('root', {
    preventScroll: true,
    closeOnOverlayClick: false,
  });

  const [titleValue, setTitleValue] = useState<string>('');
  const [tagSelection, setTagSelection] = useState<Tag[]>([]);
  const [tagValue, setTagValue] = useState<Tag[]>([]);

  useEffect(() => {
    if (tags) {
      setTagSelection(tags);
    }
  }, [tags]);

  const onClickTagSelectionTip = (tag: Tag) => {
    setTagValue([...tagValue, tag]);
    setTagSelection(
      tagSelection.filter((selection) => selection.id !== tag.id),
    );
  };

  const onClickTagValueTip = (tag: Tag) => {
    setTagSelection([tag, ...tagSelection]);
    setTagValue(tagValue.filter((t) => t.id !== tag.id));
  };

  const resetStates = () => {
    setTitleValue('');
    refetchAllTags();
    if (tags) {
      setTagSelection(tags);
    }
    setTagValue([]);
  };

  const onSubmit = async () => {
    close();
    const payload: TodoCreateRequest = {
      title: titleValue,
      tags: tagValue.map((tag) => {
        return {
          id: tag.id,
        };
      }),
    };
    await createTodo(payload);

    // モーダル内の値をリセットする
    resetStates();

    onCompleteCreate();
  };

  return (
    <>
      <FloatingActionContaner>
        <IconButton color={colors.primary[500]} onClick={open}>
          <FaPlus />
        </IconButton>
      </FloatingActionContaner>
      <Modal>
        <ModalContainer>
          <ModalTitle>新しいTODO</ModalTitle>
          <Label>タイトル</Label>
          <StyledTextField
            value={titleValue}
            placeholder="Reactの勉強"
            onChange={setTitleValue}
            rules={[stringNotEmpty()]}
          />
          <Label>選択タグ</Label>
          {error && <p>エラーが発生しました</p>}
          {isLoading && <p>読み込み中です</p>}
          <TipListContainer>
            {tagValue &&
              tagValue.map((tag) => (
                <TagTip
                  key={tag.id}
                  tag={tag}
                  onClick={() => onClickTagValueTip(tag)}
                />
              ))}
          </TipListContainer>
          <Label>タグリスト</Label>
          {error && <p>エラーが発生しました</p>}
          {isLoading && <p>読み込み中です</p>}
          <TipListContainer>
            {tagSelection &&
              tagSelection.map((tag) => (
                <TagTip
                  key={tag.id}
                  tag={tag}
                  onClick={() => onClickTagSelectionTip(tag)}
                />
              ))}
          </TipListContainer>
          <ActionSectionContainer>
            <Button color={colors.error[500]} onClick={close}>
              キャンセル
            </Button>
            <Button
              type="submit"
              onClick={onSubmit}
              disabled={titleValue.length === 0}
            >
              作成
            </Button>
          </ActionSectionContainer>
        </ModalContainer>
      </Modal>
    </>
  );
};

const FloatingActionContaner = styled.div`
  position: fixed;
  bottom: 3rem;
  right: 4rem;
`;

const ModalContainer = styled.div`
  width: 35rem;
  background-color: #fff;
  border-radius: 1rem;

  padding: 1.5rem;
`;

const ModalTitle = styled.h1`
  margin-bottom: 1rem;
  color: ${(p) => p.theme.colors.text.base};
  font-size: 1.5rem;
  font-weight: bold;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.25rem;

  color: ${(p) => p.theme.colors.text.base};
  font-size: 0.75rem;
  font-weight: bold;
`;

const StyledTextField = styled(TextField)`
  margin-bottom: 1rem;
`;

const TipListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0.5rem 1rem;

  margin: 1rem 0;
`;

const ActionSectionContainer = styled.div`
  display: flex;
  justify-content: end;

  > :not(:first-child) {
    margin-left: 1rem;
  }
`;
