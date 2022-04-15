import React from 'react';
import styled from 'styled-components';
import { FaRegClock } from 'react-icons/fa';
import { Todo } from 'types/todo';
import { formatDateToString } from 'utils/date';
import { TagTip } from '../tags/TagTip';
import { useState } from 'react';
import { useDebounce } from 'react-use';
import { finishTodo } from 'utils/apis/todo';

const DEBOUNSE_TIME = 600; // ms

interface Props {
  todo: Todo;
  disabled?: boolean;
  omCompleteFinish?: () => void;
}

export const TodoCard: React.VFC<Props> = ({
  todo,
  disabled,
  omCompleteFinish,
}) => {
  const [checked, setChecked] = useState(false);

  useDebounce(
    async () => {
      if (omCompleteFinish && checked === true) {
        await finishTodo(todo.id);
        omCompleteFinish();
      }
    },
    DEBOUNSE_TIME,
    [checked],
  );

  const toggleCheck = () => {
    setChecked(!checked);
  };

  return (
    <Container $checked={checked} $disabled={disabled}>
      <TitleSectionConrainer>
        {!disabled && (
          <CheckBox
            type="checkbox"
            checked={checked}
            onChange={toggleCheck}
          ></CheckBox>
        )}
        <Title>{todo.title}</Title>
      </TitleSectionConrainer>
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

const Container = styled.div<{ $checked: boolean; $disabled?: boolean }>`
  width: 100%;
  background-color: ${(p) =>
    p.$disabled
      ? p.theme.colors.gray[100]
      : p.$checked
      ? p.theme.colors.primary[50]
      : '#fff'};
  border-radius: 6px;
  box-shadow: ${(p) => p.theme.shadows.md};
  transition: 0.5s ${(p) => p.theme.easings.easeOut};

  padding: 1rem;

  @keyframes fadeout {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
  /* 0.2s - 0.6s */
  animation: ${(p) =>
    p.$checked && 'fadeout 0.4s ease-in-out 0.2s 1 normal forwards;'};
`;

const TitleSectionConrainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.75rem;

  > :not(:first-child) {
    margin-left: 0.5rem;
  }
`;

const CheckBox = styled.input`
  width: 1rem;
  height: 1rem;
`;

const Title = styled.h1`
  color: ${(p) => p.theme.colors.text.base};
  font-size: 1rem;
  font-weight: bold;
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
