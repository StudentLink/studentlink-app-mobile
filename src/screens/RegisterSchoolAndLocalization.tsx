import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CustomInput from '../components/CustomInput';
import ButtonShadow from '../components/ButtonShadow';
import { updateUser } from '../data/reducer/userReducer';
import { Constant } from '../utils/constant';
import { Colors } from '../utils/colors';
import SelectInput from '../components/SelectInput';

type Props = {}

const RegisterSchoolAndLocalization = (props: Props) => {
    const name = useSelector((state: any) => state.user.name)
    console.log(name)

    const dispatch = useDispatch();

    const [username, setUsername] = useState('');

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Tu viens</Text>
            <Text style={[styles.text, { color : Colors.BLUE, marginBottom: Constant.MARGIN_BOTTOM_TITLE }]}>d'où ?</Text>
            <SelectInput/>
            <ButtonShadow
                label='Suivant'
                onClick={() => {
                    dispatch(updateUser({ username: username}))
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

export default RegisterSchoolAndLocalization;