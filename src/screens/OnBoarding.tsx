import { StyleSheet, View, ViewToken } from 'react-native';
import onBoardingData, { onBoardingInterface } from '../data/onboarding';
import RenderItem from '../components/onBoarding/RenderItem';
import Animated, { useAnimatedRef, useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';
import { FlatList } from 'react-native-reanimated/lib/typescript/Animated';
import Pagination from '../components/onBoarding/pagination/Pagination';
import CustomButton from '../components/onBoarding/CustomButton';

const OnBoarding = () => {
    const flatListRef = useAnimatedRef<FlatList<onBoardingInterface>>();
    const x = useSharedValue(0);
    const flatListIndex = useSharedValue(0);
  
    const onViewableItemsChanged = ({
      viewableItems
    }: {
      viewableItems: ViewToken[];
    }) => {
      if (viewableItems[0].index !== null) {
        flatListIndex.value = viewableItems[0].index;
      }
    };
  
  
    const onScroll = useAnimatedScrollHandler({
      onScroll: event => {
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
            return <RenderItem item={item} index={index} x={x} />;
          }}
          keyExtractor={item => item.id}
          scrollEventThrottle={16}
          horizontal={true}
          bounces={false}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={{
            minimumViewTime: 300,
            viewAreaCoveragePercentThreshold: 10,
          }}
        />
        <View style={styles.bottomContainer}>
          <Pagination data={onBoardingData} x={x} />
          <CustomButton
            flatListRef={flatListRef}
            flatListIndex={flatListIndex}
            datalength={onBoardingData.length}
            x={x}
            navigate='Authentication'
          />
        </View>
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
    bottomContainer: {
      position: 'absolute',
      bottom: 20,
      left: 0,
      right: 0,
      marginHorizontal: 30,
      paddingVertical: 30,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    }
  });

export default OnBoarding;