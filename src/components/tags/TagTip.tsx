import React from 'react';
import styled from 'styled-components';
import { Tag } from 'types/tag';
import { validateColorCode } from 'utils/color';

interface Props {
  tag: Tag;
  onClick?: () => void;
}

export const TagTip: React.VFC<Props> = ({ tag, onClick }) => {
  return (
    <Container onClick={onClick} $bgColor={validateColorCode(tag.color)}>
      <p>{tag.title}</p>
    </Container>
  );
};

const Container = styled.div<{ $bgColor: string }>`
  background-color: ${(p) => p.$bgColor};
  border-radius: 0.75rem;
  padding: 0.25rem 1rem;
  color: #fff;
  text-align: center;

  > p {
    font-size: 0.75rem;
    font-weight: bold;
  }
`;
