// screens/EmailPasswordLogin.tsx
import React, { useState } from 'react';
import {
  Alert,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { supabase } from '../lib/supabase';
import { useNavigation } from '@react-navigation/native';


export default function EmailPasswordLogin() {
  const navigation = useNavigation<any>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const signInWithEmail = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);
    if (error) {
      console.log('Login Error:', error.message);
      Alert.alert('Login Failed', error.message);
    } else {
      Alert.alert('Login Successful!');
    }
  };

  const signUpWithEmail = async () => {
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    setLoading(false);
    if (error) {
      console.log('Sign Up Error:', error.message);
      Alert.alert('Sign Up Failed', error.message);
    } else {
      console.log('Sign Up Data:', data);
      Alert.alert('Check your email to confirm your account!');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log in with Email</Text>

      <TextInput
        placeholder="Enter your email"
        style={styles.input}
        autoCapitalize="none"
        keyboardType="email-address"
        onChangeText={setEmail}
        value={email}
      />

      <TextInput
        placeholder="Enter your password"
        style={styles.input}
        autoCapitalize="none"
        secureTextEntry
        onChangeText={setPassword}
        value={password}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={signInWithEmail}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Sign In</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.outlineButton]}
        onPress={signUpWithEmail}
        disabled={loading}
      >
        <Text style={[styles.buttonText, styles.outlineText]}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>← Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 32,
    color: '#1f2937',
  },
  input: {
    width: '100%',
    height: 48,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  button: {
    backgroundColor: '#3b82f6',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginBottom: 12,
  },
  outlineButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#3b82f6',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  outlineText: {
    color: '#3b82f6',
  },
  backText: {
    marginTop: 16,
    color: '#0A84FF',
    fontSize: 16,
  },
});
