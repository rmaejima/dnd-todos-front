import { Tag, TagSummary } from './tag';

export interface Todo {
  id: number;
  title: string;
  finished: boolean;
  archived: boolean;
  createdAt: Date;
  updatedAt: Date;
  tags: TagSummary[];
}

export type TodoCreateRequest = Pick<Todo, 'title'> & {
  tags: Pick<Tag, 'id'>[];
};
export type TodoUpdateRequest = TodoCreateRequest;

export type TodoFinishRequest = Pick<Todo, 'id'>;
export type TodoArchiveRequest = Pick<Todo, 'id'>;
