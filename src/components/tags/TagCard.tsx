import React from 'react';
import styled from 'styled-components';
import { Tag } from 'types/tag';
import { validateColorCode } from 'utils/color';

interface Props {
  tag: Tag;
}

export const TagCard: React.VFC<Props> = ({ tag }) => {
  return (
    <Container $bgColor={validateColorCode(tag.color)}>
      <Title>{tag.title}</Title>
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
