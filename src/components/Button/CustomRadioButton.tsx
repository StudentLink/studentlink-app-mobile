import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { Colors } from '../../utils/colors';

type Props = {
    label: string,
    selected: boolean,
    onSelected: () => void
}

const CustomRadioButton = ({ label, selected, onSelected }: Props) => {
    return (
        <TouchableOpacity style={[styles.radioButton, { backgroundColor: selected ? Colors.BLUE : Colors.DARKEN_BLUE, borderWidth: selected ? 0 : 2, borderColor: selected ? Colors.DARKEN_BLUE : Colors.BLUE, opacity: selected ? 1 : 0.5 }]} onPress={onSelected}>
            <Text style={[styles.buttonText, { color: selected ? Colors.WHITE : Colors.BLUE }]}>{label}</Text>
        </TouchableOpacity>
    );
};

export default CustomRadioButton;

const styles = StyleSheet.create({
    radioButton: {
        width: "auto",
        padding: 10,
        borderRadius: 20,
        borderColor: Colors.DARKEN_BLUE,
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 20,
        fontWeight: '800',
    }
});