import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LandingScreen from './components/home';
import EmailPasswordLogin from './components/EmailPasswordLogin';
import MagicLinkLogin from './components/MagicLinkLogin';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Landing" component={LandingScreen} />
        <Stack.Screen name="EmailPasswordLogin" component={EmailPasswordLogin} />
        <Stack.Screen name="MagicLinkLogin" component={MagicLinkLogin} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
