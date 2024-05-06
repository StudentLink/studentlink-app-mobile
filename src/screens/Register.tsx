import { KeyboardAvoidingView, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Constant } from '../utils/constant';
import CustomInput from '../components/CustomInput';
import ButtonShadow from '../components/Button/ButtonShadow';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../utils/colors';
import { CapitalizeData, ValidateDataRegister } from '../utils/verification';
import * as SecureStore from 'expo-secure-store'
import BackButton from '../components/Button/BackButton';
import { ScrollView } from 'react-native-gesture-handler';

const Register = () => {
    const navigation = useNavigation();

    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');

    const registerUser = async () => {
        try {
            const response = await fetch('https://studentlink.etudiants.ynov-bordeaux.com/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: `${CapitalizeData(firstname)} ${lastname.toUpperCase()}`,
                    username: username,
                    email: email,
                    password: password,
                    role: 'ROLE_USER',
                })
            });
            const json = await response.json();
            if (json.message) {
                alert(json.message);
                return;
            }
            await SecureStore.setItemAsync('token', json.token);
            navigation.navigate('RegisterSchoolAndLocalization');
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <BackButton />
            <KeyboardAvoidingView behavior='padding' style={styles.keyboarAvoiding}>
                <ScrollView style={styles.scroll}>
                    <Text style={styles.title}>Créons ton compte !</Text>
                    <CustomInput label='Prénom' onChange={setFirstname} icon='person-outline' />
                    <CustomInput label='Nom' onChange={setLastname} icon='person-outline' />
                    <CustomInput label='Pseudonyme' onChange={setUsername} icon='person-outline' />
                    <CustomInput label='Email' onChange={setEmail} icon='at' />
                    <CustomInput label='Mot de passe' onChange={setPassword} icon='lock-closed-outline' />
                    <CustomInput label='Confirmation' onChange={setConfirmPassword} icon='lock-closed-outline' />
                </ScrollView>
                <ButtonShadow
                    label='Suivant'
                    onClick={() => {
                        if (ValidateDataRegister(firstname, lastname, username, email, password, confirmPassword)) {
                            registerUser();
                        }
                    }} />
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.DARKEN_BLUE,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        color: Colors.BLUE,
        fontWeight: '900',
        fontSize: Constant.TITLE_SIZE,
        textAlign: 'center',
        marginBottom: 50,
    },
    subtitle: {
        color: Colors.WHITE,
        fontWeight: '600',
        fontSize: Constant.SUBTITLE_SIZE,
        marginBottom: Constant.MARGIN_BOTTOM_SUBTITLE,
    },
    scroll: {
        flex: 1,
        width: '100%',
    },
    keyboarAvoiding: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        padding: 20,
    }
});

export default Register;