export interface Todo {
  id: string;
  title: string;
  done: boolean;
  dueDate?: string;
}

export const validateTodo = (title: string): boolean => {
  return title.trim().length > 0;
};
