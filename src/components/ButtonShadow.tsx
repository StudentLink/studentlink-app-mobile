import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import React from 'react'
import { Colors } from '../utils/colors'
import { useNavigation } from '@react-navigation/native';

type Props = {
    label: string;
    onClick : () => void;
    navigate : string;
}

const ButtonShadow = ({ label, navigate, onClick}: Props) => {
    const navigation = useNavigation();
    return (
        <TouchableWithoutFeedback 
        onPress={() => {
            onClick();
            navigation.navigate(navigate)
        }}>
            <View style={styles.container}>
                <Text style={styles.label}>{label}</Text>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default ButtonShadow

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.BLUE,
        paddingHorizontal: 120,
        paddingVertical: 15,
        shadowColor: Colors.DARK_BLUE,
        shadowOffset: {width : 0, height: 5},
        shadowOpacity: 1,
        shadowRadius: 1,
        borderRadius: 10,
    },
    label : {
        color: Colors.WHITE,
        fontSize: 25,
        fontWeight: '600',
    }
})