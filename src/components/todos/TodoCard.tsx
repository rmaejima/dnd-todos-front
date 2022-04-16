import React from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { FaTrashAlt } from 'react-icons/fa';
import { FaUndoAlt } from 'react-icons/fa';
import { FaHistory } from 'react-icons/fa';
import { FaEdit } from 'react-icons/fa';
import { Todo } from 'types/todo';
import { formatDateToString } from 'utils/date';
import { TagTip } from '../tags/TagTip';
import { useState } from 'react';
import { useDebounce } from 'react-use';
import { archiveTodo, deleteTodo, finishTodo } from 'utils/apis/todo';
import { IconButton } from 'components/common/IconButton';
import { EditTodoModalProvider } from './modal/EditTodoModalProvider';

const DEBOUNSE_TIME = 600; // ms

type CardType = 'NORMAL' | 'FINISHED' | 'ARCHIVED';

interface Props {
  todo: Todo;
  cardType?: CardType;
  onCompleteUpdate: () => void;
}

export const TodoCard: React.VFC<Props> = ({
  todo,
  cardType = 'NORMAL',
  onCompleteUpdate,
}) => {
  const [checked, setChecked] = useState(false);
  const [archived, setArchived] = useState(false);

  useDebounce(
    async () => {
      if (checked === true) {
        await finishTodo(todo.id);
        onCompleteUpdate();
      }
    },
    DEBOUNSE_TIME,
    [checked],
  );

  const toggleCheck = () => {
    setChecked(!checked);
  };

  const onClickArchiveButton = async () => {
    setArchived(true);
    await archiveTodo(todo.id);
    await new Promise((resolve) => setTimeout(resolve, DEBOUNSE_TIME));
    onCompleteUpdate();
    toast.info(`${todo.title}をアーカイブしました`);
  };

  const onClickDeleteButton = async () => {
    // TODO: ダイアログ表示
    await deleteTodo(todo.id);
    onCompleteUpdate && onCompleteUpdate();
    toast.info(`${todo.title}を完全に削除しました`);
  };

  return (
    <Container $checked={checked} $cardType={cardType} $archived={archived}>
      <TopSectionContainer>
        <TitleSectionConrainer>
          {cardType === 'NORMAL' && (
            <CheckBox
              type="checkbox"
              checked={checked}
              onChange={toggleCheck}
            ></CheckBox>
          )}
          <Title>{todo.title}</Title>
        </TitleSectionConrainer>
        {cardType === 'NORMAL' ? (
          <div>
            <EditTodoModalProvider
              todo={todo}
              onCompleteUpdate={onCompleteUpdate}
            >
              <IconButton size={48}>
                <FaEdit />
              </IconButton>
            </EditTodoModalProvider>
            <IconButton size={48} onClick={onClickArchiveButton}>
              <FaTrashAlt />
            </IconButton>
          </div>
        ) : cardType === 'ARCHIVED' ? (
          <div>
            <IconButton size={48} onClick={onClickDeleteButton}>
              <FaUndoAlt />
            </IconButton>
            <IconButton size={48} onClick={onClickDeleteButton}>
              <FaTrashAlt />
            </IconButton>
          </div>
        ) : (
          cardType === 'FINISHED' && (
            <IconButton size={48} onClick={onClickDeleteButton}>
              <FaUndoAlt />
            </IconButton>
          )
        )}
      </TopSectionContainer>
      <BottomSectionContainer>
        <TagSection>
          {todo.tags.map((tag) => (
            <TagTip key={tag.id} tag={tag} />
          ))}
        </TagSection>
        <PeriodSection>
          <FaHistory />
          <p>{formatDateToString(todo.updatedAt)}</p>
        </PeriodSection>
      </BottomSectionContainer>
    </Container>
  );
};

const Container = styled.div<{
  $checked: boolean;
  $cardType: CardType;
  $archived: boolean;
}>`
  width: 100%;
  background-color: ${(p) =>
    p.$cardType !== 'NORMAL'
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
    (p.$checked || p.$archived) &&
    'fadeout 0.4s ease-in-out 0.2s 1 normal forwards;'};
`;

const TopSectionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
`;

const TitleSectionConrainer = styled.div`
  display: flex;
  align-items: center;

  > :not(:first-child) {
    margin-left: 0.5rem;
  }
`;

const CheckBox = styled.input`
  width: 1rem;
  height: 1rem;
`;

const Title = styled.h1`
  max-width: 30rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: ${(p) => p.theme.colors.text.base};
  font-size: 1rem;
  font-weight: bold;
`;

const BottomSectionContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
`;

const TagSection = styled.div`
  display: flex;
  flex-wrap: wrap;

  > div {
    margin: 0.25rem;
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
