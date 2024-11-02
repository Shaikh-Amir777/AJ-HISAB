import { DateTimePicker } from '@react-native-community/datetimepicker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Button, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { postData } from './utils/apiService';
import { useNavigation } from '@react-navigation/native';

export default function UserAdd() {
const navigation = useNavigation();
  const date = new Date();
  const formatDate = date.toLocaleDateString();
  // console.log(formatDate);

  const [selectDate, setSelectDate] = useState(formatDate);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [selectId, setSelectId] = useState ('');
  console.log("fullName______",fullName);
  console.log("mobileNumber______",mobileNumber);
  console.log("address______",address);
  console.log("password______",password);
  

  const retrieveLoginInfo = async () => {
    try {
      const loginInfo = await AsyncStorage.getItem('loginInfo');
      if (loginInfo !== null) {
        // We have data!!
        const parsedLoginInfo = JSON.parse(loginInfo);
        setSelectId(parsedLoginInfo.data.id);
        console.log("Retrieved login info:", parsedLoginInfo);
        // Use the login info here...
      }
    } catch (error) {
      console.error("Error retrieving login info: ", error);
    }
  };
  
  useEffect(()=>{
    console.log("test retrieveLoginInfo");
    retrieveLoginInfo();
  },[])


  const handleSubmit = async () => {
    console.log(" testing ");
    // navigation.navigate("AdminDashboardScreen");
    const data = {
      feature: "USER_ADD",
      fullName:fullName,
      mobileNumber: mobileNumber,
      address:address,
      password: password,
      // selectDate:selectDate,
      userId:selectId 
      
    };
    // console.log(" user Data ",data);
 
    let userDataAdd = await postData('service',data);
    console.log(" userDataAdd ----- ", userDataAdd.data); 
    if (userDataAdd) {
      navigation.navigate("AdminDashboardScreen"); // Correct navigation here
    } 
    else{
      console.log("post Data not working");
    }
  };




//   const date = new Date();
// const formattedDate = date.toLocaleDateString(); // Default format based on locale
// console.log(formattedDate);
  // const date = new Date();
  // const formatDate = date.toLocaleDateString(); 
  // // console.log(formatDate);

  // const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  // const [selectDate, setSelectDate] = useState(form atDate);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleDateConfirm = (date) => {
    console.warn("A date has been picked: ", date);
    const dt = new Date(date);
    const x = dt.toISOString().split('T');
    const x1 = x[0].split('-');
    console.log(x1[2] + '/' + x1[1] + '/' + x1[0]);
    setSelectDate(x1[2] + '/' + x1[1] + '/' + x1[0]);

    hideDatePicker();
  };


  return (
    <View style={styles.container}>
      <View style={styles.inputRow}>
        <Text style={styles.label}>Name:</Text>
        <TextInput
          style={styles.input}
          value={fullName}
          onChangeText={setFullName}
          placeholderTextColor="#51087E"
          placeholder="Name"
        />
      </View>
      <View style={styles.inputRow}>
        <Text style={styles.label}>Mobile:</Text>
        <TextInput
          style={styles.input}
          value={mobileNumber}
          onChangeText={setMobileNumber}
          keyboardType="numeric"
          placeholderTextColor="#51087E"
          placeholder="Mobile Number"
        />
      </View>

      <View style={styles.inputRow}>
        <Text style={styles.label}>Address:</Text>
        <TextInput
          style={styles.input}
          value={address}
          onChangeText={setAddress}
          // keyboardType="text"
          placeholderTextColor="#51087E"
          placeholder="Address"
        />
      </View>

      <View style={styles.inputRow}>
        <Text style={styles.label}>Password:</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          // secureTextEntry
          placeholderTextColor="#51087E"
          placeholder="Password"
        />
      </View>

      <View style={styles.inputRow}>
        <Text style={styles.label}>Date:</Text>
        <TouchableOpacity 
        onPress={showDatePicker}
        style={styles.input}
        // style={{width:"50%",
        //   height:50,
        //   borderWidth:0.5,
        //   borderRadius:10,
        //   alignSelf:"center",
        //   justifyContent:"center",
        //   alignItems:"center",
        // }}
        >
          <Text style={styles.dateText}>{selectDate}</Text>
        </TouchableOpacity>
        <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleDateConfirm}
        onCancel={hideDatePicker}
      />
      </View>

      <View style={styles.buttonContainer}>
        {/* <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("AdminDashboardScreen")}> */}
          <TouchableOpacity style={styles.button} onPress={() => handleSubmit()}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop:30
    // justifyContent: 'top',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  label: {
    color: "black",
    flex: 1,
    fontSize: 18,
    marginRight: 8,
  },
  input: {
    backgroundColor: "white",
    color: '#51087E',
    flex: 2,
    borderWidth: 1,
    borderColor: '#51087E',
    padding: 8,
    borderRadius: 4,
  },
  dateText: {
    color: '#51087E',   // Replace with desired color
    fontSize: 16,       // Adjust font size if needed
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  button: {
    marginTop:30,
    backgroundColor: '#51087E',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: '48%',
  },
  buttonText: {
    textAlign: "center",
    color: '#FFFFFF',
    fontSize: 13,
  },
});
