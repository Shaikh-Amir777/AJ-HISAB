import React from 'react';
import CodePush from "react-native-code-push";
import { StatusBar, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from './src/LoginScreen';
import OTPScreen from './src/OTPScreen';
import HomeScreen from './src/HomeScreen';
import ForgotPasswordScreen from './src/ForgetPassword';
import DashboardScreen from './src/Dashboard';
import TransactionsScreen from './src/SeeAllTransaction';
import AdminDashboardScreen from './src/AdminDashbord';
import DetailsScreen from './src/DetailsScreen';
import UserAdd from './src/UserAdd';
import UserInfo from './src/UserInfo';
import Transaction_Update from './src/TransactionUpdate';

const Stack = createNativeStackNavigator();
let codePushOptions = { checkFrequency: CodePush.CheckFrequency.ON_APP_START };

function App() {

  useEffect(() => {
    CodePush.sync({
      updateDialog: true,
      installMode: CodePush.InstallMode.IMMEDIATE,
    });
  }, []);

  return (

    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerStyle: {
            backgroundColor: "#51087E",
          },
          headerTintColor: "white"
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="ForgetPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="OTP" component={OTPScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="TransactionsScreen" component={TransactionsScreen} />
        <Stack.Screen name="UserAdd" component={UserAdd} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="AdminDashboardScreen" component={AdminDashboardScreen} />
        {/* <Stack.Screen name="AdminDashboardScreen" component={AdminDashboardScreen} /> */}
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="UserInfo" component={UserInfo} />
        <Stack.Screen name="Transaction Update" component={Transaction_Update} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default CodePush(codePushOptions)(App);