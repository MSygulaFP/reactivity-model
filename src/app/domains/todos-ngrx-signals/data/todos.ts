export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean
}

export interface TodosState {
  todos: Todo[];
  selectedId: number | null;
}
