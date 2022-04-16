import { IconButton } from 'components/common/IconButton';
import React from 'react';
import styled from 'styled-components';
import { FaTimes } from 'react-icons/fa';
import { Tag } from 'types/tag';
import { validateColorCode } from 'utils/color';
import { deleteTag } from 'utils/apis/tag';
import { toast } from 'react-toastify';

interface Props {
  tag: Tag;
  onCompleteDelete?: () => void;
}

export const TagCard: React.VFC<Props> = ({ tag, onCompleteDelete }) => {
  const onClickDeleteButton = async () => {
    if (onCompleteDelete) {
      await deleteTag(tag.id);
      toast.info(`「${tag.title}」タグを削除しました`);
      onCompleteDelete();
    }
  };

  return (
    <Container $bgColor={validateColorCode(tag.color)}>
      <TopSectionContainer>
        <Title>{tag.title}</Title>
        <IconButton size={48} color="#fff" onClick={onClickDeleteButton}>
          <FaTimes />
        </IconButton>
      </TopSectionContainer>
      <BottomSectionText>{tag.todos.length}個のTODO</BottomSectionText>
    </Container>
  );
};

const Container = styled.div<{ $bgColor: string }>`
  width: 100%;
  background-color: ${(p) => p.$bgColor};
  border-radius: 10px;
  box-shadow: ${(p) => p.theme.shadows.md};

  padding: 1.5rem;
`;

const TopSectionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h1`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;

  margin-bottom: 0.5rem;
  color: #fff;
  font-size: 1rem;
  font-weight: bold;
`;

const BottomSectionText = styled.p`
  color: #fff;
  font-size: 14px;
`;
