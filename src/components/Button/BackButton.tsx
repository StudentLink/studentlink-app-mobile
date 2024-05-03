import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Colors } from '../../utils/colors';
import Ionicons from '@expo/vector-icons/Ionicons';

type Props = {
    onclick: () => void;
}

const BackButton = ({ onclick }: Props) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onclick}>
                <Ionicons name="arrow-back" size={24} color={Colors.WHITE} />
            </TouchableOpacity>
        </View>
    )
}

export default BackButton

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 50,
        left: 20,
        zIndex: 100,
    }
})