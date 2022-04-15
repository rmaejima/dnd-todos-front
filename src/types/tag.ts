export interface Tag {
  id: number;
  title: string;
  color: string;
  todos: { id: number }[];
}

export type TagSummary = Omit<Tag, 'todos'>;
