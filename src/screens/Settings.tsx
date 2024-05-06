import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors } from '../utils/colors'
import BackButton from '../components/Button/BackButton'
import { useNavigation } from '@react-navigation/native'
import SettingsBoxTwoInput from '../components/settingsBoxTwoInput'
import SettingsBoxOneInput from '../components/settingsBoxOneInput'
import CustomInput from '../components/CustomInput'
import { ScrollView } from 'react-native-gesture-handler'
import * as SecureStore from 'expo-secure-store'
import { jwtDecode } from 'jwt-decode'
import User from '../data/customTypes/User'
import { ValidateDataRegister, ValidateDataUpdate } from '../utils/verification'


const Settings = () => {

    const navigation = useNavigation();

    const [user, setUser] = useState<User | null>(null);
    const [username, setUsername] = useState<string>('')
    const [firstname, setFirstname] = useState<string>('');
    const [lastname, setLastname] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [email, setEmail] = useState<string>('');


    const decodeToken = () => {
        const token = SecureStore.getItem('token');
        if (token) {
            const tokenDecode = jwtDecode(token);
            return tokenDecode;
        }
        return null;
    }

    const getUserConnected = async () => {
        const token = decodeToken();
        if (!token) return;

        try {
            const response = await fetch(`https://studentlink.etudiants.ynov-bordeaux.com/api/users/${token.sub}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + (await SecureStore.getItemAsync('token'))
                },
            });
            const json = await response.json();
            setUser(json);
        } catch (error) {
            console.error(error)
        }
    }

    const updateUser = async () => {
        const token = decodeToken();
        if (!token) return;

        try {
            const response = await fetch(`https://studentlink.etudiants.ynov-bordeaux.com/api/users/${token.sub}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + (await SecureStore.getItemAsync('token'))
                },
                body: JSON.stringify({
                    username: username,
                    name: `${firstname} ${lastname}`,
                    email: email,
                    password: password,
                })
            });
            const json = await response.json();
            console.log(json);
            if (json.message) {
                alert(json.message)
                return;
            }
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getUserConnected();
    }, [])

    if (user) {
        const [firstnameUser, lastnameUser] = user.name.split(' ',)
        return (
            <SafeAreaView style={styles.container}>
                <BackButton onclick={() => { navigation.goBack() }} />
                <Text style={{ color: Colors.WHITE, fontSize: 40, fontWeight: '800', marginBottom: 20 }}>Settings</Text>
                <ScrollView style={styles.scroll}>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <SettingsBoxOneInput title='Username' label={user.username} onChange={setUsername} />
                        <SettingsBoxTwoInput title='Name' labelOne={firstnameUser} labelTwo={lastnameUser} onChangeOne={setFirstname} onChangeTwo={setLastname} />
                        <SettingsBoxOneInput title='Email' label={user.email} onChange={setEmail} />
                        <SettingsBoxTwoInput title='Password' labelOne='New password' labelTwo='Confirm new password' onChangeOne={setPassword} onChangeTwo={setConfirmPassword} />
                    </View>
                </ScrollView>
                <TouchableOpacity style={styles.button} onPress={() => {
                    if (ValidateDataUpdate(email, password, confirmPassword)) {
                        updateUser()
                    }
                }}>
                    <Text style={{ color: Colors.WHITE, fontSize: 20 }}>Save</Text>
                </TouchableOpacity>
            </SafeAreaView>
        )
    }

}

export default Settings;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.DARKEN_BLUE,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
    },
    scroll: {
        flex: 1,
        width: '100%',
    },
    button: {
        backgroundColor: Colors.BLUE,
        paddingVertical: 20,
        paddingHorizontal: 100,
        borderRadius: 10,
        marginTop: 20
    },
})