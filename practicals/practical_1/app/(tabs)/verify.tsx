import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, ScrollView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation();
 
  return (
    <View style={styles.mainContainer}>
      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity
          style={styles.back}
          onPress={() => navigation.navigate("login")}
        >
          <Image
            source={require('@/assets/images/backlogo.png')}
            style={styles.backlogo}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <Text style={styles.headText}>Choose verification method</Text>
       
        <TouchableOpacity
          style={styles.optionButton}
          onPress={() => {
            navigation.navigate("opt")
          }}
        >
          <Image source={require("@/assets/images/message.png")} style={styles.icon} />
          <Text style={styles.optionText}>OTP via E-mail</Text>
        </TouchableOpacity>
       
        <TouchableOpacity
          style={styles.optionButton}
          onPress={() => {
            navigation.navigate("opt")
          }}
        >
          <Image source={require("@/assets/images/whatsapp.jpg")} style={styles.icon} />
          <Text style={styles.optionText}>OTP via WhatsApp</Text>
        </TouchableOpacity>
       
        <TouchableOpacity
          style={styles.optionButton}
          onPress={() => {
            navigation.navigate("opt")
          }}
        >
          <Image source={require("@/assets/images/sms.png")} style={styles.icon} />
          <Text style={styles.optionText}>OTP via SMS</Text>
        </TouchableOpacity>
      </ScrollView>
      
      <View style={styles.footer}>
        <Text style={styles.fromgoto}>from <Text style={styles.gotoText}>goto</Text></Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  back: {
    marginTop: 100,
    alignSelf: 'flex-start',
    marginLeft: 20,
  },
  backlogo: {
    width: 70,
    height: 30,
  },
  container: {
    flexGrow: 1,
    alignItems: 'center',
    paddingBottom: 50, 
  },
  headText: {
    marginTop: 40,
    fontSize: 18,
    fontWeight: '900',
    marginBottom: 20,
    alignSelf: 'flex-start',
    marginLeft: 40,
  },
  optionButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    width: "80%",
    borderColor: '#000000',
    borderWidth: 1,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  optionText: {
    fontSize: 16,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  fromgoto: {
    fontSize: 14,
  },
  gotoText: {
    color: 'green',
    fontWeight: 'bold',
  },
});