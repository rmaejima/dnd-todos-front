import { Tag } from './tag';

export interface Todo {
  id: number;
  title: string;
  finished: boolean;
  archived: boolean;
  createdAt: Date;
  updatedAt: Date;
  tags: Tag[];
}

export type TodoCreateRequest = Pick<Todo, 'title'> & {
  tags: Pick<Tag, 'id'>[];
};
