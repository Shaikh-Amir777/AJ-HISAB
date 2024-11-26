import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Alert, ScrollView } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { deleteData, postData } from './utils/apiService';

const Tab = createMaterialTopTabNavigator();

export default function UserInfo({ navigation, route }) {

    const { mobileNumber, fullName, address, password, userId, status } = route.params;
    const data = route.params;
    console.log("data**UserInfo**tab1", data.status)

    return (
        <Tab.Navigator>
            <Tab.Screen
                name="UserInfo"
                component={UserInfo1}
                initialParams={{ mobileNumber, fullName, address, password, userId, status }}
            />
            <Tab.Screen
                name="Add Transaction"
                component={Add_Transaction2}
                initialParams={{ mobileNumber, fullName, address, userId }}
            />

            <Tab.Screen
                name="Transaction Details"
                component={Transaction_Details3}
                initialParams={{ mobileNumber, fullName, address, userId }}
            />
        </Tab.Navigator>
    );
}

function UserInfo1({ navigation, route }) {
    const { mobileNumber, fullName, address, password, userId, status } = route.params;
    const inActiveData = route.params.status;
    console.log("inActiveData********", inActiveData)
    console.log("route.params****UserInfo1*", route.params);
    const [editPassword, setEditPassword] = useState(password);
    const [editFullName, setEiditFullName] = useState(fullName);
    const [editAddress, setEditAddress] = useState(address);
    const [editMobileNumber, setEditMobileNumber] = useState(mobileNumber);
    const [newStatus, setNewStatus] = useState(inActiveData);

    console.log("newStatus*", newStatus);

    const updateUser = async () => {
        // console.log("newPassword12345678");
        const data = {
            feature: "PASSWORD_UPDATE",
            id: userId,
            newPassword: editPassword,
            newFullName: editFullName,
            newAddress: editAddress,
            newMobileNumber: editMobileNumber,
            newStatus: newStatus
        };
        console.log("newPassword12345678----data", data);
        try {
            // console.log("Request data: ", data);
            let passWordData = await postData('service', data);
            console.log("passWordData response:", passWordData);
            if (passWordData) {
                navigation.navigate("AdminDashboardScreen");
            }

        } catch (error) {
            console.error("Error fetching user dashboard data: ", error);
            Alert.alert('Error', 'Failed to fetch data. Please try again later.');
        }
    };


    // const removeData = async () => {
    //     console.log("newPassword12345678");
    //     const data = {
    //         feature: "DELETE_USER",
    //         userId: userId
    //     };

    //     console.log("newRemoveData----data", data);
    //     try {
    //         console.log("DELETE_USER__Request data: ", data);
    //         let userData = await postData('service', data);
    //         console.log("DELETE_USER response:", userData);
    //         if (userData) {
    //             Alert.alert(
    //                 "Are you sure?", // Alert title
    //                 // "Do you want to navigate to the Admin Dashboard?", // Alert message
    //                 [
    //                     {
    //                         text: "Cancel", // Cancel button
    //                         onPress: () => console.log("Cancel Pressed"), // Action for Cancel button
    //                         style: "cancel", // Style for the Cancel button
    //                     },
    //                     {
    //                         text: "Okay", // Okay button
    //                         onPress: () => navigation.navigate("AdminDashboardScreen"), // Action for Okay button
    //                     },
    //                 ],
    //                 { cancelable: false } // Prevent dismissing the alert by tapping outside
    //             );
    //         }


    //     } catch (error) {
    //         console.error("Error fetching newRemoveData data: ", error);
    //         Alert.alert('Error', 'Failed to fetch data. Please try again later.');
    //     }
    // };

    const removeData = async () => {
        console.log("removeData****call");
        const data = {
            feature: "DELETE_USER",
            userId: userId // Ensure userId is correctly set
        };
        console.log("removeData****call", data);

        try {
            let response = await postData('service', data);
            console.log("Delete Response:", response.data.status);

            // If delete was successful, you can navigate or give success feedback
            if (response) {
                // Alert.alert(
                    // "Are you sure?", // Alert title
                    navigation.navigate("AdminDashboardScreen") // Action for Okay button
            // )
        }

        } catch (error) {
            console.error("Error deleting data:", error.response?.data || error.message);
            Alert.alert('Error', 'Failed to delete data. Please try again later.');
        }
    };


    return (
        <View style={styles.container}>
            <View style={styles.inputRow}>
                <Text style={styles.label}>Name:</Text>
                <TextInput
                    style={styles.input}
                    value={editFullName}
                    onChangeText={setEiditFullName}
                    // editable={false}
                    placeholder="Name"
                />
            </View>
            <View style={styles.inputRow}>
                <Text style={styles.label}>Mobile:</Text>
                <TextInput
                    style={styles.input}
                    value={editMobileNumber}
                    onChangeText={setEditMobileNumber}
                    // editable={false}
                    placeholder="Enter Mobile Number"
                />
            </View>
            <View style={styles.inputRow}>
                <Text style={styles.label}>Address:</Text>
                <TextInput
                    // style={styles.input}
                    style={styles.input}
                    value={editAddress}
                    onChangeText={setEditAddress}
                    // editable={false}
                    placeholder="Enter Address"
                />
            </View>

            <View style={styles.inputRow}>
                <Text style={styles.label}>Password:</Text>
                <TextInput
                    style={styles.input}
                    value={editPassword}
                    onChangeText={setEditPassword}
                />
            </View>

            <View style={styles.inputRow}>
                <Text style={styles.label}>User Type:</Text>
                <View style={styles.radioContainer}>
                    <TouchableOpacity
                        style={styles.radioButton}
                        onPress={() => setNewStatus('ACTIVE')}
                    >
                        <View style={styles.outerCircle}>
                            {newStatus === 'ACTIVE' && <View style={styles.innerCircle} />}
                        </View>
                        <Text style={styles.radioText}>ACTIVE</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.radioButton}
                        onPress={() => setNewStatus('INACTIVE')}
                    >
                        <View style={styles.outerCircle}>
                            {newStatus === 'INACTIVE' && <View style={styles.innerCircle} />}
                        </View>
                        <Text style={styles.radioText}>INACTIVE</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.buttonContainerTab1}>
                {/* <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("AdminDashboardScreen")}> */}
                <TouchableOpacity style={styles.buttonTab1} onPress={updateUser}>
                    <Text style={styles.buttonText}>Update</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonTab1} onPress={removeData}>
                    <Text style={styles.buttonText}>Remove</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

