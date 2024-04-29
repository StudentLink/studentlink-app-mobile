import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Constant } from '../utils/constant';
import CustomInput from '../components/CustomInput';
import ButtonShadow from '../components/Button/ButtonShadow';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../data/reducer/userReducer';
import { Colors } from '../utils/colors';
import { CapitalizeData, ValidateDataRegister } from '../utils/verification';
import * as SecureStore from 'expo-secure-store'

const Register = () => {
    const navigation = useNavigation();

    const dispatch = useDispatch();
    const user = useSelector((state: any) => state.user);

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
                    displayname: user.name,
                    username: user.username,
                    email: user.email,
                    password: user.password,
                    role: 'ROLE_USER',
                })
            });
            const json = await response.json();
            if (json.message) {
                alert(json.message);
                return;
            }
            await SecureStore.setItemAsync('token', json.token);
            navigation.navigate('HomePage');
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if (ValidateDataRegister(firstname, lastname, username, email, password, confirmPassword)) {
            registerUser();
        }
    }, [user]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Create Account</Text>
            <CustomInput label='Prénom' onChange={setFirstname} icon='person-outline' />
            <CustomInput label='Nom' onChange={setLastname} icon='person-outline' />
            <CustomInput label='Pseudonyme' onChange={setUsername} icon='person-outline' />
            <CustomInput label='Email' onChange={setEmail} icon='at' />
            <CustomInput label='Password' onChange={setPassword} icon='lock-closed-outline' />
            <CustomInput label='Confirm password' onChange={setConfirmPassword} icon='lock-closed-outline' />
            <ButtonShadow
                label='Suivant'
                onClick={() => {
                    dispatch(updateUser({ name: `${CapitalizeData(firstname)} ${lastname.toUpperCase()}`, username: username, email: email, password: password }))
                }} />
        </View>
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
        marginBottom: Constant.MARGIN_BOTTOM_TITLE,
    },
    subtitle: {
        color: Colors.WHITE,
        fontWeight: '600',
        fontSize: Constant.SUBTITLE_SIZE,
        marginBottom: Constant.MARGIN_BOTTOM_SUBTITLE,
    }
});

export default Register;