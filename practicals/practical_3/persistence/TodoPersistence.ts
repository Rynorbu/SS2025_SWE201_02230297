import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
  getDoc,
} from 'firebase/firestore';
import { FIRESTORE_DB } from '../Lib/firebaseConfig';
import { Todo } from '../businessLogic/Todo';

const todoCollection = collection(FIRESTORE_DB, 'todos');

export const fetchTodosFromDB = async (): Promise<Todo[]> => {
  try {
    const snapshot = await getDocs(todoCollection);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Todo));
  } catch (error) {
    console.error('Error fetching todos from DB:', error);
    return [];
  }
};

export const addTodoToDB = async (title: string): Promise<Todo> => {
  try {
    const docRef = await addDoc(todoCollection, { title, done: false });
    return { id: docRef.id, title, done: false };
  } catch (error) {
    console.error('Error adding todo to DB:', error);
    throw error;
  }
};
export const updateTodoInDB = async (id: string, updates: Partial<Todo>): Promise<Todo> => {
  try {
    const todoRef = doc(FIRESTORE_DB, `todos/${id}`);
    await updateDoc(todoRef, updates);
    const updatedDoc = await getDoc(todoRef);
    return { id, ...(updatedDoc.data() as Omit<Todo, 'id'>) } as Todo;
  } catch (error) {
    console.error('Error updating todo in DB:', error);
    throw error;
  }
};

export const deleteTodoFromDB = async (id: string): Promise<void> => {
  try {
    const todoRef = doc(FIRESTORE_DB, `todos/${id}`);
    await deleteDoc(todoRef);
  } catch (error) {
    console.error('Error deleting todo from DB:', error);
    throw error;
  }
};
