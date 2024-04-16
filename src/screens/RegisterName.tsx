import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '../utils/colors'
import CustomInput from '../components/CustomInput'
import { Constant } from '../utils/constant'
import { useSharedValue } from 'react-native-reanimated'
import ButtonShadow from '../components/ButtonShadow'
import { useDispatch, useSelector } from 'react-redux'
import { updateUser } from '../data/reducer/userReducer'


const RegisterName = () => {
    const dispatch = useDispatch();

    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');

    return (
        <View style={styles.container}>
            <Text style={[styles.text, { color: Colors.BLUE }]}>Pour commencer,</Text>
            <Text style={[styles.text, { marginBottom: Constant.MARGIN_BOTTOM_TITLE }]}>comment tu t'appelles ?</Text>
            <Text style={styles.subtitle}>Enter your full name</Text>
            <CustomInput label='Prénom' onChange={setFirstname}/>
            <CustomInput label='Nom' onChange={setLastname}/>
            <ButtonShadow 
            label='Suivant' 
            navigate='RegisterUsername' 
            onClick={() => {
                dispatch(updateUser({name : `${firstname[0].toUpperCase() + firstname.slice(1).toLowerCase()} ${lastname.toUpperCase()}`}))
            }}/>
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

    text: {
        color: Colors.WHITE,
        fontWeight: '900',
        fontSize: Constant.TITLE_SIZE,
        textAlign: 'center',
    },
    subtitle: {
        color: Colors.WHITE,
        fontWeight: '600',
        fontSize: Constant.SUBTITLE_SIZE,
        marginBottom: Constant.MARGIN_BOTTOM_SUBTITLE,
    }
});

export default RegisterName;