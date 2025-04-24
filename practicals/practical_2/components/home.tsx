// screens/LandingScreen.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons, Entypo, FontAwesome } from '@expo/vector-icons';

export default function LandingScreen() {
  const navigation = useNavigation();

  return (
    <LinearGradient colors={['#e0eafc', '#cfdef3']} style={styles.container}>
      <Text style={styles.title}>Let’s Get You Logged In</Text>
      <Text style={styles.subtitle}>Choose a login method</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('EmailPasswordLogin')}
      >
        <MaterialIcons name="email" size={20} color="#fff" />
        <Text style={styles.buttonText}>Login with Email</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Entypo name="link" size={20} color="#fff" />
        <Text style={styles.buttonText}>Magic Link</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.google]}>
        <FontAwesome name="google" size={20} color="#000" />
        <Text style={[styles.buttonText, styles.googleText]}>Login with Google</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <MaterialIcons name="sms" size={20} color="#fff" />
        <Text style={styles.buttonText}>Login with SMS</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 40,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4A90E2',
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 12,
    width: '100%',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
    marginLeft: 10,
  },
  google: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  googleText: {
    color: '#333',
  },
});
