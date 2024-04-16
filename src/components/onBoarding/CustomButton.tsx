import { FlatList, StyleSheet, Text, TouchableWithoutFeedback, View, useWindowDimensions } from 'react-native'
import React from 'react'
import Animated, { AnimatedRef, SharedValue, interpolateColor, useAnimatedStyle, withSpring, withTiming } from 'react-native-reanimated';
import { onBoardingInterface } from '../../data/onboarding';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../utils/colors';
import { useNavigation } from '@react-navigation/native';

type Props = {
    flatListRef: AnimatedRef<FlatList<onBoardingInterface>>;
    flatListIndex: SharedValue<number>;
    datalength: number;
    x: SharedValue<number>;
    navigate : string;
}

const CustomButton = ({ flatListRef, flatListIndex, datalength, x, navigate}: Props) => {
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

    const AnimatedIonicons = useAnimatedStyle(() => {
        let color = interpolateColor(
            x.value,
            [0, SCREEN_WIDTH, 2 * SCREEN_WIDTH],
            [Colors.WHITE, Colors.BLUE, Colors.WHITE]
        );
        return { color };
    });
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
                <Animated.Text style={[styles.textButton, textAnimationStyle]}>Get Started</Animated.Text>
                <AnimatedIcon name="arrow-forward" size={30} style={[styles.arrow, arrowAnimationStyle, AnimatedIonicons]} />
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
    arrow: {
        width: 30,
        height: 30,
    },
    textButton: {
        color: 'white',
        fontSize: 20,
        position: 'absolute',
        fontWeight: '800',
    }
})