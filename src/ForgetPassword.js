import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

export default function ForgotPasswordScreen({ navigation }) {
//   const [mobileNumber, setMobileNumber] = useState('');
//   const [otp, setOtp] = useState('');
//   const [step, setStep] = useState(1); // Step 1: Enter Mobile, Step 2: Enter OTP

//   const handleSendOtp = () => {
//     if (mobileNumber.length === 10) {
//       // API call to send OTP
//       Alert.alert('OTP Sent', 'A 4-digit OTP has been sent to your mobile number.');
//       setStep(2); // Move to OTP verification step
//     } else {
//       Alert.alert('Invalid Number', 'Please enter a valid 10-digit mobile number.');
//     }
//   };

//   const handleVerifyOtp = () => {
//     if (otp.length === 4) {
//       // API call to verify OTP
//       Alert.alert('OTP Verified', 'You can now reset your password.');
//       navigation.navigate('ResetPassword');
//     } else {
//       Alert.alert('Invalid OTP', 'Please enter the correct 4-digit OTP.');
//     }
//   };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forget Password</Text>
      
      {/* {step === 1 && ( */}
        <View>
          <TextInput
            style={styles.input}
            placeholder="Enter mobile number"
            keyboardType="numeric"
            maxLength={10}
            // value={mobileNumber}
            // onChangeText={setMobileNumber}
          />
          {/* <Button title="Send OTP" onPress={handleSendOtp} /> */}
          <Button title="Send OTP" onPress={()=> navigation.navigate("OTP")} />

        </View>
      {/* )} */}
      
      {/* {step === 2 && ( */}
        <View>
          <TextInput
            style={styles.input}
            placeholder="Enter OTP"
            keyboardType="numeric"
            maxLength={4}
            // value={otp}
            // onChangeText={setOtp}
          />
          {/* <Button title="Verify OTP" onPress={handleVerifyOtp} /> */}
          <Button title="Verify Otp" onPress={()=> navigation.navigate("OTP")} />

        </View>
      {/* )} */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    fontSize: 18,
  },
});
