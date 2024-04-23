import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Colors } from '../utils/colors';
import { Constant } from '../utils/constant';
import { updateUser } from '../data/reducer/userReducer';
import ButtonShadow from '../components/ButtonShadow';
import CustomInput from '../components/CustomInput';
import { ValidateEmail, ValidatePassword } from '../utils/verification';
import { useNavigation } from '@react-navigation/native';

const RegisterPasswordAndEmail = () => {

    const navigation = useNavigation();
    const dispatch = useDispatch();

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Sécurisons ton</Text>
            <Text style={[styles.text, { color: Colors.BLUE, marginBottom: Constant.MARGIN_BOTTOM_TITLE }]}>compte !</Text>
            <CustomInput label='Email' onChange={setEmail} />
            <CustomInput label='Password' onChange={setPassword} />
            <CustomInput label='Confirm password' onChange={setConfirmPassword} />
            <ButtonShadow
                label='Suivant'
                onClick={() => {
                    if (ValidateEmail(email)) {
                        dispatch(updateUser({ email: email }))
                    } else {
                        alert('Email invalide !')
                        return;
                    }
                    if (ValidatePassword(password, confirmPassword)) {
                        dispatch(updateUser({ password: password })),
                            navigation.navigate('RegisterSchoolAndLocalization')
                    } else {
                        alert('Les mots de passe ne correspondent pas !')
                    }
                }}
            />
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

export default RegisterPasswordAndEmail
