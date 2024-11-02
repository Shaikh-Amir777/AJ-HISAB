import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

const DetailsScreen = ({ route , navigation}) => {
    const { mobileNumber, name, address } = route.params;
    const [amount, setAmount] = useState('');
    const [comment, setComment] = useState('');
    const [transactionType, setTransactionType] = useState('IN'); // Default to 'IN'

    return (
        <View style={styles.container}>

            <View style={styles.inputRow}>
                <Text style={styles.label}>Name:</Text>
                <TextInput
                    style={styles.input}
                    value={name}
                    editable={false}
                //   onChangeText={setComment}
                //   placeholder="Comment"
                />
            </View>
            <View style={styles.inputRow}>
                <Text style={styles.label}>Mobile:</Text>
                <TextInput
                    style={styles.input}
                    value={mobileNumber}
                    editable={false}
                //   onChangeText={setComment}
                //   placeholder="Comment"
                />
            </View>

            <View style={styles.inputRow}>
                <Text style={styles.label}>Addres:</Text>
                <TextInput
                    style={styles.input}
                    value={address}
                    editable={false}
                />
            </View>

            {/* <View style={styles.container}> */}
                {/* Amount Input */}
                <View style={styles.inputRow}>
                    <Text style={styles.label}>Enter Amount:</Text>
                    <TextInput
                        style={styles.input}
                        value={amount}
                        onChangeText={setAmount}
                        keyboardType="numeric"
                        placeholder="Amount"
                    />
                </View>

                {/* Comment Input */}
                <View style={styles.inputRow}>
                    <Text style={styles.label}>Comment:</Text>
                    <TextInput
                        style={styles.input}
                        value={comment}
                        onChangeText={setComment}
                        placeholder="Comment"
                    />
                </View>

                {/* Transaction Type Radio Buttons */}
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
        {/* <Button style={styles.button} title="Submit" onPress={() => navigation.navigate("OTP")} />
        <Button style={styles.button} title="Forget Password" onPress={() => navigation.navigate("OTP")} /> */}
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("AdminDashboardScreen")}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("AdminDashboardScreen")}>
          <Text style={styles.buttonText}>Forget Password</Text>
        </TouchableOpacity> */}
      </View>
            </View>
        // </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: "flex",
        padding: 20,
        marginBottom: 10,
    },
    label: {
        fontSize: 18,
        marginBottom: 10,
    },
    inputRow: {
        flexDirection: "row",
        marginBottom: 10,

    },

    input: {
        backgroundColor: "white",
        flex: 2,
        borderWidth: 1,
        borderColor: '#DEAC17',
        padding: 8,
        borderRadius: 4,
        marginLeft: 10,
    },

    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    label: {
        color: "black",
        flex: 1,
        fontSize: 18,
        marginRight: 8,
    },
    input: {
        backgroundColor: "white",
        flex: 2,
        borderWidth: 1,
        borderColor: '#DEAC17',
        padding: 8,
        borderRadius: 4,
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
    outerCircle: {
        height: 24,
        width: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#DEAC17',
        justifyContent: 'center',
        alignItems: 'center',
    },
    innerCircle: {
        height: 12,
        width: 12,
        borderRadius: 6,
        backgroundColor: '#DEAC17',
    },
    radioText: {
        color: "black",
        marginLeft: 8,
        fontSize: 16,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        marginTop:50,
      },
      button: {
        backgroundColor: '#DEAC17',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        width: '48%',
        // textAlign: 'center',
      },
      buttonText: {
        textAlign:"center",
        color: '#FFFFFF',
        fontSize: 13,
      },
});

export default DetailsScreen;
