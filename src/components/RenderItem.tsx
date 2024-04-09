import { StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import React from 'react'
import { onBoardingInterface } from '../data/onboarding'
import LottieView from 'lottie-react-native';

type Props = {
    item: onBoardingInterface;
    index: number;
}

const RenderItem = ({item, index}: Props) => {
    const {width: SCREEN_WIDTH} = useWindowDimensions();
  return (
    <View style={[styles.itemContainer, {width: SCREEN_WIDTH}]}>
        <View>
            <LottieView 
            source={item.animation} 
            style={{width: SCREEN_WIDTH * 0.9, height: SCREEN_WIDTH * 0.9}}
            autoPlay
            loop
            />
        </View>
      <Text style={[styles.itemText, {color: item.textColor}]}>{item.text}</Text>
    </View>
  )
}

export default RenderItem;

const styles = StyleSheet.create({
    itemContainer: {
        flex: 1,
        justifyContent:'space-around',
        alignItems:'center',
        marginBottom: 120,
    },
    itemText: {
        textAlign: 'center',
        fontSize: 44,
        fontWeight: 'bold',
        marginBottom: 10,
    }
})