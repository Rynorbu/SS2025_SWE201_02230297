// import { Image, StyleSheet, Platform, Text, TouchableOpacity } from 'react-native';
// import ParallaxScrollView from '@/components/ParallaxScrollView';
// import { useNavigation } from '@react-navigation/native';

// export default function HomeScreen() {
//   const navigation = useNavigation();
//   return (
//     <ParallaxScrollView
//       headerImage={
//         <Image
//           source={require('@/assets/images/gojek.png')}
//           style={styles.gojekLogo}
//         />
//       }
//       headerBackgroundColor={{ dark: '#000000', light: '#ffffff' }}
//     >
//       <Image
//         source={require('@/assets/images/gojek1.png')}
//         style={styles.reactLogo}
//       />
//       <Text style={styles.headText}>
//         Get going with us
//       </Text>
//       <Text style={styles.paraText}>
//         Use GoCar to get across town - from anywhere, at any time.
//       </Text>
//       <TouchableOpacity
//         style={styles.loginButton}
//         onPress={() => navigation.navigate("login")}
//         >
//         <Text style={styles.loginButtonText}>Log in</Text>
//       </TouchableOpacity>
//       <TouchableOpacity
//         style={styles.signupButton}
//         onPress={() => navigation.navigate("login")}
//       >
//         <Text style={styles.signupButtonText}>I'm new, sign me up</Text>
//       </TouchableOpacity>
//       <Text style={styles.ploicyText}>
//         By logging in or registering, you agree to our {''}
//         <Text style={styles.linkText}>Terms of Service</Text> and{' '}
//         <Text style={styles.linkText}>Privacy Policy</Text>
//       </Text>
//     </ParallaxScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   gojekLogo: {
//     height: 100,
//     width: 100,
//     top: 40,
//     left: 10,
//     position: 'absolute',
//   },
//   reactLogo: {
//     height: 150,
//     width: 250,
//     borderRadius: 25,  
//     alignSelf: 'center', 
//   },
//   headText: {
//     fontSize: 20,
//     fontWeight: '900', 
//     textAlign: 'center', 
//     marginTop: 10,
//   },
//   paraText: {
//     fontSize: 14,
//     textAlign: 'center', 
//   },
//   loginButton: {
//     backgroundColor: '#28A745', 
//     borderRadius: 25, 
//     paddingVertical: 10,
//     paddingHorizontal: 10,
//     width: 300,
//     alignSelf: 'center',
//     marginTop: 20,
//   },
//   loginButtonText: {
//     color: '#ffffff',
//     fontSize: 14,
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   signupButton: {
//     backgroundColor: '#FFFFFF', 
//     borderWidth: 2, 
//     borderColor: '#28A745',
//     borderRadius: 25, 
//     paddingVertical: 10,
//     paddingHorizontal: 10,
//     width: 300,
//     alignSelf: 'center',
//   },
//   signupButtonText: {
//     color: '#28A745',
//     fontSize: 14,
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   ploicyText: {
//     fontSize: 10,
//     alignSelf: 'center',
//   },
//   linkText: {
//     color: '#28A745',
//     fontWeight: 'bold',
//   }
// });


import React, { useState, useRef } from "react";
import { 
  View, Text, Image, TouchableOpacity, 
  StyleSheet, ScrollView, Dimensions 
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

const screenWidth = Dimensions.get("window").width;

// Image and text data
const slides = [
  {
    image: require("@/assets/images/gojek1.png"),
    title: "Get going with us",
    subtitle: "Use GoCar to get across town – from anywhere, at any time.",
  },
  {
    image: require("@/assets/images/gojek_2.png"),
    title: "Welcome to Gojek!",
    subtitle: "We're your go-to app for hassle-free commutes.",
  },
  {
    image: require("@/assets/images/gojek3.png"),
    title: "Rides for all",
    subtitle: "Up to three steps with every trip - perfect for travel with friends and family.",
  },
];

export default function HomeScreen() {
  const navigation = useNavigation();
  const scrollViewRef = useRef<ScrollView>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollToIndex = (index) => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ x: index * screenWidth, animated: true });
      setCurrentIndex(index);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={require("@/assets/images/gojek.png")} style={styles.logo} />
      </View>

      {/* Scrollable Images & Text */}
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          const newIndex = Math.round(event.nativeEvent.contentOffset.x / screenWidth);
          setCurrentIndex(newIndex);
        }}
        contentContainerStyle={styles.scrollViewContent}
      >
        {slides.map((slide, index) => (
          <View key={index} style={styles.slide}>
            <View style={styles.imageContainer}>
              <Image source={slide.image} style={styles.illustration} resizeMode="contain" />
            </View>
            <Text style={styles.title}>{slide.title}</Text>
            <Text style={styles.subtitle}>{slide.subtitle}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Page Indicators (Dots) */}
      <View style={styles.dotContainer}>
        {slides.map((_, index) => (
          <TouchableOpacity 
            key={index} 
            onPress={() => scrollToIndex(index)}
          >
            <View style={[styles.dot, currentIndex === index && styles.activeDot]} />
          </TouchableOpacity>
        ))}
      </View>
      
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
      
      <Text style={styles.policyText}>
        By logging in or registering, you agree to our{' '}
        <Text style={styles.linkText}>Terms of Service</Text> and{' '}
        <Text style={styles.linkText}>Privacy Policy</Text>
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingVertical: 2,
    paddingLeft: 8,
  },
  logo: {
    width: 80,
    height: 30,
  },
  scrollViewContent: {
    alignItems: "center",
  },
  slide: {
    width: screenWidth,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  imageContainer: {
    width: "100%",
    height: 180,
    justifyContent: "center",
    alignItems: "center",
  },
  illustration: {
    width: "90%",
    height: "100%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
  },
  subtitle: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
    marginTop: 10,
  },
  dotContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 20,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ccc",
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: "green",
  },
  loginButton: {
    backgroundColor: "#28A745",
    borderRadius: 25,
    paddingVertical: 12,
    width: 300,
    alignSelf: "center",
    marginTop: 10,
  },
  loginButtonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  signupButton: {
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: "#28A745",
    borderRadius: 25,
    paddingVertical: 12,
    width: 300,
    alignSelf: "center",
    marginTop: 10,
  },
  signupButtonText: {
    color: "#28A745",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  policyText: {
    fontSize: 10,
    alignSelf: "center",
    marginTop: 15,
  },
  linkText: {
    color: "#28A745",
    fontWeight: "bold",
  },
});