function Add_Transaction2({ navigation, route }) {
    const { mobileNumber, fullName, address, userId } = route.params;
    console.log("route.params*****", route.params);

    const [amount, setAmount] = useState('');
    const [comment, setComment] = useState('');
    const [selectId, setSelectId] = useState('');
    const [transactionType, setTransactionType] = useState('');

    const date = new Date();
    const formatDate = `${date.getFullYear()}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}`;

    console.log(formatDate);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [selectDate, setSelectDate] = useState(formatDate);

    console.log("selectDate++++++", selectDate);

    const showDatePicker = () => setDatePickerVisibility(true);
    const hideDatePicker = () => setDatePickerVisibility(false);

    const handleDateConfirm = (date) => {
        const dt = new Date(date);
        const formattedDate = dt.toISOString().split('T')[0];
        // const formattedDate = dt.toISOString().split('T')[0].split('-').reverse().join('/');
        setSelectDate(formattedDate);
        hideDatePicker();
    };

    useEffect(() => {
        retrieveLoginInfo();
    }, [])


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


    const handleSubmit = async () => {
        console.log(" testing ");
        // navigation.navigate("AdminDashboardScreen");
        const data = {
            feature: "TRANSACTION_ADD",
            transactionType: transactionType,
            date: selectDate,
            // "2024-09-24",
            amount: amount,
            comment: comment,
            customerId: userId,
            userId: selectId
        }
        console.log(" user Data ", data);

        let usertransation = await postData('service', data);
        console.log(" usertransation ----- ", usertransation);
        if (usertransation) {
            navigation.navigate("AdminDashboardScreen"); // Correct navigation here
        }
        else {
            console.log("post Data not working");
        }
    };

    return (
        <ScrollView>
        <View style={styles.container}>
            <View style={styles.inputRow}>
                <Text style={styles.label}>Name:</Text>
                <TextInput
                    style={styles.input}
                    value={fullName}
                    editable={false}
                />
            </View>
            <View style={styles.inputRow}>
                <Text style={styles.label}>Mobile:</Text>
                <TextInput
                    style={styles.input}
                    value={mobileNumber}
                    editable={false}
                />
            </View>
            <View style={styles.inputRow}>
                <Text style={styles.label}>Address:</Text>
                <TextInput
                    style={styles.input}
                    value={address}
                    editable={false}
                />
            </View>
            <View style={styles.inputRow}>
                <Text style={styles.label}>Date:</Text>
                <TouchableOpacity onPress={showDatePicker} style={styles.input}>
                    <Text style={styles.dateText}>{selectDate}</Text>
                </TouchableOpacity>
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleDateConfirm}
                    onCancel={hideDatePicker}
                />
            </View>
            <View style={styles.inputRow}>
                <Text style={styles.label}>Enter Amount:</Text>
                <TextInput
                    style={styles.input}
                    value={amount}
                    onChangeText={setAmount}
                    keyboardType="numeric"
                    placeholderTextColor="#51087E"
                    placeholder="Amount"
                />
            </View>
            <View style={styles.inputRow}>
                <Text style={styles.label}>Comment:</Text>
                <TextInput
                    style={styles.input}
                    value={comment}
                    onChangeText={setComment}
                    placeholderTextColor="#51087E"
                    placeholder="Comment"
                />
            </View>
            <View style={styles.inputRow}>
                <Text style={styles.label}>Transaction Type:</Text>
                <View style={styles.radioContainer}>
                    <TouchableOpacity
                        style={styles.radioButton}
                        onPress={() => setTransactionType('IN')}
                    >
                        <View style={styles.outerCircle}>
                            {transactionType === 'IN' && <View style={styles.innerCircle} />}
                        </View>
                        <Text style={styles.radioText}>IN</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.radioButton}
                        onPress={() => setTransactionType('OUT')}
                    >
                        <View style={styles.outerCircle}>
                            {transactionType === 'OUT' && <View style={styles.innerCircle} />}
                        </View>
                        <Text style={styles.radioText}>OUT</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => handleSubmit()}>

                    {/* <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("AdminDashboardScreen")}> */}
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
            </View>
        </View>
        </ScrollView>
    );
}

