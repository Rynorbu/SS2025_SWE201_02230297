import { useState, useEffect } from 'react';
import { Todo } from '../businessLogic/Todo';
import { collection, onSnapshot, QuerySnapshot, DocumentData } from 'firebase/firestore';
import { FIRESTORE_DB } from '../Lib/firebaseConfig';
import {
  addTodoToDB,
  updateTodoInDB,
  deleteTodoFromDB,
} from '../persistence/TodoPersistence';

export const useTodoService = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const todoCollection = collection(FIRESTORE_DB, 'todos');
    const unsubscribe = onSnapshot(todoCollection, (snapshot: QuerySnapshot<DocumentData>) => {
      const fetchedTodos = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Todo[];
      setTodos(fetchedTodos);
    });

    // Cleanup listener on component unmount
    return () => unsubscribe();
  }, []);

  const addTodo = async (title: string, dueDate: Date | null) => {
    if (!title.trim()) return;
    try {
      await addTodoToDB(title, dueDate || null); // Ensure dueDate is either a valid date or null
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const toggleDone = async (id: string) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;
    try {
      await updateTodoInDB(id, { done: !todo.done });
    } catch (error) {
      console.error('Error toggling todo:', error);
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      await deleteTodoFromDB(id);
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const updateTodo = async (id: string, updates: Partial<Todo>) => {
    try {
      const sanitizedUpdates = {
        ...updates,
        dueDate: updates.dueDate === null ? undefined : updates.dueDate,
      };
      await updateTodoInDB(id, sanitizedUpdates);
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  return { todos, addTodo, toggleDone, deleteTodo, updateTodo };
};
