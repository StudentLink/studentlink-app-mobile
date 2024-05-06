import { KeyboardAvoidingView, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '../utils/colors'
import { jwtDecode } from 'jwt-decode'
import * as SecureStore from 'expo-secure-store'
import User from '../data/customTypes/User'
import CustomRadioButton from '../components/Button/CustomRadioButton'
import SingleSelectInput from '../components/selectInput/singleSelectInput'
import City from '../data/customTypes/City'
import CityJson from '../data/cities.json'
import { CapitalizeData } from '../utils/verification'
import ButtonShadow from '../components/Button/ButtonShadow'

const AddPosts = () => {

    const [user, setUser] = useState<User | null>(null);
    const [selectedValue, setSelectedValue] = useState<string | number | null>(null);
    const [localisations, setLocalisations] = useState<{ label: string, value: string }[]>([{ label: '', value: '' }]);
    const [postLocation, setPostLocation] = useState<string | null>(null);
    const [postSchool, setPostSchool] = useState<number | null>(null);
    const [postContent, setPostContent] = useState<string>('');
    const [postSuccess, setPostSuccess] = useState<boolean>(false);

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

    const getUserLocations = async () => {
        if (user) {
            const locationsData: any[] = []; // Initialize an empty array to store the data
            user.locations.forEach((location) => {
                const result = (CityJson as City[]).find((city) => parseInt(city.insee_code) === location);
                if (result) {
                    locationsData.push({ label: CapitalizeData(result.label), value: `${result.insee_code}` });
                } else {
                    locationsData.push({ label: 'N/A', value: 'N/A' });
                }
            });
            setLocalisations(locationsData);
        }
    };

    const addPost = async () => {
        try {
            const response = await fetch(`https://studentlink.etudiants.ynov-bordeaux.com/api/posts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + (await SecureStore.getItemAsync('token'))
                },
                body: JSON.stringify({
                    content: postContent,
                    school: postSchool,
                    location: postLocation,
                })
            });
            const json = await response.json();
            setPostContent('');
            setPostLocation(null);
            setPostSchool(null);
            setSelectedValue(null);
            setPostSuccess(true);
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getUserConnected();
    }, [])

    useEffect(() => {
        getUserLocations();
    }, [user])

    if (user) {
        return (
            <SafeAreaView style={styles.container}>
                <KeyboardAvoidingView behavior='padding' style={styles.keyboardAvoiding}>
                    <Text style={styles.title}>Nouveau post</Text>
                    <TextInput style={styles.postInput} placeholder="Écrivez votre post ici..." placeholderTextColor={Colors.WHITE} multiline={true} enterKeyHint='done' blurOnSubmit value={postContent} onChangeText={setPostContent} />
                    <View style={{ flexDirection: 'column', gap: 20, marginBottom: 30 }}>
                        <CustomRadioButton label={user.school.name} selected={selectedValue === user.school.name} onSelected={() => { setSelectedValue(user.school.name); setPostSchool(user.school.id); setPostLocation(null) }} />
                        <CustomRadioButton label='Ville' selected={selectedValue === 'Ville'} onSelected={() => { setSelectedValue('Ville'); setPostSchool(null); }} />
                    </View >
                    {selectedValue === 'Ville' ? <SingleSelectInput data={localisations} icon='location-outline' onChange={({ value }) => setPostLocation(value)} /> : null}
                    <ButtonShadow label='Publier' onClick={addPost} />
                    {postSuccess ? <Text style={styles.success}>Post publié avec succès</Text> : null}
                </KeyboardAvoidingView>
            </SafeAreaView >
        )
    }
    return (
        <SafeAreaView style={styles.container}>
            
        </SafeAreaView>
    )
}

export default AddPosts

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.DARKEN_BLUE,
        alignItems: 'center',
        justifyContent: 'center',
    },
    keyboardAvoiding :{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        padding: 20,
    },
    title: {
        color: Colors.WHITE,
        fontSize: 60,
        fontWeight: '800',
        marginBottom: 50,
    },
    postInput: {
        backgroundColor: Colors.DARKEN_BLUE_LIGHTER,
        color: Colors.WHITE,
        width: '80%',
        borderColor: Colors.BLUE,
        borderWidth: 1,
        fontSize: 20,
        marginBottom: 50,
        paddingVertical: 40,
        paddingHorizontal: 10,
        borderRadius: 10,
    },
    button: {
        backgroundColor: Colors.BLUE,
        padding: 20,
        paddingHorizontal: 120,
        borderRadius: 10,
        marginVertical: 20,
        marginBottom: 50,
    },
    buttonText: {
        color: Colors.WHITE,
        fontSize: 30,
        fontWeight: '800',
    },
    success: {
        color: Colors.GREEN,
        fontSize: 20,
        fontWeight: '800',
        marginTop: 20,
    }
})