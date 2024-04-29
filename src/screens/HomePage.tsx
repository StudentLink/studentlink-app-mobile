import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as SecureStore from 'expo-secure-store'

const HomePage = () => {
    const [token, setToken] = useState<string | null>(null);

    const getToken = async () => {
        setToken(await SecureStore.getItemAsync('token'));
    };

    useEffect(() => {
        getToken();
    }, []);



    return (
        <View>
            <Text>HomePage</Text>
        </View>
    )
}

export default HomePage

const styles = StyleSheet.create({})