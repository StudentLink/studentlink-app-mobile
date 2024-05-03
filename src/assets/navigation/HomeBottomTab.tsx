import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomePage from '../../screens/HomePage';
import Profile from '../../screens/Profile';
import NavBar from '../../components/NavBar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import FeedSchools from '../../screens/FeedSchools';

const Tabs = createBottomTabNavigator();

const HomeBottomTab = () => {
    return (
            <Tabs.Navigator screenOptions={{ headerShown: false, }} tabBar={(props) => {
                return <NavBar {...props} />
            }}>
                <Tabs.Screen name="Home" component={HomePage} />
                <Tabs.Screen name="School Feed" component={FeedSchools} />
                <Tabs.Screen name="Profile" component={Profile} />
            </Tabs.Navigator>
    );
}

export default HomeBottomTab;