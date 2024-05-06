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
            <Tabs.Screen name="Accueil" component={HomePage} />
            <Tabs.Screen name="Ecole" component={FeedSchools} />
            <Tabs.Screen name="Ajouter" component={AddPosts} />
            <Tabs.Screen name="Lieux" component={FeedLocations} />
            <Tabs.Screen name="Profil" component={Profile} />
        </Tabs.Navigator>
    );
};

export default HomeBottomTab;