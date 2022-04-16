import { IconButton } from 'components/common/IconButton';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useModal } from 'react-hooks-use-modal';
import styled from 'styled-components';
import { TagSummary } from 'types/tag';
import { Todo, TodoUpdateRequest } from 'types/todo';
import { useAllTags } from 'utils/apis/tag';
import { FaEdit } from 'react-icons/fa';
import { TextField } from 'components/common/TextField';
import { stringNotEmpty } from 'utils/hooks/useValidation';
import { TagTip } from 'components/tags/TagTip';
import { Button } from 'components/common/Button';
import { colors } from 'utils/theme';
import { updateTodo } from 'utils/apis/todo';

interface Props {
  todo: Todo;
  onCompleteUpdate?: () => void;
}

export const EditTodoButton: React.VFC<Props> = ({
  todo,
  onCompleteUpdate,
}) => {
  const { tags, isLoading, error } = useAllTags();
  const [Modal, open, close] = useModal('root', {
    preventScroll: true,
    closeOnOverlayClick: false,
  });

  const [titleValue, setTitleValue] = useState<string>(todo.title);
  const [tagSelection, setTagSelection] = useState<TagSummary[]>([]);
  const [tagValue, setTagValue] = useState<TagSummary[]>(todo.tags);

  useEffect(() => {
    if (!tags) {
      return;
    }
    const usedTagIds = todo.tags.map((tag) => tag.id);
    setTagSelection(tags.filter((tag) => !usedTagIds.includes(tag.id)));
  }, [tags]);

  const onClickTagSelectionTip = (tag: TagSummary) => {
    setTagValue([...tagValue, tag]);
    setTagSelection(
      tagSelection.filter((selection) => selection.id !== tag.id),
    );
  };

  const onClickTagValueTip = (tag: TagSummary) => {
    setTagSelection([tag, ...tagSelection]);
    setTagValue(tagValue.filter((t) => t.id !== tag.id));
  };

  const onSubmit = async () => {
    if (!onCompleteUpdate) return;
    close();
    const payload: TodoUpdateRequest = {
      title: titleValue,
      tags: tagValue.map((tag) => {
        return {
          id: tag.id,
        };
      }),
    };
    await updateTodo(todo.id, payload);
    onCompleteUpdate();
  };

  return (
    <>
      <IconButton size={48} onClick={open}>
        <FaEdit />
      </IconButton>
      <Modal>
        <ModalContainer>
          <ModalTitle>TODO編集</ModalTitle>
          <Label>タイトル</Label>
          <StyledTextField
            value={titleValue}
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
              更新
            </Button>
          </ActionSectionContainer>
        </ModalContainer>
      </Modal>
    </>
  );
};

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
  display: flex;
  flex-wrap: wrap;
  margin: 1rem 0;

  > div {
    margin: 0.25rem;
  }
`;

const ActionSectionContainer = styled.div`
  display: flex;
  justify-content: end;

  > :not(:first-child) {
    margin-left: 1rem;
  }
`;
