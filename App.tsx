import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import OnBoarding from './src/screens/OnBoarding';
import { store } from './src/data/store';
import { Provider } from 'react-redux';
import RegisterSchoolAndLocalization from './src/screens/RegisterSchoolAndLocalization';
import Register from './src/screens/Register';
import HomePage from './src/screens/HomePage';
import Authentication from './src/screens/Authentication';
import Login from './src/screens/Login';
import Profile from './src/screens/Profile';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='Authentication'>
            <Stack.Screen name="OnBoarding" component={OnBoarding} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name='HomePage' component={HomePage} />
            <Stack.Screen name="Authentication" component={Authentication} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="RegisterSchoolAndLocalization" component={RegisterSchoolAndLocalization} />
          </Stack.Navigator>
        </NavigationContainer>
      </GestureHandlerRootView>
    </Provider>
  );
}

export default App;