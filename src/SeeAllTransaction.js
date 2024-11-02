import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { postData } from './utils/apiService';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TransactionsScreen({ route,navigation }) {
    const userInfo = route.params;
    const [selectId, setSelectId] = useState('');
    console.log("selectId*******", selectId)


    const inTotalAmount = route.params.userInfo.balanceSummary.tolalIn;
    const outTotalAmount = route.params.userInfo.balanceSummary.totalOut;
    const totalBalanceAmount = route.params.userInfo.balanceSummary.totalBalance;

    // console.log("inAmount_______",inTotalAmount)
    // console.log("userInfo*****",userInfo)
    const transactionUserData = route.params.userInfo.transactionData;
    console.log("transactionUserData++++++++++", transactionUserData);
    // const transactions = [
    //     { id: '1', date: '2024-08-01', inAmount: '₹5000', outAmount: '₹2000' },
    //     { id: '2', date: '2024-08-02', inAmount: '₹7000', outAmount: '₹3000' },
    //     { id: '3', date: '2024-08-03', inAmount: '₹2000', outAmount: '₹1000' },
    //     // Add more transactions here
    // ];

    // Function to strip the currency symbol and convert to number
    // const parseAmount = (amount) => {
    //     return parseFloat(amount.replace('₹', '').replace(/,/g, '')) || 0;
    // };

    // Calculate totals
    // const totalIn = transactions.reduce((acc, curr) => acc + parseAmount(curr.inAmount), 0);
    // const totalOut = transactions.reduce((acc, curr) => acc + parseAmount(curr.outAmount), 0);
    // const availableBalance = totalIn - totalOut;

    // useEffect(()=>{
    //     userData();
    //     // setAdminData(adminDashboard.data.data);
    // },[]);

    useEffect(() => {
        console.log("testing123456789")
        retrieveLoginInfo();
    }, [])


    const retrieveLoginInfo = async () => {
        try {
            const loginInfo = await AsyncStorage.getItem('loginInfo');
            if (loginInfo !== null) {
                // We have data!!
                const parsedLoginInfo = JSON.parse(loginInfo);
                setSelectId(parsedLoginInfo.data.role);
                console.log("Retrieved login info:", parsedLoginInfo);
                // Use the login info here...
            }
        } catch (error) {
            console.error("Error retrieving login info: ", error);
        }
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
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Transactions</Text>
                {selectId === "ADMIN" && (
                    <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AdminDashboardScreen')}>
                        <Text style={styles.addButtonText}>User Details</Text>
                    </TouchableOpacity>
                )}
            </View>
 

            <View style={styles.tableHeader}>
                <Text style={styles.headerCell}>Date</Text>
                <Text style={styles.headerCell}>comment</Text>
                <Text style={styles.headerCell}>In</Text>
                <Text style={styles.headerCell}>Out</Text>
            </View>


            <FlatList
                data={transactionUserData}
                renderItem={renderTransaction}
                keyExtractor={item => item.id}
            />
            <View style={styles.footer}>
                <Text style={styles.footerAmount}> Total In: ₹{inTotalAmount} </Text>
                <Text style={styles.footerAmount}> Total Out: ₹{outTotalAmount}</Text>
                <Text style={styles.footerText}>Available Balance: ₹{totalBalanceAmount} </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
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
        backgroundColor: '#51087E',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 5,
    },
    addButtonText: {
        color: 'white',
        fontSize: 16,
    },
    tableHeader: {
        // color:'white',
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
