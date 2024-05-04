import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import OnBoarding from './src/screens/OnBoarding';
import { store } from './src/data/store';
import { Provider } from 'react-redux';
import RegisterSchoolAndLocalization from './src/screens/RegisterSchoolAndLocalization';
import Register from './src/screens/Register';
import Authentication from './src/screens/Authentication';
import Login from './src/screens/Login';
import HomeBottomTab from './src/assets/navigation/HomeBottomTab';
import PostDetails from './src/screens/PostDetails';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='OnBoarding'>
            <Stack.Screen name="OnBoarding" component={OnBoarding} />
            <Stack.Screen name="Authentication" component={Authentication} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="RegisterSchoolAndLocalization" component={RegisterSchoolAndLocalization} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name='HomePage' component={HomeBottomTab} />
            <Stack.Screen name='PostDetails' component={PostDetails} />
          </Stack.Navigator>
        </NavigationContainer>
      </GestureHandlerRootView>
    </Provider>
  );
}

export default App;