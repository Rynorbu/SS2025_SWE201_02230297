// Enhanced Todo List UI with modern, clean design
import React, { useEffect, useState, useRef } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StatusBar,
  Modal,
  Dimensions,
  Platform,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
// import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Todo } from '../businessLogic/Todo';
import { useTodoService } from '../service/TodoService';
import DatePicker from '../components/DatePicker';

const { width } = Dimensions.get('window');

const List = () => {
  const { todos = [], addTodo, toggleDone, deleteTodo, updateTodo } = useTodoService();
  const [todo, setTodo] = useState('');
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const isAdding = useRef(false);

  useEffect(() => {
    if (selectedTodo) {
      setTodo(selectedTodo.title);
      setDueDate(selectedTodo.dueDate ? new Date(selectedTodo.dueDate) : null);
    }
  }, [selectedTodo]);

  const handleAddTodo = async () => {
    if (isAdding.current || todo.trim() === '') return;
    isAdding.current = true;
    await addTodo?.(todo.trim(), dueDate || null);
    setTodo('');
    setDueDate(null);
    isAdding.current = false;
  };

  const handleUpdateTodo = async () => {
    if (selectedTodo && todo.trim() !== '') {
      await updateTodo?.(selectedTodo.id, {
        title: todo.trim(),
        dueDate: dueDate ? dueDate.toISOString() : undefined,
      });
      setSelectedTodo(null);
      setTodo('');
      setDueDate(null);
    }
  };

  const renderTodo = ({ item }: { item: Todo }) => (
    <View style={styles.todoContainer}>
      <TouchableOpacity onPress={() => toggleDone?.(item.id)} style={styles.todoContent} activeOpacity={0.8}>
        <View style={styles.checkboxContainer}>
          {item.done ? (
            <View style={styles.checkedBox}>
              <Ionicons name="checkmark" size={16} color="#fff" />
            </View>
          ) : (
            <View style={styles.uncheckedBox} />
          )}
        </View>
        <View style={styles.todoTextContainer}>
          <Text style={[styles.todoText, item.done && styles.todoTextDone]}>
            {item.title}
          </Text>
          {item.dueDate && (
            <Text style={styles.dueDateText}>
              Due: {new Date(item.dueDate).toLocaleDateString()}
            </Text>
          )}
        </View>
      </TouchableOpacity>

      <View style={styles.actionButtons}>
        <TouchableOpacity onPress={() => setSelectedTodo(item)} style={styles.editButton} activeOpacity={0.7}>
          <Ionicons name="pencil" size={16} color="#6366f1" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => deleteTodo?.(item.id)} style={styles.deleteButton} activeOpacity={0.7}>
          <Ionicons name="trash" size={16} color="#ef4444" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      <View style={styles.header}>
        <Text style={styles.title}>Tasks</Text>
        <Text style={styles.subtitle}>
          {todos.filter(t => !t.done).length} of {todos.length} remaining
        </Text>
      </View>

      <View style={styles.inputSection}>
        <View style={styles.inputRow}>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Add a new task..."
              placeholderTextColor="#9ca3af"
              onChangeText={setTodo}
              value={todo}
              style={styles.input}
              returnKeyType="done"
              onSubmitEditing={handleAddTodo}
            />
          </View>
          <TouchableOpacity
            style={[styles.addButton, todo.trim() === '' && styles.addButtonDisabled]}
            onPress={handleAddTodo}
            disabled={todo.trim() === ''}
            activeOpacity={0.8}
          >
            <Ionicons name="add" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
        <DatePicker value={dueDate} onChange={setDueDate} placeholder="Set due date" />
      </View>

      <View style={styles.listContainer}>
        {todos.length > 0 ? (
          <FlatList
            data={todos}
            renderItem={renderTodo}
            keyExtractor={(todo) => todo.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIcon}>
              <Ionicons name="checkmark-circle-outline" size={64} color="#e2e8f0" />
            </View>
            <Text style={styles.emptyTitle}>All caught up!</Text>
            <Text style={styles.emptySubtitle}>Add your first task to get started</Text>
          </View>
        )}
      </View>

      {selectedTodo && (
        <Modal visible={true} animationType="slide" transparent={true}>
          <View style={styles.modalBackdrop}>
            <View style={styles.modalContainer}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Edit Task</Text>
                <TouchableOpacity
                  onPress={() => setSelectedTodo(null)}
                  style={styles.modalCloseButton}
                >
                  <Ionicons name="close" size={20} color="#6b7280" />
                </TouchableOpacity>
              </View>
              <TextInput
                placeholder="Task title..."
                onChangeText={setTodo}
                value={todo}
                style={styles.modalInput}
                multiline
              />
              <DatePicker value={dueDate} onChange={setDueDate} placeholder="Set due date" />
              <View style={styles.modalActions}>
                <TouchableOpacity style={styles.saveButton} onPress={handleUpdateTodo}>
                  <Text style={styles.saveButtonText}>Save Changes</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

export default List;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  inputSection: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  inputContainer: {
    flex: 1,
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    marginRight: 12,
  },
  input: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#1f2937',
  },
  addButton: {
    backgroundColor: '#6366f1',
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonDisabled: {
    backgroundColor: '#d1d5db',
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  dateButtonText: {
    fontSize: 14,
    color: '#6366f1',
    marginLeft: 6,
    fontWeight: '500',
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  listContent: {
    paddingBottom: 20,
  },
  todoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginVertical: 4,
    borderWidth: 1,
    borderColor: '#f3f4f6',
  },
  todoContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  checkboxContainer: {
    marginRight: 12,
    marginTop: 2,
  },
  checkedBox: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#10b981',
    justifyContent: 'center',
    alignItems: 'center',
  },
  uncheckedBox: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#d1d5db',
    backgroundColor: '#ffffff',
  },
  todoTextContainer: {
    flex: 1,
  },
  todoText: {
    fontSize: 16,
    color: '#1f2937',
    fontWeight: '500',
    lineHeight: 20,
  },
  todoTextDone: {
    textDecorationLine: 'line-through',
    color: '#9ca3af',
  },
  dueDateText: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editButton: {
    padding: 8,
    marginRight: 4,
  },
  deleteButton: {
    padding: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyIcon: {
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#9ca3af',
    textAlign: 'center',
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    width: width * 0.9,
    maxWidth: 400,
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
  },
  modalCloseButton: {
    padding: 4,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
    color: '#1f2937',
    minHeight: 80,
    textAlignVertical: 'top',
  },
  modalDateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    marginBottom: 20,
  },
  modalDateText: {
    fontSize: 14,
    marginLeft: 8,
    color: '#6366f1',
    fontWeight: '500',
  },
  modalActions: {
    marginTop: 8,
  },
  saveButton: {
    backgroundColor: '#6366f1',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 16,
  },
});