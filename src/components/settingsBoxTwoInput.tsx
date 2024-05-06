import { StyleSheet, Text, View } from 'react-native'
import React, { Dispatch, SetStateAction } from 'react'
import { Colors } from '../utils/colors';
import CustomInput from './CustomInput';

type Props = {
    title: string;
    labelOne: string;
    labelTwo: string;
    onChangeOne: Dispatch<SetStateAction<string>>;
    onChangeTwo: Dispatch<SetStateAction<string>>;
    valueOne?: string;
    valueTwo?: string;
}

const settingsBoxTwoInput = ({ title, labelOne, labelTwo, onChangeOne, onChangeTwo, valueOne, valueTwo }: Props) => {
    return (
        <>
            <View style={{ alignItems: 'flex-start', width: "80%" }}>
                <Text style={styles.title}>{title}</Text>
            </View>
            <View style={styles.container}>
                <CustomInput label={labelOne} onChange={onChangeOne} value={valueOne} />
                <CustomInput label={labelTwo} onChange={onChangeTwo} value={valueTwo} />

            </View>
        </>
    )
}

export default settingsBoxTwoInput

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