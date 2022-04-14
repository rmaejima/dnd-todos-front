import React from 'react';
import styled from 'styled-components';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useAllTodos } from 'utils/apis/todo';
import { TodoCard } from './TodoCard';
import { CreateTodoModalProvider } from './CreateTodoModalProvider';

export const TodoList: React.VFC = () => {
  const { todos, isLoading, error, refetchAllTodos } = useAllTodos();

  return (
    <>
      {error && 'エラーが発生しました'}
      {isLoading && '読み込み中です'}

      <DragDropContext onDragEnd={(result) => console.log(result)}>
        {todos && (
          <Droppable key="droppable" droppableId="droppable">
            {(provided) => (
              <CardListContainer
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="droppableArea"
              >
                {todos.map((todo, index) => (
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
                          omCompleteFinish={refetchAllTodos}
                        />
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </CardListContainer>
            )}
          </Droppable>
        )}
      </DragDropContext>

      <CreateTodoModalProvider onCompleteCreate={refetchAllTodos} />
    </>
  );
};

const CardListContainer = styled.ul`
  list-style: none;
  > li:not(:first-child) {
    margin-top: 0.5rem;
  }
`;
