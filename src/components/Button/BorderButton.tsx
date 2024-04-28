import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Constant } from '../../utils/constant';
import { Colors } from '../../utils/colors';

type Props = {
    label : string,
    onClick : () => void;
}

const BorderButton = ({label, onClick}: Props) => {
  return (
    <TouchableWithoutFeedback
    onPress={() => {
        onClick();
    }}>
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
        </View>

    </TouchableWithoutFeedback>
  )
}

export default BorderButton

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginTop: Constant.MARGIN_BOTTOM_SUBTITLE,
        backgroundColor: 'transparent',
        borderWidth: 3,
        borderRadius: 10,
        borderColor: Colors.BLUE,
        width: 325,
        paddingVertical: 15,
    },
    label : {
        color: Colors.WHITE,
        fontSize: 25,
        fontWeight: '600',
    }
})