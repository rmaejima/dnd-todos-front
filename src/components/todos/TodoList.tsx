import React from 'react';
import styled from 'styled-components';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from 'react-beautiful-dnd';
import { useAllTodos } from 'utils/apis/todo';
import { TodoCard } from './TodoCard';
import { CreateTodoFloatingActionButton } from './CreateTodoFloatingActionButton';
import { useState } from 'react';
import { Todo } from 'types/todo';
import { useEffect } from 'react';

export const TodoList: React.VFC = () => {
  const { todos, isLoading, error, refetchAllTodos } = useAllTodos();
  const [draggableItems, setDraggableItems] = useState<Todo[]>();

  useEffect(() => {
    // TODO: Refetchした後にも順番がもとに戻らないようにしたい
    if (todos) {
      setDraggableItems(todos);
    }
  }, [todos]);

  const handleOnDragEnd = (result: DropResult) => {
    if (!(draggableItems && result.destination)) {
      return;
    }
    // 入れ替わった順番に更新する
    const items = Array.from(draggableItems);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setDraggableItems(items);
  };

  return (
    <>
      {error && 'エラーが発生しました'}
      {isLoading && '読み込み中です'}

      <DragDropContext onDragEnd={handleOnDragEnd}>
        {draggableItems && draggableItems.length !== 0 ? (
          <Droppable key="droppable" droppableId="droppable">
            {(provided) => (
              <CardListContainer
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="droppableArea"
              >
                {draggableItems.map((todo, index) => (
                  <Draggable
                    index={index}
                    key={todo.id}
                    draggableId={todo.id.toString()}
                  >
                    {(provided) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                      >
                        <TodoCard
                          todo={todo}
                          onCompleteFinish={refetchAllTodos}
                          onCompleteArchive={refetchAllTodos}
                        />
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </CardListContainer>
            )}
          </Droppable>
        ) : (
          <EmptyMessage>タスクがありません</EmptyMessage>
        )}
      </DragDropContext>

      <CreateTodoFloatingActionButton onCompleteCreate={refetchAllTodos} />
    </>
  );
};

const CardListContainer = styled.ul`
  list-style: none;
  > li:not(:first-child) {
    margin-top: 0.5rem;
  }
`;

const EmptyMessage = styled.p`
  color: ${(p) => p.theme.colors.text.base};
  font-size: 1rem;
  font-weight: bold;
`;
