import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Colors } from '../../utils/colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const BackButton = () => {

    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
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