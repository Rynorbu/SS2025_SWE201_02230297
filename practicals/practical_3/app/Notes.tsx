import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentData,
  onSnapshot,
  QuerySnapshot,
  updateDoc,
} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { FIRESTORE_DB } from '../Lib/firebaseConfig';

export interface Todo {
  title: string;
  done: boolean;
  id: string;
}

const List = ({ navigation }: any) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todo, setTodo] = useState('');

  useEffect(() => {
    const todoRef = collection(FIRESTORE_DB, 'todos');
    const subscribe = onSnapshot(todoRef, {
      next: (snapshot: QuerySnapshot<DocumentData>) => {
        const todos: { id: string; title?: string; done?: boolean }[] = [];
        snapshot.docs.forEach((doc) => {
          todos.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setTodos(todos);
      },
    });

    return () => subscribe();
  }, []);

  const addTodo = async () => {
    if (todo.trim() === '') return;
    await addDoc(collection(FIRESTORE_DB, 'todos'), { title: todo, done: false });
    setTodo('');
  };

  const renderTodo = ({ item }: any) => {
    const ref = doc(FIRESTORE_DB, `todos/${item.id}`);

    const toggleDone = async () => {
      await updateDoc(ref, { done: !item.done });
    };

    const deleteItem = async () => {
      await deleteDoc(ref);
    };

    return (
      <View style={styles.todoContainer}>
        <TouchableOpacity onPress={toggleDone} style={styles.todo}>
          {item.done ? (
            <Ionicons name="checkmark-circle-outline" size={24} color="green" />
          ) : (
            <Entypo name="circle" size={24} color="gray" />
          )}
          <Text style={[styles.todoText, item.done && styles.todoTextDone]}>
            {item.title}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={deleteItem}>
          <Ionicons name="trash" size={24} color="#ef4444" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>To-do List</Text>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Write a note..."
          onChangeText={(text) => setTodo(text)}
          value={todo}
          style={styles.input}
        />
        <Button title="Add" onPress={addTodo} disabled={todo === ''} />
      </View>

      {todos.length > 0 && (
        <FlatList
          data={todos}
          renderItem={renderTodo}
          keyExtractor={(todo: Todo) => todo.id}
        />
      )}
    </View>
  );
};

export default List;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f2f4f8',
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
    color: '#1f2937',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  input: {
    flex: 1,
    fontSize: 16,
    padding: 10,
    color: '#1f2937',
  },
  todoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 12,
    marginVertical: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 4,
    elevation: 1,
  },
  todoText: {
    flex: 1,
    fontSize: 16,
    marginLeft: 10,
    color: '#1f2937',
  },
  todoTextDone: {
    textDecorationLine: 'line-through',
    color: '#9ca3af',
  },
  todo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
