import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { postData } from './utils/apiService';
import Share from 'react-native-share';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import Icon from 'react-native-vector-icons/material-icons';

export default function AdminDashboardScreen({ navigation }) {
    const [filterShow, setFilterShow] = useState(false);
    const [adminData, setAdminData] = useState([]);
    console.log('adminData++++++++', adminData);
    // State for the filters
    const [mobileNumber, setMobileNumber] = useState('');
    const [fullName, setFullName] = useState('');
    const [address, setAddress] = useState('');

    const share = () => {
        const options = {
            title: "AJ HISAB",
            message: "Any problem to contact afjal bhai",
            // https://drive.google.com/file/d/1BwvxBACfaMZ7XhtkHuC2NUKwXLVQduiV/view?usp=sharing
            url:"https://drive.google.com/file/d/1BwvxBACfaMZ7XhtkHuC2NUKwXLVQduiV/view?usp=sharing"
        }

        Share.open(options)
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }


    useEffect(() => {
        const userData = async () => {
            console.log("userDataTesting");
            const data = {
                feature: "USER_LIST",
                userId: 33,
                // role: "ADMIN"
            };
            try {
                console.log("Request data: ", data);
                let adminDashboard = await postData('service', data);
                // console.log("adminDashboard response:", adminDashboard.data.data[0].address);
                setAdminData(adminDashboard.data.data);
                //   setBalance(userDashboard.data.data.balanceSummary.totalBalance);
                //   setUserDashboardData(userDashboard.data.data);
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
        userData();
        // setAdminData(adminDashboard.data.data);
    }, []);

    // const userData = async () => {
    //     console.log("userDataTesting");
    //     const data = {
    //         feature: "USER_LIST",
    //         userId: 21,
    //     };
    //     try {
    //         console.log("Request data: ", data);
    //         let adminDashboard = await postData('service', data);
    //         console.log("adminDashboard response:", adminDashboard.data.data[0].address);
    //         setAdminData(adminDashboard.data.data);
    //         //   setBalance(userDashboard.data.data.balanceSummary.totalBalance);
    //         //   setUserDashboardData(userDashboard.data.data);
    //         // if (userDashboard.data.data){
    //         //   console.log("userDashboard.data.data");
    //         //   // setShowBalance()
    //         //   navigation.navigate("TransactionsScreen", { userInfo: userDashboard.data.data });
    //         // } 
    //         // navigation.navigate(
    //         //   role === "USER" ? "TransactionsScreen" : "AdminDashboardScreen",
    //         //   { loginInfo: loginDataRes.data }
    //         // );
    //         // else {
    //         //   Alert.alert('Error', 'Incorrect mobile number or password');
    //         // }
    //     } catch (error) {
    //         console.error("Error fetching user dashboard data: ", error);
    //         Alert.alert('Error', 'Failed to fetch data. Please try again later.');
    //     }
    // };

    // Filter the data dynamically based on inputs
    const filteredData = adminData.filter(item => {
        // Perform the filtering based on non-empty inputs
        const mobileMatch = mobileNumber ? item.mobileNumber.includes(mobileNumber) : true;
        const nameMatch = fullName ? item.fullName.toLowerCase().includes(fullName.toLowerCase()) : true;
        const addressMatch = address ? item.address.toLowerCase().includes(address.toLowerCase()) : true;
        const userId = userId ? item.userId.toLowerCase().includes(userId.toLowerCase()) : true;


        // Return true if all conditions match
        return mobileMatch && nameMatch && addressMatch;
    });

    return (
        <View style={styles.container}>

            <View style={styles.header}>
                {/* <Text style={styles.title}>Admin Dashboard</Text> */}
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => setFilterShow(!filterShow)}
                >
                    <Text style={styles.addButtonText}>Filter All Data</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    // style={styles.addButton}
                    onPress={share}
                >
                    {/* sharealt */}
                    {/* <AntDesign name= "ShareAltOutlined" size= {30} color= 'red'/> */}
                    {/* <AntDesign name="sharealt" size={30} color="red" /> */}
                    <FontAwesome name="share-alt" size={30} color="#51087E" />
                    {/* <Text style={styles.addButtonText}>Share App</Text> */}
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => navigation.navigate('UserAdd')}
                >
                    <Text style={styles.addButtonText}>Add User</Text>
                </TouchableOpacity>
            </View>
            {/* Filter Section */}
            {filterShow &&
                <View style={styles.filterContainer}>
                    <Text style={styles.itemText}>Mobile Number</Text>
                    <TextInput
                        style={styles.input}
                        placeholderTextColor="#51087E"
                        placeholder="Filter by Mobile Number"
                        value={mobileNumber}
                        onChangeText={setMobileNumber}
                        keyboardType="numeric"
                    />
                    <Text style={styles.itemText}>Name</Text>
                    <TextInput
                        style={styles.input}
                        placeholderTextColor="#51087E"
                        placeholder="Filter by Name"
                        value={fullName}
                        onChangeText={setFullName}
                    />
                    <Text style={styles.itemText}>Address</Text>
                    <TextInput
                        style={styles.input}
                        placeholderTextColor="#51087E"
                        placeholder="Filter by Address"
                        value={address}
                        onChangeText={setAddress}
                    />
                </View>
            }
            {/* Data Display Section */}
            <ScrollView style={styles.dataContainer}>
                {filteredData.map(item => (
                    <TouchableOpacity
                        key={item.id}
                        onPress={() => navigation.navigate('UserInfo', {
                            mobileNumber: item.mobileNumber,
                            fullName: item.fullName,
                            address: item.address,
                            password: item.password,
                            userId: item.userId,
                            status: item.status
                        })}
                    >
                        <View key={item.id} style={styles.itemContainer}>
                            <View>
                                <Text style={styles.itemText}>Mobile: {item.mobileNumber}</Text>
                                <Text style={styles.itemText}>Name: {item.fullName}</Text>
                                <Text style={styles.itemText}>Address: {item.address}</Text>
                            </View>
                            {/* <View style={styles.addRemoveContainer}>
                            <TouchableOpacity style={styles.addRemove}
                            // onPress={() => handleRemove(item.id)} // Define your remove function
                            >
                                <Text style={styles.addRemoveText}>Remove</Text>
                            </TouchableOpacity>
                        </View> */}
                        </View>

                    </TouchableOpacity>
                ))}
            </ScrollView>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        // backgroundColor: 'grey',
        // backgroundColor: '#f5f5f5',
        // backgroundColor:"Blue",
        flex: 1,
        padding: 16,
    },
    header: {
        flexDirection: 'row',
        justifyContent: "space-evenly",
        marginBottom: 16,
        // alignItems: 'center',
        // marginBottom: 20,
    },
    filterContainer: {
        marginBottom: 16,
    },
    input: {
        // backgroundColor: 'white',
        color: '#51087E',
        borderWidth: 1.5,
        borderColor: '#51087E',
        borderRadius: 4,
        padding: 8,
        marginBottom: 8,
    },
    dataContainer: {
        flex: 1,
    },
    itemContainer: {
        flex: 1,
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        marginBottom: 8,
        backgroundColor: 'white',
        borderRadius: 4,

    },

    itemText: {
        color: "black",
        fontSize: 20,
        fontColor: "bold",
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    addButton: {
        color: "white",
        width: 120,
        alignItems: "center",
        backgroundColor: '#51087E',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 4,
    },
    addRemoveContainer: {
        marginLeft: 'auto',            // Push the button to the right
        alignItems: 'center',
    },
    addRemove: {
        // flexDirection:"row",

        color: "white",
        width: 85,
        // justifyContent: "flex-end",
        backgroundColor: '#51087E',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 4,
    },
    addButtonText: {
        color: '#fff',
        // textAlign:"center",
        fontSize: 14,
    },
    addRemoveText: {
        color: '#fff',
        textAlign: "center",
        fontSize: 14,
    },
});