function Transaction_Details3({ navigation, route }) {
    // console.log("route******test3", route.params.userId);
    const userId = route.params.userId
    const [userTransactionData, setUserTransactionData] = useState("");
    // console.log("userTransactionData******",userTransactionData.balanceSummary)
    const [balance, setBalance] = useState("");
    const [totalIn, setTotalIn] = useState("");
    const [totalOut, setTotalOut] = useState("");




    useEffect(() => {
        handleTransaction();
    }, []);



    const handleTransaction = async () => {
        console.log("testing");
        const data = {
            feature: "USER_DASHBOARD",
            //  userId: 2
            userId: userId
        };
        try {
            console.log("Request data: ", data);
            let userDashboard = await postData('service', data);
            // console.log("userTransactionDashboard response:", userDashboard.data.data.transactionData);
            setBalance(userDashboard.data.data.balanceSummary.totalBalance);
            setTotalIn(userDashboard.data.data.balanceSummary.tolalIn);
            setTotalOut(userDashboard.data.data.balanceSummary.totalOut);
            setUserTransactionData(userDashboard.data.data.transactionData);

        } catch (error) {
            console.error("Error fetching user dashboard data: ", error);
            Alert.alert('Error', 'Failed to fetch data. Please try again later.');
        }
    };

    // Function to strip the currency symbol and convert to number
    const parseAmount = (amount) => {
        return parseFloat(amount.replace('₹', '').replace(/,/g, '')) || 0;
    };

    const renderTransaction = ({ item }) => (
        <View style={styles.row}>
            <Text style={styles.cell}>{item.transactionDate}</Text>
            <Text style={styles.cell}>{item.comment}</Text>
            <Text style={styles.cell1}>{item.IN === "0" ? "-" : `${item.IN > 0 ? "+ " : " "}${item.IN}`}</Text>
            <Text style={styles.cell2}>{item.OUT === "0" ? "-" : `${item.OUT > 0 ? "- " : " "}${item.OUT}`}</Text>
        </View>
    );

    return (
        // <ScrollView>
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Transactions</Text>
                {/* <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddTransactionsScreen')}>
                    <Text style={styles.addButtonText}>Add Transaction</Text>
                </TouchableOpacity> */}
            </View>

            <View style={styles.tableHeader}>
                <Text style={styles.headerCell}>Date</Text>
                <Text style={styles.headerCell}>comment</Text>
                <Text style={styles.headerCell}>In</Text>
                <Text style={styles.headerCell}>Out</Text>
            </View>


            <FlatList
                data={userTransactionData}
                renderItem={renderTransaction}
                keyExtractor={item => item.id}
            />
            <View style={styles.footer}>
                <Text style={styles.footerAmount}> Total In: ₹ {totalIn}</Text>
                <Text style={styles.footerAmount}> Total Out: ₹{totalOut}</Text>
                <Text style={styles.footerText}>Available Balance: ₹{Number(balance).toFixed(2)} </Text>
            </View>
        </View>
        // </ScrollView>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        marginBottom: 10,
    },
    label: {
        fontSize: 18,
        color: '#333',
        width: 100
    },
    inputRow: {
        // width:'100%',
        color: '#51087E',
        flexDirection: 'row',
        marginBottom: 20,
        alignItems: 'center',
    },
    input: {
        width: '65%',
        color: '#51087E',
        marginLeft: 0,
        alignSelf: 'center',
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: '#51087E',
        borderRadius: 5,
        padding: 8,
        marginBottom: 10,
        fontSize: 18,
    },

    dateText: {
        color: '#51087E',   // Replace with desired color
        fontSize: 16,       // Adjust font size if needed
    },
    radioContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        flex: 2,
    },
    radioButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    radioText: {
        color: "black",
        marginLeft: 10
    },
    outerCircle: {
        height: 24,
        width: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#51087E',
        justifyContent: 'center',
        alignItems: 'center',
    },
    innerCircle: {
        height: 12,
        width: 12,
        borderRadius: 6,
        backgroundColor: '#51087E',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        marginTop: 20,
    },
    buttonContainerTab1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 20,
    },
    button: {
        backgroundColor: '#51087E',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        width: '48%',
    },
    buttonTab1: {
        justifyContent: "space-around",
        backgroundColor: '#51087E',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        width: '40%',
    },
    buttonText: {
        textAlign: 'center',
        color: '#FFFFFF',
        fontSize: 13,
    },


    container1: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f8f8f8',
    },
    header: {

        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        color: "black",
        fontSize: 24,
        fontWeight: 'bold',
    },
    addButton: {
        backgroundColor: '#007BFF',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 5,
    },
    addButtonText: {
        color: '#000000',
        fontSize: 16,
    },
    tableHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#51087E',
        paddingVertical: 10,
        paddingHorizontal: 5,
        borderRadius: 5,
        marginBottom: 10,
    },
    headerCell: {
        color: "white",
        fontSize: 18,
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'center',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingHorizontal: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    cell1: {
        color: "green",
        fontSize: 14,
        flex: 1,
        textAlign: 'center',
    },
    cell2: {
        color: "red",
        fontSize: 14,
        flex: 1,
        textAlign: 'center',
    },
    cell: {
        color: "black",
        fontSize: 14,
        flex: 1,
        textAlign: 'center',
    },
    footerAmount: {
        color: "black",
        fontSize: 24,
        fontWeight: 'bold',
    },
    footerText: {
        color: "black",
        fontSize: 24,
        fontWeight: 'bold',
    }


});
