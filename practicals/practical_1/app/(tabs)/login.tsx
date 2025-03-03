import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CountryPicker from 'react-native-country-picker-modal';

export default function Login() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('BT'); 
  const [callingCode, setCallingCode] = useState('975');
  const navigation = useNavigation();

  return (
    <View style={styles.mainContainer}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TouchableOpacity 
          style={styles.back} 
          onPress={() => navigation.navigate("index")}
        >
          <Image 
            source={require('@/assets/images/backlogo.png')} 
            style={styles.backlogo}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <View style={styles.container}>
          <Text style={styles.headText}>Welcome to Gojek!</Text>
          <Text style={styles.text1}>Enter or create an account in a few easy steps.</Text>

          <View style={styles.input}>
            <Text style={styles.phonenumber}>
              Phone number
              <Text style={styles.phone_red}> *</Text>
            </Text>
            <View style={styles.phoneInputContainer}>
              <View style={styles.countryCode}>
                <CountryPicker 
                  countryCode={countryCode}
                  withCallingCode
                  withFlag
                  withFilter
                  onSelect={(country) => {
                    setCountryCode(country.cca2);
                    setCallingCode(country.callingCode[0]);
                  }}
                  containerButtonStyle={styles.countryPicker}
                />
                <Text style={styles.countryCodeText}>+{callingCode}</Text>
              </View>
              <TextInput
                style={styles.phonenumbers}
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                placeholder="Enter phone number"
                keyboardType="phone-pad"
              />
            </View>
          </View>
          
          <TouchableOpacity 
            style={styles.continueButton}
            onPress={() => navigation.navigate("verify")}
          >
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
          
          <View style={styles.termsContainer}>
            <Text style={styles.termsText}>
              I agree to Gojek's <Text style={styles.termsLink}>Terms of Service</Text> & <Text style={styles.termsLink}>Privacy Policy</Text>.
            </Text>
          </View>
          
          <TouchableOpacity style={styles.issueContainer}>
            <Text style={styles.issueText}>Issue with number?</Text>
          </TouchableOpacity>
        </View>
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
    backgroundColor: '#fff',
  },
  back: {
    marginTop: 100,
  },
  backlogo: {
    width: 70,
    height: 30,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 50,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 40,
  },
  input: {
    marginTop: 20,
  },
  headText: {
    fontSize: 24,
    fontWeight: '900',
    marginBottom: 10,
  },
  text1: {
    fontSize: 13,
  },
  phonenumber: {
    fontSize: 13,
  },
  phone_red: {
    color: 'red',
    fontSize: 15,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginTop: 8,
  },
  countryCode: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderRightWidth: 1,
    borderRightColor: '#ccc',
  },
  countryPicker: { marginRight: 10 },
  flag: {
    width: 20,
    height: 15,
    marginRight: 5,
  },
  countryCodeText: {
    fontSize: 14,
  },
  phonenumbers: {
    flex: 1,
    padding: 10,
  },
  continueButton: {
    backgroundColor: '#00A14F',
    borderRadius: 25,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  continueButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  termsContainer: {
    marginTop: 15,
  },
  termsText: {
    fontSize: 12,
    color: '#666',
  },
  termsLink: {
    color: '#00A14F',
    textDecorationLine: 'underline',
  },
  issueContainer: {
    marginTop: 20,
    paddingVertical: 9,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderColor: '#000000',
    borderWidth: 1, 
    width: 140,
  },
  issueText: {
    fontSize: 13,
    textAlign: 'center',
    fontWeight: "600",
  },
  footer: {
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fromgoto: {
    fontSize: 14,
  },
  gotoText: { 
    color: 'green', 
    fontWeight: 'bold',
  },
});