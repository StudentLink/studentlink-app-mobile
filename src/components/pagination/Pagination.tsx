import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { onBoardingInterface } from '../../data/onboarding'
import { SharedValue } from 'react-native-reanimated'
import Dot from './Dot'

type Props = {
  data: onBoardingInterface[],
  x: SharedValue<number>,
}

const Pagination = ({data, x}: Props) => {
  return (
    <View style={styles.paginationContainer}>
      {data.map((_, index) => {
        return <Dot key={index} index={index} x={x}/>
      })}
    </View>
  )
}

export default Pagination

const styles = StyleSheet.create({
  paginationContainer: {
    flexDirection: 'row',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
})