import { Image, StyleSheet, Platform, Text, TouchableOpacity } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation();
  return (
    <ParallaxScrollView
      headerImage={
        <Image
          source={require('@/assets/images/gojek.png')}
          style={styles.gojekLogo}
        />
      }
      headerBackgroundColor={{ dark: '#000000', light: '#ffffff' }}
    >
      <Image
        source={require('@/assets/images/gojek1.png')}
        style={styles.reactLogo}
      />
      <Text style={styles.headText}>
        Get going with us
      </Text>
      <Text style={styles.paraText}>
        Use GoCar to get across town - from anywhere, at any time.
      </Text>
      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => navigation.navigate("login")}
        >
        <Text style={styles.loginButtonText}>Log in</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.signupButton}
        onPress={() => navigation.navigate("login")}
      >
        <Text style={styles.signupButtonText}>I'm new, sign me up</Text>
      </TouchableOpacity>
      <Text style={styles.ploicyText}>
        By logging in or registering, you agree to our {''}
        <Text style={styles.linkText}>Terms of Service</Text> and{' '}
        <Text style={styles.linkText}>Privacy Policy</Text>
      </Text>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  gojekLogo: {
    height: 100,
    width: 100,
    top: 40,
    left: 10,
    position: 'absolute',
  },
  reactLogo: {
    height: 150,
    width: 250,
    borderRadius: 25,  
    alignSelf: 'center', 
  },
  headText: {
    fontSize: 20,
    fontWeight: '900', 
    textAlign: 'center', 
    marginTop: 10,
  },
  paraText: {
    fontSize: 14,
    textAlign: 'center', 
  },
  loginButton: {
    backgroundColor: '#28A745', 
    borderRadius: 25, 
    paddingVertical: 10,
    paddingHorizontal: 10,
    width: 300,
    alignSelf: 'center',
    marginTop: 20,
  },
  loginButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  signupButton: {
    backgroundColor: '#FFFFFF', 
    borderWidth: 2, 
    borderColor: '#28A745',
    borderRadius: 25, 
    paddingVertical: 10,
    paddingHorizontal: 10,
    width: 300,
    alignSelf: 'center',
  },
  signupButtonText: {
    color: '#28A745',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  ploicyText: {
    fontSize: 10,
    alignSelf: 'center',
  },
  linkText: {
    color: '#28A745',
    fontWeight: 'bold',
  }
});