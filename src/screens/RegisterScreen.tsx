import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Portal, Dialog, Paragraph, Button as PaperButton } from 'react-native-paper';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import Input from '../components/Input';
import Button from '../components/Button';
import { register } from '../services/api';
import { RootStackParamList } from '../types';

const RegisterScreen = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [dialogMessage, setDialogMessage] = useState('');

    const handleRegister = async () => {
        setLoading(true);
        try {
            await register(username, password, email);
            setDialogMessage('Registration successful!');
            setVisible(true);
        } catch (error: any) {
            console.error('Failed to register:', error.message);
            setDialogMessage('Registration failed. Please try again.');
            setVisible(true);
        } finally {
            setLoading(false);
        }
    };

    const handleDialogDismiss = () => {
        setVisible(false);
        if (dialogMessage.includes('successful')) {
            navigation.navigate('Login');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Create an Account</Text>
            <Input
                placeholder="Enter Username"
                value={username}
                onChangeText={setUsername}
                placeholderTextColor="#9e9e9e"  // Lighter gray
                style={styles.input}
            />
            <Input
                placeholder="Enter Email"
                value={email}
                onChangeText={setEmail}
                placeholderTextColor="#9e9e9e"  // Lighter gray
                style={styles.input}
            />
            <Input
                placeholder="Enter Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                placeholderTextColor="#9e9e9e"  // Lighter gray
                style={styles.input}
            />
            <Button
                title={loading ? 'Processing...' : 'Register'}
                onPress={handleRegister}
                disabled={loading}
                style={styles.button}
            />
            <Portal>
                <Dialog visible={visible} onDismiss={handleDialogDismiss}>
                    <Dialog.Title style={styles.dialogTitle}>{dialogMessage.includes('successful') ? 'Success' : 'Error'}</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph style={styles.dialogContent}>{dialogMessage}</Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <PaperButton onPress={handleDialogDismiss} labelStyle={styles.dialogButton}>OK</PaperButton>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
        backgroundColor: '#f4f4f4', // Soft light gray background
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#616161', // Darker gray for title
        marginBottom: 25,
        textAlign: 'center',
    },
    input: {
        backgroundColor: '#ffffff',
        color: '#616161', // Dark gray text for inputs
        marginBottom: 15,
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#e0e0e0', // Subtle light gray border
    },
    button: {
        backgroundColor: '#bdbdbd', // Soft gray button
        borderRadius: 8,
        padding: 12,
        alignItems: 'center',
        marginTop: 10,
    },
    dialogTitle: {
        color: '#616161',
        fontSize: 20,
        fontWeight: 'bold',
    },
    dialogContent: {
        color: '#616161',
        fontSize: 16,
    },
    dialogButton: {
        color: '#616161',
        fontWeight: 'bold',
    },
});

export default RegisterScreen;
