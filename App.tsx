import {StyleSheet, View } from 'react-native';
import onBoardingData from './src/data/onboarding';
import RenderItem from './src/components/RenderItem';
import Animated from 'react-native-reanimated';

const App = () => {
  return (
    <View style={styles.container}>
      <Animated.FlatList 
        data={onBoardingData} 
        renderItem={({ item, index }) => {
          return <RenderItem item={item} index={index}/>;
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