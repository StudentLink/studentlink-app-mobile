import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { Dispatch, SetStateAction } from 'react'
import { Colors } from '../utils/colors'

type Props = {
    label: string;
    onChange : Dispatch<SetStateAction<string>>;
}

const CustomInput = ({ label, onChange }: Props) => {
    return (
        <View>
            <TextInput
                style={styles.textInput}
                placeholder={label}
                placeholderTextColor={Colors.BLUE}
                onChangeText={onChange}
                contextMenuHidden={true}
                secureTextEntry={label === 'Password' || label === 'Confirm password'}
            />
        </View>
    )
}

export default CustomInput

const styles = StyleSheet.create({
    textInput: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: 'transparent',
        fontSize: 20,
        color: Colors.WHITE,
        borderWidth: 2,
        borderColor: Colors.BLUE,
        borderRadius: 7,
        width: 300,
        height: 50,
        marginBottom: 20,
    }
})