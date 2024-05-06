import { StyleSheet, Text, View } from 'react-native'
import React, { Dispatch, SetStateAction } from 'react'
import { Colors } from '../utils/colors';
import CustomInput from './CustomInput';

type Props = {
    title: string;
    label: string;
    onChange: Dispatch<SetStateAction<string>>;
    value?: string;
}

const settingsBoxOneInput = ({ title, label, onChange, value}: Props) => {
    return (
        <>
            <View style={{ alignItems: 'flex-start', width: "80%" }}>
                <Text style={styles.title}>{title}</Text>
            </View>
            <View style={styles.container}>
                <CustomInput label={label} onChange={onChange} value={value}/>
            </View>
        </>
    )
}

export default settingsBoxOneInput

const styles = StyleSheet.create({
    title: {
        color: Colors.BLUE,
        fontWeight: '800',
        fontSize: 20,
        marginBottom: 5,
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.DARKEN_BLUE_LIGHTER,
        width: '90%',
        paddingVertical: 20,
        borderRadius: 10,
        marginBottom: 20,
    }
})