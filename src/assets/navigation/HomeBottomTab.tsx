import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomePage from '../../screens/HomePage';
import Profile from '../../screens/Profile';
import NavBar from '../../components/NavBar';
import FeedSchools from '../../screens/FeedSchools';
import FeedLocations from '../../screens/FeedLocations';
import AddPosts from '../../screens/AddPosts';

const Tabs = createBottomTabNavigator();

const HomeBottomTab = () => {
    return (
            <Tabs.Navigator screenOptions={{ headerShown: false, }} tabBar={(props) => {
                return <NavBar {...props} />
            }}>
                <Tabs.Screen name="Home" component={HomePage} />
                <Tabs.Screen name="School" component={FeedSchools} />
                <Tabs.Screen name="Add" component={AddPosts} />
                <Tabs.Screen name="Locations" component={FeedLocations} />
                <Tabs.Screen name="Profile" component={Profile} />
            </Tabs.Navigator>
    );
}

export default HomeBottomTab;