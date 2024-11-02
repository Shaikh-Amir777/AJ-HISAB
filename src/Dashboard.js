import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { postData } from './utils/apiService';

 export default function DashboardScreen({route,navigation}) {
  const { loginInfo } = route.params;
  // console.log("customerDetails*********",loginInfo.data.id);
  const customerData = loginInfo.data.id

  // const fullName = "Mohammad Amir"; // Replace with dynamic data if needed
  // const balance = 123456;

  const [showBalance, setShowBalance] = useState(false);
  const [Balance, setBalance] = useState(0);
  const [userId, setuserId] = useState(customerData);
  console.log("customerId-----",userId)
  const [userDashboardData, setUserDashboardData] = useState(0);
  console.log("Balance*******",Balance);

  useEffect(()=>{
    handleTransaction();
  },[]);

  

  const handleTransaction = async () => {
    console.log("testing");
    const data = {
     feature: "USER_DASHBOARD",
      userId
    };
    try {
      console.log("Request data: ", data);
      let userDashboard = await postData('service', data);
      console.log("userDashboard response:", userDashboard.data.data.balanceSummary.totalBalance); 
      setBalance(userDashboard.data.data.balanceSummary.totalBalance);
      setUserDashboardData(userDashboard.data.data);
      // if (userDashboard.data.data){
      //   console.log("userDashboard.data.data");
      //   // setShowBalance()
      //   navigation.navigate("TransactionsScreen", { userInfo: userDashboard.data.data });
      // } 
      // navigation.navigate(
      //   role === "USER" ? "TransactionsScreen" : "AdminDashboardScreen",
      //   { loginInfo: loginDataRes.data }
      // );
      // else {
      //   Alert.alert('Error', 'Incorrect mobile number or password');
      // }
    } catch (error) {
      console.error("Error fetching user dashboard data: ", error);
      Alert.alert('Error', 'Failed to fetch data. Please try again later.');
    }
  };
  


  const toggleBalance = () => {
    setShowBalance(!showBalance);
  };

  return (
    <View style={styles.container}>

      <Image
        source={require('../public/assests/ajlogo1.jpg')} // Make sure this path is correct
        style={styles.image}
        // resizeMode="contain"
      />
      <Image />
      <View style={styles.box}>
        <Text style={styles.welcomeText}>Welcome, {loginInfo.data.fullName}</Text>
        <Text style={styles.balanceLabel}>Your Available Balance is</Text>
        <TouchableOpacity onPress={toggleBalance}>
          <Text style={styles.balanceText}>{showBalance ? `${Balance}` : "XXXX"}</Text>
        </TouchableOpacity>
         <TouchableOpacity onPress={() => navigation.navigate('TransactionsScreen', { userInfo: userDashboardData })}>
         {/* <TouchableOpacity onPress={() => navigation.navigate('TransactionsScreen', { userInfo: userDashboard.data.data })}> */}
        {/* <TouchableOpacity onPress={handleTransaction}> */}
          <Text style={styles.SeeAllTransaction}>See All Transactions</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'top',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  box: {
    width: '95%',
    padding: 20,
    marginTop:50,
    alignItems:"",
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  welcomeText: {
    color:"black",
    fontSize: 24,
    marginBottom: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  balanceLabel: {
    color:"black",
    fontSize: 18,
    marginBottom: 5,
    textAlign: 'center',
  },
  balanceText: {
    fontSize: 16,
    color: '#51087E',
    textAlign: 'center',
    fontWeight: 'bold',
    // textDecorationLine: 'underline',
  },
  SeeAllTransaction: {
    fontSize: 13,
    color: '#51087E',
    textAlign: 'center',
    fontWeight: 'bold',
    // textDecorationLine: 'underline',
  },
  image: {
    marginTop: 0,
    marginBottom:20,
    width: 390,
    height: 400,
  },
});
