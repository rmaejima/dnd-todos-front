import React, { useMemo } from 'react';
import styled from 'styled-components';
import { FaPlus } from 'react-icons/fa';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from 'react-beautiful-dnd';
import { changeTodoOrder, useAllTodos } from 'utils/apis/todo';
import { TodoCard } from './TodoCard';
import { useState } from 'react';
import { Todo, TodoChangeOrderRequest } from 'types/todo';
import { useEffect } from 'react';
import { CreateTodoModalProvider } from './modal/CreateTodoModalProvider';
import { IconButton } from 'components/common/IconButton';
import { colors } from 'utils/theme';
import { useDebounce } from 'react-use';

export const TodoList: React.VFC = () => {
  const { todos, isLoading, error, refetchAllTodos } = useAllTodos();
  const [draggableItems, setDraggableItems] = useState<Todo[]>();
  const orderList = useMemo(() => {
    return todos?.map((todo) => todo.order);
  }, [todos]);

  useEffect(() => {
    if (todos) {
      setDraggableItems(todos);
    }
  }, [todos]);

  useDebounce(
    async () => {
      if (draggableItems == undefined) {
        return;
      }
      const payload: TodoChangeOrderRequest = {
        todos: draggableItems.map((item) => {
          return {
            id: item.id,
            order: item.order,
          };
        }),
      };
      await changeTodoOrder(payload);
    },
    100,
    [draggableItems],
  );

  const handleOnDragEnd = (result: DropResult) => {
    if (!(draggableItems && result.destination && orderList)) {
      return;
    }
    // 入れ替わった順番に更新する
    const items = Array.from(draggableItems);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    items.map((item, index) => {
      item.order = orderList[index];
    });
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
                          onCompleteUpdate={refetchAllTodos}
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

      <CreateTodoModalProvider onCompleteCreate={refetchAllTodos}>
        <FloatingActionContaner>
          <IconButton color="#fff" bgColor={colors.primary[500]}>
            <FaPlus />
          </IconButton>
        </FloatingActionContaner>
      </CreateTodoModalProvider>
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

const FloatingActionContaner = styled.div`
  position: fixed;
  bottom: 3rem;
  right: 4rem;
`;
