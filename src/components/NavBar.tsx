import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { Colors } from '../utils/colors';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';


const NavBar = ({ state, navigation }: BottomTabBarProps) => {
    const screens = state.routes;
    const [focusedIndex, setFocusedIndex] = useState<number | 0>(0);

    const navigate = (index: number, routeName: string) => {
        setFocusedIndex(index);
        navigation.navigate(routeName);
    };

    const getTabIcon = (name: string, isFocused: boolean) => {
        switch (name) {
            case 'Accueil':
                return <Ionicons name={isFocused ? 'home' : 'home-outline'} size={30} color={isFocused ? Colors.BLUE : Colors.WHITE} />;
            case 'Profil':
                return <Ionicons name={isFocused ? 'person' : 'person-outline'} size={30} color={isFocused ? Colors.BLUE : Colors.WHITE} />;
            case 'Ecole':
                return <Ionicons name={isFocused ? 'school' : 'school-outline'} size={30} color={isFocused ? Colors.BLUE : Colors.WHITE} />;
            case 'Lieux':
                return <Ionicons name={isFocused ? 'location' : 'location-outline'} size={30} color={isFocused ? Colors.BLUE : Colors.WHITE} />;
            case 'Ajouter':
                return <Ionicons name={isFocused ? 'add-circle' : 'add-circle-outline'} size={50} color={isFocused ? Colors.BLUE : Colors.WHITE} />;
            default:
                return null;
        }
    }

    return (
        <View style={styles.navbarContainer}>
            <View style={styles.navbarInnerContainer}>
                {screens.map((route, index) => (
                    <TouchableOpacity style={styles.navbarButton} onPress={() => navigate(index, route.name)} key={index}>
                        {getTabIcon(route.name, index === focusedIndex)}
                        <Text style={styles.navbarText}>{route.name}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    )
}

export default NavBar

const styles = StyleSheet.create({
    navbarContainer: {
        borderRadius: 100,
        backgroundColor: Colors.DARKEN_BLUE,
        position: 'absolute',
        flex: 1,
        width: Dimensions.get('window').width,
        bottom: 0,
        paddingBottom: 20,
        paddingTop: 10,
        paddingHorizontal: 20,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 15,
    },
    navbarInnerContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'stretch',
    },
    navbarButton: {
        flex: 1,
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center"
    },
    navbarText: {
        color: Colors.WHITE,
        fontSize: 15,
    }
})