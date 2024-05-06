import { FlatList, StyleSheet, Text, TouchableWithoutFeedback, View, useWindowDimensions } from 'react-native'
import React from 'react'
import Animated, { AnimatedRef, SharedValue, interpolateColor, useAnimatedStyle, withSpring, withTiming } from 'react-native-reanimated';
import { onBoardingInterface } from '../../data/onboarding';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../utils/colors';
import { useNavigation } from '@react-navigation/native';
import { ReanimatedFlatList } from 'react-native-reanimated/lib/typescript/reanimated2/component/FlatList';

type Props = {
    flatListRef: AnimatedRef<ReanimatedFlatList<onBoardingInterface>>;
    flatListIndex: SharedValue<number>;
    datalength: number;
    x: SharedValue<number>;
    navigate: string;
}

const CustomButton = ({ flatListRef, flatListIndex, datalength, x, navigate }: Props) => {
    const navigation = useNavigation();

    const { width: SCREEN_WIDTH } = useWindowDimensions();

    const buttonAnimationStyle = useAnimatedStyle(() => {
        return {
            width: flatListIndex.value === datalength - 1
                ? withSpring(140)
                : withSpring(60),
        };
    });

    const animatedColor = useAnimatedStyle(() => {
        const backgroundColor = interpolateColor(
            x.value,
            [0, SCREEN_WIDTH, 2 * SCREEN_WIDTH],
            [Colors.BLUE, Colors.WHITE, Colors.BLUE]
        );
        return {
            backgroundColor: backgroundColor,
        };
    });

    const arrowAnimationStyle = useAnimatedStyle(() => {
        return {
            width: 30,
            height: 30,
            opacity: flatListIndex.value === datalength - 1 ? withTiming(0) : withTiming(1),
            transform: [
                {
                    translateX: flatListIndex.value === datalength - 1
                        ? withTiming(100)
                        : withTiming(0),
                },
            ],
        };
    });

    const arrowAnimationStyle2 = useAnimatedStyle(() => {
        let color = interpolateColor(
            x.value,
            [0, SCREEN_WIDTH, 2 * SCREEN_WIDTH],
            [Colors.WHITE, Colors.BLUE, Colors.WHITE]
        );
        return {
            color: color,

        };
    });


    const textAnimationStyle = useAnimatedStyle(() => {
        return {
            opacity: flatListIndex.value === datalength - 1 ? withTiming(1) : withTiming(0),
            transform: [
                {
                    translateX: flatListIndex.value === datalength - 1
                        ? withTiming(0)
                        : withTiming(-100),
                },
            ],
        };
    });

    const AnimatedIcon = Animated.createAnimatedComponent(Ionicons);

    return (
        <TouchableWithoutFeedback
            onPress={() => {
                if (flatListIndex.value < datalength - 1) {
                    flatListRef.current?.scrollToIndex({ index: flatListIndex.value + 1 });
                } else {
                    navigation.navigate(navigate);
                }
            }}
        >
            <Animated.View style={[styles.container, animatedColor, buttonAnimationStyle]}>
                <Animated.Text style={[styles.textButton, textAnimationStyle]}>C'est parti !</Animated.Text>
                <Animated.View style={arrowAnimationStyle}>
                    <AnimatedIcon name="arrow-forward" size={30} style={arrowAnimationStyle2} />
                </Animated.View>
            </Animated.View>
        </TouchableWithoutFeedback>
    )
}

export default CustomButton

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        padding: 10,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        width: 60,
        height: 60,
    },
    textButton: {
        color: 'white',
        fontSize: 20,
        position: 'absolute',
        fontWeight: '800',
    }
})