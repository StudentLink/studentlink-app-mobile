import { AnimationObject } from "lottie-react-native";
import { Colors } from "../utils/colors";

export interface onBoardingInterface {
    id: number;
    animation: AnimationObject;
    text: string;
    textColor: string;
    backgroundColor: string;
}

const OnBoardingData: onBoardingInterface[] = [
    {
        id: 1,
        animation: require('../assets/animations/animation1.json'),
        text: 'Welcome to the App',
        textColor: Colors.ORANGE,
        backgroundColor: Colors.PINK,
    },
    {
        id: 2,
        animation: require('../assets/animations/animation2.json'),
        text: 'This is the second screen',
        textColor: Colors.PINK,
        backgroundColor: Colors.GREEN,
    },
    {
        id: 3,
        animation: require('../assets/animations/animation3.json'),
        text: 'This is the third \nscreen',
        textColor: Colors.GREEN,
        backgroundColor: Colors.WHITE,
    },
];

export default OnBoardingData;