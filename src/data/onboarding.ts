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
    animation: require("../assets/animations/animation1.json"),
    text: "Bienvenue sur\nStudentLink !",
    textColor: Colors.BLUE,
    backgroundColor: Colors.DARKEN_BLUE,
  },
  {
    id: 2,
    animation: require("../assets/animations/animation2.json"),
    text: "Le réseau social\npour les étudiants",
    textColor: Colors.WHITE,
    backgroundColor: Colors.BLUE,
  },
  {
    id: 3,
    animation: require("../assets/animations/animation3.json"),
    text: "Trouve des amis,\ndes groupes et des événements",
    textColor: Colors.BLUE,
    backgroundColor: Colors.DARKEN_BLUE,
  },
];

export default OnBoardingData;
