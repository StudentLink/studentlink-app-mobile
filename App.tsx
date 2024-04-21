import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import OnBoarding from './src/screens/OnBoarding';
import RegisterName from './src/screens/RegisterName';
import { store } from './src/data/store';
import { Provider } from 'react-redux';
import RegisterSchoolAndLocalization from './src/screens/RegisterSchoolAndLocalization';
import RegisterPasswordAndEmail from './src/screens/RegisterPasswordAndEmail';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='OnBoarding'>
            <Stack.Screen name="OnBoarding" component={OnBoarding} />
            <Stack.Screen name="RegisterName" component={RegisterName} />
            <Stack.Screen name="RegisterPasswordAndEmail" component={RegisterPasswordAndEmail} />
            <Stack.Screen name="RegisterSchoolAndLocalization" component={RegisterSchoolAndLocalization} />
          </Stack.Navigator>
        </NavigationContainer>
      </GestureHandlerRootView>
    </Provider>
  );
}

export default App;