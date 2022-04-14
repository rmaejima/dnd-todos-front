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
import { TagTip } from './TagTip';

export const CreateTodoModalProvider: React.VFC = () => {
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
          />
          <Label>選択タグ</Label>
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
          <Button color={colors.error[500]} onClick={close}>
            キャンセル
          </Button>
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
