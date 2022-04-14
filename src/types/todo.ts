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
