import {StyleSheet, View } from 'react-native';
import onBoardingData, { onBoardingInterface } from './src/data/onboarding';
import RenderItem from './src/components/RenderItem';
import Animated, { useAnimatedRef, useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';
import { FlatList } from 'react-native-reanimated/lib/typescript/Animated';

const App = () => {
  const flatListRef = useAnimatedRef<FlatList<onBoardingInterface>>();
  const x = useSharedValue(0);


  const onScroll = useAnimatedScrollHandler({
    onScroll:event => {
      x.value = event.contentOffset.x;
    }
  })

  return (
    <View style={styles.container}>
      <Animated.FlatList 
        ref={flatListRef}
        onScroll={onScroll}
        data={onBoardingData} 
        renderItem={({ item, index }) => {
          return <RenderItem item={item} index={index} x={x}/>;
      }}
      keyExtractor={item => item.id}
      scrollEventThrottle={16}
      horizontal={true}
      bounces={false}
      pagingEnabled={true}
      showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;