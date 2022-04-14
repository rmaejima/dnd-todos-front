import React from 'react';
import styled from 'styled-components';
import { FaRegClock } from 'react-icons/fa';
import { Todo } from 'types/todo';
import { formatDateToString } from 'utils/date';
import { TagTip } from './TagTip';

interface Props {
  todo: Todo;
}

export const TodoCard: React.VFC<Props> = ({ todo }) => {
  return (
    <Container>
      <Title>{todo.title}</Title>
      <BottomSectionContainer>
        <TagSection>
          {todo.tags.map((tag) => (
            <TagTip key={tag.id} tag={tag} />
          ))}
        </TagSection>
        <PeriodSection>
          <FaRegClock />
          <p>{formatDateToString(todo.updatedAt)}</p>
        </PeriodSection>
      </BottomSectionContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  border-radius: 6px;
  box-shadow: ${(p) => p.theme.shadows.md};

  padding: 1rem;
`;

const Title = styled.h1`
  margin-bottom: 0.75rem;
  font-size: 1rem;
  font-weight: bold;
  color: ${(p) => p.theme.colors.text.base};
`;

const BottomSectionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TagSection = styled.div`
  display: flex;

  > div:not(:first-child) {
    margin-left: 0.25rem;
  }
`;

const PeriodSection = styled.div`
  display: flex;
  align-items: center;

  color: ${(p) => p.theme.colors.text.light};
  font-size: 14px;

  > p {
    margin-left: 0.25rem;
  }
`;
