import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '../utils/colors'
import { Constant } from '../utils/constant'
import ButtonShadow from '../components/Button/ButtonShadow'
import { useNavigation } from '@react-navigation/native'
import BorderButton from '../components/Button/BorderButton'

const Authentication = () => {

    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Image
                style={styles.image}
                source={require('../assets/images/student-link-logo.png')}
            />
            <Text style={styles.subtitle}>Bienvenue sur l'application des étudiants</Text>
            <BorderButton label="S'inscrire" onClick={() => {navigation.navigate('Register')}} />
            <View style={styles.spacer}/>
            <ButtonShadow label='Se connecter' onClick={() => {navigation.navigate('Login')}} />
        </View>
    )
}

export default Authentication

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
    subtitle: {
        width: 300,
        color: Colors.WHITE,
        fontWeight: '600',
        fontSize: Constant.SUBTITLE_SIZE,
        marginBottom: Constant.MARGIN_BOTTOM_SUBTITLE,
        textAlign: 'center',
    },
    spacer : {
        height: 30,
    }
})