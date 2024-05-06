import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { Dispatch, SetStateAction } from 'react'
import { Colors } from '../utils/colors'
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons'

type Props = {
    label: string;
    onChange: Dispatch<SetStateAction<string>>;
    icon?: string;
    value?: string;
}

const CustomInput = ({ label, onChange, icon, value }: Props) => {
    return (
        <View style={styles.container}>
            <View style={styles.sectionStyle}>
                <Ionicons name={icon} size={25} color={Colors.BLUE} />
                <TextInput
                    style={styles.textInput}
                    placeholder={label}
                    placeholderTextColor={Colors.BLUE}
                    onChangeText={onChange}
                    contextMenuHidden={true}
                    secureTextEntry={label === 'Password' || label === 'Confirm password' || label === 'New password' || label === 'Confirm new password'}
                    enterKeyHint='done'
                    value={value}
                />
            </View>
        </View>
    )
}

export default CustomInput

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 15,
    },
    sectionStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: Colors.BLUE,
        borderRadius: 7,
        width: 300,
        height: 50,
    },

    textInput: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: 'transparent',
        fontSize: 20,
        color: Colors.WHITE,
        width: 250,
        height: 50,
    }
})