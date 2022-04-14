import React from 'react';
import styled from 'styled-components';
import { Tag } from 'types/tag';

interface Props {
  tag: Tag;
}

export const TagTip: React.VFC<Props> = ({ tag }) => {
  return (
    <Container $bgColor={tag.color}>
      <p>{tag.title}</p>
    </Container>
  );
};

const Container = styled.div<{ $bgColor: string }>`
  background-color: ${(p) => p.$bgColor};
  border-radius: 0.75rem;
  padding: 0.25rem 1rem;
  color: #fff;

  > p {
    font-size: 0.75rem;
    font-weight: bold;
  }
`;
