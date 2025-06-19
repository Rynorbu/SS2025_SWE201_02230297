import React, { useState } from 'react';
import { Platform, TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Ionicons from '@expo/vector-icons/Ionicons';

interface DatePickerProps {
  value: Date | null;
  onChange: (date: Date | null) => void;
  placeholder?: string;
}

const DatePicker: React.FC<DatePickerProps> = ({ value, onChange, placeholder = 'Select date' }) => {
  const [showPicker, setShowPicker] = useState(false);

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowPicker(false);
    if (selectedDate) {
      onChange(selectedDate);
    }
  };

  return (
    <View>
      <TouchableOpacity
        style={styles.dateButton}
        onPress={() => setShowPicker(true)}
        activeOpacity={0.8}
      >
        <Ionicons name="calendar-outline" size={18} color="#6366f1" />
        <Text style={styles.dateButtonText}>
          {value ? value.toLocaleDateString() : placeholder}
        </Text>
      </TouchableOpacity>
      {showPicker && Platform.OS !== 'web' && (
        <DateTimePicker
          value={value || new Date()}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
      {showPicker && Platform.OS === 'web' && (
        <input
          type="date"
          style={styles.webDateInput}
          value={value ? value.toISOString().split('T')[0] : ''}
          onChange={(e) => onChange(e.target.value ? new Date(e.target.value) : null)}
        />
      )}
    </View>
  );
};

export default DatePicker;

const styles = StyleSheet.create({
  dateButton: {
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
  dateButtonText: {
    fontSize: 14,
    marginLeft: 8,
    color: '#6366f1',
    fontWeight: '500',
  },
  webDateInput: {
    padding: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    marginTop: 10,
  },
});
