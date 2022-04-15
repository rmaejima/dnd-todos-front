import React from 'react';
import styled from 'styled-components';
import { TagSummary } from 'types/tag';
import { validateColorCode } from 'utils/color';

interface Props {
  tag: TagSummary;
  onClick?: () => void;
}

export const TagTip: React.VFC<Props> = ({ tag, onClick }) => {
  return (
    <Container onClick={onClick} $bgColor={validateColorCode(tag.color)}>
      {tag.title}
    </Container>
  );
};

const Container = styled.div<{ $bgColor: string }>`
  display: inline-block;
  background-color: ${(p) => p.$bgColor};
  border-radius: 0.75rem;
  padding: 0.25rem 1rem;

  text-align: center;
  color: #fff;
  font-size: 0.75rem;
  font-weight: bold;
`;
