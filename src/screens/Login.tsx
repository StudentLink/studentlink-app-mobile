import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '../utils/colors'
import { Constant } from '../utils/constant'
import CustomInput from '../components/CustomInput'
import ButtonShadow from '../components/Button/ButtonShadow'
import * as SecureStore from 'expo-secure-store'
import { useNavigation } from '@react-navigation/native'
import { ValidateDataLogin } from '../utils/verification'
import BackButton from '../components/Button/BackButton'


const Login = () => {

    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loginUser = async () => {
        try {
            const response = await fetch('https://studentlink.etudiants.ynov-bordeaux.com/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: email,
                    password: password,
                })
            });
            const json = await response.json();
            if (json.message) {
                alert("Identifiant invalide");
                return;
            }
            await SecureStore.setItemAsync('token', json.token);
            navigation.navigate('HomePage');
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <View style={styles.container}>
            <BackButton />
            <KeyboardAvoidingView behavior='padding'>
                <Text style={styles.title}>Login</Text>
                <CustomInput label="Email" icon='at' onChange={setEmail} />
                <CustomInput label="Password" icon='lock-closed-outline' onChange={setPassword} />
                <ButtonShadow label='Login' onClick={() => {
                    if (ValidateDataLogin(email, password)) {
                        loginUser();
                    }
                }} />
            </KeyboardAvoidingView>
        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.DARKEN_BLUE,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 350,
        height: 140,
    },
    title: {
        color: Colors.BLUE,
        fontWeight: '900',
        fontSize: Constant.TITLE_SIZE,
        textAlign: 'center',
        marginBottom: Constant.MARGIN_BOTTOM_TITLE,
    },
})