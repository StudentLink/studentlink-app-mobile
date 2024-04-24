import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '../utils/colors'
import CustomInput from '../components/CustomInput'
import { Constant } from '../utils/constant'
import ButtonShadow from '../components/ButtonShadow'
import { useDispatch } from 'react-redux'
import { updateUser } from '../data/reducer/userReducer'
import { useNavigation } from '@react-navigation/native'


const RegisterName = () => {
    const navigation = useNavigation();

    const dispatch = useDispatch();

    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [username, setUsername] = useState('');


    return (
        <View style={styles.container}>
            <Text style={[styles.text, { color: Colors.BLUE }]}>Pour commencer,</Text>
            <Text style={[styles.text, { marginBottom: Constant.MARGIN_BOTTOM_TITLE }]}>comment tu t'appelles ?</Text>
            <CustomInput label='Prénom' onChange={setFirstname}/>
            <CustomInput label='Nom' onChange={setLastname}/>
            <CustomInput label='Pseudonyme' onChange={setUsername}/>
            <ButtonShadow 
            label='Suivant' 
            onClick={() => {
                dispatch(updateUser({name : `${firstname[0].toUpperCase() + firstname.slice(1).toLowerCase()} ${lastname.toUpperCase()}`, username : username}))
                navigation.navigate('RegisterPasswordAndEmail')
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