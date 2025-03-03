import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { CodeField, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';
import { useNavigation } from '@react-navigation/native';

const CELL_COUNT = 4;

export default function OTPScreen() {
  const [value, setValue] = React.useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const navigation = useNavigation();
 
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <TouchableOpacity
          style={styles.back}
          onPress={() => navigation.navigate("verify")}
        >
          <Image
            source={require('@/assets/images/backlogo.png')}
            style={styles.backlogo}
            resizeMode="contain"
          />
        </TouchableOpacity>
        
        <Text style={styles.headtext}>Enter OTP sent via E-Mail</Text>
        <Text style={styles.subtitle}>We've sent OTP to ranjungyeshi99@gmail.com</Text>
       
        <View style={styles.otpContainer}>
          <Text style={styles.otpLabel}>OTP
            <Text style={styles.textred}> *</Text>
          </Text>
         
          <CodeField
            ref={ref}
            {...props}
            value={value}
            onChangeText={setValue}
            cellCount={CELL_COUNT}
            rootStyle={styles.codeFieldRoot}
            keyboardType="number-pad"
            renderCell={({index, symbol, isFocused}) => (
              <View
                key={index}
                style={styles.cell}
                onLayout={getCellOnLayoutHandler(index)}>
                <Text style={styles.cellText}>
                  {symbol}
                </Text>
              </View>
            )}
          />
        </View>
       
        <TouchableOpacity style={styles.tryAnotherButton}>
          <Text style={styles.tryAnotherText}>Try another method</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.footer}>
        <Text style={styles.fromgoto}>from <Text style={styles.gotoText}>goto</Text></Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    backgroundColor: '#fff',
  },
  contentContainer: {
    flex: 1,
    paddingTop: 60,
  },
  back: {
    marginTop: 40,
    alignSelf: 'flex-start',
    marginBottom: 40,
  },
  backlogo: {
    width: 70,
    height: 30,
  },
  headtext: {
    fontSize: 18,
    fontWeight: '900',
    marginBottom: 10,
    marginLeft: 17,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 30,
    marginLeft: 17,
  },
  otpContainer: {
    marginBottom: 40,
    marginLeft: 17,
  },
  otpLabel: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  codeFieldRoot: {
    width: '50%',
    marginRight: 'auto',
  },
  textred: {
    color: 'red',
    fontSize: 17,
  },
  cell: {
    width: 40,
    height: 40,
    borderBottomWidth: 2,
    borderBottomColor: '#ddd',
    marginRight: 10,
  },
  cellText: {
    fontSize: 20,
    textAlign: 'center',
    lineHeight: 38,
  },
  tryAnotherButton: {
    paddingVertical: 9,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderColor: '#000000',
    borderWidth: 1,
    width: 150,
    marginLeft: 17,
  },
  tryAnotherText: {
    fontSize: 13,
    textAlign: 'center',
    fontWeight: "600",
  },
  footer: {
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  fromgoto: {
    fontSize: 14,
  },
  gotoText: {
    color: 'green',
    fontWeight: 'bold',
  },
});