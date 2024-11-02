import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import axios from 'axios';

export default function OTPScreen({ route, navigation }) {
  // const { mobileNumber } = route.params;
  // const [otp, setOtp] = useState('');

  // const verifyOTP = () => {
  //   if (otp.length === 4) {
  //     axios.post('YOUR_API_ENDPOINT/verify-otp', { mobile: mobileNumber, otp })
  //       .then(response => {
  //         if (response.data.success) {
  //           Alert.alert('Success', 'OTP verified successfully.');
  //           navigation.navigate('Home');
  //         } else {
  //           Alert.alert('Failed', 'Invalid OTP. Please try again.');
  //         }
  //       })
  //       .catch(error => {
  //         Alert.alert('Error', 'Failed to verify OTP. Please try again.');
  //       });
  //   } else {
  //     Alert.alert('Invalid OTP', 'Please enter a valid 4-digit OTP.');
  //   }
  // };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Enter OTP</Text>
      <TextInput
        placeholder="Enter 4-digit OTP"
        keyboardType="numeric"
        maxLength={4}
        // value={otp}
        // onChangeText={setOtp}
        style={{ borderBottomWidth: 1, marginBottom: 20, fontSize: 18 }}
      />
      {/* <Button title="Verify OTP" onPress={verifyOTP} /> */}
      {/* <Button title="Verify OTP" onPress={()=> navigation.navigate("Home") } /> */}

    </View>
  );
}
