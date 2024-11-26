import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput, Alert, StatusBar } from 'react-native';
// import { verification_data } from './utils/utils';
import { postData } from './utils/apiService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getActiveChildNavigationOptions } from 'react-navigation';
// import { Image } from 'react-native-paper/lib/typescript/components/Avatar/Avatar';
// import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation }) {
  const [mobileNumber, setMobileNumber] = useState('');

  const [password, setPassword] = useState('');
  const [customerData, setCustomerData] = useState(null); // Add state for customer data
  console.log("mobileNumber, password)********", mobileNumber, password);


  const handleSubmit = async () => {
    console.log("Attempting Login...");

    const data = {
      feature: "LOGIN",
      mobileNumber: mobileNumber,
      password: password,
    };

    try {
      let loginDataRes = await postData('service', data);
      console.log("loginDataRes----- ", loginDataRes.data);

      if(loginDataRes.data && loginDataRes.data.data.status === 'ACTIVE') {
        // Store login data in local storage
        await AsyncStorage.setItem('loginInfo', JSON.stringify(loginDataRes.data));

        // Navigate to Dashboard with loginInfo
        navigation.navigate("Dashboard", { loginInfo: loginDataRes.data });
        console.log("Login successful.");
      }
      else if (loginDataRes.data.data.status === "null") {
        Alert.alert("Login Failed", "Please enter the correct mobile number and password.", [
          { text: "OK", onPress: () => navigation.navigate("Login") }
        ]);
      }
      else {
        // Show alert prompting for correct credentials and redirect to login page on failure
        Alert.alert("Login Failed", "Please enter the correct mobile number and password.", [
          { text: "OK", onPress: () => navigation.navigate("Login") }
        ]);
      }
    } catch (error) {
      if (error.response) {
        console.error("Server responded with an error:", error.response.status);
        console.error("Response data:", error.response.data);

        if (error.response.status === 502) {
          Alert.alert("Server is currently unavailable. Please try again later.");
        } else {
          Alert.alert("Login failed: " + error.response.data.message);
        }
      } else if (error.request) {
        console.error("No response received:", error.request);
        Alert.alert("Network error. Please check your internet connection.");
      } else {
        console.error("Error during login:", error.message);
        Alert.alert("An unexpected error occurred: " + error.message);
      }
    }
  };

  return (
    <View style={styles.container}>
     
     <StatusBar  backgroundColor="#51087E"/>

      {/* <Image
        source={require('../public/assests/logo.jpg')} // Make sure this path is correct
        style={styles.image}
        // resizeMode="contain"
      />
      <Image /> */}

      {/* <Text style={styles.title}>Login</Text> */}
      <TextInput
        style={styles.input}
        placeholder="Enter mobile number"
        placeholderTextColor="#51087E"
        keyboardType="numeric"
        maxLength={10}
        value={mobileNumber}
        onChangeText={setMobileNumber}
      />

      <TextInput
        style={styles.input1}
        placeholderTextColor="#51087E"
        placeholder="Enter password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>

        {/* <TouchableOpacity style={styles.button} onPress={()=>{setData()
        }}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity> */}

        {/* <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("AdminDashboardScreen")}>
          <Text style={styles.buttonText}>Admin Login</Text>
        </TouchableOpacity> */}

        {/* <TouchableOpacity style={styles.button} onPress={() => showData() }>
          <Text style={styles.buttonText}>Admin Login</Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 0,
    // margin:0,
    paddingLeft: 10,
    paddingRight: 10,
  },
  // title: {
  //   color: "black",
  //   fontSize: 24,
  //   marginBottom: 20,
  // },
  input: {
    width: '90%',
    color: '#51087E',
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: '#51087E',
    borderRadius: 5,
    padding: 10,
    marginTop: 200,
    // marginBottom: 20,
    fontSize: 18,
  },
  input1: {
    width: '90%',
    color: '#51087E',
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: '#51087E',
    borderRadius: 5,
    padding: 10,
    marginTop: 30,
    // marginBottom: 20,
    fontSize: 18,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  button: {
    backgroundColor: '#51087E',
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginTop: 40,
    borderRadius: 5,
    width: '48%',
  },
  buttonText: {
    textAlign: "center",
    color: '#FFFFFF',
    fontSize: 13,
  },
  image: {
    marginTop: 20,
    marginBottom: 20,
    width: 390,
    height: 300,
  },
});
